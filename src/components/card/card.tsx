import React from "react";
import "./card.scss"

interface CardProps {
        className?: string;
        children:React.ReactNode;
}


const Card: React.FC<CardProps>= ({className, children}) => {
    return (
        <div className ={`card ${className}`}>
            {children}
        </div>
    )
}
export default Card;