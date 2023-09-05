import React, {useState, useEffect} from 'react';
import SelectorList from '../SelectorList/SelectorList';
import { SelectorMenuItem } from '../../store/Stats/stats.types';
import {SingleValue} from "react-select";
import {selectProcedures} from "../../store/Stats/stats.selector"
import { useSelector } from "react-redux";
import "./ProcedureSelector.scss"


const ProcedureSelector = () => {

    const [procedureList, setProcedureList] = useState<SelectorMenuItem[]>([])
    const [selectedProcedure, setSelectedProcedure] = useState<SingleValue<SelectorMenuItem>>({id:"0", value:"", label:""})

    const curProcedures = useSelector(selectProcedures)

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
        </div>
    )
}

export default ProcedureSelector