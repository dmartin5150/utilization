import React from "react";
import Card from "../card/card";
import "./DualSelectors.scss";
import { SingleSelector, Option } from "../SelectorList/SelectorList";
// import {SingleSelector, Option} from "../SelectorList/SelectorList";
import SelectorList from "../SelectorList/SelectorList";


interface DualSelectorProps<T extends Option, U extends Option> {
    title: string;
    selector1: SingleSelector<T>;
    selector2: SingleSelector<U>;
}

function DualSelectors <T extends Option, U extends Option >({selector1, selector2}: React.PropsWithChildren<DualSelectorProps<T, U>>) {

    return( 
    <Card className={'Card'}>
       <div className='selectors'>
       <div className='selector'>   
                <label>{selector1.title}</label>
                <SelectorList 
                    selectedOption={selector1.selectedOption} 
                    showBorder={false}
                    optionList={selector1.optionList} 
                    onChange={selector1.onChange}
                    />
            </div>
            <div className='selector'>
                <label>{selector2.title}</label>
                <SelectorList
                    selectedOption={selector2.selectedOption} 
                    showBorder={false}
                    optionList={selector2.optionList} 
                    onChange={selector2.onChange}
                    />
            </div>
       </div>
       </Card>
    )
}
export default DualSelectors;