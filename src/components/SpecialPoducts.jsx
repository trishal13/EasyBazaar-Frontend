import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import watch from "../images/watch.jpg";

const SpecialPoducts = (props) => {
    const { title, brand, totalrating, price, sold, quantity, id, url } = props;
  return (
    <div className='col-6 mb-3'>
        <div className="special-product-card">
            <div className='d-flex justify-content-between'>
                <div>
                    <img src={url ? url : watch} className='img-fluid' alt="watch" />
                </div>
                <div className='special-product-content'>
                    <h5 className="brand">{brand}</h5>
                    <h6 className="title">{title}</h6>
                    <ReactStars 
                        count={5}
                        size={24}
                        value={Number(totalrating)}
                        edit={false}
                        activeColor='#ffd700}'
                    ></ReactStars>
                    <p className="price"><span className="red-p">Rs. {price}</span></p>
                    <div className="prod-count my-3">
                        <p>Products: {quantity}</p>
                        <div className="progress">
                            <div 
                                className="progress-bar" 
                                role="progressbar" 
                                style={{width: (quantity*100)/(sold+quantity)+"%"}} 
                                aria-valuenow={(quantity*100)/(sold+quantity)} 
                                aria-valuemin={quantity} 
                                aria-valuemax={sold+quantity}
                            ></div>
                        </div>
                    </div>
                    <Link className="button" to={`/product/${id}`}>View</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SpecialPoducts;