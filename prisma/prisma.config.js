import 'dotenv/config'; // This loads variables from your .env file
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma', // Adjust if your schema is in a subfolder
    datasource: {
        url: env('DATABASE_URL'), // Requires the env var to be set
    },
});