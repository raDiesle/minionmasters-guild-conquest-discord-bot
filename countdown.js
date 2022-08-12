const {DateTime} = require("luxon");
const calculateEndTime = () => {

    const CYCLE_TIME_IN_MS = 1000*60*60*24*3;
    const DATE_TO_ALIGN_CYCLE  =  DateTime.utc(2022, 1, 21, 8,0,0); // was 7 hours in webapp
    const NOW = DateTime.utc();

    const timezoneOffset = 0;//NOW.getTimezoneOffset() *  60 * 1000;
    console.info(`timezoneOffset: ${timezoneOffset}`);
    const diffSinceReferenceConquestFromPast = NOW.diff(DATE_TO_ALIGN_CYCLE, 'milliseconds');
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

    return {asString, days, hours, minutes};
};

module.exports = {
    calculateEndTime
}