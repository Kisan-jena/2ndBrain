// src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

// Load .env file
dotenv.config();

// Schema for validation
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('3000').transform(Number),
  MONGODB_URL: z.string().url('MongoDB URL must be valid'),
  JWT_ACCESS_SECRET: z
    .string()
    .min(10, 'JWT access secret must be at least 20 characters'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(10, 'JWT refresh secret must be at least 20 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  BASE_URL: z.string().url().optional().default('http://localhost:3000'),
});

// Parse environment variables
const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error(' Invalid environment variables:');
  envResult.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = envResult.data;
