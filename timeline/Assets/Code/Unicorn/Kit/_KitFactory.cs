
// Warning: all code of this file are generated automatically, so do not modify it manually ~
// Any questions are welcome, mailto:lixianmin@gmail.com

using System;
using System.Collections;

namespace Unicorn
{
    public class _KitFactory
    {
        [UnityEngine.Scripting.Preserve]
        private static Hashtable _GetLookupTableByName ()
        {
            return new Hashtable(1)
            {
                { "Kits.PlayerMoveKit", (Func<KitBase>)(() => new Kits.PlayerMoveKit()) },
            };
        }
    }
}
