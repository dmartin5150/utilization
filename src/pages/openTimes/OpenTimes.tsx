import React, {useEffect} from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchOpenTimesAsync } from "../../store/Facility/facilty.actions";

const OpenTimes = () => {


    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(fetchOpenTimesAsync('BH JRI', '2023-8-1'))
    })



    return (<div>
        Open times
    </div>)
}
export default OpenTimes;
