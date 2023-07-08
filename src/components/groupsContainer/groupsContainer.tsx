import React from 'react';
import './groupsContainer.scss';
import Card from '../card/card';
import { Group } from './groupItem';
import GroupItem from './groupItem';


interface GroupContainerProps  {
    title:string;
    groups: Group[];
    onSelectItem: (id:string)=> void;
}


const GroupContainer: React.FC<GroupContainerProps> = ({title, groups, onSelectItem}) => {
    return(
        <Card>
        <div className='group-container'>
            <h2>{title}</h2>
            {groups.map((group,idx)=> <GroupItem key={idx} group={group} onSelectItem={onSelectItem} />)}
        </div>
        </Card>
    )

}
export default GroupContainer;