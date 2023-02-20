import mongoose from 'mongoose';
import { config } from './config.js';

mongoose.set('strictQuery', false);

const connect_db = async () => {
    try {
        const connect = await mongoose.connect(config.db.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${connect.connection.host}`.green.bold);
    } catch (err) {
        console.error(`Error ${err}`.red.underline.bold);
        process.exit(1);
    }
};

export default connect_db;