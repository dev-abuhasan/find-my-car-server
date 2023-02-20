const cars = [
    {
        brand: 'Toyota',
        model: 'Camry',
        year: '2021',
        color: 'blue',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80',
        availableColors: ['white', 'dark', 'red'],
        seats: 5,
        price: 25000,
        location: 'Dhaka',
        rating: 0,
        reviewCount: 0,
        countInStock: 3,
        categories: ['sedan', 'family', 'friends'],
    },
    {
        brand: 'Honda',
        model: 'Volvo',
        year: '2022',
        color: 'blue',
        image: 'https://img.autobytel.com/2023/chevrolet/camaro/2-800-oem-exterior-front1300-100787.jpg',
        availableColors: ['white', 'dark', 'yellow'],
        seats: 8,
        price: 23000,
        location: 'Rajshahi',
        rating: 0,
        reviewCount: 0,
        countInStock: 4,
        categories: ['sedan', 'family', 'friends', 'travel'],
    },
    {
        brand: 'Rolls Royce',
        model: 'ghost',
        year: '2022',
        color: 'white',
        image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Rolls-Royce/Ghost/8051/1601280317407/front-left-side-47.jpg',
        availableColors: ['white', 'dark'],
        seats: 6,
        price: 30000,
        location: 'Bogura',
        rating: 0,
        reviewCount: 0,
        countInStock: 10,
        categories: ['sedan', 'family', 'travel'],
        offer: {
            type: 'discount',
            value: 5000,
        }
    },
];

export default cars;
