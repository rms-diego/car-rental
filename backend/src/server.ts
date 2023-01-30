import { app } from "./app";

const main = () => {
  const { PORT } = process.env;

  if (PORT) app.listen({ port: +PORT }, () => console.log("Server up"));
  else app.listen({ port: 3000 }, () => console.log("Server up"));
};

main();
