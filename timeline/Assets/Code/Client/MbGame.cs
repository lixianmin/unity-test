
/********************************************************************
created:    2022-09-08
author:     lixianmin

Copyright (C) - All Rights Reserved
*********************************************************************/

using Unicorn;
using UnityEngine;

namespace Client
{
    public class MbGame: MonoBehaviour
    {
        private void Start()
        {
            // 避免Game对象在场景切换的时候被干掉
            GameObject.DontDestroyOnLoad(gameObject);
            _unicornMain.Init();
        }

        private void Update()
        {
            // 成本帧
            var deltaTime = Time.deltaTime;
            _unicornMain.ExpensiveUpdate(deltaTime);

            // 慢速帧
            var time = Time.time;
            if (time >= _nextSlowUpdateTime)
            {
                var slowDeltaTime = time - _lastSlowUpdateTime;
                _lastSlowUpdateTime = _nextSlowUpdateTime;
                _nextSlowUpdateTime = time + 0.1f;

                _unicornMain.SlowUpdate(slowDeltaTime);
            }
        }

        private readonly UnicornMain _unicornMain = UnicornMain.Instance;

        private float _lastSlowUpdateTime;
		private float _nextSlowUpdateTime;
    }
}
