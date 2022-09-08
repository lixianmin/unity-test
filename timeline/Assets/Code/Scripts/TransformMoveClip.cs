
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
    public class TransformMoveBehaviour: BehaviourBase
    {
        public Transform startLocation;
        public Transform endLocation;

        public override void OnPlayableCreate(Playable playable)
        {
            Console.WriteLine("[OnPlayableCreate()]");
        }
        public override void OnGraphStart(Playable playable)
        {
            Console.WriteLine("[OnGraphStart()]");
        }

        public override void OnGraphStop(Playable playable)
        {
            Console.WriteLine("[OnGraphStop()]");
        }
        
        public override void OnPlayableDestroy(Playable playable)
        {
            Console.WriteLine("[OnPlayableDestroy()]");
        }

        public override void ProcessFrame(Playable playable, FrameData info, object playerData)
        {
            Console.WriteLine($"playable={playable}, info={info}, playerData={playerData}");
            if (playerData is Transform player && startLocation is not null && endLocation is not null)
            {
                var progress = playable.GetProcessEx();
                player.position = Vector3.Lerp(startLocation.position, endLocation.position, progress);
            }
        }
    }
    
    public class TransformMoveClip: ClipBase<TransformMoveBehaviour>
    {
        // clip中展现的可以在inspector中看到的变量
        public ExposedReference<Transform> startLocation;
        public ExposedReference<Transform> endLocation;
        
        protected override void OnCreate(PlayableGraph graph, GameObject owner, Playable playable, TransformMoveBehaviour behaviour)
        {
            behaviour.startLocation = startLocation.Resolve(graph.GetResolver());
            behaviour.endLocation = endLocation.Resolve(graph.GetResolver());
        }
    }

    [TrackColor(0f, .5f, 0f)]
    [TrackClipType(typeof(TransformMoveClip))]
    [TrackBindingType(typeof(Transform))]
    public class TransformMoveTrack : TrackBase
    {
        
    }
}