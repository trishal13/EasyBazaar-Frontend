import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import gr from "../images/gr.svg";
import gr2 from "../images/gr2.svg";
import gr3 from "../images/gr3.svg";
import gr4 from "../images/gr4.svg";
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../features/products/productSlice';

const OurStore = () => {
  const dispatch = useDispatch();

  const [grid, setGrid] = useState(12);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // filter states
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  
  const productState = useSelector((state) => state?.product?.product);

  const getProducts = () => {
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  }

  useEffect(() => {
    getProducts();
  }, [sort,tag,brand,category,minPrice,maxPrice]);

  useEffect(() => {
    let newBrands = [];
    let newCategories = [];
    let newTags = [];
    for (let i=0 ; i<productState?.length ; i++){
      newBrands.push(productState[i]?.brand);
      newCategories.push(productState[i]?.category);
      newTags.push(productState[i]?.tags);
    }
    setBrands(newBrands);
    setCategories(newCategories);
    setTags(newTags);
  }, [productState]);


  return (
    <div>
      <Meta title={"Our Store"}></Meta>
      <BreadCrumb title="Our Store"></BreadCrumb>
      <Container class1="store-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className='ps-0'>
                    {
                      categories && [...new Set(categories)]?.map((item,index) => {
                        return (
                          <li 
                            key={index}
                            onClick={() => {setCategory(item)}}
                          >{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating">
                      <input 
                        type="number" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)} 
                      />
                      <label htmlFor="floatingInput1">From</label>
                    </div>
                    <div className="form-floating">
                      <input 
                        type="number" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="To" 
                        onChange={(e) => setMaxPrice(e.target.value)} 
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
                <div className='mt-4 mb-3'>
                  <h3 className="sub-title">Product Tags</h3>
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                    {
                      tags && [...new Set(tags)]?.map((item,index) => {
                        return (
                          <span 
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                            onClick={() => setTag(item)}
                          >{item}</span>
                        )
                      })
                    }
                  </div>
                </div>
                <div className=' mt-4 mb-3'>
                  <h3 className="sub-title">Product Brands</h3>
                  <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                    {
                      brands && [...new Set(brands)]?.map((item,index) => {
                        return (
                          <span 
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                            onClick={() => setBrand(item)}
                          >{item}</span>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className='d-flex justify-content-between align-items-center'>
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{"width": "100px"}}>Sort By: </p>
                    <select 
                      name="" 
                      id="" 
                      className='form-control form-select'
                      defaultValue={""}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="" disabled selected>Select</option>
                      <option value="title">Alphabetically (A-Z)</option>
                      <option value="-title">Alphabetically (Z-A)</option>
                      <option value="price">Price (low to high)</option>
                      <option value="-price">Price (high to low)</option>
                      <option value="createdAt">Date (old to new)</option>
                      <option value="-createdAt">Date (new to old)</option>
                    </select>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className="total-products mb-0">{productState ? productState.length : 0} Products</p>
                    <div className='d-flex gap-10 align-items-center grid'>
                      <img onClick={() => { setGrid(12) }} src={gr} className='d-block img-fluid' alt="grid" />
                      <img onClick={() => { setGrid(6) }} src={gr2} className='d-block img-fluid' alt="grid" />
                      <img onClick={() => { setGrid(4) }} src={gr3} className='d-block img-fluid' alt="grid" />
                      <img onClick={() => { setGrid(3) }} src={gr4} className='d-block img-fluid' alt="grid" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard data={productState ? productState : []} grid={grid}></ProductCard>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </div>
  )
}

export default OurStore;