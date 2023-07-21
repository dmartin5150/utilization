export const getPreviousDate = (dataStartDate:Date, currentDate:Date) => { 
    if (dataStartDate <= currentDate) {
        return dataStartDate
    } else {
        const dateCopy = new Date(currentDate);
        return dateCopy.setMonth(dateCopy.getMonth() - 1);
    }
}

export const getNextDate = (dataEndDate:Date, currentDate:Date) => { 
    if (currentDate >= dataEndDate) {
        return dataEndDate
    } else {
        const dateCopy = new Date(currentDate);
        return dateCopy.setMonth(dateCopy.getMonth() + 1);
    }
}