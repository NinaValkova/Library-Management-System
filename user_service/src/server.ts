import "dotenv/config";
import expressApp from "./express.app";
import { APP_PORT } from "./config";

const PORT = APP_PORT || 4000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`User service is listening on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("user service is up");
});