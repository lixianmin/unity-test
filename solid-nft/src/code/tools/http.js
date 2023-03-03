'use strict'
/********************************************************************
 created:    2023-03-03
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

import axios from "axios";

// 环境的切换
// console.log(process.env, "===========");
// axios.defaults.baseURL = process.env.VUE_APP_API_URL; // 开发环境
//axios.defaults.baseURL = "/"; // 开发环境

// if (process.env.NODE_ENV === "development") {
//   axios.defaults.baseURL = "http://43.143.205.159:8116/"; // 开发环境
// } else if (process.env.NODE_ENV === "debug") {
//   axios.defaults.baseURL = ""; // 调试环境
// } else if (process.env.NODE_ENV === "production") {
//   axios.defaults.baseURL = ""; // 生产环境
// }

axios.defaults.baseURL = "http://43.143.205.159:8116/"; // 开发环境

//跨域访问需要发送cookie时一定要加axios.defaults.withCredentials = true
axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000000;

// todo 如果我这里直接写，那么如果这个文件被引用多次的话，这些是不是会被重复执行多次？
// 设置默认提交json
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

//axios.defaults.transformRequest = data => JSON.stringify(data) //把数据对象序列化成json字符串

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                reject(err.data)
            })
    })
}