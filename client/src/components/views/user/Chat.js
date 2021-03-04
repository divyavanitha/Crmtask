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
   const [countrylist, setCountrylist] = useState([]);
   const [stateList, setStateList] = useState([]);
   const [cityList, setCityList] = useState([]);
   const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);
   const countries = useSelector((state) => state.user && state.user.countries && state.user.countries.responseData && state.user.countries.responseData.countries);
   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);
   useEffect(() => {
      dispatch(getProfile()).then((profile) => {
         console.log('profile', profile);
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
      if (value) {
         setFieldValue('country', value);
         const state = dispatch(getState(value));
         console.log('state', state);
         if (state && state.responseData.states) {
            setStateList(state.responseData.states)
         }
      }

   }

   const handleStateChange = async (value, setFieldValue) => {
      //setStateList(value);
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

            console.log(values.profile_photo);

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

                  <div className="dashboardContainer proposals-container no-bg" id="myProfile">


                     <div class="container mt-5 mb-5">
                        <div class="row">
                           <div class="col-md-3">

                              <div class="card mb-3 contacts-sidebar">
                                 <div class="select-table-col">
                                    <div id="text-type" class="cselect">
                                       <input type="text" disabled placeholder="All Conversations" /><span></span>
                                       <div id="table-select" class="cselect-menu filters">
                                          <ul >
                                             <li class="active" data-filter="all">All Conversations</li>
                                             <li data-filter="unread">Unread</li>
                                             <li data-filter="starred">Starred</li>
                                             <li data-filter="agency">Agency</li>
                                             <li data-filter="archived">Archived</li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="search-icon">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                 </div>
                                 <div class="search-box">
                                    <input type="search" name="search-user" />
                                    <span class="close_btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                 </div>
                                 <div class="card-body filters-content">
                                    <ul>
                                       <a class="all unread msg-active">
                                          <img src={require('../../../assets/images/comp/profileIcon.png')} className="rounded-circle" width="50" height="50" />
                                          <h3>shoail<span class="time">6hrs ago</span></h3>
                                          <p class="write-msg">write message text</p>
                                       </a>
                                    </ul>
                                 </div>

                              </div>



                           </div>
                           <div class="col-md-9">

                              <div class="userDetailBox select-convertion">
                                 <img src={require('../../../assets/images/comp/chat.png')} />
                                 <h3>Select a Conversation</h3>
                                 <p>Try selecting a conversation or searching for someone specific.</p>
                              </div>

                              {/*<div class="userDetailBox convertion-detail">
                                                               <div class="user-pro-col">
                                                                  <div class="row">
                                                                     <div class="col-md-6">
                                                                        <div class="profile-detail">
                                                                           <h3>Shivansh</h3>
                                                                           <p><strong>Offline</strong> | <span class="time">Local Time <i class="fa fa-clock-o" aria-hidden="true"></i> Feb 16, 07:46 AM</span></p>
                                                                        </div>
                                                                     </div>
                              
                                                                     <div class="col-md-6">
                                                                        <div class="user-action">
                                                                           <ul class="d-flex justify-content-end">
                                                                              <li>
                                                                                 <a href=""><i class="fa fa-star-o" aria-hidden="true"></i></a>
                                                                              </li>
                                                                              <li>
                                                                                 <a href=""><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                                                                              </li>
                                                                              <li>
                                                                                 <a href=""><i class="fa fa-download" aria-hidden="true"></i></a>
                                                                              </li>
                                                                              <li>
                                                                                 <a href=""><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                                                              </li>
                                                                           </ul>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div class="row">
                                                                  <div class="col-md-8">
                                                                     <div class="convertion-list">
                                                                        <ul>
                                                                           <li>
                                                                              <div class="user-img"><img src={require('../../../assets/images/comp/profileIcon.png')} class="rounded-circle" width="50" height="50" /></div>
                                                                              <div class="user-detail">
                                                                                 <b>shivansh <span>02:11: February 10, 2021 |<i class="fa fa-flag" aria-hidden="true"></i> <a href=""> Report</a></span></b>
                                                                                 <p>Hi how r u?</p>
                                                                              </div>
                                                                           </li>
                                                                        </ul>
                                                                     </div>
                                                                     <div class="message-box">
                                                                        <textarea cols="10" rows="5" placeholder="Enter your Message here"></textarea>
                                                                     </div>
                                                                     <div class="submit-col d-flex justify-content-between">
                                                                        <div class="file-attachement">
                                                                           <div class="file-box">
                                                                              <input type="file" name="file-6[]" id="file-6" class="inputfile inputfile-5" data-multiple-caption="{count} files selected" multiple />
                                                                              <label for="file-6"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" fill="#3a6cff" /></svg></figure> <span></span></label>
                                                                           </div>
                                                                           <div class="create-offer">
                                                                              <button>Create An Offer</button>
                                                                           </div>
                                                                        </div>
                                                                        <div class="submit-btn">
                                                                           <input type="submit" name="send" value="send" />
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                                  <div class="col-md-4 user-profile-detail-col">
                                                                     <div class="order">
                                                                        <h3>Order</h3>
                                                                        <p>Post Order</p>
                                                                     </div>
                                                                     <div class="about-user">
                                                                        <h3>About</h3>
                                                                        <div class="profile-name-photo text-center">
                                                                           <img src={require('../../../assets/images/comp/profileIcon.png')} class="rounded-circle" width="100px" height="100px" />
                                                                           <strong>Shivansh</strong>
                                                                           <p>New Seller</p>
                                                                        </div>
                                                                        <div class="other-detail">
                                                                           <table>
                                                                              <tr>
                                                                                 <td align="left"><i class="fa fa-star" aria-hidden="true"></i> Rating</td>
                                                                                 <td align="right">10%</td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td align="left"><i class="fa fa-map-marker" aria-hidden="true"></i> From</td>
                                                                                 <td align="right">India</td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td align="left"><i class="fa fa-truck" aria-hidden="true"></i>  Last delivery</td>
                                                                                 <td align="right">July 31, 2020</td>
                                                                              </tr>
                                                                              <tr>
                                                                                 <td align="left"><i class="fa fa-language" aria-hidden="true"></i> English</td>
                                                                                 <td align="right">Conversational</td>
                                                                              </tr>
                                                                           </table>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                            </div>*/}
                           </div>
                        </div>
                     </div>
                  </div>





               </Fragment>
            );
         }}
      </Formik >
   );
};

export default Profile;