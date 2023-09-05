import React, {useState, useEffect} from 'react';
import SelectorList from '../SelectorList/SelectorList';
import { SelectorMenuItem } from '../../store/Stats/stats.types';
import {SingleValue} from "react-select";
import {selectProcedures, selectRoomStats} from "../../store/Stats/stats.selector"
import { useSelector } from "react-redux";
import "./ProcedureSelector.scss"


const ProcedureSelector = () => {

    const [procedureList, setProcedureList] = useState<SelectorMenuItem[]>([])
    const [selectedProcedure, setSelectedProcedure] = useState<SingleValue<SelectorMenuItem>>({id:"0", value:"", label:""})
    const [procedureDuration, setProcedureDuration] = useState(0)

    const curProcedures = useSelector(selectProcedures)
    const curRoomStats = useSelector(selectRoomStats)

    const handleProcedureChanged = (procedure: SingleValue<SelectorMenuItem>) => {
        setSelectedProcedure(procedure)
        console.log('Surgeon Changed')
    }

    useEffect(() => {
        console.log('surgeons', curProcedures)
        if (curProcedures) {
            const curList: SelectorMenuItem[] = curProcedures.map((procedure,idx) => {
               return { id: idx.toString(),
                value: procedure,
                label: procedure}
            })
            setProcedureList(curList)
            setSelectedProcedure(curList[0])
        }   
    },[curProcedures])

    useEffect(() => {
        if (selectedProcedure && selectedProcedure.value != ""  &&  curRoomStats.length !== 0) {
            const curProcedure = curRoomStats.filter((roomStat) => roomStat.procedureName == selectedProcedure.value)
            console.log('curProcedure', curProcedure)
            if (curProcedure[0].duration) {
                setProcedureDuration(curProcedure[0].duration)
            }
            
        }

    },[selectedProcedure, curRoomStats])


    const handleDurationChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value){
            setProcedureDuration(0)
            return;
        }
        if (e.target.value[0]  === '0') {
            e.target.value= e.target.value.substring(1)
        } 
        setProcedureDuration(parseInt(e.target.value))
    }


    return(
        <div className='procedure_selector'>
            <div className="selector">
                <SelectorList
                    title={'Select Procedure'} 
                    showBorder={false}
                    selectedOption={selectedProcedure} 
                    optionList={procedureList}
                    onChange={handleProcedureChanged}
                    />
            </div>
            <div className='searchBox'>
                <h2>Duration</h2>
                <input value={procedureDuration} type="number" min={0}
                    onChange={handleDurationChanged}
                />
            </div>
        </div>
    )
}

export default ProcedureSelector