
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using Unicorn.Timeline;
using UnityEngine;
using UnityEngine.Playables;
using UnityEngine.Timeline;

namespace Client
{
    public class TransformMoveClip: ClipBase
    {
        protected override void OnCreate(PlayableGraph graph, GameObject owner, Playable playable)
        {
            _startPosition = startLocation.Resolve(graph.GetResolver()).position;
            _endPosition = endLocation.Resolve(graph.GetResolver()).position;
        }

        protected override void ProcessFrame(Playable playable, FrameData info, object playerData)
        {
            Console.WriteLine($"playable={playable}, info={info}, playerData={playerData}");
            if (playerData is Transform player)
            {
                var progress = playable.GetProcessEx();
                player.position = Vector3.Lerp(_startPosition, _endPosition, progress);
            }
        }
        
        // clip中展现的可以在inspector中看到的变量
        public ExposedReference<Transform> startLocation;
        public ExposedReference<Transform> endLocation;

        private Vector3 _startPosition;
        private Vector3 _endPosition;
    }

    [TrackColor(0f, .5f, 0f)]
    [TrackClipType(typeof(TransformMoveClip))]
    [TrackBindingType(typeof(Transform))]
    public class TransformMoveTrack : TrackBase
    {
        
    }
}