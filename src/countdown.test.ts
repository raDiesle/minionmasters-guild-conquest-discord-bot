const {calculateEndTime} = require("./countdown");




test('countdown', () => {
    const result = calculateEndTime();
    console.info(result.result);
});
