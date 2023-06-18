import React from "react";
import './ListItem.scss'


export type item = {
        id: number;
        name: string;
        selected: boolean;
}

interface ListItemProps {
    item:item;
    onItemChanged: (id:string)=>void;
}

const ListItem: React.FC<ListItemProps> = ({item, onItemChanged}) => {
    const {id, name, selected} = item

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void =>  {
        onItemChanged(event.target.id)
    }

    return (
        <div className='room'>
            <label className={"checkbox"}>
                <input
                    id={id.toString()}
                    type="checkbox"
                    checked={selected ? true: false}
                    onChange={handleChange}
                />{name}</label>
        </div>
    )
}
export default ListItem;