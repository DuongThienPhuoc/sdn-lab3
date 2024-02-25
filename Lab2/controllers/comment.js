import Comment from "../models/comment.js";
import Products from "../models/product.js";

const getCommentsByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId);
        const commentIds = product.comments.map(comment => comment._id)
        const comments = await Comment.find({_id: {$in: commentIds}})
        const response = {...product._doc, comments: comments}
        res.status(200).json({
            message: 'success',
            data: response
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export {
    getCommentsByProductId
}
