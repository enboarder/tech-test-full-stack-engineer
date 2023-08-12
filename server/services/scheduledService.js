const CronJob = require("node-cron");
const ship = require('./shipService')

class ScheduledService {
    async initDBCleanUp() {
        const scheduledJobFunction = CronJob.schedule("0 1 * * *", async () => {
            console.log("I'm executed on a schedule!");
            await ship.cleanUp();
          }, {
            scheduled: true
          });
        
          scheduledJobFunction.start();
    }
}

module.exports = new ScheduledService();