import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import Color from '../components/Color';
import { AiOutlineHeart } from "react-icons/ai";
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRating, getAProduct, getAllProducts } from '../features/products/productSlice';
import { addProductToCart, getUserCart } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];

    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const dispatch = useDispatch();

    const getProducts = () => {
        dispatch(getAllProducts());
        dispatch(getUserCart());
    }

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        getProducts();
    }, []);

    const uploadCart = () => {
        if (color === null){
            toast.error("Please choose color");
            return false;
        } else{
            dispatch(addProductToCart({productId: getProductId, quantity, color, price: productState?.price}));
            dispatch(getUserCart());
            navigate("/cart");
        }
    }
    
    const productState = useSelector((state) => state?.product?.productData);
    const allProducts = useSelector((state) => state?.product?.product);
    const cartState = useSelector((state) => state?.auth?.cartProducts);

    useEffect(() => {
        for (let i=0 ; i<cartState?.length ; i++){
            if (getProductId === cartState[i]?.productId?._id){
                setAlreadyAdded(true);
            }
        }
    }, [])

    let popularData = [];
    for (let i=0 ; i<allProducts?.length ; i++){
      if (allProducts[i]?.tags === "popular"){
        popularData.push(allProducts[i]);
      }
    }

    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-ferarcosn-190819.jpg&fm=jpg"
    };
    const [orderedProduct, setOrderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);

    const addRatingToProduct = () => {
        if (!star){
            toast.error("Please add star to your review");
            return false;
        } else if (!comment){
            toast.error("Please add comments to your review");
            return false;
        } else{
            dispatch(addRating({star: star, prodId: getProductId, comment: comment }));
            return true;
        }
        return false;
    }

  return (
    <div>
        <Meta title={productState?.title}></Meta>
        <BreadCrumb title={productState?.title}></BreadCrumb>
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props}></ReactImageZoom>
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                            {
                                productState?.images?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img 
                                                className='img-fluid' 
                                                src={item?.url} 
                                                alt={item?.public_id}
                                            />
                                        </div>                                                
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">Rs. {productState?.price}</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars 
                                        count={5}
                                        size={24}
                                        value={productState?.totalRating}
                                        edit={false}
                                        activeColor='#ffd700'
                                    ></ReactStars>
                                    <p className='mb-0 t-review'>({productState?.ratings?.length} Reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className="py-3">
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand :</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Category :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags :</h3>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Availability :</h3>
                                    <p className='product-data'>{productState?.quantity>0 ? "In Stock" : "Out of Stock"}</p>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size :</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                    </div>
                                </div>
                                {
                                    !alreadyAdded && <div>
                                        <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                            <h3 className='product-heading'>Color :</h3>
                                            <Color setColor={setColor} colorData={productState?.color}></Color>
                                        </div>
                                    </div>
                                }
                                
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    {
                                        !alreadyAdded && <div>
                                            <h3 className='product-heading'>Quantity :</h3>
                                            <div>
                                                <input 
                                                    type="number" 
                                                    min={1} 
                                                    max={10} 
                                                    className='form-control'
                                                    style={{"width": "70px"}} 
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    value={quantity}
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className={`d-flex align-items-center gap-30 ${alreadyAdded ? "" : "ms-5"}`}>
                                        <button 
                                            className='button border-0' 
                                            type='button'
                                            onClick={() => {alreadyAdded ? navigate("/cart") : uploadCart()}}
                                        >{alreadyAdded ? "Go to Cart" : "Add to Cart"}</button>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div>
                                        <button 
                                            className='border-0 bg-transparent'
                                            type='button'
                                            // onClick={}
                                        ><AiOutlineHeart className='fs-5 me-2'></AiOutlineHeart>Add to Wishlist</button>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns :</h3>
                                    <p className='product-data'>
                                        Free Shipping and Returns available on all orders! <br />
                                        We ship all Inidan domestic orders <b>within 5-10 business days</b>
                                    </p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'>Product Link :</h3>
                                    <a 
                                        href="javascript:void(0);" 
                                        onClick={() => {
                                            copyToClipboard(window.location.href);
                                        }}
                                    >Copy Product Link</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="description-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className='bg-white p-3'>
                            <p
                                dangerouslySetInnerHTML={{__html: productState?.description}}
                            ></p>
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="reviews-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id='review'>Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars 
                                            count={5}
                                            size={24}
                                            value={3}
                                            edit={false}
                                            activeColor='#ffd700'
                                        ></ReactStars>
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {
                                    orderedProduct &&
                                    (<div>
                                        <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                                    </div>)
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                                    <div>
                                        <ReactStars 
                                            count={5}
                                            size={24}
                                            value={star}
                                            edit={true}
                                            activeColor='#ffd700'
                                            onChange={(e) => setStar(e)}
                                        ></ReactStars>
                                    </div>
                                    <div>
                                        <textarea 
                                            name="" 
                                            id="" 
                                            cols="30" 
                                            rows="4" 
                                            className='w-100 form-control' 
                                            placeholder='Comments'
                                            onChange={(e) => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button onClick={addRatingToProduct} className='button border-0' type='button'>Submit Review</button>
                                    </div>
                            </div>
                            {
                                productState && productState?.ratings?.map((item, index) => {
                                    return (
                                        <div key={index} className="reviews mt-4">
                                            <div className="review">
                                                <div className='d-flex align-items-center gap-10'>
                                                    <h6 className='mb-0'>Lorem, ipsum.</h6>
                                                    <ReactStars 
                                                        count={5}
                                                        size={24}
                                                        value={item?.star}
                                                        edit={false}
                                                        activeColor='#ffd700'
                                                    ></ReactStars>
                                                </div>
                                                <p className='mt-3'>
                                                    {item?.comment}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
        </Container>

        <Container class1="popular-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Our Popular Products
              </h3>
            </div>
          </div>
          <div className="row">
            <ProductCard data={popularData ? popularData : []}></ProductCard>
          </div>
        </Container>

    </div>
  )
}

export default SingleProduct