
const {DateTime} = require("luxon");

// 2022, 0, 26, 8,0,0,0
const startOfASeason  =  DateTime.utc(2022, 10, 8, 9,0,0,0); // was 7 hours in webapp

function nextOccurenceFn (nextOccurence) {
    const CYCLE_DURATION = {days: 3};
    return nextOccurence.plus(CYCLE_DURATION);
}

function getCurrentCycle() {
    const NOW = DateTime.utc();
    let currentCycleStartTime = nextOccurenceFn(startOfASeason);
    let countOfCycle = 23;
    while (NOW.diff(currentCycleStartTime, 'days').days > 3) {
        countOfCycle++;
        currentCycleStartTime = nextOccurenceFn(currentCycleStartTime);
    }
    return {currentCycleStartTime: currentCycleStartTime, currentCycleCount: countOfCycle};
}

function calculateCycleValues  () {

    const NOW = DateTime.utc();

    const {currentCycleStartTime, currentCycleCount} = getCurrentCycle();

    const nextCycleCount = currentCycleCount + 1;
    const nextCycleEnd = nextOccurenceFn(currentCycleStartTime);


    const timeLeft = NOW.diff(nextCycleEnd, ['days', 'hours', 'minutes']);
    const timeLeftObject = timeLeft.toObject();
    const isRestarted = [timeLeftObject.days * -1, timeLeftObject.hours * -1, timeLeftObject.minutes * -1];

    return {isRestarted,nextCycleCount, nextCycleEnd};
};

module.exports = {
    calculateCycleValues
}