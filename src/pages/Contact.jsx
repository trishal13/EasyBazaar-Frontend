import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from '../components/Container';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from '../features/contact/contactSlice';

const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email must be valid").required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
  comment: yup.string().required("Comments are required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });

  return (
    <div>
      <Meta title={"Contact Us"}></Meta>
      <BreadCrumb title="Contact Us"></BreadCrumb>
      <Container class1="contaact-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.907236421552!2d77.40919597477578!3d23.210051009306866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c42e32228d803%3A0x83f7a3c5cb7a21b9!2s8%2C%20Hostel%20Rd%2C%20Maulana%20Azad%20National%20Institute%20of%20Technology%2C%20Bhopal%2C%20Madhya%20Pradesh%20462007!5e0!3m2!1sen!2sin!4v1716620991598!5m2!1sen!2sin" 
                width="600" 
                height="450" 
                className="border-0 w-100" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                    <div>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Name' 
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                    </div>
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>

                    <div>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder='Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")} 
                      />
                    </div>        
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
            
                    <div>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder='Mobile Number' 
                        name='mobile'
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                    </div>
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>              
                    <div>
                      <textarea 
                        name="comment" 
                        id="" 
                        cols="30" 
                        rows="4" 
                        className='w-100 form-control' 
                        placeholder='Comments'
                        value={formik.values.comment}
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                      ></textarea>
                    </div>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>

                    <div>
                      <button className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get In Touch With Us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineHome className='fs-5' />
                        <address className='mb-0'>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, reprehenderit.
                        </address>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiPhoneCall className='fs-5' />
                        <a href="tel:+91 xxxxxxxxxx">+91 xxxxxxxxxx</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineMail className='fs-5' />
                        <a href="mailto: ">demoecommerce@gmail.com</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiInfoCircle className='fs-5' />
                        <p className="mb-0">Monday - Friday 10AM - 8PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </div>
  )
}

export default Contact;