import { DateRange } from "../../store/ORData/ordata.types";

export const getPreviousDate = (dataStartDate:Date, currentDate:Date) => { 
    if (currentDate <= dataStartDate ) {
        return dataStartDate
    } else {
        const dateCopy = new Date(currentDate);
        return new Date(dateCopy.setMonth(dateCopy.getMonth() - 1));
    }
}

export const getNextDate = (dataEndDate:Date, currentDate:Date) => { 
    if (currentDate >= dataEndDate) {
        return dataEndDate
    } else {
        const dateCopy = new Date(currentDate);
        const newmonth = dateCopy.getMonth() + 1
        return new Date(dateCopy.setMonth(dateCopy.getMonth() + 1));
    }
}

export const createDateRange = (start: Date, end:Date):DateRange => {
    return {startDate:start, endDate:end}
}

export const getFY23Q4Dates = ():DateRange => {
    return createDateRange(new Date('2023-4-1'), new Date('2023-6-30'))
}

export const getRunningQuarterDates = (currentDate:Date):DateRange => {
    console.log('currentDate', currentDate)
    let currentDateCopy =  new Date();
    currentDateCopy.setDate(currentDate.getDate())
    const firstDay = new Date(currentDateCopy.setMonth(currentDate.getMonth() - 3));
    console.log('start Month',firstDay)
    let lastDay = new Date(currentDate);
    // console.log('currentDate', currentDate.getDate()-1)
    lastDay.setDate(currentDate.getDate() -1);
    console.log('last day', lastDay)
    return createDateRange(firstDay, lastDay)
}