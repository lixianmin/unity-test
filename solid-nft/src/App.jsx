'use strict';
/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/
import Notification from "./code/components/Notification";
import ProductList from "./code/components/ProductList";

async function init() {
    try {

    } catch (err) {
        console.log('error occurred:', err)
    }
}

export default function App() {
    init().then()

    return <>
        <ProductList/>
        <Notification/>
    </>
}