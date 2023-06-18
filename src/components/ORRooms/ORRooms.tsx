import React from "react";
import "./ORRooms.scss"

import { ORRoom } from "./ORRoomItem";
import ORRoomItem from "./ORRoomItem";


interface ORRoomsProps {
    unitName: string;
    roomList: ORRoom[];
    onRoomChanged: (id:string)=>void;
}
const ORRooms: React.FC<ORRoomsProps> = ({unitName,roomList, onRoomChanged}) => {

    const handleAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
    }

    return(
        <div className="ORRooms">
            <div className="unit">
                <h1>JRI</h1>
            </div>
            <div className="all">
                <label className={"checkbox-all"}>
                        <input
                            type="checkbox"
                            checked={true}
                            onChange={handleAllChanged}
                        />
                            ALL
                    </label>
            </div>
            <ul className="rooms">
            { roomList.map((room) => {
                    return <li key={room.id}>
                        <ORRoomItem 
                        room={room}
                        onRoomChanged={onRoomChanged}
                    /></li>
                })}
            </ul>
        </div>
    )
}
export default ORRooms;