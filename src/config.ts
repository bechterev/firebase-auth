
export default () => ({
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    database: {
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        FIREBASE_CLIENT_EMAIL:process.env.FIREBASE_CLIENT_EMAIL,
        DATABASE_URL: process.env.DATABASE_URL

    }
  });
  