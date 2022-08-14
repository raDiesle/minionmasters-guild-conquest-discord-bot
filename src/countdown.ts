import {bold, time} from "discord.js";

const {DateTime} = require("luxon");

const startOfASeason  =  DateTime.utc(2022, 8, 4, 8,0,0); // was 7 hours in webapp

function nextOccurenceFn (nextOccurence) {
    const CYCLE_DURATION = {days: 3};
    return nextOccurence.plus(CYCLE_DURATION);
}

function getCurrentCycle() {
    const NOW = DateTime.utc();
    let currentCycleStartTime = nextOccurenceFn(startOfASeason);
    let countOfCycle = 31;
    while (NOW.diff(currentCycleStartTime, 'days').days > 3) {
        countOfCycle++;
        currentCycleStartTime = nextOccurenceFn(currentCycleStartTime);
    }
    return {currentCycleStartTime: currentCycleStartTime, currentCycleCount: countOfCycle};
}

const calculateEndTime = () => {

    const NOW = DateTime.utc();

    const {currentCycleStartTime, currentCycleCount} = getCurrentCycle();

    const nextCycleCount = currentCycleCount + 1;
    const nextCycleEnd = nextOccurenceFn(currentCycleStartTime);
    const nextCycleEndRelativeDiscordString = time(nextCycleEnd.toMillis() / 1000, "R");// `<t:${nextCycleEnd.toMillis() / 1000}:R>`;

    const result = `\n...${bold("Cycle")} ${nextCycleCount} ends ${nextCycleEndRelativeDiscordString}`;

    const timeLeft = NOW.diff(nextCycleEnd);
    const isRestarted = [timeLeft.days, timeLeft.hours, timeLeft.minutes];

    return {isRestarted,result};
};

module.exports = {
    calculateEndTime
}