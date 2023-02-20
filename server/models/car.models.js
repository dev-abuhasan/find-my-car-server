import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
            default: 'https://i.ibb.co/2hcLX81/user.png',
        },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const carSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        brand: { type: String, required: true, },
        model: { type: String, required: true, },
        year: { type: String, required: true, },
        color: { type: String, required: false },
        image: { type: String, required: true },
        availableColors: { type: [String], required: false },
        categories: {
            type: [{
                type: String,
                enum: ['sedan', 'family', 'friends', 'travel']
            }], required: false
        },
        seats: { type: Number, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        reviews: [reviewSchema],
        rating: { type: Number, require: true, default: 0, },
        reviewCount: { type: Number, default: 0 },
        viewCount: { type: Number, require: false, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        offer: {
            type: {
                type: String,
                enum: ['discount', 'free_accessory'],
                required: false,
            },
            value: {
                type: Number,
                required: false,
            },
            offerPrice: {
                type: Number,
                required: false,
                default: function () {
                    if (this.price && this.offer.value) {
                        return this.price - this.offer.value;
                    }
                    return 0;
                }
            },
            inPercent: {
                type: Number,
                required: false,
                default: function () {
                    if (this.price && this.offer.value) {
                        return ((this.offer.value / this.price) * 100).toFixed(2);
                    }
                    return 0;
                }
            },
            expiresAt: {
                type: Date,
                required: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Car = mongoose.model('Car', carSchema);

export default Car;
