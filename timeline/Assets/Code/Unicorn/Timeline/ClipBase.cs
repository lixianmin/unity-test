/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using System;
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
        public Playable CreatePlayable<T>(PlayableGraph graph, GameObject owner, Action<T> handler) where T : class, IPlayableBehaviour, new()
        {
            var playable = ScriptPlayable<T>.Create(graph, new T());
            
            var behaviour = playable.GetBehaviour();
            if (behaviour is BehaviourBase b)
            {
                b.clipStart = clipStart;
                b.clipEnd = clipEnd;    
            }

            handler?.Invoke(behaviour);
            return playable;
        }
        
        public virtual ClipCaps clipCaps => ClipCaps.None;

        public double clipStart { get; internal set; }
        public double clipEnd { get; internal set; }
    }
}