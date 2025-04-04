// src/db.ts
import { drizzle } from "drizzle-orm/vercel-postgres";
import { neon } from "@neondatabase/serverless";
import { sql } from "@vercel/postgres"
import * as schema from "./schema";


export const db = drizzle(sql, { schema });