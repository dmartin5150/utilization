import { DateRange } from "../../store/ORData/ordata.types";



export const getPrevMonth  = (curMonth:number) => {
    if (curMonth !== 1) 
        return curMonth -1
    return 12
}



export const getNextMonth = (curMonth:number) => {
    if (curMonth !== 12)
        return curMonth + 1
    return 1
}

export const getPrevYear = (curMonth:number, curYear:number) => {
    if (curMonth === 1) {
        return curYear -1
    }
    return curYear + 1
}


export const getNextYear = (curMonth:number, curYear:number) => {
    if (curMonth === 12) {
        return curYear + 1
    }
    return curYear
}




export const getPreviousDate = (dataStartDate:Date, currentDate:Date) => { 
    if (currentDate <= dataStartDate ) {
        return dataStartDate
    } else {
        const dateCopy = new Date(currentDate);
        const prevMonth = getPrevMonth(dateCopy.getMonth())
        return new Date(dateCopy.setMonth(prevMonth));
    }
}




export const getNextDate = (dataEndDate:Date, currentDate:Date) => { 
    if (currentDate >= dataEndDate) {
        return dataEndDate
    } else {
        const dateCopy = new Date(currentDate);
        const newMonth = getNextMonth(dateCopy.getMonth())
        return new Date(dateCopy.setMonth(newMonth))
    }
}

export const createDateRange = (start: Date, end:Date):DateRange => {
    return {startDate:start, endDate:end}
}

export const getFY23Q4Dates = ():DateRange => {
    return createDateRange(new Date('2023-5-1'), new Date('2023-6-30'))
}

export const getRunningQuarterDates = (currentDate:Date):DateRange => {

    const dataStartDate = new Date('2023-3-1')
    const dataEndDate = new Date('2023-9-1')
    let currentDateCopy =  new Date();
    currentDateCopy.setDate(currentDate.getDate())
    let firstDay = new Date(currentDateCopy.setMonth(currentDate.getMonth() - 2));
    if (firstDay < dataStartDate){
        firstDay = dataStartDate
    }
    let lastDay = new Date(currentDate);
    lastDay = new Date(currentDateCopy.setMonth(currentDate.getMonth() + 1));
    lastDay.setDate(lastDay.getDate() -1);
    if (lastDay > dataEndDate) {
        lastDay = dataEndDate
    }
    return createDateRange(firstDay, lastDay)
}