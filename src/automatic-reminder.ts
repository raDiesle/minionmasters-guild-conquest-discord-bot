const {calculateCycleValues : calculateCycleValuesFnn} = require("./current-cycle-time/calculate-cycle-values");

const {getCycleTimeContents : getCycleTimeContentsFn} = require("./current-cycle-time/cycle-time-contents");

const {sendMessageToAllChannels : sendMessageToAllChannelsFn} = require("./sendMessageToAllChannels");

const sentenceForRemainingDays = (lastDaysLeft, daysLeft) => {
    let justResettedNewCycle = lastDaysLeft === 0 && daysLeft === 2;
    if(justResettedNewCycle){
        return "A new cycle just started! Tip: Doing it now, will leave you 3 days in harmony."
    }
    if(lastDaysLeft === 2 && daysLeft === 1){
        return "1 day left! Last change to do conquests before the cycle ends."
    }

    // if(lastDaysLeft === 2 && daysLeft === 2){
    //     // not executed, yet
    //     return "Just 2 days left for cycle end.";
    // }

    return undefined;
}


async function automaticReminder (lastDaysLeft, client) {
        const {isRestarted : [daysLeft]} = calculateCycleValuesFnn();

        if(typeof lastDaysLeft === "undefined"){
            return daysLeft;
        }
        if(daysLeft !== lastDaysLeft){
            lastDaysLeft = daysLeft;
            const automaticMessageOfRemainingTime = sentenceForRemainingDays(lastDaysLeft, daysLeft);
            if(typeof automaticMessageOfRemainingTime !== undefined){
                await sendMessageToAllChannelsFn({message: getCycleTimeContentsFn({isWithActions: false, isPingAll:true, description:"Sent automatic: " + automaticMessageOfRemainingTime}), client});

            }else{
                console.log(`would send for: daysLeft: ${daysLeft}, lastDaysLeft: ${lastDaysLeft}`);
            }
        }
        return daysLeft;
}

module.exports = {
    automaticReminder
}