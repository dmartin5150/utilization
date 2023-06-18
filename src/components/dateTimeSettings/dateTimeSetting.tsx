import React, {useState}  from "react";
import Dropdown from "../dropdown/DropDown";
import { DropDownBox } from "../dropdown/DropDown";
import './dateTimeSetting.scss'




// const primeTimeStartMenu= ['6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM']
// const primeTimeStartDD: DropDownBox = {
//     title: "Prime Time Start",
//     selected: "7:00 AM",
//     menuItems: primeTimeStartMenu,
//     disabled: false,
//   }

 
const DateTimeSetting =  () => {
    const [startTime, setStartTime] = useState('7:00 AM')
    const [endTime, setEndTime] = useState('5:00 PM')
    const primeTimeStartMenu= ['6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM']
    const primeTimeEndMenu= ['3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM']
    const setPrimeTimeStart = (time:string):void => {
        setStartTime(time)
    }

    const setPrimeTimeEnd = (time:string):void => {
        setEndTime(time)
    }


    return(
        <div className="dtsetting">
            <Dropdown 
                title={"Start"}
                selected={startTime}
                menuItems={primeTimeStartMenu}
                disabled={false}
                onSelectItem={setPrimeTimeStart}
            />
            <Dropdown 
                title={"End"}
                selected={endTime}
                menuItems={primeTimeEndMenu}
                disabled={false}
                onSelectItem={setPrimeTimeEnd}
            />           
             <Dropdown 
                title={"Min Date"}
                selected={'6/1/2023'}
                menuItems={[]}
                disabled={true}
            />
            <Dropdown 
                title={"Max Date"}
                selected={'6/30/2023'}
                menuItems={[]}
                disabled={true}
            />
        </div>
    )
} 
export default DateTimeSetting;