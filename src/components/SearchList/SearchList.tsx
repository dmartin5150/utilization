import React, { useState, useEffect } from "react";
import classnames from "classnames";

import { ITEM_DISPLAY_TYPE } from "../ListSelector/ListItem";
import SearchListItem from "./SearchListItem";

import { item } from "../ListSelector/ListItem";


interface SearchListProps {
    title?: string;
    className?: string;
    emptySearchMessage?: string
    itemList: item[];
    allItemsSelected: boolean;
    onItemChanged: (id:string)=>void;
    onAllItemsSelected: ()=>void;
    onClearAllSelected: ()=>void;
    onSearchTextChanged?: (searchText:string)=> void
}



const SearchList: React.FC<SearchListProps> = ({title,itemList,emptySearchMessage, allItemsSelected,className,  onItemChanged, 
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
        <div className={`search-list ${className}`}>

            <div className='searchBox'>
                 <h1>{title}</h1>
                <input value={searchText} 
                onChange={handleSearchTextChanged}
                />
            </div>
            <div className="title">
                <h1>{title}</h1>
            </div>
            <div className="all">
                <label className={"checkbox-all"}>
                    <input
                        type="checkbox"
                        checked={allItemsSelected}
                        onChange={handleAllChanged}
                        disabled={searchText.length !== 0}
                    />
                        ALL
                </label>
                <a  href="#" className="clear-all" onClick={onClearAllSelected}>Clear all</a>
            </div>
            <ul className={classnames("items")}>
            {(itemList.length == 0) ? <li className="empty">{emptySearchMessage ? emptySearchMessage : "No Item Found"}</li> : 
                itemList.map((item) => {
                    return <li key={item.id}>
                        <SearchListItem 
                        item={item}
                        onItemChanged={onItemChanged}
                    /></li>
            })}
            </ul>
        </div>
    )
}
export default SearchList;