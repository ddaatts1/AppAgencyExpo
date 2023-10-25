export  default  function formatDate(inputDate:any) {
    const date = new Date(inputDate);
    
    // Extract the day, month, and year components from the date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function dateCompareWithCurrentDate(d1: any){
    const date1 = new Date(d1);
    const date2 = new Date();


    if(date1 > date2){
        //console.log(`${d1} is greater than ${d2}`)
        return true;
    } else if(date1 < date2){
        //console.log(`${d2} is greater than ${d1}`)
        return false
    } else{
        //console.log(`Both dates are equal`)
        return null;
    }
}
