
import '../env.js';
import 'colors';

import connect_db from './services/config/db.js';

import User from './models/user.models.js';
import Car from './models/car.models.js';

import cars from './services/data/cars.js';
import users from './services/data/users.js';



connect_db();

const importData = async () => {
    try {
        await Car.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleCars = cars.map(car => {
            return { ...car, user: adminUser };
        });

        await Car.insertMany(sampleCars);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Car.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
