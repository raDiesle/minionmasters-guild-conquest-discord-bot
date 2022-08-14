const {calculateCycleValues : calculateCycleValuesFn} = require("./calculate-cycle-values");
const {formatCycleContents : formatCycleContentsFn} = require("./format-cycle-contents");

function getCycleTimeContents(){
    const {isRestarted,nextCycleCount, nextCycleEnd} = calculateCycleValuesFn();
    return formatCycleContentsFn({nextCycleCount, nextCycleEnd})
}

module.exports = {
    getCycleTimeContents
}