
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using UnityEngine.Timeline;

namespace Unicorn.Timeline
{
    public abstract class PlayableAsset : UnityEngine.Playables.PlayableAsset, ITimelineClipAsset
    {
        public virtual ClipCaps clipCaps => ClipCaps.None;
        
        public double clipStart { get; internal set; }
        public double clipEnd { get; internal set; }
    }
}