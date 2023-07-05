import React, {useState, useEffect} from "react";
import StatSummary from "../../components/statSummary/statsummary";
import "./surgeons.scss"
import {SingleValue} from "react-select";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { SurgeonMenuItem } from "../../store/Stats/stats.types";
import { selectStatSurgeon } from "../../store/Stats/stats.selector";
import { selectActiveSurgeons } from "../../store/ORData/selectors/ordata.selector";
import SelectorList from "../../components/SelectorList/SelectorList";
import { selectStatSummary } from "../../store/Stats/stats.selector";
import { fetchStatSummarySuccessAsync } from "../../store/Stats/stats.actions";

const Surgeons = () => {
    const [surgeonList, setSurgeonList] = useState<SurgeonMenuItem[]>([])


    const dispatch = useAppDispatch()
    const selectedSurgeon = useSelector(selectStatSurgeon);
    const activeSurgeons = useSelector(selectActiveSurgeons)
    const statSummary = useSelector(selectStatSummary)


    useEffect(() => {
            if (activeSurgeons) {
                const curList: SurgeonMenuItem[] = activeSurgeons.map((surgeon) => {
                   return { id: surgeon.NPI,
                    value: surgeon.NPI,
                    label: surgeon.name}
                })
                setSurgeonList(curList)
            }
    },[activeSurgeons])

    const handleSurgeonChanged = (option:SingleValue<SurgeonMenuItem>) => {
        const npi = (option as SurgeonMenuItem).value.toString();
        dispatch(fetchStatSummarySuccessAsync(npi))

    }


    return (
        <div className="surgeons">or
            <div className="selector">
                <SelectorList 
                    title={'Select Surgeon'} 
                    selectedOption={selectedSurgeon} 
                    optionList={surgeonList}
                    onChange={handleSurgeonChanged}
                    />
            </div>
            <StatSummary  statSummary={statSummary} />
        </div>)
}

export default Surgeons;