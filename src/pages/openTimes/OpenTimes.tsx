import React, {useEffect} from "react";
import "./OpenTimes.scss"
import { useAppDispatch } from "../../hooks/hooks";
import { fetchOpenTimesAsync } from "../../store/Facility/facilty.actions";
import { selectOpenTimeCalendar,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";
import { setOpenTimeCalendar } from "../../store/Facility/facilty.actions";
import { useSelector } from "react-redux";
import { item } from "../../store/ORData/ordata.types";
import OpenTimeRoomList from "../../components/openTimeRoomList/openTimeRoomList"
import { selectActiveRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { selectOpenTimeRoomList,selectOpenTimeDate} from "../../store/Facility/facility.selector";
import { setOpenTimeRoomList } from "../../store/Facility/facilty.actions";
import { selectUnit } from "../../store/Facility/facility.selector";
import OpenTimeCalendar from "../../components/openTimeCalendar/openTimeCalendar"




const OpenTimes = () => {


    const dispatch = useAppDispatch()



    const calendar = useSelector(selectOpenTimeCalendar)
    const roomData = useSelector(selectOpenTimeRoomHours)
    const activeRoomList = useSelector(selectActiveRoomLists)
    const selectedUnit = useSelector(selectUnit)
    const selectedDate = useSelector(selectOpenTimeDate)
    


    useEffect(()=> {
        if (selectedUnit && selectedDate) {
            dispatch(fetchOpenTimesAsync(selectedUnit, selectedDate))
        }
    },[selectedUnit,selectedDate])

    

    return (
    <div className='open-times'>
        Open times
        <OpenTimeRoomList />
        <OpenTimeCalendar calendarData={calendar}/>
    </div>)
}
export default OpenTimes;
