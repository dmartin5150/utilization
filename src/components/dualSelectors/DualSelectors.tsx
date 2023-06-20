import React from "react";
import Select,{SingleValue} from "react-select";


export type Option = {
    label: string;
    value: string;
}

export type SingleSelector<T> = {
    title: string
    selectedOption: T;
    optionList: T[];
    onChange: (option: SingleValue<T>)=>void;
}

// interface DualSelectorProps<T> {
//     selector1: SingleSelector<T>;
//     // selector2: SingleSelector<U>;
// }

interface DualSelectorProps<T> {
    selectedOption: T;
    optionList: T[]
}

function DualSelectors <T, U extends Option>({selectedOption, optionList}: React.PropsWithChildren<DualSelectorProps<T>>) {

    const handleSelector1 = (option: SingleValue<T> )  => {
        console.log(option)
    }

    // const handleSelector2 = (option: SingleValue<U>) => {
    //     selector2.onChange(option);
    // }

    return( 
       <div className='dual-selector'>
            <div className='first-selector'>
                <label>{'Test'}</label>
                <Select value={selectedOption} options={optionList} onChange={handleSelector1} />
            </div>
            {/* <div className='second-selector'>
                <label>{selector2.title}</label>
                <Select value={selector2.selectedOption} options={selector2.optionList} onChange={handleSelector2}/>
            </div> */}
       </div>
    )
}
export default DualSelectors;