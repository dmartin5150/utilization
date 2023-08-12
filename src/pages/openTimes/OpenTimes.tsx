import React, {useEffect} from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchOpenTimesAsync } from "../../store/Facility/facilty.actions";
import { selectOpenTimeCalendar} from "../../store/Facility/facility.selector";
import { setOpenTimeCalendar } from "../../store/Facility/facilty.actions";
import { useSelector } from "react-redux";


const OpenTimes = () => {


    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(fetchOpenTimesAsync('BH JRI', '2023-8-1'))
    },[])

    const calendar = useSelector(selectOpenTimeCalendar)

    useEffect(() => {
        console.log('updating calendar')
        if(calendar) {
            dispatch(setOpenTimeCalendar(calendar))
        }
    },[calendar])
    

    return (<div>
        Open times
    </div>)
}
export default OpenTimes;
