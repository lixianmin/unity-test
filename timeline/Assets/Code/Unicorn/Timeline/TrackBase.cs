/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using UnityEngine;
using UnityEngine.Playables;
using UnityEngine.Timeline;

namespace Unicorn.Timeline
{
    public abstract class TrackBase : TrackAsset
    {
        public override Playable CreateTrackMixer(PlayableGraph graph, GameObject go, int inputCount)
        {
            foreach (var clip in GetClips())
            {
                if (clip.asset is ClipBase customClip)
                {
                    customClip.clipStart= clip.start;
                    customClip.clipEnd = clip.end;
                }
            }
        
            return base.CreateTrackMixer(graph, go, inputCount);
        }
    }
}