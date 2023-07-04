import React,{Fragment} from "react";
import './details-subheader.scss';


export interface DetailsSubHeaderData {
    name:string;
    start_time:string;
    end_time:string;
    release_date:string;
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
                    <p>{item.name}</p><p>{item.start_time}</p><p>{item.end_time}</p><p>{item.release_date}</p>
                    </div> 
                )
            })}
        </div>
    )
}
export default DetailsSubHeader