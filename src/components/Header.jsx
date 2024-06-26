import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import wishlist from "../images/wishlist.svg";
import userIcon from "../images/user.svg";
import cartIcon from "../images/cart.svg";
import menuIcon from "../images/menu.svg";
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from '../features/products/productSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [totalAmount, setTotalAmount] = useState(null);
    const [paginate, setPaginate] = useState(true);
    const [productOpt, setProductOpt] = useState([]);

    const userCartState = useSelector((state) => state?.auth?.cartProducts);
    const authState = useSelector((state) => state?.auth);
    const productState = useSelector((state) => state?.product?.product);

    useEffect(() => {
        if (authState?.user){
            dispatch(getUserCart());
        }
    }, [])

    useEffect(() => {
        let sum = 0;
        for (let i=0 ; i<userCartState?.length ; i++){
            sum += (userCartState[i]?.quantity * userCartState[i]?.price);
        }
        setTotalAmount(sum);
    }, [userCartState]);

    useEffect(() => {
        let data = [];
        for (let i=0 ; i<productState?.length ; i++){
            data.push({
                id: i,
                prod: productState[i]?._id,
                name: productState[i]?.title,
            });
        }
        setProductOpt(data);
    }, [productState]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    
  return (
    <div>
        <header className="header-top-strip py-3">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-6">
                        <p className='text-white mb-0'>Free Shipping Over Rs. 999 & Free Returns</p>
                    </div>
                    <div className="col-6">
                        <p className='text-end text-white mb-0'>
                            Hotline: <a className='text-white' href="tel:+91 xxxxxxxxxx">+91 xxxxxxxxxx</a>
                        </p>
                    </div>
                </div>
            </div>
        </header>

        <header className="header-upper py-3">
            <div className="container-xxl">
                <div className="row align-items-center">
                    <div className="col-2">
                        <h2>
                            <Link className='text-white'>EasyBazaar</Link>
                        </h2>
                    </div>
                    <div className="col-5">
                        <div className="input-group">
                            <Typeahead
                                id=''
                                onPaginate={() => {}}
                                minLength={2}
                                options={productOpt}
                                paginate={paginate}
                                labelKey={"name"}
                                placeholder='Search Product Here...'
                                onChange={(selected) => {
                                    navigate(`/product/${selected[0]?.prod}`)
                                    dispatch(getAProduct(selected[0]?.prod))
                                }}
                            />
                        <span className="input-group-text p-3" id="basic-addon2">
                            <BsSearch className='fs-6'/>
                        </span>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="header-upper-links d-flex align-items-center justify-content-between">
                            <div>
                                <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white'>
                                    <img src={wishlist} alt="wishlist" />
                                    <p className='mb-0'>Favourite <br /> Wishlist</p>
                                </Link>
                            </div>
                            <div>
                                <Link 
                                    to={!authState?.user ? "/login" : "/my-profile"} 
                                    className='d-flex align-items-center gap-10 text-white'
                                >
                                    <img src={userIcon} alt="user" />
                                    {
                                        !authState?.user ? 
                                        (
                                            <p className='mb-0'>
                                                Login <br /> My Account
                                            </p>
                                        ) :
                                        (
                                            <p className='mb-0'>
                                                Welcome <br /> {authState?.user?.firstname}
                                            </p>
                                        )
                                    }
                                </Link>
                            </div>
                            <div>
                                <Link to="/cart" className='d-flex align-items-center gap-10 text-white'>
                                    <img src={cartIcon} alt="cart" />
                                    <div className='d-flex flex-column gap-10'>
                                        <span className="badge bg-white text-dark">{userCartState?.length}</span>
                                        <p className='mb-0'>Rs. {totalAmount ? totalAmount : 0}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <header className="header-bottom py-3">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="menu-bottom d-flex align-items-center gap-30">
                            <div>
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" 
                                        type="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        <img src={menuIcon} alt="menu" />
                                        <span className='me-5 d-inline-block'>Shop Categories</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                                        <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                                        <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='menu-links'>
                                <div className='d-flex align-items-center gap-15'>
                                    <NavLink to='/'>Home</NavLink>
                                    <NavLink to='/product'>Our Store</NavLink>
                                    <NavLink to='/my-orders'>My Orders</NavLink>
                                    <NavLink to='/blogs'>Blogs</NavLink>
                                    <NavLink to='/contact'>Contact</NavLink>
                                    <button 
                                        className='border border-0 bg-transparent text-white text-uppercase' 
                                        type='button'
                                        onClick={handleLogout}
                                    >Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header;