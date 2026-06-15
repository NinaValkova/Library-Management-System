import "dotenv/config";
import expressApp from "./express.app";
import { APP_PORT } from "./config";
import { InitializeBroker } from "./service/broker.service";

const PORT = APP_PORT || 4003;

export const StartServer = async () => {
  await InitializeBroker();

  expressApp.listen(PORT, () => {
    console.log(`Rating service is listening on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("rating service is up");
});