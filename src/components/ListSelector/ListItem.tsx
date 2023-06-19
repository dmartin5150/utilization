import React from "react";
import './ListItem.scss'

export enum ITEM_DISPLAY_TYPE {
    checkbox = "checkbox",
    list = "list"
}


export type item = {
        id: number;
        name: string;
        selected: boolean;
}

interface ListItemProps {
    item:item;
    displayType: ITEM_DISPLAY_TYPE;
    onItemChanged: (id:string)=>void;
}

const ListItem: React.FC<ListItemProps> = ({item, displayType, onItemChanged}) => {
    const {id, name, selected} = item

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void =>  {
        onItemChanged(event.target.id)
    }

    return (
        (displayType === ITEM_DISPLAY_TYPE.checkbox) ? 
            <div className='room'>
            <label className={"checkbox"}>
                <input
                    id={id.toString()}
                    type="checkbox"
                    checked={selected ? true: false}
                    onChange={handleChange}
                />{name}</label>
            </div>  :
            <div className='list-items'>
                <label className={"list-item"}>{name}</label>
                <a href="#">Delete</a>
        </div>
    )
}
export default ListItem;