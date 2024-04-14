const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

export const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.ice9ffr.mongodb.net/food_app_db?retryWrites=true&w=majority&appName=Cluster0`;
export const APP_SECRET = "the_app_secret";