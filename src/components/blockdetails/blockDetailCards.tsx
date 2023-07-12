import React from "react";
import DetailsCard from "../../components/team-card/details-card";
import { DetailsHeader } from "../team-card/details-card-header";
import { GridNames } from "../team-card/details-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { DetailsSubHeaderData } from "../team-card/details-subheader";


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
    pageSize: number
}


interface BlockDetailCardsProps  {
    blockCards: BlockDetailCard[]
}


const BlockDetailCards: React.FC<BlockDetailCardsProps> = ({blockCards}) => {
    
    return (
        <div className='blockdetialcards'>
            {blockCards.map((blockCard) => {
            return  <DetailsCard 
                    title={blockCard.title} 
                    header={blockCard.header}
                    columns={blockCard.columns}
                    highLightItemsGreen={blockCard.highLightItemsGreen}
                    data ={blockCard.data}
                    onClosePopup={blockCard.onClosePopup} 
                    classIsOpen={`${blockCard.popUpOpen ? "open" : "close"}`}
                    highLightItemsRed={blockCard.highLightItemsRed}
                    subHeaderData={blockCard.subHeaderData}
                    pageSize={6} /> 

            })}
        </div>
    )
}

export default BlockDetailCards