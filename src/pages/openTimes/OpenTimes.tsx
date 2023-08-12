import React, {useEffect} from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchOpenTimesAsync } from "../../store/Facility/facilty.actions";
import { selectOpenTimeCalendar,selectOpenTimeRoomHours} from "../../store/Facility/facility.selector";
import { setOpenTimeCalendar } from "../../store/Facility/facilty.actions";
import { useSelector } from "react-redux";
import { item } from "../../store/ORData/ordata.types";
import OpenTimeRoomList from "../../components/openTimeRoomList/openTimeRoomList"
import { selectActiveRoomLists } from "../../store/ORData/selectors/ordata.selector";
import { selectOpenTimeRoomList,} from "../../store/Facility/facility.selector";
import { setOpenTimeRoomList } from "../../store/Facility/facilty.actions";
import { selectUnit } from "../../store/Facility/facility.selector";




const OpenTimes = () => {


    const dispatch = useAppDispatch()



    const calendar = useSelector(selectOpenTimeCalendar)
    const roomData = useSelector(selectOpenTimeRoomHours)
    const activeRoomList = useSelector(selectActiveRoomLists)
    const selectedUnit = useSelector(selectUnit)

    useEffect(() => {
        console.log('updating calendar')
        // if(calendar) {
        //     dispatch(setOpenTimeCalendar(calendar))
        // }
    },[calendar])

    useEffect(()=> {
        if (selectedUnit) {
            dispatch(fetchOpenTimesAsync(selectedUnit, '2023-8-1'))
        }
    },[selectedUnit])
    // useEffect(()=> {
    //     if (activeRoomList && activeRoomList.length !== 0) {
    //         dispatch(setOpenTimeRoomList([...roomData]))
    //     }

    // },[activeRoomList])
    
    

    return (<div>
        Open times
        <OpenTimeRoomList />
    </div>)
}
export default OpenTimes;
