import React from "react";
import "./ORRooms.scss"


const ORRooms = () => {



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
                            // onChange={handleChange}
                        />
                            ALL
                    </label>
            </div>
            <ul className="rooms">
                <li className="room">
                    <label className={"checkbox"}>
                        <input
                            type="checkbox"
                            checked={true}
                            // onChange={handleChange}
                        />
                            JRI 01
                    </label>
                </li>
                <li className="room">
                    <label>
                        <input
                            type="checkbox"
                            checked={true}
                            // onChange={handleChange}
                        />
                            JRI 02
                    </label>
                </li>
                <li className="room">
                    <label>
                        <input
                            type="checkbox"
                            checked={true}
                            // onChange={handleChange}
                        />
                            JRI 03
                    </label>
                </li>
                <li className="room">
                    <label>
                        <input
                            type="checkbox"
                            checked={true}
                            // onChange={handleChange}
                        />
                            JRI 04
                    </label>
                </li>
                <li className="room">
                    <label>
                        <input
                            type="checkbox"
                            checked={true}
                            // onChange={handleChange}
                        />
                            JRI 05
                    </label>
                </li>
            </ul>

        </div>
    )
}
export default ORRooms;