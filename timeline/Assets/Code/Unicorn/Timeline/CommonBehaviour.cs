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
    internal class CommonBehaviour : PlayableBehaviour
    {
        internal void Init(ClipBase clip)
        {
            _clip = clip;
        }
        
        public override void ProcessFrame(Playable playable, FrameData info, object playerData)
        {
            _clip.Internal_ProcessFrame(playable, info, playerData);
        }

        private ClipBase _clip;
    }
}