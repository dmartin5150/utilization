import React from "react";
import './ORRoomItem.scss'


export type ORRoom = {
        id: number;
        roomName: string;
        selected: boolean;
}

interface ORRoomProps {
    room:ORRoom;
    onRoomChanged: (id:string)=>void;
}

const ORRoomItem: React.FC<ORRoomProps> = ({room, onRoomChanged}) => {
    const {id, roomName, selected} = room

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void =>  {
        onRoomChanged(event.target.id)
    }

    return (
        <div className='room'>
            <label className={"checkbox"}>
                <input
                    id={id.toString()}
                    type="checkbox"
                    checked={selected ? true: false}
                    onChange={handleChange}
                />{roomName}</label>
        </div>
    )

}
export default ORRoomItem;