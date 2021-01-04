import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { getCountry, getState, getCity, getLanguage } from "../../../_actions/user.action";
import { updateProfile, getProfile } from "../../../_actions/profile.action";

const Profile = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);
   const [countrylist, setCountrylist] = useState('');
   const [stateList, setStateList] = useState([]);
   const [cityList, setCityList] = useState([]);

   useEffect(() => {
      dispatch(getProfile())
      dispatch(getCountry())
      dispatch(getLanguage())
      

   }, [params.id]);

const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);
const countries = useSelector((state) => state.user && state.user.countries && state.user.countries.responseData && state.user.countries.responseData.countries);
const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);

console.log('profile', profile);

const handleCountryChange = async (value, setFieldValue) => {
      setCountrylist(value);
      if (value) {
         setFieldValue('country', value);
         const state = await dispatch(getState(value));
         console.log('state', state);
         if (state && state.responseData.states) {
            setStateList(state.responseData.states)
         }
      }

   }

const handleStateChange = async (value, setFieldValue) => {
      //setCountrylist(value);
      console.log('state_id', value);
      if (value) {
         setFieldValue('state', value);
         const city = await dispatch(getCity(value));
         console.log('city', city);
         if (city && city.responseData.cities) {
            setCityList(city.responseData.cities)
         }
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

                
                 dispatch(updateProfile(data)).then(res => {
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
                                 <a data-toggle="pill" href="#profile_settings" className="nav-link active">
                                    Profile Settings            </a>
                              </li>
                              <li className="nav-item">
                                 <a data-toggle="pill" href="#account_settings" className="nav-link">
                                    Account Settings              </a>
                              </li>
                              <li className="nav-item">
                                 <a data-toggle="pill" href="#my_proposal" className="nav-link">
                                    My proposal                    </a>
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
                                           {countrylist && (<Fragment><select name="state" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} onChange={(e) => { handleStateChange(e.currentTarget.value, setFieldValue) }} >

                                                <option value="">Select state</option>

                                                {stateList.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                             </select>
                                                <ErrorMessage name="state" component="div" className="invalid-feedback" /> </Fragment>)}
                                          </div>
                                       </div>

                                       
                                       {/* <!-- form-group row Ends --> */}
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> City </label>
                                          <div className="col-md-8">
                                           {stateList && (<Fragment><select name="city" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} onChange={(e) => { setFieldValue('city', e.currentTarget.value); }} >

                                                <option value="">Select City</option>

                                                {cityList.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
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
                           <div id="account_settings" className="tab-pane fade">
                              <div className="card">
                                 <div className="card-header">
                                    <h2>Account Settings</h2>
                                 </div>
                                 <div className="card-body">
                                    <h5 className="mb-4"> PayPal For Withdrawing Revenue </h5>
                                    <form method="post" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Enter Paypal Email </label>
                                          <div className="col-md-8">
                                             <input type="text" name="seller_paypal_email" value="shoail@gigtodo.com" placeholder="Enter Paypal email" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <button type="submit" name="submit_paypal_email" className="btn btn-success float-right">
                                          Change Paypal Email  </button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> Moneygram For Withdrawing Revenue </h5>
                                    <form method="post" enctype="multipart/form-data" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Id Type </label>
                                          <div className="col-md-8">
                                             <select name="id_type" className="form-control" required="">
                                                <option value="$type">Passport</option>
                                                <option value="$type">National Id</option>
                                                <option value="$type">Drivers License</option>
                                             </select>
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Id File </label>
                                          <div className="col-md-8">
                                             <input type="file" name="id_file" className="form-control" id="cover" />
                                             <small className="text-muted">Please Upload Id Front And Back In Zip Format.</small>
                                             <p className="mb-0 small"><a href="plugins/paymentGateway/id_files/video-animation_1599467170.png" className="text-primary" download=""><i className="fa fa-download"></i> video-animation_1599467170.png</a></p>
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Full Name </label>
                                          <div className="col-md-8">
                                             <input type="text" name="full_name" value="Tyrone" className="form-control" placeholder="Full Name" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Address/Location </label>
                                          <div className="col-md-8">
                                             <input type="text" name="address" className="form-control" value="newyork" placeholder="Address" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Mobile No </label>
                                          <div className="col-md-8">
                                             <input type="number" name="mobile_no" className="form-control" value="186363737" placeholder="Mobile No" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Preferred Currency </label>
                                          <div className="col-md-8">
                                             <input type="text" name="preferred_currency" className="form-control" value="USD" required="" />
                                          </div>
                                       </div>
                                       <button type="submit" name="update_moneygram" className="btn btn-success float-right">Update Moneygram Details</button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> Bank Transfer For Withdrawing Revenue </h5>
                                    <form method="post" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Bank Name </label>
                                          <div className="col-md-8">
                                             <input type="text" name="bank_name" value="BCA" placeholder="Enter Your Bank Name" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          {/* <!-- form-group row Starts --> */}
                                          <label className="col-md-4 col-form-label"> Bank Country </label>
                                          <div className="col-md-8">
                                             <select name="bank_country" className="form-control" required="">
                                                <option value="Afghanistan">Afghanistan</option>
                                                <option value="Aland Islands">Aland Islands</option>
                                                <option value="Albania">Albania</option>
                                                <option value="Algeria">Algeria</option>
                                                <option value="American Samoa">American Samoa</option>
                                                <option value="Andorra">Andorra</option>
                                                <option value="Angola">Angola</option>
                                                <option value="Anguilla">Anguilla</option>
                                                <option value="Antarctica">Antarctica</option>
                                                <option value="Antigua And Barbuda">Antigua And Barbuda</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Armenia">Armenia</option>
                                                <option value="Aruba">Aruba</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Austria">Austria</option>
                                                <option value="Azerbaijan">Azerbaijan</option>
                                                <option value="Bahamas">Bahamas</option>
                                                <option value="Bahrain">Bahrain</option>
                                                <option value="Bangladesh">Bangladesh</option>
                                                <option value="Barbados">Barbados</option>
                                                <option value="Belarus">Belarus</option>
                                                <option value="Belgium">Belgium</option>
                                                <option value="Belize">Belize</option>
                                                <option value="Benin">Benin</option>
                                                <option value="Bermuda">Bermuda</option>
                                                <option value="Bhutan">Bhutan</option>
                                                <option value="Bolivia">Bolivia</option>
                                                <option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option>
                                                <option value="Botswana">Botswana</option>
                                                <option value="Bouvet Island">Bouvet Island</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                                <option value="Bulgaria">Bulgaria</option>
                                                <option value="Burkina Faso">Burkina Faso</option>
                                                <option value="Burundi">Burundi</option>
                                                <option value="Cambodia">Cambodia</option>
                                                <option value="Cameroon">Cameroon</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Cape Verde">Cape Verde</option>
                                                <option value="Cayman Islands">Cayman Islands</option>
                                                <option value="Central African Republic">Central African Republic</option>
                                                <option value="Chad">Chad</option>
                                                <option value="Chile">Chile</option>
                                                <option value="China">China</option>
                                                <option value="Christmas Island">Christmas Island</option>
                                                <option value="Cocos (keeling) Islands">Cocos (keeling) Islands</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Comoros">Comoros</option>
                                                <option value="Congo">Congo</option>
                                                <option value="Congo, The Democratic Republic Of">Congo, The Democratic Republic Of</option>
                                                <option value="Cook Islands">Cook Islands</option>
                                                <option value="Costa Rica">Costa Rica</option>
                                                <option value="Cote D'ivoire">Cote D'ivoire</option>
                                                <option value="Croatia">Croatia</option>
                                                <option value="Cuba">Cuba</option>
                                                <option value="Cyprus">Cyprus</option>
                                                <option value="Czech Republic">Czech Republic</option>
                                                <option value="Denmark">Denmark</option>
                                                <option value="Djibouti">Djibouti</option>
                                                <option value="Dominica">Dominica</option>
                                                <option value="Dominican Republic">Dominican Republic</option>
                                                <option value="Ecuador">Ecuador</option>
                                                <option value="Egypt">Egypt</option>
                                                <option value="El Salvador">El Salvador</option>
                                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                                <option value="Eritrea">Eritrea</option>
                                                <option value="Estonia">Estonia</option>
                                                <option value="Ethiopia">Ethiopia</option>
                                                <option value="Falkland Islands (malvinas)">Falkland Islands (malvinas)</option>
                                                <option value="Faroe Islands">Faroe Islands</option>
                                                <option value="Fiji">Fiji</option>
                                                <option value="Finland">Finland</option>
                                                <option value="France">France</option>
                                                <option value="French Guiana">French Guiana</option>
                                                <option value="French Polynesia">French Polynesia</option>
                                                <option value="French Southern Territories">French Southern Territories</option>
                                                <option value="Gabon">Gabon</option>
                                                <option value="Gambia">Gambia</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Ghana">Ghana</option>
                                                <option value="Gibraltar">Gibraltar</option>
                                                <option value="Greece">Greece</option>
                                                <option value="Greenland">Greenland</option>
                                                <option value="Grenada">Grenada</option>
                                                <option value="Guadeloupe">Guadeloupe</option>
                                                <option value="Guam">Guam</option>
                                                <option value="Guatemala">Guatemala</option>
                                                <option value="Guernsey">Guernsey</option>
                                                <option value="Guinea">Guinea</option>
                                                <option value="Guinea-bissau">Guinea-bissau</option>
                                                <option value="Guyana">Guyana</option>
                                                <option value="Haiti">Haiti</option>
                                                <option value="Heard Island And Mcdonald Islands">Heard Island And Mcdonald Islands</option>
                                                <option value="Holy See (vatican City State)">Holy See (vatican City State)</option>
                                                <option value="Honduras">Honduras</option>
                                                <option value="Hong Kong">Hong Kong</option>
                                                <option value="Hungary">Hungary</option>
                                                <option value="Iceland">Iceland</option>
                                                <option value="India">India</option>
                                                <option value="Indonesia" selected="">Indonesia</option>
                                                <option value="Iran, Islamic Republic Of">Iran, Islamic Republic Of</option>
                                                <option value="Iraq">Iraq</option>
                                                <option value="Ireland">Ireland</option>
                                                <option value="Isle Of Man">Isle Of Man</option>
                                                <option value="Israel">Israel</option>
                                                <option value="Italy">Italy</option>
                                                <option value="Jamaica">Jamaica</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Jersey">Jersey</option>
                                                <option value="Jordan">Jordan</option>
                                                <option value="Kazakhstan">Kazakhstan</option>
                                                <option value="Kenya">Kenya</option>
                                                <option value="Kiribati">Kiribati</option>
                                                <option value="Korea, Democratic People's Republic Of">Korea, Democratic People's Republic Of</option>
                                                <option value="Korea, Republic Of">Korea, Republic Of</option>
                                                <option value="Kuwait">Kuwait</option>
                                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                                <option value="Latvia">Latvia</option>
                                                <option value="Lebanon">Lebanon</option>
                                                <option value="Lesotho">Lesotho</option>
                                                <option value="Liberia">Liberia</option>
                                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                                <option value="Liechtenstein">Liechtenstein</option>
                                                <option value="Lithuania">Lithuania</option>
                                                <option value="Luxembourg">Luxembourg</option>
                                                <option value="Macao">Macao</option>
                                                <option value="North Macedonia">North Macedonia</option>
                                                <option value="Madagascar">Madagascar</option>
                                                <option value="Malawi">Malawi</option>
                                                <option value="Malaysia">Malaysia</option>
                                                <option value="Maldives">Maldives</option>
                                                <option value="Mali">Mali</option>
                                                <option value="Malta">Malta</option>
                                                <option value="Marshall Islands">Marshall Islands</option>
                                                <option value="Martinique">Martinique</option>
                                                <option value="Mauritania">Mauritania</option>
                                                <option value="Mauritius">Mauritius</option>
                                                <option value="Mayotte">Mayotte</option>
                                                <option value="Mexico">Mexico</option>
                                                <option value="Micronesia, Federated States Of">Micronesia, Federated States Of</option>
                                                <option value="Moldova, Republic Of">Moldova, Republic Of</option>
                                                <option value="Monaco">Monaco</option>
                                                <option value="Mongolia">Mongolia</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Morocco">Morocco</option>
                                                <option value="Mozambique">Mozambique</option>
                                                <option value="Myanmar">Myanmar</option>
                                                <option value="Namibia">Namibia</option>
                                                <option value="Nauru">Nauru</option>
                                                <option value="Nepal">Nepal</option>
                                                <option value="Netherlands">Netherlands</option>
                                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                                <option value="New Caledonia">New Caledonia</option>
                                                <option value="New Zealand">New Zealand</option>
                                                <option value="Nicaragua">Nicaragua</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Niue">Niue</option>
                                                <option value="Norfolk Island">Norfolk Island</option>
                                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                                <option value="Norway">Norway</option>
                                                <option value="Oman">Oman</option>
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="Palau">Palau</option>
                                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                                <option value="Panama">Panama</option>
                                                <option value="Papua New Guinea">Papua New Guinea</option>
                                                <option value="Paraguay">Paraguay</option>
                                                <option value="Peru">Peru</option>
                                                <option value="Philippines">Philippines</option>
                                                <option value="Pitcairn">Pitcairn</option>
                                                <option value="Poland">Poland</option>
                                                <option value="Portugal">Portugal</option>
                                                <option value="Puerto Rico">Puerto Rico</option>
                                                <option value="Qatar">Qatar</option>
                                                <option value="Reunion">Reunion</option>
                                                <option value="Romania">Romania</option>
                                                <option value="Russian Federation">Russian Federation</option>
                                                <option value="Rwanda">Rwanda</option>
                                                <option value="Saint Helena">Saint Helena</option>
                                                <option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
                                                <option value="Saint Lucia">Saint Lucia</option>
                                                <option value="Saint Pierre And Miquelon">Saint Pierre And Miquelon</option>
                                                <option value="Saint Vincent And The Grenadines">Saint Vincent And The Grenadines</option>
                                                <option value="Samoa">Samoa</option>
                                                <option value="San Marino">San Marino</option>
                                                <option value="Sao Tome And Principe">Sao Tome And Principe</option>
                                                <option value="Saudi Arabia">Saudi Arabia</option>
                                                <option value="Senegal">Senegal</option>
                                                <option value="Serbia And Montenegro">Serbia And Montenegro</option>
                                                <option value="Seychelles">Seychelles</option>
                                                <option value="Sierra Leone">Sierra Leone</option>
                                                <option value="Singapore">Singapore</option>
                                                <option value="Slovakia">Slovakia</option>
                                                <option value="Slovenia">Slovenia</option>
                                                <option value="Solomon Islands">Solomon Islands</option>
                                                <option value="Somalia">Somalia</option>
                                                <option value="South Africa">South Africa</option>
                                                <option value="South Georgia And The South Sandwich Islands">South Georgia And The South Sandwich Islands</option>
                                                <option value="Spain">Spain</option>
                                                <option value="Sri Lanka">Sri Lanka</option>
                                                <option value="Sudan">Sudan</option>
                                                <option value="Suriname">Suriname</option>
                                                <option value="Svalbard And Jan Mayen">Svalbard And Jan Mayen</option>
                                                <option value="Swaziland">Swaziland</option>
                                                <option value="Sweden">Sweden</option>
                                                <option value="Switzerland">Switzerland</option>
                                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                                <option value="Taiwan, Province Of China">Taiwan, Province Of China</option>
                                                <option value="Tajikistan">Tajikistan</option>
                                                <option value="Tanzania, United Republic Of">Tanzania, United Republic Of</option>
                                                <option value="Thailand">Thailand</option>
                                                <option value="Timor-leste">Timor-leste</option>
                                                <option value="Togo">Togo</option>
                                                <option value="Tokelau">Tokelau</option>
                                                <option value="Tonga">Tonga</option>
                                                <option value="Trinidad And Tobago">Trinidad And Tobago</option>
                                                <option value="Tunisia">Tunisia</option>
                                                <option value="Turkey">Turkey</option>
                                                <option value="Turkmenistan">Turkmenistan</option>
                                                <option value="Turks And Caicos Islands">Turks And Caicos Islands</option>
                                                <option value="Tuvalu">Tuvalu</option>
                                                <option value="Uganda">Uganda</option>
                                                <option value="Ukraine">Ukraine</option>
                                                <option value="United Arab Emirates">United Arab Emirates</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="United States">United States</option>
                                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                                <option value="Uruguay">Uruguay</option>
                                                <option value="Uzbekistan">Uzbekistan</option>
                                                <option value="Vanuatu">Vanuatu</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Viet Nam">Viet Nam</option>
                                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                                <option value="Wallis And Futuna">Wallis And Futuna</option>
                                                <option value="Western Sahara">Western Sahara</option>
                                                <option value="Yemen">Yemen</option>
                                                <option value="Zambia">Zambia</option>
                                                <option value="Zimbabwe">Zimbabwe</option>
                                                <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                             </select>
                                          </div>
                                       </div>
                                       {/* <!-- form-group row Ends --> */}
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Bank State/Province/Region </label>
                                          <div className="col-md-8">
                                             <input type="text" name="bank_state_province_region" value="DKI" placeholder="Enter Your Bank State/Province/Region" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Bank City </label>
                                          <div className="col-md-8">
                                             <input type="text" name="bank_city" value="Jakarta" placeholder="Enter Your Bank City" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          {/* <!-- form-group row Starts --> */}
                                          <label className="col-md-4 col-form-label"> Account Holder Name </label>
                                          <div className="col-md-8">
                                             <input type="text" name="account_name" value="Ah" placeholder="Enter Your Account Holder Name" className="form-control" required="" />
                                          </div>
                                       </div>
                                       {/* <!-- form-group row Ends --> */}
                                       <div className="form-group row">
                                          {/* <!-- form-group row Starts --> */}
                                          <label className="col-md-4 col-form-label"> Account No </label>
                                          <div className="col-md-8">
                                             <input type="text" name="account_no" value="60" placeholder="Enter Your Account No" className="form-control" required="" />
                                          </div>
                                       </div>
                                       {/* <!-- form-group row Ends --> */}
                                       <div className="form-group row">
                                          {/* <!-- form-group row Starts --> */}
                                          <label className="col-md-4 col-form-label"> Iban Number (optional) </label>
                                          <div className="col-md-8">
                                             <input type="text" name="iban_number" value="" placeholder="Enter Your Iban Number" className="form-control" />
                                          </div>
                                       </div>
                                       {/* <!-- form-group row Ends --> */}
                                       <div className="form-group row">
                                          {/* <!-- form-group row Starts --> */}
                                          <label className="col-md-4 col-form-label"> Swift Code (optional) </label>
                                          <div className="col-md-8">
                                             <input type="text" name="swift_code" value="" placeholder="Enter Your Swift Code" className="form-control" />
                                          </div>
                                       </div>
                                       {/* <!-- form-group row Ends --> */}
                                       <button type="submit" name="update_bank_details" className="btn btn-success float-right">Update Bank Details</button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> Payoneer For Withdrawing Revenue </h5>
                                    <form method="post" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Enter Payoneer Email </label>
                                          <div className="col-md-8">
                                             <input type="text" name="seller_payoneer_email" value="" placeholder="Enter payoneer email" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <button type="submit" name="submit_payoneer_email" className="btn btn-success float-right">
                                          Change Payoneer Email  </button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> Bitcoin Wallet For Withdrawing Revenue </h5>
                                    <form method="post" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Wallet Address </label>
                                          <div className="col-md-8">
                                             <input type="text" name="seller_wallet" value="1HJeW2NrDBmqQRX9pBSFiMq6Y6yuZJpCUR" placeholder="Enter Wallet Address" className="form-control" />
                                             <small className="text-danger">! Warning You Only Need To Enter Your Bitcoin Wallet Address Not Any Other.</small>
                                          </div>
                                       </div>
                                       <button type="submit" name="submit_wallet" className="btn btn-success float-right">
                                          Update Wallet Address  </button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> REAL-TIME NOTIFICATIONS </h5>
                                    <form method="post" className="clearfix">
                                       <div className="form-group row mb-3">
                                          <label className="col-md-4 col-form-label"> Enable/disable sound </label>
                                          <div className="col-md-8">
                                             <select name="enable_sound" className="form-control">
                                                <option value="yes"> Yes </option>
                                                <option value="no"> No </option>
                                             </select>
                                          </div>
                                       </div>
                                       <div className="form-group row mb-3">
                                          <label className="col-md-4 col-form-label"> Enable Sliding Notifications </label>
                                          <div className="col-md-8">
                                             <select name="enable_notifications" className="form-control">
                                                <option value="1"> Yes </option>
                                                <option value="0"> No </option>
                                             </select>
                                          </div>
                                       </div>
                                       <button type="submit" name="update_sound" className="btn btn-success mt-1 float-right">
                                          Update Changes  </button>
                                    </form>
                                    <hr />
                                    <h5 className="mb-4"> Change Password </h5>
                                    <form method="post" className="clearfix mb-3">
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Enter Old Password </label>
                                          <div className="col-md-8">
                                             <input type="text" name="old_pass" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Enter New Password </label>
                                          <div className="col-md-8">
                                             <input type="text" name="new_pass" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <div className="form-group row">
                                          <label className="col-md-4 col-form-label"> Confirm New Password </label>
                                          <div className="col-md-8">
                                             <input type="text" name="new_pass_again" className="form-control" required="" />
                                          </div>
                                       </div>
                                       <button type="submit" name="change_password" className="btn btn-success float-right">
                                          Change Password  </button>
                                    </form>

                                 </div>
                              </div>

                           </div>
                           <div id="my_proposal" className="tab-pane fade">
                              <div className="card">
                                 <div className="card-header">
                                    <h2>My Proposal</h2>
                                 </div>
                                 <div className="card-body">
                                    <div className="my_proposal_listing">
                                       <div className="row">
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                                                   <img src="assets/images/postImg/img-03.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-02.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                                         <div className="onePress-seller-tooltip">
                                                            Level Two
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Create A Professional Custom Explainer Video</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>4.8</strong> (22)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;10.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over">
                                                   <img src="proposals/proposal_files/voice-over-1.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-03.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="shoail" className="seller-name">shoail</a>
                                                         <div className="onePress-seller-tooltip">
                                                            New Seller
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="5" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Record Your Brazilian Portuguese Voice Over</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>5.0</strong> (7)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;10.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                                                   <img src="proposals/proposal_files/game-1.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-01.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="thili00traffi" className="seller-name">thili00traffi</a>
                                                         <div className="onePress-seller-tooltip">
                                                            New Seller
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>4.0</strong> (4)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;20.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                                                   <img src="assets/images/postImg/img-03.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-02.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                                                         <div className="onePress-seller-tooltip">
                                                            Level Two
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Create A Professional Custom Explainer Video</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>4.8</strong> (22)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;10.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over">
                                                   <img src="proposals/proposal_files/voice-over-1.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-03.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="shoail" className="seller-name">shoail</a>
                                                         <div className="onePress-seller-tooltip">
                                                            New Seller
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="5" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Record Your Brazilian Portuguese Voice Over</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>5.0</strong> (7)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;10.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>
                                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                                             <div className="proposal-card-base mp-proposal-card">
                                                {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                                                <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                                                   <img src="proposals/proposal_files/game-1.jpg" className="img-fluid" />
                                                </a>
                                                <div className="proposal-card-caption">
                                                   {/* <!--- proposal-card-caption Starts ---> */}
                                                   <div className="proposal-seller-info">
                                                      {/* <!--- onePress-seller-info Starts ---> */}
                                                      <span className="fit-avatar s24">
                                                         <img src="images/userlisting/img-01.jpg" className="rounded-circle" width="32" height="32" />
                                                      </span>
                                                      <div className="seller-info-wrapper">
                                                         <a href="thili00traffi" className="seller-name">thili00traffi</a>
                                                         <div className="onePress-seller-tooltip">
                                                            New Seller
                             </div>
                                                      </div>
                                                      <div className="favoriteIcon">
                                                         <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                                                      </div>
                                                   </div>
                                                   {/* <!--- onePress-seller-info Ends ---> */}
                                                   <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit" className="proposal-link-main js-proposal-card-imp-data">
                                                      <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                                                   </a>
                                                   <div className="rating-badges-container">
                                                      <span className="proposal-rating">
                                                         <i className="fa fa-star"></i>
                                                         <span>
                                                            <strong>4.0</strong> (4)
                          </span>
                                                      </span>
                                                   </div>
                                                </div>
                                                {/* <!--- proposal-card-caption Ends ---> */}
                                                <footer className="proposal-card-footer">
                                                   {/* <!--- proposal-card-footer Starts ---> */}
                                                   <div className="proposal-price">
                                                      <a>
                                                         <small>STARTING AT</small>&#036;20.00     </a>
                                                   </div>
                                                </footer>
                                                {/* <!--- proposal-card-footer Ends ---> */}
                                             </div>
                                             {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
                                          </div>

                                       </div>

                                    </div> {/* <!-- my_proposal_listing --> */}
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