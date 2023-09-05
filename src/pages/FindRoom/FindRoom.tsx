import React, {useEffect} from 'react';
import SurgeonSelector from "../../components/surgeonSelector/SurgeonSelector"
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { fetchRoomStatsAsync } from '../../store/Stats/stats.actions';
import { selectUnit } from "../../store/Facility/facility.selector";
import ProcedureSelector from "../../components/ProcedureSelector/ProcedureSelector"
import './findRoom.scss'

const FindRoom = () => {


    const dispatch = useAppDispatch();

    const unit = useSelector(selectUnit);

    useEffect(()=> {
        dispatch(fetchRoomStatsAsync(unit))
    },[])


    return (
        <div className='findroom'>
            <SurgeonSelector />
            <ProcedureSelector />
        </div>
    )
}
export default FindRoom;