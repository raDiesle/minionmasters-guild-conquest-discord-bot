const {automaticReminder : automaticReminderFn} = require("./automatic-reminder");

test('automatic remind', async () => {
    const result = await automaticReminderFn(0, () => {});
    console.log(result);
});
