import React from "react";
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
}
const ListSelector: React.FC<ListSelectorProps> = ({title,itemList,searchBox,showTitle, allItemsSelected,gridSize, onItemChanged, onAllItemssSelected}) => {

    const handleAllChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onAllItemssSelected();
    }

    return(
        <div className={classnames("list-selector", gridSize)}>
            {searchBox  && 
            <div className='searchBox'>
                 <h1>{title}</h1>
                <input />
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
                        />
                            ALL
                    </label>
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