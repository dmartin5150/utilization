import React, {useState} from "react";
import './blockDetailsCard.scss'
import DetailsCard from "../../components/team-card/details-card";
import { DetailsHeader } from "../team-card/details-card-header";
import { GridNames } from "../team-card/details-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { DetailsSubHeaderData } from "../team-card/details-subheader";
import Pagination from "../pagination/pagination";



export type BlockDetailCard = {
    title: string,
    header: DetailsHeader // 4 col strings
    columns: GridNames; // 5 col strings
    highLightItemsGreen: string[];
    data: DetailsData[];
    onClosePopup: () => void;
    popUpOpen: boolean;
    classIsOpen: string;
    highLightItemsRed: string[];
    subHeaderData: DetailsSubHeaderData[],
    pageSize: number,
}


interface BlockDetailCardsProps  {
    blockCards: BlockDetailCard[]
    cardsPageSize: number
}


const BlockDetailCards: React.FC<BlockDetailCardsProps> = ({blockCards,cardsPageSize}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentCalendarData, setCurrentCalendarData] = useState<BlockDetailCard[]>(blockCards);
    
    return (
        <div className='blockdetailcards'>
            {blockCards.map((blockCard, idx) => {
            return  <DetailsCard key={idx}
                    title={blockCard.title} 
                    header={blockCard.header}
                    columns={blockCard.columns}
                    highLightItemsGreen={blockCard.highLightItemsGreen}
                    data ={blockCard.data}
                    usePopUp= {false}
                    onClosePopup={blockCard.onClosePopup} 
                    classIsOpen={`${blockCard.popUpOpen ? "open" : "close"}`}
                    highLightItemsRed={blockCard.highLightItemsRed}
                    subHeaderData={blockCard.subHeaderData}
                    pageSize={blockCard.pageSize} /> 

            })}
        </div>
    )
}

export default BlockDetailCards