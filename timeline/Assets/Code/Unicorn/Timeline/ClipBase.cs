
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
    /// <summary>
    /// 1. clip本身是一个PlayableAsset是一个ScriptableObject, 它没法存储Transform之类的field, 因此只能借助ExposedReference<Transform>曲线救国
    /// 2. ExposedReference自身也不存储数据, 真正的数据存储在graph中, 需要从graph中把数据解析出来
    /// </summary>
    public abstract class ClipBase : PlayableAsset, ITimelineClipAsset
    {
        protected abstract void OnCreate(PlayableGraph graph, GameObject owner, Playable playable);

        protected abstract void OnProcessFrame(Playable playable, FrameData info, object playerData);
        
        public override Playable CreatePlayable(PlayableGraph graph, GameObject owner)
        {
            var playable = ScriptPlayable<CommonBehaviour>.Create(graph, new CommonBehaviour());
            
            var behaviour = playable.GetBehaviour();
            behaviour.Init(this);

            OnCreate(graph, owner, playable);
            return playable;
        }

        internal void ProcessFrame(Playable playable, FrameData info, object playerData)
        {
            OnProcessFrame(playable, info, playerData);
        }
        
        public virtual ClipCaps clipCaps => ClipCaps.None;
        
        public double clipStart { get; internal set; }
        public double clipEnd { get; internal set; }
    }
}