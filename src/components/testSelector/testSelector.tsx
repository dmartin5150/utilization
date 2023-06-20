import React from "react";
import Select,{SingleValue} from "react-select";

type Option = {
    label: string;
    value: string;
}

interface TestSelectorProps<T extends Option> {
    selectedOption: SingleValue<T>;
    optionList: T[]
}

function TestSelector <T extends Option>({selectedOption, optionList}: React.PropsWithChildren<TestSelectorProps<T>>) {

    const handleSelector1 = (option: SingleValue<T> )  => {
        console.log(option)
    }

    return( 
       <div className='dual-selector'>
            <div className='first-selector'>
                <label>{'Test'}</label>
                <Select value={selectedOption} options={optionList} onChange={handleSelector1} />
            </div>
       </div>
    )
}
export default TestSelector;