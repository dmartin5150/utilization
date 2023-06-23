import React from "react";
import Select,{SingleValue} from "react-select";
import Card from "../card/card";
import "./DualSelectors.scss";




export type Option = {
    label: string;
    value: string;
}

export type SingleSelector<T extends Option> = {
    title: string
    selectedOption: SingleValue<T>;
    optionList: T[];
    onChange: (option: SingleValue<T>)=>void;
}

interface DualSelectorProps<T extends Option, U extends Option> {
    title: string;
    selector1: SingleSelector<T>;
    selector2: SingleSelector<U>;
}


function DualSelectors <T extends Option, U extends Option >({title, selector1, selector2}: React.PropsWithChildren<DualSelectorProps<T, U>>) {

    const handleSelector1 = (option: SingleValue<T> )  => {
        if (option) {
            selector1.onChange(option)
            console.log(option.value)
        }
    }

    const handleSelector2 = (option: SingleValue<U>) => {
        selector2.onChange(option);
    }

    return( 
    <Card className={'Card'}>
       <div className='selectors'>
            <h2>{title}</h2>
            <div className='selector'>
                <label>{selector1.title}</label>
                <Select 
                    value={selector1.selectedOption} 
                    options={selector1.optionList} 
                    onChange={handleSelector1} 
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '15px',
                        }),
                      }}
                    
                    />
            </div>
            <div className='selector'>
                <label>{selector2.title}</label>
                <Select 
                    value={selector2.selectedOption} 
                    options={selector2.optionList} 
                    onChange={handleSelector2}
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '15px',
                        }),
                      }}
                    />
            </div>
       </div>
       </Card>
    )
}
export default DualSelectors;