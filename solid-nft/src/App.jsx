'use strict';
/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/
import Notification from "./code/components/Notification";
import ProductList from "./code/components/ProductList";
import BackToTop from "./code/components/BackToTop";
import {render} from "solid-js/web";
import {initNftImageRootUrl} from "./code/tools/api";

async function init() {
    await initNftImageRootUrl()
}

function App() {
    return <>
        <ProductList/>
        <Notification/>
        <BackToTop/>
    </>
}

init().then(() => {
    const root = document.getElementById('root')
    render(() => <App/>, root)
}).catch(err => {
    console.error('init error:', err)
})