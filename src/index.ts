import "./scss/style.scss";
import { view } from "./ts/view/view";
import Connect from "./ts/connection/connect";

const start = async () => {
  const result = await Connect.getEvents();
  await view(result);
};

start();
