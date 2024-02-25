import mongoose, {Schema} from "mongoose";

// Product object schema
const productSchema = new Schema({
    "name": {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is unique value']
    },
    "price": {
        type: Number,
        default: 0
    },
    "description": {
        type: String,
        required: true
    },
    "images": {
        type: [{_id: String, url: String, caption: String}],
        required: false
    },
    "comments": {
        type: [{_id: String, text: String, author: String}],
        required: false
    },
    "category": {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, {
    timestamps: true
});

// Create Product model mapping DB
const Products = mongoose.model("Products", productSchema);
// Export model
export default Products;
