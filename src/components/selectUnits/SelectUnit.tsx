import React from "react";
import Select,{SingleValue} from "react-select";
import { Unit } from "../../pages/settings/settings";
import ListSelector from "../ListSelector/ListSelector";
import { ITEM_DISPLAY_TYPE, item } from "../ListSelector/ListItem";
import Card from "../card/card";
import './SelectUnit.scss';

export type UnitSelector = {
    value: SingleValue<Unit>;
    handleUnitChange: (unit: SingleValue<Unit>) => void;
    options: Unit[]
}


export type UnitListSelector = {
    rooms: item[];
    allRoomsSelected:boolean;
    onRoomChanged: (id:string)=>void;
    onAllRoomsSelected:()=>void;
    onClearAllRooms:()=>void
}


interface SelectUnitProps {
    title: string;
    unitSelector: UnitSelector;
    unitListSelector: UnitListSelector;
}


const SelectUnit:React.FC<SelectUnitProps> = ({title, unitSelector, unitListSelector}) => {
    const {value, handleUnitChange, options} = unitSelector;
    const {rooms, allRoomsSelected,onRoomChanged,onAllRoomsSelected,onClearAllRooms} = unitListSelector;
 return (
    <Card>
            <div className='select-unit'>
                <div className='units'>
                    <h2>{title}</h2>
                    <Select 
                        value={value} 
                        onChange={handleUnitChange}  
                        options={options} 
                        styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: '15px',
                            }),
                          }}
                        />
                </div>
                <div className='unit-list-selector'>
                    <ListSelector 
                            itemList={rooms}
                            allItemsSelected={allRoomsSelected}
                            displayType={ITEM_DISPLAY_TYPE.checkbox}
                            onItemChanged={onRoomChanged}
                            onAllItemsSelected={onAllRoomsSelected}
                            onClearAllSelected={onClearAllRooms}
                        /> 
                </div>

            </div>
        </Card>
   
 );

}
export default SelectUnit;