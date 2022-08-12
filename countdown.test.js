const {calculateEndTime} = require("./countdown");

const result = calculateEndTime();
console.info(result.asString);