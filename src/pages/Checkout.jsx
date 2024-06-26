import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { base_url, config } from '../utils/axiosConfig';
import { createAnOrder, deleteUserCart, resetState } from '../features/user/userSlice';

const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    pincode: yup.number().required("Pincode is required"),
    other: yup.string(),
});

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartState = useSelector((state) => state?.auth?.cartProducts);
    const userState = useSelector((state) => state?.auth?.user);
    const authState = useSelector((state) => state?.auth);
    
    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({razorpayPaymentId: "", razorpayOrderId: ""});
    const [cartProduct, setCartProducts] = useState([]);
    
    useEffect(() => {
        let sum = 0;
        for (let i=0 ; i<cartState?.length ; i++){
            sum += (cartState[i]?.quantity * cartState[i]?.price);
        }
        setTotalAmount(sum);
    }, [cartState]);

    useEffect(() => {
        if (authState?.orderedProduct?.order && authState?.orderedProduct?.success){
            navigate("/my-orders");
        }
    }, [authState]);
    
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            other: "",
        },
        validationSchema: shippingSchema,
        onSubmit: async (values) => {
            setShippingInfo(values);
            setTimeout(() => {
                checkoutHandler();
            }, 300);
        },
    });

    useEffect(() => {
        let items = [];
        for (let i=0 ; i<cartState?.length ; i++){
            items.push({
                product: cartState[i]?.productId?._id,
                quantity: cartState[i]?.quantity,
                color: cartState[i]?.color?._id,
                price: cartState[i]?.price,
            });
        }
        setCartProducts(items);
    }, []);
    
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        });
    }

    const checkoutHandler = async () => {
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!response){
            alert("Razorpay SKD failed to load!");
            return ;
        }
        const result = await axios.post(`${base_url}user/order/checkout`, {amount: (totalAmount<=999 ? totalAmount+100 : totalAmount)}, config);
        if (!result){
            alert("Something went wrong!");
            return ;
        }
        const { amount, id: order_id, currency } = result.data.order;
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "Mera Project",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const result = await axios.post(`${base_url}user/order/paymentVerification`, data, config);
                setPaymentInfo({
                    razorpayPaymentId: result?.data?.razorpayPaymentId,
                    razorpayOrderId: result?.data?.razorpayOrderId,
                });

                console.log(paymentInfo);

                dispatch(createAnOrder({
                    totalPrice: (totalAmount<=999 ? totalAmount+100 : totalAmount), 
                    totalPriceAfterDiscount: totalAmount, 
                    orderItems: cartProduct,
                    paymentInfo,
                    shippingInfo,
                }));
                dispatch(deleteUserCart());
                dispatch(resetState());
            },
            prefill: {
                name: "Mera Project",
                email: "meraproject@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Mera Project Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

  return (
    <div>
        <Container class1="checkout-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-7">
                    <div className="checkout-left-data">
                        <h3 className="website-name">EasyBazaar</h3>
                        <nav style={{"--bs-breadcrumb-divider": '>'}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/cart" className='text-dark total-price'>Cart</Link>
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Information
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active">
                                    Shipping
                                </li>
                                &nbsp; /
                                <li className="breadcrumb-item total-price active">
                                    Payment
                                </li>
                            </ol>
                        </nav>
                        <h4 className="title total">Contact Information</h4>
                        <p className="user-details total">
                            {`${userState?.firstname} ${userState?.lastname} (${userState?.email})`}
                        </p>
                        <h4 className='mb-3'>Shipping Address</h4>
                        <form action="" onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between'>
                            <div className='w-100'>
                                <select 
                                    id="" 
                                    className='form-control form-select'
                                    name="country" 
                                    onChange={formik.handleChange("country")}
                                    onBlur={formik.handleBlur("country")}
                                    value={formik.values.country}
                                >
                                    <option value="" selected disabled>Select Country</option>
                                    <option value="India">India</option>
                                </select>
                                <div className="error ms-2 my-1">
                                    {formik.touched.country && formik.errors.country}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='First Name' 
                                    className="form-control" 
                                    name="firstName" 
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                    value={formik.values.firstName}
                                />
                                <div className="error ms-2 my-1">
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='Last Name' 
                                    className="form-control" 
                                    name="lastName" 
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                    value={formik.values.lastName}
                                />
                                <div className="error ms-2 my-1">
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>
                            <div className='w-100'>
                                <input 
                                    type="text" 
                                    placeholder='Address' 
                                    className="form-control" 
                                    name="address" 
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                    value={formik.values.address}
                                />
                                <div className="error ms-2 my-1">
                                    {formik.touched.address && formik.errors.address}
                                </div>
                            </div>
                            <div className='w-100'>
                                <input 
                                    type="text" 
                                    placeholder='Apartment, suite etc. (optional)' 
                                    className="form-control" 
                                    name="other" 
                                    onChange={formik.handleChange("other")}
                                    onBlur={formik.handleBlur("other")}
                                    value={formik.values.other}
                                />
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='City' 
                                    className="form-control" 
                                    name="city" 
                                    onChange={formik.handleChange("city")}
                                    onBlur={formik.handleBlur("city")}
                                    value={formik.values.city}
                                />
                                <div className="error ms-2 my-1">
                                    {formik.touched.city && formik.errors.city}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <select 
                                    id="" 
                                    className='form-control form-select'
                                    name="state" 
                                    onChange={formik.handleChange("state")}
                                    onBlur={formik.handleBlur("state")}
                                    value={formik.values.state}
                                >
                                    <option value="" selected disabled>Select State</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                </select>
                                <div className="error ms-2 my-1">
                                    {formik.touched.state && formik.errors.state}
                                </div>
                            </div>
                            <div className='flex-grow-1'>
                                <input 
                                    type="text" 
                                    placeholder='Pincode' 
                                    className="form-control" 
                                    name="pincode" 
                                    onChange={formik.handleChange("pincode")}
                                    onBlur={formik.handleBlur("pincode")}
                                    value={formik.values.pincode}
                                />
                                <div className="error ms-2 my-1">
                                    {formik.touched.pincode && formik.errors.pincode}
                                </div>
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="/cart" className='text-dark'><BiArrowBack className='me-2'></BiArrowBack>Return to Cart</Link>
                                    <Link to="" className="button">Continue to Shipping</Link>
                                    <button className='button' type='submit'>Place Order</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-5">         
                    <div className='border-bottom py-4'>
                        {
                            cartState && cartState?.map((item, index) => {
                                return (
                                    <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                                        <div className='w-75 d-flex gap-10'>
                                            <div className='w-25 position-relative'>
                                                <span 
                                                    className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
                                                    style={{"top": "-10px", "right": "2px"}}
                                                >{item?.quantity}</span>
                                                <img width={100} height={100} src={item?.productId?.images[0]?.url} alt="product" />
                                            </div>
                                            <div>
                                                <h5 className="total-price">{item?.productId?.title}</h5>
                                                <p className='total-price'>{item?.color?.title}</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <h5 className='total'>Rs. {item?.price * item?.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='border-bottom py-4'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='total'>Subtotal</p>
                            <p className='total-price'>Rs. {totalAmount ? totalAmount : 0}</p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className='mb-0 total'>Shipping</p>
                            <p className='mb-0 total-price'>Rs. {totalAmount<=999 ? "100" : "0"}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                        <h4 className='total'>Total</h4>
                        <h5 className='total-price'>Rs. {totalAmount ? (totalAmount<=999 ? totalAmount+100 : totalAmount) : 0}</h5>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Checkout;