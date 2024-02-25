import mongoose, {Schema} from 'mongoose'

const commentSchema = new Schema({
    "rate": {
        type: Number,
        min: 1,
        max: 5
    },
    "text": {
        type: String
    },
    "author": {
        type: String
    }
}, {
    timestamps: true
});
const Comment = mongoose.model('comments', commentSchema)
export default Comment