import "dotenv/config";
import expressApp from "./express.app";
import { APP_PORT } from "./config";
import { DisconnectBroker, InitializeBroker } from "./service/broker.service";

const PORT = APP_PORT || 4003;

export const StartServer = async () => {
  await InitializeBroker();

  const server = expressApp.listen(PORT, () => {
    console.log(`Rating service is listening on port ${PORT}`);
  });

  const shutdown = async () => {
  console.log("Shutting down Borrow Service...");

  await DisconnectBroker();

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
 };

  process.on("SIGINT", shutdown);

  process.on("uncaughtException", async (err) => {
    console.error(err);
    await DisconnectBroker();
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("rating service is up");
});