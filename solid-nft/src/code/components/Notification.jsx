'use strict'
import {Modal} from "solid-bootstrap";
import {createStore} from "solid-js/store";

/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 Copyright (C) - All Rights Reserved
 *********************************************************************/

const [me, setMe] = createStore({visible: false, title: '', body: ''})

export function showNotification(title, body) {
    setMe({visible: true, title: title, body: body})
}

export default function Notification() {
    return <>
        <Modal
            show={me.visible}
            onHide={() => setMe({visible: false})}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {me.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {me.body}
            </Modal.Body>
        </Modal>
    </>
}