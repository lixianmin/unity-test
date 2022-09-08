
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using UnityEngine;
using UnityEngine.Playables;

namespace Unicorn.Timeline
{
    /// <summary>
    /// 1. clip本身是一个PlayableAsset是一个ScriptableObject, 它没法存储Transform之类的field, 因此只能借助ExposedReference<Transform>曲线救国
    /// 2. ExposedReference自身也不存储数据, 真正的数据存储在graph中, 需要从graph中把数据解析出来
    /// </summary>
    public abstract class ClipBase<T>  : PlayableAsset where T : class, IPlayableBehaviour, new()
    {
        public override Playable CreatePlayable(PlayableGraph graph, GameObject owner)
        {
            var playable = ScriptPlayable<T>.Create(graph, new T());
            
            var behaviour = playable.GetBehaviour();
            if (behaviour is BehaviourBase item)
            {
                item.clipStart = clipStart;
                item.clipEnd = clipEnd;    
            }

            OnCreate(graph, owner, playable, behaviour);
            return playable;
        }

        /// <summary>
        /// 这个方法主要用于把clip中得到的数据搬运到behaviour对象中
        /// </summary>
        /// <param name="graph"></param>
        /// <param name="owner"></param>
        /// <param name="playable"></param>
        /// <param name="behaviour"></param>
        protected abstract void OnCreate(PlayableGraph graph, GameObject owner, Playable playable, T behaviour);
    }
}