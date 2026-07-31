import "dotenv/config";
import expressApp from "./express.app";
import { APP_PORT } from "./config";
import { InitializeBroker, DisconnectBroker} from "./service/broker.service";

const PORT = APP_PORT || 4001;

export const StartServer = async () => {
  await InitializeBroker();

  const server = expressApp.listen(PORT, () => {
    console.log(`Catalog service is listening on port ${PORT}`);
  });

  const shutdown = async () => {
    console.log("Shutting down Catalog Service...");

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
  console.log("catalog service is up");
});

