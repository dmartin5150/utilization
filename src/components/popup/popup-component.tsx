import React, {ReactNode} from "react";
import "./popup-component.scss";
import classnames from "classnames";

type Props = {
    className: string,
    children:ReactNode
}

const Popup: React.FC<Props> = (props) => {
    const {className} = props;
    return (
        <div className ={classnames('popup',{[className]: className})} >
            {props.children}
        </div>
    )
}
export default Popup;