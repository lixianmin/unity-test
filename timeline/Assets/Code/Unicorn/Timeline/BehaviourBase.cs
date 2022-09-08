
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using UnityEngine.Playables;

namespace Unicorn.Timeline
{
    /// <summary>
    /// PlayableBehaviour是一个普通类, 因此它无法在Inspector中实际存储数据.
    /// PlayableBehaviour的目标是完成行为逻辑
    /// </summary>
    public abstract class BehaviourBase : PlayableBehaviour
    {
        /// <summary>
        /// clip的开始时间, 单位(s)
        /// </summary>
        public double clipStart { get; internal set; }
        
        /// <summary>
        /// clip的结束时间, 单位(s)
        /// </summary>
        public double clipEnd { get; internal set; }
    }
}