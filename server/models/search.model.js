import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
    {
        ip: { type: String, required: true },
        type: { type: String, required: true },
        data: { type: Object, required: false },
        params: { type: Object, required: false },
    },
    {
        timestamps: true,
    }
);

const Search = mongoose.model('Search', searchSchema);

export default Search;