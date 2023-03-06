'use strict'

import {get_product_list, getNftImageUrl} from "../tools/api";
import {createStore, produce} from "solid-js/store";
import {showNotification} from "./Notification";
import {For, onMount} from "solid-js";
import {Badge, Col, Container, Image, Row} from "solid-bootstrap";


/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

export default function ProductList() {
    const columnSize = 3
    const [products, setProducts] = createStore({
        list: [],
        columnNum: 0,
    })

    function loadProducts(onLoadDone) {
        const pageSize = 12
        const pageNum = 1 + products.list.length / pageSize
        const params = {
            page_num: pageNum,
            page_size: pageSize,
            rare_level: 'R',
        };

        get_product_list(params).then((response) => {
            const data = response.data
            if (data && data.products) {
                setProducts(produce((state) => {
                    const list = data.products.map(item => {
                        const src = getNftImageUrl(item.id)
                        return {id: item.id, src: src, variant: item.variant, price: item.price, name: item.name}
                    })

                    state.list.push(...list)
                    state.columnNum = Math.ceil(state.list.length / columnSize)
                }))
                onLoadDone()
            }
        }).catch(err => {
            showNotification('错误', err)
            onLoadDone()
        })
    }

    loadProducts(() => {
    })

    onMount(() => {
        let isLoadingProducts = false
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight    // 可视区的高度

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop             // 滚动条滚动时，距离顶部的距离
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight    // 滚动条的总高度

            // console.log(`start loading, scrollTop=${scrollTop}, windowHeight=${windowHeight}, scrollHeight=${scrollHeight},
            // ${scrollTop + windowHeight} >= ${scrollHeight}, isLoadingProducts=${isLoadingProducts}`)

            if (scrollTop + windowHeight + 30 >= scrollHeight && !isLoadingProducts) {
                // console.log(`start loading, scrollTop=${scrollTop}, windowHeight=${windowHeight}, scrollHeight=${scrollHeight}`)
                isLoadingProducts = true
                loadProducts(() => isLoadingProducts = false)
            }
        })
    })

    return <>
        <Container>
            <For each={Array(products.columnNum)}>
                {(column, columnIndex) => (
                    <Row>{products.list.slice(columnIndex() * 3, (columnIndex() * 3) + 3).map((nft) => (
                        <Col xs={4}>
                            <Image src={nft.src} rounded fluid/>
                            <div className="d-grid gap-2">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Badge bg="info" class="align-self-center">{nft.id}</Badge>
                                    </div>
                                    <div>
                                        <Badge
                                            class="align-self-center justify-self-end bg-transparent border text-success">0.08
                                            ETH</Badge>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <div>
                                        <Badge
                                            class="align-self-center bg-transparent text-secondary">{nft.name}</Badge>
                                    </div>
                                </div>
                            </div>
                            <p></p>
                        </Col>
                    ))}
                    </Row>
                )}
            </For>
        </Container>
    </>
}