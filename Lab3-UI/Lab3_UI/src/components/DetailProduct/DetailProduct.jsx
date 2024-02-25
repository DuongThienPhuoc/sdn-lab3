import './DetailProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { postComment } from '../../service/ProductService.js';

function DetailProduct({ product }) {
    const [images, setImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [mainImage, setMainImage] = useState('');
    useEffect(() => {
        if (product) {
            setImages(product.images);
            setComments(product.comments);
            setMainImage(product.images[0].url);
        }
    }, [product]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const imagePerPage = 3;
    const page = Math.ceil(images.length / imagePerPage);

    function nextPage() {
        if (currentSlide < page - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    function prevPage() {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }

    const startPage = currentSlide * imagePerPage;
    const endPage = startPage + imagePerPage;
    const imageSlide = images.slice(startPage, endPage);

    /**
     *@Description Comment Handle
     **/
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(null);

    function handleSubmit() {
        const body = {
            comments: [
                {
                    text: comment,
                    author: author,
                    rate: rate,
                },
            ],
        };
        postComment('products', product._id, JSON.stringify(body));
    }

    return (
        <div className="detail-product">
            <div>
                <h3>Id:{product._id}</h3>
            </div>
            <div className="row">
                <div className="col-6 d-flex justify-content-center">
                    <div className="image-content">
                        <div className="row d-flex justify-content-center">
                            <div className="image-content">
                                <img
                                    className="main-image"
                                    src={mainImage}
                                    alt="img"
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center p-2">
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                className="icon-left"
                                onClick={prevPage}
                            />
                            <div className="slide-image row">
                                {imageSlide ? (
                                    imageSlide.map((image, index) => (
                                        <div
                                            className="col-4"
                                            key={index}
                                            onClick={() =>
                                                setMainImage(image.url)
                                            }
                                        >
                                            <img
                                                className="sub-image w-100"
                                                src={image.url}
                                                alt="img"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="icon-right"
                                onClick={nextPage}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <h1>
                            <strong>{product.name}</strong>
                        </h1>
                    </div>
                    <div>
                        <h2 className="product-price">{product.price}$</h2>
                    </div>
                    <div className="rate d-flex align-items-center">
                        <label htmlFor="rate" className="form-label me-2">
                            Rate:
                        </label>
                        <br />
                        <input
                            id="rate"
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="form-control w-25"
                        />
                    </div>
                </div>
            </div>
            <div className="description row">
                <div>
                    <h3>
                        <strong>Description</strong>
                    </h3>
                    <p>{product.description}</p>
                </div>
            </div>
            <div className="comments row">
                <div>
                    <h3>
                        <strong>Comments</strong>
                    </h3>
                    <p>
                        {comments
                            ? comments.map((comment, index) => (
                                  <div key={index}>
                                      <p>
                                          <strong>{comment.author}</strong>
                                      </p>
                                      <p>{comment.text}</p>
                                  </div>
                              ))
                            : ''}
                    </p>
                </div>
                <div>
                    <h3>
                        <strong>Add Comment</strong>
                    </h3>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <textarea
                            className="form-control mt-2"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Your comment"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleSubmit}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
