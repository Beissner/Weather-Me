export const getDate = () => {

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    
    const date = new Date();
    const dayIndx = date.getDay();
    const monthIndx = date.getMonth();
    const dayNum = date.getDate();
    const dayOfTheWeek = days[dayIndx];
    const month = months[monthIndx];

    return `${dayOfTheWeek}, ${month} ${dayNum}`;

}