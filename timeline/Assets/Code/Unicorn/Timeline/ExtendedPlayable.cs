/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using UnityEngine.Playables;

namespace Unicorn.Timeline
{
    public static class ExtendedPlayable
    {
        public static float GetProcessEx(this Playable that)
        {
            var duration = that.GetDuration();
            if (duration > 0)
            {
                return (float) (that.GetTime() / duration);
            }

            return 0f;
        }
    }
}