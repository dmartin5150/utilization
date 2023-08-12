import React, {useEffect} from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchOpenTimesAsync } from "../../store/Facility/facilty.actions";
import { selectOpenTimeCalendar,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";
import { setOpenTimeCalendar } from "../../store/Facility/facilty.actions";
import { useSelector } from "react-redux";
import { item } from "../../store/ORData/ordata.types";
import OpenTimeRoomList from "../../components/openTimeRoomList/openTimeRoomList"

const OpenTimes = () => {


    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(fetchOpenTimesAsync('BH JRI', '2023-8-1'))
    },[])

    const calendar = useSelector(selectOpenTimeCalendar)
    const roomData = useSelector(selectOpenTimeRoomHours)

    useEffect(() => {
        console.log('updating calendar')
        // if(calendar) {
        //     dispatch(setOpenTimeCalendar(calendar))
        // }
    },[calendar])
    

    return (<div>
        Open times
        <OpenTimeRoomList />
    </div>)
}
export default OpenTimes;
