import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: String,
    user: String,
    game: String,
    image: String,
    platform: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;