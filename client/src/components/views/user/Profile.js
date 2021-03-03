import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getCountry, getState, getCity, getLanguage } from "../../../_actions/user.action";
import { updateProfile, getProfile } from "../../../_actions/profile.action";
import { useToasts } from 'react-toast-notifications'

const Profile = (props) => {
   const { addToast } = useToasts()
   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);
   const [countrylist, setCountrylist] = useState([]);
   const [stateList, setStateList] = useState([]);
   const [cityList, setCityList] = useState([]);
   const [state, setState] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [city, setCity] = useState('');
   const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);
   const countries = useSelector((state) => state.user && state.user.countries && state.user.countries.responseData && state.user.countries.responseData.countries);
   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);
   useEffect(() => {
      dispatch(getProfile()).then((profile) => {
         
         dispatch(getState(profile.user.country)).then((response) => {
            setStateList(response.responseData.states);
         });
         dispatch(getCity(profile.user.state)).then((response) => {
            setCityList(response.responseData.cities);
         });

      });
      dispatch(getCountry())
      dispatch(getLanguage())



   }, []);



   //console.log('profile', profile);



   const handleCountryChange = async (value, setFieldValue) => {
      setCountrylist(value);
      setFieldValue('country', value);
      if (value) {
         dispatch(getState(value)).then((response) => {
            setStateList(response.responseData.states);
            setCityList([]);
         });
      }

   }

   const handleStateChange = async (value, setFieldValue) => {
      if (value) {

       setFieldValue('state', value);
       setState(value);
         dispatch(getCity(value)).then((response) => {
            setCityList(response.responseData.cities);
         });
      }

   }

   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: profile ? profile._id : '',
            first_name: profile ? profile.firstName : '',
            last_name: profile ? profile.lastName : '',
            email: profile ? profile.email : '',
            mobile: profile ? profile.mobile : '',
            city: profile ? profile.city : '',
            country: profile ? profile.country : '',
            state: profile ? profile.state : '',
            profile_photo: profile ? profile.profilePhoto : '',
            cover_photo: profile ? profile.coverPhoto : '',
            headline: profile ? profile.headline : '',
            description: profile ? profile.description : ''
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
            city: Yup.string()
               .required('City is required'),
            country: Yup.string()
               .required('Country is required'),
            state: Yup.string()
               .required('State is required'),
            headline: Yup.string()
               .required('Headline is required'),
            description: Yup.string()
               .required('Description is required')

         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("value", values);
            const data = new FormData();
            data.append("id", profile._id);
            data.append("first_name", values.first_name);
            data.append("last_name", values.last_name);
            data.append("email", values.email);
            data.append("mobile", values.mobile);
            data.append("city", values.city);
            data.append("country", values.country);
            data.append("state", values.state);
            data.append("headline", values.headline);
            data.append("description", values.description);
            data.append("cover_photo", values.cover_photo);
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
                                       <li className="nav-item">
                                          <Link to="/account" className="nav-link">
                                             Account Settings              </Link>
                                       </li>
                                       <li className="nav-item">
                                          <Link to="/mygigs" className="nav-link">
                                             My Gigs                    </Link>
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
                                                   {/* <!-- form-group row Starts --> */}
                                                   <label className="col-md-4 col-form-label"> Country </label>
                                                   <div className="col-md-8">
                                                      <Field as="select" id="country" name="country" className={'form-control mb-3' + (errors.country && touched.country ? ' is-invalid' : '')} onChange={(e) => { handleCountryChange(e.currentTarget.value, setFieldValue) }} >
                                                         <option value="">Select Country</option>

                                                         {countries && countries.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleCountryChange}>{c_list.name}</option>))}

                                                      </Field>
                                                      <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>
                                                {/* <!-- form-group row Ends --> */}

                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> State </label>
                                                   <div className="col-md-8">
                                                      {countrylist && (<Fragment><select name="state" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} value={ state != '' ? state : profile && profile.state } onChange={(e) => { handleStateChange(e.currentTarget.value, setFieldValue) }} >

                                                         <option value="">Select state</option>

                                                         {stateList && stateList.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                                      </select>
                                                         <ErrorMessage name="state" component="div" className="invalid-feedback" /> </Fragment>)}
                                                   </div>
                                                </div>


                                                {/* <!-- form-group row Ends --> */}
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> City </label>
                                                   
                                                   <div className="col-md-8">
                                                      {stateList && (<Fragment><select name="city" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} value={ city != '' ? city : profile && profile.city} onChange={(e) => { setFieldValue('city', e.currentTarget.value); setCity(e.currentTarget.value); }} >

                                                         <option value="">Select City</option>

                                                         {cityList && cityList.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                                      </select>
                                                         <ErrorMessage name="city" component="div" className="invalid-feedback" /> </Fragment>)}
                                                   </div>
                                                </div>

                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Profile Photo </label>
                                                   <div className="col-md-8">
                                                      <input type="file" name="profile_photo" onChange={(e) => { setFieldValue("profile_photo", e.currentTarget.files[0]) }} className={'form-control' + (errors.profile_photo && touched.profile_photo ? ' is-invalid' : '')} />

                                                      <p className="mt-2">
                                                         This photo is your identity on GigToDo. <br />It appears on your profile, messages and proposals/services pages.
                                             </p>
                                                      <img src={values.profilePhoto} />
                                                   </div>
                                                </div>
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Cover Photo </label>
                                                   <div className="col-md-8">
                                                      <input type="file" name="cover_photo" id="cover" onChange={(e) => { setFieldValue("cover_photo", e.currentTarget.files[0]) }} className={'form-control' + (errors.cover_photo && touched.cover_photo ? ' is-invalid' : '')} />
                                                      <p className="mt-2">
                                                         This is your cover photo on your <a target="_blank" className="text-success" href="#">Profile Page</a>
                                                      </p>
                                                      <img src={values.coverPhoto} width="80" className="img-thumbnail img-circle" />
                                                   </div>
                                                </div>
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Description </label>
                                                   <div className="col-md-8">
                                                      <Field as="textarea" name="description" value={values.description} onChange={handleChange} maxLength={100} placeholder="Description" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                                      <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>
                                                <div className="form-group row">
                                                   <label className="col-md-4 col-form-label"> Headline</label>
                                                   <div className="col-md-8">
                                                      <Field type="text" id="headline" name="headline" value={values.headline} onChange={handleChange} maxLength={100} placeholder="Headline" className={'form-control' + (errors.headline && touched.headline ? ' is-invalid' : '')} />
                                                      <ErrorMessage name="headline" component="div" className="invalid-feedback" />
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