import React, {useState, useEffect} from "react";
import "./ListSelector.scss"
import classnames from "classnames";
import { item } from "../../store/ORData/ordata.types";
import ListItem from "./ListItem";


import { ITEM_DISPLAY_TYPE } from "./ListItem";

interface ListSelectorProps {
    title?: string;
    emptySearchMessage?: string
    itemList: item[];
    allItemsSelected: boolean;
    className?: string;
    searchBox?:boolean;
    hideAllHeading?:boolean;
    displayType: ITEM_DISPLAY_TYPE;
    onItemChanged: (id:string)=>void;
    onAllItemsSelected: ()=>void;
    onClearAllSelected: ()=>void;
    onSearchTextChanged?: (searchText:string)=> void
}
const ListSelector: React.FC<ListSelectorProps> = (
    {title,itemList,searchBox,emptySearchMessage,hideAllHeading, allItemsSelected,className, displayType, onItemChanged, 
        onAllItemsSelected,onClearAllSelected,onSearchTextChanged }) => {


    const [searchText, setSearchText] = useState('');

    useEffect(()=> {
        if (onSearchTextChanged) {
            onSearchTextChanged(searchText)
        }
    },[searchText]);

    const handleAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onAllItemsSelected();
    }

    const handleSearchTextChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }


    return(
        <div className={classnames("list-selector", className)}>
            {searchBox  && 
            <div className='searchBox'>
                 <h1>{title}</h1>
                <input value={searchText} 
                onChange={handleSearchTextChanged}
                />
            </div>}
            {!searchBox && 
                <div className="title">
                    <h1>{title}</h1>
                </div>}
            <div className="all">
               {!hideAllHeading && <label className={"checkbox-all"}>
                        <input
                            type="checkbox"
                            checked={allItemsSelected}
                            onChange={handleAllChanged}
                            disabled={searchText.length !== 0}
                        />
                            ALL
                    </label>}
                <a  href="#" className="clear-all" onClick={onClearAllSelected}>Clear all</a>
            </div>
            <ul className={classnames("items", {small: (searchBox)},{small: (displayType === ITEM_DISPLAY_TYPE.list)})}>
            {(itemList.length == 0) ? <li className="empty">{emptySearchMessage ? emptySearchMessage : "No Item Found"}</li> : 
                itemList.map((item) => {
                    return <li key={item.id}>
                        <ListItem 
                        item={item}
                        displayType={displayType}
                        onItemChanged={onItemChanged}
                    /></li>
            })}
            </ul>
        </div>
    )
}
export default ListSelector;