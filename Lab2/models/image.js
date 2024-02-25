import mongoose, {Schema} from "mongoose";

const imageSchema = new Schema({
        "url": {
            type: String
        },
        "caption": {
            type: String
        },
        'name': {
            type: String
        }
    },
    {
        timestamps: true
    }
);
const Image = mongoose.model('image', imageSchema)
export default Image