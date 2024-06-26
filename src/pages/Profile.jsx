import React, { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../features/user/userSlice';
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    email: yup.string().email("Email should be valid").required("Email is required"),
    mobile: yup.string().required("Mobile is required"),
});

const Profile = () => {
    const dispatch = useDispatch();

    const userState = useSelector((state) => state?.auth?.user);

    const [edit, setEdit] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname || "",
            lastname: userState?.lastname || "",
            email: userState?.email || "",
            mobile: userState?.mobile || "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });
  return (
    <div>
        <Meta title="My Profile"></Meta>
        <BreadCrumb title="My Profile"></BreadCrumb>
        <Container class1="cart-wrapper home-wrapper-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='my-3'>Update Profile</h3>
                        <FiEdit className='fs-3' onClick={() => setEdit(false)}></FiEdit>
                    </div>
                </div>
                <div className="col-12">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="example1">First Name</label>
                        <input 
                            type="text" 
                            name='firstname' 
                            className="form-control" 
                            id="example1" 
                            placeholder="First Name" 
                            onChange={formik.handleChange("firstname")}
                            onBlur={formik.handleBlur("firstname")}
                            value={formik.values.firstname}
                            disabled={edit}
                        />
                        <div className="error ms-2 my-1">
                            {formik.touched.firstname && formik.errors.firstname}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="example2">Last Name</label>
                        <input 
                            type="text" 
                            name='lastname' 
                            className="form-control" 
                            id="example2" 
                            disabled={edit}
                            placeholder="Last Name" 
                            onChange={formik.handleChange("lastname")}
                            onBlur={formik.handleBlur("lastname")}
                            value={formik.values.lastname}
                        />
                        <div className="error ms-2 my-1">
                            {formik.touched.lastname && formik.errors.lastname}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="example3">Email address</label>
                        <input 
                            type="email" 
                            name='email' 
                            className="form-control" 
                            disabled={edit}
                            id="example3" 
                            aria-describedby="emailHelp" 
                            placeholder="Email" 
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            value={formik.values.email}
                        />
                        <div className="error ms-2 my-1">
                            {formik.touched.email && formik.errors.email}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="example4">Mobile</label>
                        <input 
                            type="tel" 
                            name='mobile' 
                            className="form-control" 
                            disabled={edit}
                            id="example4" 
                            placeholder="Mobile" 
                            onChange={formik.handleChange("mobile")}
                            onBlur={formik.handleBlur("mobile")}
                            value={formik.values.mobile}
                        />
                        <div className="error ms-2 my-1">
                            {formik.touched.mobile && formik.errors.mobile}
                        </div>
                    </div>
                    {
                        !edit && 
                        <button type="submit" className="btn btn-primary">Save</button>
                    }
                </form>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Profile;