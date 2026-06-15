import "dotenv/config";
import expressApp from "./express.app";
import { APP_PORT } from "./config";
import { BrokerService } from "./service/broker.service";

const brokerService = new BrokerService();

const PORT = APP_PORT || 4001;

export const StartServer = async () => {
  await brokerService.initializeBroker();

  expressApp.listen(PORT, () => {
    console.log(`Catalog service is listening on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("catalog service is up");
});