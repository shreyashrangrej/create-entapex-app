import type { Config } from "drizzle-kit";
import "dotenv/config"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || ""
  },
  driver: "pg",
} satisfies Config;
