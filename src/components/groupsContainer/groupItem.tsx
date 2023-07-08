import React from "react";
import './groupItem.scss'


export type Group = {
    id: string;
    name:string;
}

interface GroupItemProps {
    group: Group;
    onSelectItem: (id:string)=>void;
}


const GroupItem: React.FC<GroupItemProps> = ({group, onSelectItem}) => {
    const {id, name} = group;

    const onGroupSelected = () => {
        onSelectItem(id);
    }

    return (
        <div className='group-item'>
            <label>{name}</label>
            <button onClick={onGroupSelected}>Select {name} Group</button>
        </div>
    )
}
export default GroupItem;