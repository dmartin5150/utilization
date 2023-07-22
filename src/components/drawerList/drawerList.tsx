import React from "react";
import './drawerList.scss'


export type DrawerItems = {
    name:string;
}


type DrawerListsProps <T extends DrawerItems> = {
    title:string;
    items:T[]
}


function DrawerList<T extends DrawerItems>({title, items}:React.PropsWithChildren<DrawerListsProps<T>>) {
    return (
        <div className='drawer-list'>
            <div className='drawer-list--title'>
                <h3>{title}</h3>
            </div>
            <div className='drawer-list--items'>
                <ul >
                    {items.map((item, idx) => {
                        return (
                            <li key={idx}>{item.name}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
export default DrawerList;

