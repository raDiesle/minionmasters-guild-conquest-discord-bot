const {DateTime} = require("luxon");
const calculateEndTime = () => {

    const CYCLE_TIME_IN_MS = 1000*60*60*24*3;
    const startOfASeason  =  DateTime.utc(2022, 8, 4, 8,0,0); // was 7 hours in webapp
    const NOW = DateTime.utc();

    const diffSinceReferenceConquestFromPast = NOW.diff(startOfASeason, 'milliseconds');

    const CYCLE_DURATION = {days: 3};
    const nextOccurenceFn = (nextOccurence) => nextOccurence.plus(CYCLE_DURATION);
    let nextOccurrence = nextOccurenceFn(startOfASeason);

    let countOfCycle = 32;
    while (NOW.diff(nextOccurrence, 'days').days > 3) {
        countOfCycle++;
        nextOccurrence = nextOccurenceFn(nextOccurrence);
    }

    const nextCycleEnd = nextOccurenceFn(nextOccurrence);
    const nextCycleEndRelativeDiscordString = `<t:${nextCycleEnd.toMillis() / 1000}:R>`;
    const result = `Cycle ${countOfCycle} ends ${nextCycleEndRelativeDiscordString}`;

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


    const isRestarted = days === 0 && hours === 0 && minutes === 0;
    return {asString, days, hours, minutes, isRestarted,result};
};

module.exports = {
    calculateEndTime
}