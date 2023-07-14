import React, {useState} from 'react';
import Select,{SingleValue} from "react-select";
import "./SelectorList.scss";


export type Option = {
    label: string;
    value: string;
}


export type SingleSelector<T extends Option> = {
    title?: string
    isDisabled?:boolean
    selectedOption: SingleValue<T>;
    optionList: T[];
    onChange: (option: SingleValue<T>)=>void;
}


function SelectorList <T extends Option >({title,isDisabled, selectedOption, optionList,onChange}: React.PropsWithChildren<SingleSelector<T>>) {

    const [selectedValue, setSelectedValue]=useState<SingleValue<T>>(selectedOption)

    const handleSelector = (option: SingleValue<T> )  => {
        if (option) {
            onChange(option)
            console.log('option List', optionList)
            setSelectedValue(option)
        }
    }

    return (
        <div className="single-selector">
            {title && <h2>{title}</h2> }
            <div className='selector'>
                <label>{title}</label>
                <Select 
                    isDisabled={isDisabled}
                    value={selectedValue} 
                    options={optionList} 
                    onChange={handleSelector} 
                    styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '15px',
                        }),
                      }}   
                    />
            </div>
        </div>
    )


}
export default SelectorList;