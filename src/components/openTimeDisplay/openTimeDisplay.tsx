import React from "react";
import "./openTimeDisplay.scss"
import { OpenTimeDisplayObject } from "../../store/Facility/facility.types";
import OpenTimePanel from "./openTimePanel";


export interface OpenTimeDisplayProps {
    openTimeData : OpenTimeDisplayObject[];
}



const OpenTimeDisplay: React.FC<OpenTimeDisplayProps>  = ({openTimeData}) => {
    return (
        <div className='open-time_display'>
            <div className='open-time-display--room'>
                <h3 className='column-heading'>Room</h3>
            </div>
            <div className='open-time-display--header'>
                <h3 className='column-heading'>Name</h3>
                <h3 className='column-heading'>Start</h3>
                <h3 className='column-heading'>End</h3>
                <h3 className='column-heading'>Total</h3>
                <h3 className='column-heading'>Release</h3>
            </div>
            {openTimeData.map((openTime, idx) => {
                return(
                    <div className='open-time-display--room'>
                        <h3 className='column-heading'>{openTime.room}</h3>
                            return <OpenTimePanel key={idx} data={openTime.data} />
                    </div>)})}
        </div>
    )
}
export default OpenTimeDisplay