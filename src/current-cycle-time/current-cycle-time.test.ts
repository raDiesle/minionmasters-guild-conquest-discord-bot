const {calculateCycleValues: calculateEndTimeFn} = require("./calculate-cycle-values");


test('countdown', () => {
    const result = calculateEndTimeFn();
    console.info(JSON.stringify(result));
});
