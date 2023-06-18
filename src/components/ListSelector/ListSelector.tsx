import React, {useState, useEffect} from "react";
import "./ListSelector.scss"
import classnames from "classnames";
import { item } from "./ListItem";
import ListItem from "./ListItem";




interface ListSelectorProps {
    title: string;
    itemList: item[];
    allItemsSelected: boolean;
    gridSize?: string;
    searchBox?:boolean;
    showTitle?:boolean;
    onItemChanged: (id:string)=>void;
    onAllItemssSelected: ()=>void;
    onClearAllSelected: ()=>void;
    onSearchTextChanged?: (searchText:string)=> void
}
const ListSelector: React.FC<ListSelectorProps> = (
    {title,itemList,searchBox,showTitle, allItemsSelected,gridSize, onItemChanged, 
        onAllItemssSelected,onClearAllSelected,onSearchTextChanged }) => {


    const [searchText, setSearchText] = useState('');

    useEffect(()=> {
        if (onSearchTextChanged) {
            onSearchTextChanged(searchText)
        }
    },[searchText]);

    const handleAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onAllItemssSelected();
    }

    const handleSearchTextChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    return(
        <div className={classnames("list-selector", gridSize)}>
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
            <ul className={classnames("items",gridSize)}>
            { itemList.map((item) => {
                    return <li key={item.id}>
                        <ListItem 
                        item={item}
                        onItemChanged={onItemChanged}
                    /></li>
                })}
            </ul>
        </div>
    )
}
export default ListSelector;