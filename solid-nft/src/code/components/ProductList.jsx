'use strict'

import {get_product_list, getNftUrl} from "../tools/api";
import {createStore, produce} from "solid-js/store";
import {showNotification} from "./Notification";
import {For} from "solid-js";
import {Col, Container, Image, Row} from "solid-bootstrap";


/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

export default function ProductList() {
    const [products, setProducts] = createStore({
        pageNum: 1,
        list: [],
        columnNum: 0,
    })

    const params = {
        page_num: products.pageNum,
        page_size: 9,
        rare_level: 'R',
    };

    get_product_list(params).then((response) => {
        setProducts(produce(async (state) => {
            const products = response.data.products
            products.map(async item => {
                const src = await getNftUrl(item.id)
                const result = {id: item.id, src: src, variant: item.variant, price: item.price, name: item.name}
                state.list.push(result)

                state.columnNum = Math.ceil(state.list.length / 3)
            })
        }))
    }).catch((err) => {
        showNotification('错误', err)
    })

    return <>
        <ul>
            <Container>
                <For each={Array(products.columnNum)}>
                    {(column, columnIndex) => (
                        <Row>{products.list.slice(columnIndex() * 3, (columnIndex() * 3) + 3).map((nft) => (
                            <Col xs={4}>
                                <Image src={nft.src} rounded fluid/>
                                <div>
                                    <p>
                                        <span>{nft.variant}</span>
                                        <span>{nft.price}</span>
                                    </p>
                                    <p>
                                        <span>{nft.name}</span>
                                    </p>
                                </div>
                            </Col>
                        ))}
                        </Row>
                    )}
                </For>
            </Container>
        </ul>
    </>
}