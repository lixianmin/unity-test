'use strict';
/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/
import {get_resource} from './code/tools/api';
import Notification, {showNotification} from "./code/components/Notification";
import {Button} from "solid-bootstrap";


async function initResourceUrl() {
    const resp = await get_resource()
    if (resp.code === 0) {
        const resourceUrl = `https://${resp.data.bucket_url}/${resp.data.nft_pic_path}/`
        localStorage.setItem("resourceUrl", resourceUrl);
        console.log(resourceUrl)
    } else {
        showNotification('错误', resp.error)
    }
}

async function init() {
    try {
        await initResourceUrl()
    } catch (err) {
        console.log(err)
    }
}

export default function App() {
    init().then()

    function onClick() {
        showNotification("hello", "world")
    }

    return <>
        <Button onClick={onClick} variant="secondary">
            show notification
        </Button>
        <Notification/>
    </>
}