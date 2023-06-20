import React from "react";
import Select,{SingleValue} from "react-select";


export type Option = {
    label: string;
    value: string;
}

export type DualSelector<T extends Option> = {
    title: string
    selectedOption: T;
    optionList: T[];
    onChange: (option: SingleValue<T>)=>void;
}

interface DualSelectorProps<T extends Option, U extends Option> {
    selector1: DualSelector<T>;
    selector2: DualSelector<U>;
}

function DualSelectors <T extends Option, U extends Option>({selector1, selector2}: React.PropsWithChildren<DualSelectorProps<T,U>>) {

    const handleSelector1 = (option: SingleValue<T> )  => {
        selector1.onChange(option);
    }

    const handleSelector2 = (option: SingleValue<U>) => {
        selector2.onChange(option);
    }

    return( 
       <div className='dual-selector'>
            <div className='first-selector'>
                <label>{selector1.title}</label>
                <Select value={selector1.selectedOption} options={selector1.optionList} onChange={handleSelector1} />
            </div>
            <div className='second-selector'>
                <label>{selector2.title}</label>
                <Select value={selector2.selectedOption} options={selector2.optionList} onChange={handleSelector2}/>
            </div>
       </div>
    )
}
export default DualSelector;