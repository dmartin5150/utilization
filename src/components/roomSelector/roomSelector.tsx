import React from "react";
import "./roomSelector.scss"
import DropdownSelect from "../dropdownselect/DropDownSelect";


interface RoomSelectorProps {
    units: string[];
    rooms: string[];
    selectedRooms: string[];
    selectedSurgeons: string[]
}


const RoomSelector: React.FC<RoomSelectorProps> = ({units, rooms, selectedRooms, selectedSurgeons}) => {
    return (
        <div className="room-selector">
            <div className="unit">
                <h2>{"Unit"}</h2>
                <DropdownSelect 
                    title={"Units"}
                    selected={"BH JRI"}
                    menuItems={units}
                    disabled={false}
                />
            </div>
        </div>
    )
}
export default RoomSelector;