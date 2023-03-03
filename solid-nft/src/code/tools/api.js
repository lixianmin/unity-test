'use strict'

import {get} from "./http";

/********************************************************************
 created:    2023-03-03
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

// 只所以使用函数表达式而不是函数声明，是因为函数声明格式化的时候会变成3行，而函数表达式不会
export const get_resource = (p) => get("/api/v1/system/info", p) // 获取资源地址
export const get_list = (params) => get("/api/v1/product/list", params); // 商品列表
export const get_product = (nft_id) => get(`/api/v1/product/${nft_id}`, null);