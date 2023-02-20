import bcrypt from 'bcrypt';

const users = [
    {
        avatar: 'https://i.ibb.co/2hcLX81/user.png',
        isAdmin: true,
        firstName: 'Abu',
        lastName: 'Hasan',
        email: 'dev.abuhasan@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        avatar: 'https://i.ibb.co/2hcLX81/user.png',
        isAdmin: false,
        firstName: 'Ah',
        lastName: 'Ahamed',
        email: 'ahinstitutte@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;
