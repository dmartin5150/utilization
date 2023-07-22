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