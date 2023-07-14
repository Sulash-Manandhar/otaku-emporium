import { addUserToDocument } from "./addUserToDatabases.js";
import { addApparelToDocument } from "./addApparelToDatabase.js";

export async function runPopulation() {
  await addUserToDocument();
  await addApparelToDocument();
}
