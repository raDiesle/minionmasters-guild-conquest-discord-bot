function countdown_old(){


const diffSinceReferenceConquestFromPast = NOW.diff(startOfASeason, 'milliseconds');
const remainingTimeInMsAbsolute = diffSinceReferenceConquestFromPast.toMillis() - CYCLE_TIME_IN_MS;
const remainingTimeInMs = CYCLE_TIME_IN_MS - (remainingTimeInMsAbsolute % CYCLE_TIME_IN_MS); //

const remainingTime = Math.floor(remainingTimeInMs / 1000);

const days =  Math.floor(remainingTime / (60 * 60 * 24));
const hours = Math.floor((remainingTime / (60 * 60 )) % 24);
const minutes = Math.floor((remainingTime % (60*60)) / 60) + 1; // ugly uprounding of minutes. Actually should be +1 more the time it takes to display in chat.
// const seconds = Math.floor(remainingTime % 60);

const getRemainingMessage = () => {
    switch(days){
        case days === 2:
            return " The early bird catches the day!";
        case days === 1:
            return "Hurry up!";
        case days === 0:
            return "Last change for conquest!"
        default:
            return "";
    }
    return "";
}
const daysString = days !== 0 ? `${days}d` : "";
const asString = `${daysString} ${hours}h ${minutes}m` + getRemainingMessage();

return asString;
}