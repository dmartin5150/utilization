import React from 'react'
import './utilDrawer.scss'
import Drawer from 'react-modern-drawer'
import DrawerList from '../drawerList/drawerList'
import 'react-modern-drawer/dist/index.css'
import { DrawerItems } from '../drawerList/drawerList'


export enum DrawerDirections {
    'right' = 'right',
    'top' = 'top',
    'left' = 'left',
    'bottom' = 'bottom'
}


interface UtilDrawerProps  {
    isOpen: boolean,
    toggleDrawer:()=>void,
    list:DrawerItems[],
    direction:DrawerDirections,
    title:string
}


const UtilDrawer:React.FC<UtilDrawerProps> = ({isOpen,toggleDrawer,list,direction, title}) => {

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction={direction}
                className='drawer'
  
            >
                <DrawerList title={title} items={list} />
            </Drawer>
        </>
    )

}
export default UtilDrawer;