'use strict'

import {get} from "./http";
import {showNotification} from "../components/Notification";

/********************************************************************
 created:    2023-03-03
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

// 只所以使用函数表达式而不是函数声明，是因为函数声明格式化的时候会变成3行，而函数表达式不会
export const get_system_info = (p) => get("/api/v1/system/info", p) // 获取资源地址
export const get_product_list = (params) => get("/api/v1/product/list", params) // 商品列表
export const get_product = (nft_id) => get(`/api/v1/product/${nft_id}`)

async function getImageRootUrl() {
    const key = 'imageRootUrl'
    if (sessionStorage.getItem(key) === null) {
        const response = await get_system_info()
        if (response.code === 0) {
            const url = `https://${response.data.bucket_url}/${response.data.nft_pic_path}`
            sessionStorage.setItem(key, url)
        } else {
            sessionStorage.setItem(key, 'https://faked')
            showNotification('错误', response.error)
        }
    }

    return sessionStorage.getItem(key)
}

export async function getNftUrl(nftId) {
    const rootUrl = await getImageRootUrl()
    return `${rootUrl}/${nftId}.jpg`
}