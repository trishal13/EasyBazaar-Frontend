import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import crossIcon from "../images/cross.svg";
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishList } from '../features/products/productSlice';

const Wishlist = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        getWishlistFromDb();
    }, []);

    const getWishlistFromDb = () => {
      dispatch(getUserProductWishlist());
    }

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

    const removeFromWishlist = (id) => {
        dispatch(addToWishList(id));
        setTimeout(() => {
            dispatch(getUserProductWishlist());
        }, 300);
    }

  return (
    <div>
        <Meta title={"Wishlist"}></Meta>
        <BreadCrumb title="Wishlist"></BreadCrumb>
        <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {
                        (!wishlistState || wishlistState?.length === 0) && 
                        <div className='text-center fs-3'>No Data</div>
                    }
                    {
                        wishlistState && wishlistState?.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <div className="wishlist-card position-relative">
                                        <img 
                                            src={crossIcon} 
                                            alt="cross" 
                                            className="position-absolute cross img-fluid"
                                            onClick={() => removeFromWishlist(item?._id)}
                                        />
                                        <div className="wishlist-card-image bg-white">
                                            <img 
                                                src={item?.images[0]?.url ? item?.images[0]?.url : ""} 
                                                alt={item?.images[0]?.public_id ? item?.images[0]?.public_id : "image"} 
                                                className='img-fluid d-block mx-auto'
                                                width={160}
                                            />
                                        </div>
                                        <div className='py-3 px-3'>
                                            <h5 className='title'>
                                                {item?.title}
                                            </h5>
                                            <h6 className="price">Rs. {item?.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        </Container>
    </div>
  )
}

export default Wishlist;