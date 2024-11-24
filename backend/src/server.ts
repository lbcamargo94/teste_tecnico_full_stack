import { log } from "console";
import { app } from "./app";

const PORT = process.env.APPLICATION_PORT || "8080";

app.listen(PORT, () => {
  log(`Server is running on port ${PORT}`);
  log(`Server access in http://localhost:${PORT}`);
  log(`Created by Lucas Camargo @2024 ㋡`);
});
