import threading
import wave

import pyaudio
import whisper

# import numpy as np

# Audio settings
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
CHUNK = 1024 << 4


class AudioRecorder:
    def __init__(self):
        self._audio = pyaudio.PyAudio()
        self._stream = self._audio.open(format=FORMAT, channels=CHANNELS, rate=RATE,
                                        input=True, frames_per_buffer=CHUNK)

    def close(self):
        self._stream.stop_stream()
        self._stream.close()
        self._audio.terminate()

    def take_record(self, seconds=30):
        frames = []
        for i in range(0, int(RATE / CHUNK * seconds)):
            data = self._stream.read(CHUNK)
            frames.append(data)

        result = b''.join(frames)
        return result

    def save(self, filename, data):
        with wave.open(filename, 'wb') as fout:
            fout.setnchannels(CHANNELS)
            fout.setsampwidth(self._audio.get_sample_size(FORMAT))
            fout.setframerate(RATE)
            fout.writeframes(data)


model = whisper.load_model('medium')

def speech_to_text(filename):
    # Transcribe speech to text
    global model
    whisper_audio = whisper.load_audio(filename)
    whisper_audio = whisper.pad_or_trim(whisper_audio)

    mel = whisper.log_mel_spectrogram(whisper_audio).to(model.device)
    _, probs = model.detect_language(mel)

    # language = max(probs, key=probs.get)

    options = whisper.DecodingOptions(fp16=False)
    result = whisper.decode(model, mel, options)
    text = result.text
    return text


# Loop to continuously record and transcribe speech
index = 0
# lock = threading.Lock()
while True:
    recorder = AudioRecorder()
    print('waiting for record...')
    data = recorder.take_record()

    index += 1
    print('output to wav file')
    filename = f"output{index}.wav"
    recorder.save(filename, data)
    recorder.close()

    print('transcribe...')

    def print_text():
        # lock.acquire()
        text = speech_to_text(filename)
        print(f"Text: {text}")
        # lock.release()

    t = threading.Thread(target=print_text)
    t.start()
