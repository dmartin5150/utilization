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
import { selectOpenTimeRoomList,selectOpenTimeDate,selectOpenTimeDisplayData} from "../../store/Facility/facility.selector";
import { setOpenTimeRoomList } from "../../store/Facility/facilty.actions";
import { selectUnit } from "../../store/Facility/facility.selector";
import OpenTimeCalendar from "../../components/openTimeCalendar/openTimeCalendar"
import OpenTimeDisplay from "../../components/openTimeDisplay/openTimeDisplay"
import { selectDataCurrentDate } from "../../store/ORData/selectors/ordata.selector";





const OpenTimes = () => {


    const dispatch = useAppDispatch()



    const calendar = useSelector(selectOpenTimeCalendar)
    const roomData = useSelector(selectOpenTimeRoomHours)
    const activeRoomList = useSelector(selectActiveRoomLists)
    const selectedUnit = useSelector(selectUnit)
    const selectedDate = useSelector(selectOpenTimeDate)
    const openTimes = useSelector(selectOpenTimeDisplayData)
    const displayData = useSelector(selectOpenTimeDisplayData)
    const dataCurrentDate = useSelector(selectDataCurrentDate)



    useEffect(() => {
        // console.log('open times', openTimes)
    },[openTimes, selectedDate] )


    useEffect(()=> {
        dispatch(setOpenTimeCalendar(calendar))
    },[dataCurrentDate])

    useEffect(()=> {
        if (selectedUnit && dataCurrentDate) {
            const curDate = `${dataCurrentDate.getFullYear()}-${dataCurrentDate.getMonth() + 1}-${dataCurrentDate.getDate()}`
            console.log('curDate', curDate)
            dispatch(fetchOpenTimesAsync(selectedUnit,curDate))
        }
    },[selectedUnit,dataCurrentDate])

    useEffect(()=> {
        if (roomData) {
            console.log('printing room data', roomData)
        }
        
    },[roomData])

    useEffect(()=> {
        if (calendar) {
            console.log('printing room data', calendar)
        }

    },[calendar])
    

    return (
    <div className='open-times'>
        <OpenTimeRoomList />
        <OpenTimeCalendar calendarData={calendar}/>
        <OpenTimeDisplay openTimeData={displayData} />
    </div>)
}
export default OpenTimes;
