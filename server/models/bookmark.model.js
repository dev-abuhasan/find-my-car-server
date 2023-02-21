import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        car: { type: mongoose.Types.ObjectId, required: true, ref: 'Car' },
    },
    {
        timestamps: true,
    }
);

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;