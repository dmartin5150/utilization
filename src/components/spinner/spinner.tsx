import React from "react";
import './spinner.scss';

const Spinner = () => {
    return (
        <div className='spinner'>
            <h1>Loading Data</h1>
            <div className='loading'></div>
        </div>
    )
}
export default Spinner