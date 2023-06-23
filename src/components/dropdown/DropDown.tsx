import React, {useState} from "react";
import './dropdown.scss';
import { DropdownIndicatorProps } from "react-select";




export type  DropDownBox = {
    title: string;
    selected:string;
    menuItems: string[];
    disabled: boolean;
    onSelectItem?: (item: string)=>void;
}


const useOutsideClick = (callback: ()=>  void) => {
    const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;
  
    React.useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !(ref.current as HTMLElement).contains((event.target as HTMLElement))) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick );
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  
    return ref;
  };



const Dropdown: React.FC<DropDownBox> = ({title, selected, menuItems,disabled, onSelectItem}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }
    
    const handleSelectItem = (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectedButton = (event.target as HTMLButtonElement)
        // console.log('Name:', (event.target as HTMLButtonElement))
        const name = (event.target as HTMLButtonElement).name
        if (onSelectItem) {
            onSelectItem(name)
        }
        setOpen(false);
    }

    const handleClickOutside = () => {
        setOpen(false);
    }

    const ref = useOutsideClick(handleClickOutside);
    return (
      <div className="dropdown" ref={ref} >
        <div className='trigger'>
            <div className='trigger-unit'>
                <label>{title}</label>
                <button onClick={handleOpen} data-selected={selected} disabled={disabled}>{selected} </button>
            </div>
        </div>
        {open ? (
          <ul className="menu">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">{
                <button onClick={handleSelectItem} name={item}>{item}</button>
              }</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };
  export default Dropdown