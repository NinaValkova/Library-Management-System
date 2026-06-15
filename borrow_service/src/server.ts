import "dotenv/config";
import expressApp from "./express.app";
import { logger } from "./utils/logger";
import { InitializeBroker } from "./service/broker.service";
import { APP_PORT } from "./config";

const PORT = APP_PORT || 4002;

export const StartServer = async () => {
  await InitializeBroker();

  expressApp.listen(PORT, () => {
    logger.info(`Borrow service is listening on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("borrow service is up");
});