import React from "react";
import './SearchListCheckboxItem.scss'

import { item } from "../ListSelector/ListItem";



interface SearchListCheckboxItemProps {
    item:item;
    onItemChanged: (id:string)=>void;
}

const SearchListCheckboxItem: React.FC<SearchListCheckboxItemProps> = ({item, onItemChanged}) => {
    const {id, name, selected} = item


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement>) => {
        console.log('handle')
        if (event.target as HTMLAnchorElement) {
            const id = (event.target as HTMLAnchorElement).id;
           onItemChanged(id)
       }
    }
    return (
        <div className='select-list-items'>
        <label className={"checkbox"}>
            <input
                id={id.toString()}
                type="checkbox"
                checked={selected ? true: false}
                onChange={handleCheckboxChange}
            />{name}</label>
        </div>
    )
}
export default SearchListCheckboxItem;