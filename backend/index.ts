import { createServer } from "http";
import app from "./src/app.ts";
import { connectDB } from "./src/config/database.ts";
import { initilizeServer } from "./src/utils/socket.ts";

const PORT = process.env.PORT || 8000;

const httpServer = createServer(app);

initilizeServer(httpServer);

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
