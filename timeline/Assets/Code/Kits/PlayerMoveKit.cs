
/********************************************************************
created:    2022-08-27
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using Unicorn;
using UnityEngine;

namespace Kits
{
    public class PlayerMoveKit: KitBase
    {
        protected override void Update()
        {
            var transform = GetTransform();
            const float moveSpeed = 2.0f;
            var motion = transform.rotation * Vector3.forward * moveSpeed * Time.deltaTime;                
            transform.Translate(motion, Space.World);
            // Console.WriteLine(motion);
        }
    }
}