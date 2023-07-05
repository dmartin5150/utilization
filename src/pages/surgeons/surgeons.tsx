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
import { fetchStatSummarySuccessAsync, setStatSummary } from "../../store/Stats/stats.actions";
import StatSummaryPage from "../../components/statSummary/statsummary";
import { selectUnit } from "../../store/Facility/facility.selector";
import { StatSummaryResults } from "../../store/Stats/stats.types";
import { selectCurrentStatSummary } from "../../store/Stats/stats.selector";
import { SetStatSummary } from "../../store/Stats/stats.actions";


const Surgeons = () => {
    const [surgeonList, setSurgeonList] = useState<SurgeonMenuItem[]>([])
    const [currentStats, setCurrentStats] = useState<StatSummaryResults>()


    const dispatch = useAppDispatch()
    const selectedSurgeon = useSelector(selectStatSurgeon);
    const activeSurgeons = useSelector(selectActiveSurgeons)
    const statSummaryResults = useSelector(selectStatSummary)
    const currentSummary = useSelector(selectCurrentStatSummary)
    const unit = useSelector(selectUnit)





    useEffect(() => {
            if (activeSurgeons) {
                const curList: SurgeonMenuItem[] = activeSurgeons.map((surgeon) => {
                   return { id: surgeon.NPI,
                    value: surgeon.NPI,
                    label: surgeon.name}
                })
                setSurgeonList(curList)
            }
    },[activeSurgeons,unit])

    const handleSurgeonChanged = (option:SingleValue<SurgeonMenuItem>) => {
        const npi = (option as SurgeonMenuItem).value.toString();
        const name = (option as SurgeonMenuItem).label
        console.log('triggered')
        dispatch(fetchStatSummarySuccessAsync(npi, unit, name))
        dispatch(setStatSummary(statSummaryResults))

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
            <StatSummaryPage  statSummary={statSummaryResults} />
        </div>)
}

export default Surgeons;