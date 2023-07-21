import React, {FunctionComponent} from "react";
import './monthControl.scss'
import {default as ForwardArrow} from './forwardarrow.svg'
import {default as BackwardArrow} from './backarrow.svg'
// import ForwardArrow from '-!svg-react-loader!src/components/calendar/forwardarrow.svg'
import { MonthChangeDirection } from "./calendar";
import classnames from 'classnames';

import { DataDateRange } from "./calendar";



type MonthControlProps = {
    dateRange: DataDateRange;
    onMonthChange: (direction:MonthChangeDirection) => void;
}


 const MonthControl: React.FC<MonthControlProps> = ({dateRange, onMonthChange}) => {

    const month = dateRange.currentDate.toLocaleString('default', { month: 'long' });
    let disableBackButton = false;
    if (dateRange.currentDate <= dateRange.startDate) {
        disableBackButton = true;
    }
    let disableForwardButton = false;
    if (dateRange.currentDate >= dateRange.endDate) {
        disableForwardButton = true; 
    }

    const handleBackarrowClick = () => {
        onMonthChange(MonthChangeDirection.BACKWARD)
    }

    const handleForwardarrowClick = () => {
        onMonthChange(MonthChangeDirection.FORWARD)
    }


    return (
        <div className="month-control">
            <div className="back-arrow">
            <a href="#"  
            className={classnames({disabled:disableBackButton})}
            onClick={handleBackarrowClick} >
                    <div className='back-arrow-container'>
                        <img src={BackwardArrow}/>
                    </div>
            </a>
            </div> 
            <p className='month'>{month}</p>
            <div className="back-arrow">
                <a href="#" 
                    className={classnames({disabled:disableForwardButton})}
                   onClick={handleForwardarrowClick} >
                    <div className='back-arrow-container'>
                        <img src={ForwardArrow}/>
                    </div>
                </a>
            </div>
        </div>
    )
 }
 export default MonthControl;