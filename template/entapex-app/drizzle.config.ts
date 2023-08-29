import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
  driver: "pg",
} satisfies Config;
