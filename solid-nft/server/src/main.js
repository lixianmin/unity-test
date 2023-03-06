'use strict';
/********************************************************************
 created:    2023-03-06
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

const Koa = require('koa')
const app = new Koa()

const https = require('https')
const fs = require('fs')
const url = `https://acquirebase.com/img/logo.png`;
const rootUrl = 'https://sale-1313215633.cos.ap-beijing.myqcloud.com/nft/'


app.use(async ctx => {
    for (let i = 1; i <= 1100; i++) {
        const fileName = i + '.jpg'
        const downloadUrl = rootUrl + fileName
        const writeFilePath = 'assets/images/nft/' + fileName

        // fs.exists(writeFilePath, (exists) => {
        //     if (!exists) {
        //         https.get(downloadUrl, (response) => {
        //             const file = fs.createWriteStream(writeFilePath)
        //             // Write data into local file
        //             response.pipe(file)
        //             // Close the file
        //             file.on('finish', () => {
        //                 file.close()
        //                 console.log(`${fileName} downloaded!`)
        //             })
        //         }).on("error", (err) => {
        //             console.log("error: ", err.message);
        //         })
        //     }
        // })
    }

    ctx.body = 'Hello World'
})

const port = 8000
app.listen(port, () => {
    console.log()
    console.log(`App running in port ${port}...`)
    console.log()
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${port}/\x1b[0m`)
})