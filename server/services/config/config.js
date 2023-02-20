export const config = {
    app: {
        jwt_secret: process.env.JWT_SECRET,
        client_uri: process.env.CLIENT_URI,
        google_client_id: process.env.GOOGLE_CLIENT_ID,
        google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
        google_refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        admin_email: process.env.ADMIN_EMAIL,
    },
    db: {
        dbUri: process.env.MONGO_URI,
    },
};