//connection to the Postgres database

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgres://postgres:rudy123@localhost:5432/Notes_DB",
});

export default pool;
