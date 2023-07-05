import React, {useState, useEffect} from "react";
import StatSummary from "../../components/statSummary/statsummary";
import "./surgeons.scss"
import { SingleSelector } from "../../components/SelectorList/SelectorList";
import { SurgeonList } from "../../store/ORData/ordata.types";
import Select,{SingleValue} from "react-select";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { SurgeonMenuItem } from "../../store/Stats/stats.types";
import { selectStatSurgeon } from "../../store/Stats/stats.selector";
import { selectActiveSurgeons } from "../../store/ORData/selectors/ordata.selector";
import SelectorList from "../../components/SelectorList/SelectorList";


const Surgeons = () => {
    const [surgeonList, setSurgeonList] = useState<SurgeonMenuItem[]>([])


    const dispatch = useAppDispatch()
    const selectedSurgeon = useSelector(selectStatSurgeon);
    const activeSurgeons = useSelector(selectActiveSurgeons)


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
        const surgeon = (option as SurgeonMenuItem).value.toString();
        console.log(surgeon)
        // setSelectedUnit(option)
        // dispatch(setUnit(unitName))
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
            <StatSummary />
        </div>)
}

export default Surgeons;