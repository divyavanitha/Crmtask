import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { updateProfile, getProfile } from "../../../../_actions/profile.action";
import { useToasts } from 'react-toast-notifications'

const Profile = (props) => {
   const { addToast } = useToasts()
   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(false);
   const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);
   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);
   useEffect(() => {
      dispatch(getProfile()).then((profile) => {
         

      });


   }, []);



   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: profile ? profile._id : '',
            first_name: profile ? profile.firstName : '',
            last_name: profile ? profile.lastName : '',
            email: profile ? profile.email : '',
            mobile: profile ? profile.mobile : '',
            profile_photo: profile ? profile.profilePhoto : '',
           
         }
         }

         validationSchema={Yup.object().shape({
            first_name: Yup.string()
               .required('First Name is required'),
            last_name: Yup.string()
               .required('Last Name is required'),
            email: Yup.string()
               .required('Email is required'),
            mobile: Yup.string()
               .required('Mobile is required'),

         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("value", values);
            const data = new FormData();
            data.append("id", profile._id);
            data.append("first_name", values.first_name);
            data.append("last_name", values.last_name);
            data.append("email", values.email);
            data.append("mobile", values.mobile);
            data.append("profile_photo", values.profile_photo);
            setIsLoading(true)
            dispatch(updateProfile(data)).then(res => {
               addToast(res.message, { appearance: res.status, autoDismiss: true, })
               setIsLoading(false)
               //window.location.reload();
            })


            setSubmitting(false);

         }}>

         {props => {
            const {
               values,
               touched,
               errors,
               dirty,
               isSubmitting,
               handleChange,
               handleBlur,
               handleSubmit,
               handleReset,
               setFieldValue,
            } = props;

            return (
               <Fragment>

                  <div className="container mt-5 mb-5 myProfileContainer" id="myProfile">



                     <div className="row terms-page" >
                        <div className="col-md-3 mb-3">
                           <div className="mpLeft">
                              <div className="card">
                                 <div className="card-body">
                                    <div className="welcome-box">
                                       <center>
                                          <img src={profile && profile.profilePhoto} className="img-fluid rounded-circle mb-3" />
                                       </center>
                                       <h5>Welcome, <span className="text-success">{profile && profile.firstName}</span> </h5>
                                    </div>
                                    {/* <!-- <hr /> --> */}
                                    <ul className="nav nav-pills flex-column mt-2">
                                       <li className="nav-item">
                                          <Link to="/profile" className="nav-link active">
                                             Profile Settings            </Link>
                                       </li>
                                       
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-9">
                           <div className="mpRight">
                              <div className="">
                                 <div className="tab-content">


                                    <div id="profile_settings" className="tab-pane fade active show">
                                       <div className="card">
                                          <div className="card-header">
                                             <h2>Profile Settings</h2>
                                          </div>
                                          <div className="card-body">
                                             <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> First Name </label>
                                                   <div className="col-md-8">
                                                      <Field type="text" name="first_name" value={values.first_name} onChange={handleChange} maxLength={100} placeholder="First Name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                                      <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Last Name </label>
                                                   <div className="col-md-8">
                                                      <Field type="text" name="last_name" value={values.last_name} onChange={handleChange} maxLength={100} placeholder="Last Name" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                                      <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Email </label>
                                                   <div className="col-md-8">
                                                      <Field type="text" name="email" value={values.email} onChange={handleChange} maxLength={100} placeholder="E-mail" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>

                                                 <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Profile Photo </label>
                                                   <div className="col-md-8">
                                                      <input type="file" name="profile_photo" onChange={(e) => { setFieldValue("profile_photo", e.currentTarget.files[0]) }} className={'form-control' + (errors.profile_photo && touched.profile_photo ? ' is-invalid' : '')} />

                                                     
                                                      <img src={values.profilePhoto} />
                                                   </div>
                                                </div>
                                               
                                                <hr />
                                                <button type="submit" name="submit" className="btn btn-success float-right" >
                                                   <i className="fa fa-floppy-o"></i> Save Changes  </button>
                                             </form>


                                          </div>
                                       </div>
                                    </div>

                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>



                  </div>



               </Fragment>
            );
         }}
      </Formik>
   );
};

export default Profile;