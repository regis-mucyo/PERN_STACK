import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "MUCYOregis@2003",
  host: "localhost",
  port: 5432,
  database: "db_store",
});
export default pool;
