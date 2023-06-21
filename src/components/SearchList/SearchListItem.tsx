import React from "react";
import './SearchListItem.scss'

import { item } from "../ListSelector/ListItem";



interface SearchListItemProps {
    item:item;
    onItemChanged: (id:string)=>void;
}

const SearchListItem: React.FC<SearchListItemProps> = ({item, onItemChanged}) => {
    const {id, name} = item


    const handleListChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement>) => {
        console.log('handle')
        if (event.target as HTMLAnchorElement) {
            const id = (event.target as HTMLAnchorElement).id;
           onItemChanged(id)
       }
    }

    return (
        <div className='list-items'>
            <label className={"list-item"}>{name}</label>
            <a href="#" id={id.toString()}onClick={handleListChange}>X</a>
        </div>
    )
}
export default SearchListItem;