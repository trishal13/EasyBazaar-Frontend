import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from 'react-router-dom';
import wish from "../images/wish.svg";
import tv from "../images/tv.jpg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishList } from '../features/products/productSlice';

const ProductCard = (props) => {
    const { grid, data } = props;
    let location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToWishlist = (prodId) => {
        dispatch(addToWishList(prodId));
    }

  return (
      <div className={`${location.pathname === "/product" ? "" : 'd-flex gap-30'}`}>
        {
            data?.map((item, index) => {
                return (
                    <div className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
                        <div 
                            key={index}
                            className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                                <button 
                                    className='border-0 bg-transparent'
                                    onClick={(e) => addToWishlist(item?._id)}
                                ><img src={wish} alt="wishlist" /></button>
                            </div>
                            <div className="product-image">
                                <img 
                                    src={item?.images[0]?.url} 
                                    className='img-fluid mx-auto' 
                                    alt="product-image" 
                                    width={160}
                                />
                                <img 
                                    src={tv}
                                    className='img-fluid' 
                                    alt="product-image" 
                                />
                            </div>
                            <div className="product-details">
                                <h6 className="brand">{item?.brand}</h6>
                                <h5 className='product-title'>
                                    {item?.title}
                                </h5>
                                <ReactStars 
                                    count={5}
                                    size={24}
                                    value={Number(item?.totalRating)}
                                    edit={false}
                                    activeColor='#ffd700'
                                ></ReactStars>
                                <p 
                                    dangerouslySetInnerHTML={{ __html: item?.description }}
                                    className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                                >
                                </p>
                                <p className="price">Rs. {item?.price}</p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className='d-flex flex-column gap-15'>
                                    <button className='border-0 bg-transparent'><img onClick={() => navigate(`/product/${item?._id}`)} src={view} alt="view" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ProductCard;