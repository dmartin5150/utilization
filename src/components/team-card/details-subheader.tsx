import React,{Fragment} from "react";
import './details-subheader.scss';


export interface DetailsSubHeaderData {
    name:string;
    startTime:string;
    endTime:string;
    releaseDate:string;
}



export type DetailSubHeaderProps = {
    data: DetailsSubHeaderData[]
}



const DetailsSubHeader: React.FC<DetailSubHeaderProps>  = ({data}) => {
    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className='subheader' key={index} >
                    <p>{item.name}</p><p>{item.startTime}</p><p>{item.endTime}</p><p>Release Date: {item.releaseDate}</p>
                    </div> 
                )
            })}
        </div>
    )
}
export default DetailsSubHeader