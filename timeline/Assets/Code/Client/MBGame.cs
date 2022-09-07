
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using Unicorn;
using UnityEngine;

namespace Client
{
    public class MBGame: MonoBehaviour
    {
        private void Start()
        {
            // 避免Game对象在场景切换的时候被干掉
            GameObject.DontDestroyOnLoad(gameObject);

            UnicornMain.Instance.Init();
        }

        private void Update()
        {
            UnicornMain.Instance.Update(Time.deltaTime);
        }
    }
}