import postgressConnection from "./connection";
import Checklists from "./model/Checklist";
import Organizations from "./model/Organizations";
import Projects from "./model/Projects";
import Users from "./model/Users";

async function syncModels() {
  await postgressConnection.authenticate();
  await Organizations.sync({ alter: true });
  await Users.sync({ alter: true });
  await Projects.sync({ alter: true });
  await Checklists.sync({ alter: true });
}

async function dbInit() {
  try {
    console.debug("Connection to the database");
    await syncModels();
    console.debug("Connected to the database");
  } catch (error) {
    console.error("Failed to connect");
    process.exit(1);
  }
}

export default dbInit;
