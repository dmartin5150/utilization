import React, {useState} from 'react';
import './RangeSelector.scss';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Card from '../card/card';



interface DateRangeProps {
    title: string;
    startDate: Date;
    stopDate:Date;
    onSelectDate1: (date:Date) => void;
    onSelectDate2: (date:Date) => void;
}


const RangeSelectors: React.FC<DateRangeProps> = ({title, startDate, stopDate, onSelectDate1, onSelectDate2}) => {

    const [rangeStart, setRangeStart] = useState<Date>(startDate);
    const [range1End, setRangeEnd] = useState<Date>(new Date(stopDate));


    const handleSelect1 = (date:Date) => {
        setRangeStart(date);
        onSelectDate1(date)
    }

    const handleSelect2 = (date:Date) => {
        setRangeEnd(date);
        onSelectDate2(date);
    }

    return (
        <Card>
            <div className='range-selectors'>
                <h2>{title}</h2>
                <div className='range-selector'>
                    <label>Start Date</label>
                    <DatePicker
                    selected={rangeStart} 
                    onChange={handleSelect1} 
                />
                </div>
                <div className='range-selector'>
                    <label>Start Date</label>
                    <DatePicker
                    selected={rangeStart} 
                    onChange={handleSelect2} 
                />
                </div>
            </div>
        </Card>
    )

}
export default RangeSelectors;