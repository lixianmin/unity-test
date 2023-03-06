'use strict'
/********************************************************************
 created:    2023-03-04
 author:     lixianmin

 参考：https://mdbootstrap.com/snippets/standard/mdbootstrap/2964350#html-tab-view
 但没能完全抄过来

 Copyright (C) - All Rights Reserved
 *********************************************************************/

import {onMount} from "solid-js";
import {styled} from "solid-styled-components";

// styled的用法，与className好像不兼容，二选一
const BackButton = styled.button(`
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid red;
    background-color: red;
`)

export default function () {
    let backButton;

    onMount(() => {
        // When the user scrolls down 20px from the top of the document, show the button
        window.addEventListener('scroll', () => {
            const threshold = 20
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            if (scrollTop > threshold) {
                backButton.style.display = "block";
            } else {
                backButton.style.display = "none";
            }
        })

        backButton.addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    })

    return <>
        <BackButton type="button" ref={backButton}>
            <i style='color:white; font-size:1.2rem'>↑</i>
        </BackButton>
    </>
}