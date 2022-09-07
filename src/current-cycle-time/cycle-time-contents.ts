const {calculateCycleValues : calculateCycleValuesFn} = require("./calculate-cycle-values");
const {formatCycleContents : formatCycleContentsFn} = require("./format-cycle-contents");

function getCycleTimeContents({isWithActions, isPingAll, description}){
    const {isRestarted,nextCycleCount, nextCycleEnd} = calculateCycleValuesFn();
    return formatCycleContentsFn({nextCycleCount, nextCycleEnd, isWithActions, isPingAll, description})
}

module.exports = {
    getCycleTimeContents
}