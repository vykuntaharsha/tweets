export const getTimeElapsed = (time) =>{

    const milliseconds = Date.now() - Date.parse(time);

    let day, hour, minute, seconds;

    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    if(day) return `${day}d`;
    if(hour) return `${hour}h`;
    if(minute) return `${minute}m`;
    if(seconds) return `${seconds}s`;

    return `now`;

}
