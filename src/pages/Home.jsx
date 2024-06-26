import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialPoducts from '../components/SpecialPoducts';
import mainBanner1 from "../images/main-banner-1.jpg";
import catBanner1 from "../images/catbanner-01.jpg";
import catBanner2 from "../images/catbanner-02.jpg";
import catBanner3 from "../images/catbanner-03.jpg";
import catBanner4 from "../images/catbanner-04.jpg";
import brandIcon1 from "../images/brand-01.png";
import brandIcon2 from "../images/brand-02.png";
import brandIcon3 from "../images/brand-03.png";
import brandIcon4 from "../images/brand-04.png";
import brandIcon5 from "../images/brand-05.png";
import brandIcon6 from "../images/brand-06.png";
import brandIcon7 from "../images/brand-07.png";
import brandIcon8 from "../images/brand-08.png";
import Container from '../components/Container';
import { services } from '../utils/Data';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"; 
import { getAllBlogs } from '../features/blogs/blogSlice';
import { getAllProducts } from '../features/products/productSlice';

const Home = () => {
  const dispatch = useDispatch();

  const getBlogs = () => {
    dispatch(getAllBlogs());
  }
  const getProducts = () => {
    dispatch(getAllProducts());
  }

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);

  let popularData = [], featuredData = [];
  for (let i=0 ; i<productState?.length ; i++){
    if (productState[i]?.tags === "popular"){
      popularData.push(productState[i]);
    }
    else if (productState[i]?.tags === "featured"){
      featuredData.push(productState[i]);
    }
  }

  return (
    <div>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img 
                src={mainBanner1} 
                className='img-fluid rounded-3' 
                alt="main-banner" 
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S1+ Pro.</h5>
                <p>From $999.00 or %41.62/mo.</p>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img 
                  src={catBanner1} 
                  className='img-fluid rounded-3' 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S1+ Pro.</h5>
                  <p>From $999.00 <br />or %41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img 
                  src={catBanner2} 
                  className='img-fluid rounded-3' 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From $999.00 <br />or %41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img 
                  src={catBanner3} 
                  className='img-fluid rounded-3' 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>iPad S1+ Pro.</h5>
                  <p>From $999.00 <br />or %41.62/mo.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img 
                  src={catBanner4} 
                  className='img-fluid rounded-3' 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S1+ Pro.</h5>
                  <p>From $999.00 <br />or %41.62/mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {
                services?.map((i, j) => {
                  return (
                    <div className="d-flex align-items-center gap-15" key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.title}</h6>
                        <p className="mb-0">{i.tagline}</p>
                      </div>
                    </div>    
                  )
                })
              }
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
      <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Featured Collection
              </h3>
            </div>
            <ProductCard data={featuredData ? featuredData : []}></ProductCard>
          </div>

      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            {
              productState && productState?.map((item, index) => {
                if (item.tags === "special"){
                  return (
                    <SpecialPoducts 
                      key={index}
                      id={item?._id}
                      title={item?.title}
                      brand={item?.brand}
                      totalrating={item?.totalRating}
                      price={item?.price}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      url={item?.images[0]?.url}
                    ></SpecialPoducts>
                  )
                }
              })
            }
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

      <Container class1="marquee-wrapper home-wrapper-2 py-5">
      <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'><img src={brandIcon1} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon2} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon3} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon4} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon5} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon6} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon7} alt="brand" /></div>
                  <div className='mx-4 w-25'><img src={brandIcon8} alt="brand" /></div>
                </Marquee>
              </div>
            </div>
          </div>

      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
      <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Our Latest Blogs
              </h3>
            </div>
          </div>
          <div className="row">
            {
              blogState && blogState?.map((item, index) => {
                if (index<=3){
                  return (
                    <div className="col-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.url}
                        date={moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}                      
                      ></BlogCard>
                    </div>
                  )
                }
              })
            }
          </div>

      </Container>
    </div>
  )
}

export default Home;