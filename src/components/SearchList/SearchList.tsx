import React, { useState, useEffect } from "react";
import classnames from "classnames";
import SearchListCheckboxItem from "./SearchListCheckboxItem";
import { item } from "../ListSelector/ListItem";
import "./SearchList.scss";



export type SearchListItems ={
    itemList: item[];
    emptySearchMessage?:string;
    allItemsSelected:boolean;
    onItemChanged: (id:string)=>void;
    onAllItemsChanged?: ()=>void;
    onAllItemsSelected: ()=>void;
    onClearAllSelected:()=>void;
    onSearchTextChanged?: (searchText:string)=>void;

}


interface SearchListProps {
    title?: string;
    className?: string;
    checkboxList:SearchListItems;

}


const SearchList: React.FC<SearchListProps> = ({title,className, checkboxList}) => {

    const {itemList,emptySearchMessage, allItemsSelected,  onItemChanged, 
        onAllItemsSelected,onClearAllSelected,onSearchTextChanged} = checkboxList;

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
        <div className={classnames("search-list", className)}>
            <div className='searchBox'>
                 <h1>{title}</h1>
                <input value={searchText} 
                onChange={handleSearchTextChanged}
                />
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
                        <SearchListCheckboxItem 
                        item={item}
                        onItemChanged={onItemChanged}
                    /></li>
            })}
            </ul>
        </div>
    )
}
export default SearchList;