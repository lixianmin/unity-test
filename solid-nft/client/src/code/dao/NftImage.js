'use strict'

/********************************************************************
 created:    2023-03-06
 author:     lixianmin

 无论是 npm i pouchdb
 还是   npm i pouchdb-browser

 在使用的时候都报错： Uncaught ReferenceError: global is not defined
 只能使用<script>嵌入的方式

 所以，现在采用的是npm i pouchdb，但使用<script>引用，而不能在代码里直接import，
 这样无代码提示，但凑合能用

 这也是官方的做法，想不明白为什么是这样，奇怪的
 https://pouchdb.com/guides/setup-pouchdb.html

 数据被写在indexedDB中
 Copyright (C) - All Rights Reserved
 *********************************************************************/

import {getNftImageUrl} from "../tools/api";

const db = new PouchDB('nft.image')

export async function LoadNftImageUrl(nftId) {
    try {
        const doc = await db.get(nftId)
        return doc.url
    } catch (err) {
        if (err.status === 404) {
            const url = getNftImageUrl(nftId)
            const doc = await db.post({nftId, url})
            return doc.url
        } else {
            console.log(`nftId=${nftId}, err=${err}`)
        }
    }
}