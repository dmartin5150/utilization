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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement>) => {
        console.log('handle')
        if (event.target as HTMLInputElement) {
            console.log('returning check')
            const id = (event.target as HTMLInputElement).id;
            onItemChanged(id)
        }

    }

    const handleListChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLAnchorElement>) => {
        console.log('handle')
        if (event.target as HTMLAnchorElement) {
            const id = (event.target as HTMLAnchorElement).id;
           onItemChanged(id)
       }
    }

    return (
        (displayType === ITEM_DISPLAY_TYPE.checkbox) ? 
            <div className='room'>
            <label className={"checkbox"}>
                <input
                    id={id.toString()}
                    type="checkbox"
                    checked={selected ? true: false}
                    onChange={handleCheckboxChange}
                />{name}</label>
            </div>  :
            <div className='list-items'>
                <label className={"list-item"}>{name}</label>
                <a href="#" id={id.toString()}onClick={handleListChange}>X</a>
        </div>
    )
}
export default ListItem;