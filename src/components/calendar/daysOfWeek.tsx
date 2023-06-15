import React from "react";
import './daysOfWeek.scss'


interface DaysOfWeekProps {
    day: string
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({day}) => {
    return (
        <div className='day'>
            <h3>{day}</h3>
        </div>
    )
}
export default DaysOfWeek;