const {calculateCycleValues : calculateCycleValuesFn} = require("./calculate-cycle-values");
const {formatCycleContents : formatCycleContentsFn} = require("./format-cycle-contents");

function getCycleTimeContents({isWithActions}){
    const {isRestarted,nextCycleCount, nextCycleEnd} = calculateCycleValuesFn();
    return formatCycleContentsFn({nextCycleCount, nextCycleEnd, isWithActions})
}

module.exports = {
    getCycleTimeContents
}