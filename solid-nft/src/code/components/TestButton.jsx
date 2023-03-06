import {styled} from "solid-styled-components";

const Icon = styled.i`
    position: fixed;
    bottom: 40px;
    right: 40px;
    color: red;
    font-size: 96px;
`;

export default function () {
    return (
        <div>
            <i>↑</i>
        </div>
    );
}
