/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

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
        public virtual ClipCaps clipCaps => ClipCaps.None;

        public static ScriptPlayable<T> CreatePlayable<T>(PlayableGraph graph) where T : class, IPlayableBehaviour, new()
        {
            return ScriptPlayable<T>.Create(graph, new T());
        }
    }
}