import React, {useState, useEffect} from "react";
import './blockDetailsCard.scss'
import DetailsCard from "../../components/team-card/details-card";
import { DetailsHeader } from "../team-card/details-card-header";
import { GridNames } from "../team-card/details-grid";
import { DetailsData } from "../../components/team-card/details-card";
import { DetailsSubHeaderData } from "../team-card/details-subheader";
import Popup from "../popup/popup-component";
import Pagination from "../pagination/pagination";
import classnames from 'classnames';



export type BlockDetailCard = {
    title: string,
    header: DetailsHeader // 4 col strings
    columns: GridNames; // 5 col strings
    highLightItemsGreen: string[];
    data: DetailsData[];
    popUpOpen: boolean;
    classIsOpen: string;
    highLightItemsRed: string[];
    subHeaderData: DetailsSubHeaderData[],
    pageSize: number,
}


interface BlockDetailCardsProps  {
    blockCards: BlockDetailCard[];
    classIsOpen:string;
    onCloseBlockDetails:()=>void;
    cardsPageSize: number;
}


const BlockDetailCards: React.FC<BlockDetailCardsProps> = ({blockCards,classIsOpen,onCloseBlockDetails, cardsPageSize}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentBlockData, setCurrentBlockData] = useState<BlockDetailCard[]>(blockCards);



    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * cardsPageSize;
        const lastPageIndex = firstPageIndex + cardsPageSize;
        console.log('pages', firstPageIndex, lastPageIndex)
        setCurrentBlockData(blockCards.slice(firstPageIndex, lastPageIndex));
      }, [currentPage, blockCards]);

    
    return (
        <Popup className={classnames("popup",{open:classIsOpen=== 'open'})}>
            <div className={classnames('blockdetailcards',{open:classIsOpen=== 'open'},{close:classIsOpen!=='open'})}>
                {currentBlockData.map((blockCard, idx) => {
                return  <DetailsCard key={idx}
                        title={blockCard.title} 
                        header={blockCard.header}
                        columns={blockCard.columns}
                        highLightItemsGreen={blockCard.highLightItemsGreen}
                        data ={blockCard.data}
                        usePopUp= {false}
                        onClosePopup= {onCloseBlockDetails}
                        classIsOpen={"open"}
                        highLightItemsRed={blockCard.highLightItemsRed}
                        subHeaderData={blockCard.subHeaderData}
                        pageSize={blockCard.pageSize} /> 

                })}
            <Pagination
                currentPage={currentPage}
                totalCount={blockCards.length}
                pageSize={1}
                onPageChange={setCurrentPage}
            />
            </div>

        </Popup>
    )
}

export default BlockDetailCards