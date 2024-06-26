import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import crossIcon from "../images/cross.svg";
import tab from "../images/tab.jpg";
import Container from '../components/Container';

const CompareProduct = () => {
  return (
    <div>
        <Meta title={"Compare Products"}></Meta>
        <BreadCrumb title="Compare Products"></BreadCrumb>
        <Container class1="compare-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={crossIcon} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={tab} alt="tablet" className='img-fluid' />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">
                                    Honor T1 7.0 1GB RAM 8GB ROM 7 inch with Wi-Fi + 3G Tablet
                                </h5>
                                <h6 className="price mb-3 mt-3">$ 100.00</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type:</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU:</h5>
                                        <p>SKU003</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color:</h5>
                                        <Color></Color>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={crossIcon} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={tab} alt="tablet" className='img-fluid' />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">
                                    Honor T1 7.0 1GB RAM 8GB ROM 7 inch with Wi-Fi + 3G Tablet
                                </h5>
                                <h6 className="price mb-3 mt-3">$ 100.00</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type:</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU:</h5>
                                        <p>SKU003</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color:</h5>
                                        <Color></Color>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={crossIcon} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={tab} alt="tablet" className='img-fluid' />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">
                                    Honor T1 7.0 1GB RAM 8GB ROM 7 inch with Wi-Fi + 3G Tablet
                                </h5>
                                <h6 className="price mb-3 mt-3">$ 100.00</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type:</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU:</h5>
                                        <p>SKU003</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color:</h5>
                                        <Color></Color>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={crossIcon} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={tab} alt="tablet" className='img-fluid' />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">
                                    Honor T1 7.0 1GB RAM 8GB ROM 7 inch with Wi-Fi + 3G Tablet
                                </h5>
                                <h6 className="price mb-3 mt-3">$ 100.00</h6>
                                <div>
                                    <div className="product-detail">
                                        <h5>Brand:</h5>
                                        <p>Havels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type:</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU:</h5>
                                        <p>SKU003</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Availability:</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color:</h5>
                                        <Color></Color>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size:</h5>
                                        <div className='d-flex gap-10'>
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
        </Container>
    </div>
  )
}

export default CompareProduct