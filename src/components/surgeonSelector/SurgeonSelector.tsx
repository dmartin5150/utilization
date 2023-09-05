import React, {useEffect, useState}  from "react";
import SelectorList from "../SelectorList/SelectorList";
import { useSelector } from "react-redux";
import { selectActiveSurgeons } from "../../store/ORData/selectors/ordata.selector";
import { SurgeonMenuItem } from "../../store/Stats/stats.types";
import {SingleValue} from "react-select";
import "./surgeonSelector.scss"



// interface SurgeonSelectorProps {
//     surgeonList: SurgeonMenuItem[],
// }

const SurgeonSelector = () => {

    const [surgeonList, setSurgeonList] = useState<SurgeonMenuItem[]>([])
    const [selectedSurgeon, setSelectedSurgeon] = useState<SingleValue<SurgeonMenuItem>>({id:"0", value:"", label:""})
    const activeSurgeons = useSelector(selectActiveSurgeons)


    useEffect(() => {
        console.log('surgeons', activeSurgeons)
        if (activeSurgeons) {
            const curList: SurgeonMenuItem[] = activeSurgeons.map((surgeon) => {
               return { id: surgeon.NPI,
                value: surgeon.NPI,
                label: surgeon.name}
            })
            setSurgeonList(curList)
            setSelectedSurgeon(curList[0])
        }   
    },[activeSurgeons])

    const handleSurgeonChanged = (surgeon: SingleValue<SurgeonMenuItem>) => {
        setSelectedSurgeon(surgeon)
        console.log('Surgeon Changed')
    }

    return(
        <div className="surgeonSelector">
            <div className="selector">
                <SelectorList 
                    title={'Select Surgeon'} 
                    showBorder={false}
                    selectedOption={selectedSurgeon} 
                    optionList={surgeonList}
                    onChange={handleSurgeonChanged}
                    />
            </div>
        </div>)
}

export default SurgeonSelector