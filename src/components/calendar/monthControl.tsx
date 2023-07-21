import React, {FunctionComponent} from "react";
import './monthControl.scss'
import {default as ForwardArrow} from './forwardarrow.svg'
import {default as BackwardArrow} from './backarrow.svg'
// import ForwardArrow from '-!svg-react-loader!src/components/calendar/forwardarrow.svg'
import { MonthChangeDirection } from "./calendar";

type MonthControlProps = {
    month:string;
    onMonthChange: (direction:MonthChangeDirection) => void;
}


 const MonthControl: React.FC<MonthControlProps> = ({month, onMonthChange}) => {


    const handleBackarrowClick = () => {
        onMonthChange(MonthChangeDirection.BACKWARD)
    }

    const handleForwardarrowClick = () => {
        onMonthChange(MonthChangeDirection.FORWARD)
    }


    return (
        <div className="month-control">
            <div className="back-arrow">
            <a href="#" onClick={handleBackarrowClick} >
                    <div className='back-arrow-container'>
                        <img src={BackwardArrow}/>
                    </div>
            </a>
            </div> 
            <p className='month'>{month}</p>
            <div className="back-arrow">
                <a href="#" onClick={handleForwardarrowClick} >
                    <div className='back-arrow-container'>
                        <img src={ForwardArrow}/>
                    </div>
                </a>
            </div>
        </div>
    )
 }
 export default MonthControl;