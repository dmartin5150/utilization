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

    const dataStartDate = new Date('2023-3-1')
    const dataEndDate = new Date('2023-9-1')
    let currentDateCopy =  new Date();
    currentDateCopy.setDate(currentDate.getDate())
    let firstDay = new Date(currentDateCopy.setMonth(currentDate.getMonth() - 3));
    if (firstDay < dataStartDate){
        firstDay = dataStartDate
    }
    let lastDay = new Date(currentDate);
    lastDay.setDate(currentDate.getDate() -1);
    if (lastDay > dataEndDate) {
        lastDay = dataEndDate
    }
    return createDateRange(firstDay, lastDay)
}