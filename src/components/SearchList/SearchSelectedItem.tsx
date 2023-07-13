import React from "react";
import './SearchSelectedItem.scss'


export type item = {
        id: number;
        name: string;
        selected: boolean;
}

interface SearchSelectedItemProps {
    item:item;
    onItemChanged: (id:string)=>void;
}

const SearchSelectedItem: React.FC<SearchSelectedItemProps> = ({item, onItemChanged}) => {
    const {id, name} = item


    const handleListChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement>) => {
        // console.log('handle')
        if (event.target as HTMLAnchorElement) {
            const id = (event.target as HTMLAnchorElement).id;
           onItemChanged(id)
       }
    }
    return (
        <div className='selected-items'>
            <label className={"selected-item"}>{name}</label>
            <a href="#" id={id.toString()}onClick={handleListChange}>X</a>
        </div>
    )
}
export default SearchSelectedItem;