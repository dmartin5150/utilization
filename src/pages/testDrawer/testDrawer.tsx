import React from 'react'
import './testDrawer.scss'
import Drawer from 'react-modern-drawer'
import DrawerList from '../../components/drawerList/drawerList'
import 'react-modern-drawer/dist/index.css'
import { useSelector } from "react-redux";
import { selectActiveSurgeons } from '../../store/ORData/selectors/ordata.selector';
import { SurgeonList } from '../../store/ORData/ordata.types';


const TestDrawer = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const activeSurgeons = useSelector(selectActiveSurgeons)

    return (
        <>
            <button onClick={toggleDrawer}>Show</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='drawer'
  
            >
                <DrawerList title='Selected Providers' items={activeSurgeons} />
            </Drawer>
        </>
    )




}
export default TestDrawer;