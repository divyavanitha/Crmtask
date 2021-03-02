import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';
import AccountSettings from "./AccountSettings.js";

import { getCountry, getState, getCity, getLanguage, getCard, getPayoutCard, addCard, addPayoutCard, removeCard, defaultCard, changePassword } from "../../../_actions/user.action";
import { getProfile } from "../../../_actions/profile.action";

const Account = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();
   const auth = useSelector((state) => state.user);
   const profile = useSelector((state) => state.profile && state.profile.getprofile && state.profile.getprofile.responseData && state.profile.getprofile.responseData.user);
   const [card, setCard] = useState('');
   const cardData = useSelector((state) => state.user.cards);
   const payoutCardData = useSelector((state) => state.user.payout_cards);
   const [cards, setCards] = useState(cardData)
   const [payoutCards, setPayoutCards] = useState(payoutCardData)

   useEffect(() => {
      dispatch(getProfile())
      dispatch(getCard()).then((response) => {
         console.log("res", response.cards);

         setCards(response && response.cards);
           
      })

      dispatch(getPayoutCard()).then((response) => {
         console.log("res", response);

         setPayoutCards(response && response.cards);
           
      })
   
   }, []);


   const addcard = () => {


      if(card == 'PAYOUT') {

         let data = {
            name: $('input[name=name]').val(),
            number: $('input[name=number]').val(),
            exp_month: $('input[name=month]').val(),
            exp_year: $('input[name=year]').val(),
            cvc: $('input[name=cvc]').val(),
         }

       dispatch(addPayoutCard(data)).then((response) => {

         console.log("pay", response && response.card)

         setPayoutCards(response && response.card);

         $('#stripe-modal').modal("hide");
           
       })
         

      } else if(card == 'CHARGE') {

         let data = {
            name: $('input[name=name]').val(),
            number: $('input[name=number]').val(),
            exp_month: $('input[name=month]').val(),
            exp_year: $('input[name=year]').val(),
            cvc: $('input[name=cvc]').val(),
         }
         dispatch(addCard(data))
         $('#stripe-modal').modal("hide");

      }
   }

   const removecard = (id, e) => {
       dispatch(removeCard(id)).then((response) => {
         let c = cards.filter((res) => res._id !== id);
         setCards(response && response.responseData);
           
       })
   }

   const defaultcard = (id) => {

      dispatch(defaultCard(id)).then((response) => {

         console.log("car", response && response.responseData)

         setCards(response && response.responseData);
           
       })

   }


   return (

      <Formik

         enableReinitialize
         initialValues={{
               id: profile ? profile._id : '',
               old_password: '',
               new_password: '',
               confirm_password: '',
         }
         }

         /*validationSchema={Yup.object().shape({
            old_password: Yup.string()
                    .required('Old Password is required'),
            new_pasword: Yup.string()
                    .required('New Password is required'),
            confirm_password: Yup.string()
                    .required('Confirm Password is required')
         })}*/
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("value", values);
                const data = {
                  id: profile._id,
                  new_password: values.new_password,
                  old_password: values.old_password,
                  confirm_password: values.confirm_password
                }

                
                dispatch(changePassword(data))
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
                                 <Link to="/profile" className="nav-link">
                                    Profile Settings            </Link>
                              </li>
                              <li className="nav-item">
                                 <Link to="/account" className="nav-link active">
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
                           <div id="account_settings" className="tab-pane fade active show">
                             <div className="card">
            <div className="card-header">
               <h2>Account Settings</h2>
            </div>
            <div className="card-body">
               <h5 className="mb-4"> Cards </h5>
               <form method="post" className="clearfix mb-3">
   
                  <div className="form-group row">
                     { cards && cards.map(card => <div className="col-md-12 mb-3 cards"><div className="col-md-2" style={{ padding: '10px', background: '#ededed'}}> {card.brand} </div> <div className="col-md-2" style={{ padding: '10px', background: '#ededed'}}>{card.isDefault ? <a ><span style={{background: '#3A6CFF', color: '#fff', padding: '5px', borderRadius: '5px' }}>Default</span></a> : <a onClick={(e) => { defaultcard(card._id, "CHARGE") }}><span style={{color: 'black', padding: '5px', borderRadius: '5px' }}>Set Default</span></a>}</div> <div className="col-md-4" style={{ padding: '10px', background: '#ededed'}}>**** **** **** {card.lastFour}</div><div className="col-md-2"> <a style={{background: '#e00606', color: '#fff', padding: '5px', borderRadius: '5px', float: 'left', marginTop: '5px' }} onClick={(e) => { removecard(card._id, e) }} >X Remove</a> </div> </div>) }
                     
                  </div>

                  <a href="" data-toggle="modal" data-target="#stripe-modal" className="btn btn-success float-right" onClick={() => { setCard('CHARGE') }} >Add Card</a>
               </form>
               <hr />
               <h5 className="mb-4"> Payout Cards (Debit) </h5>
               <form method="post" className="clearfix mb-3">
                  <div className="form-group row">
                     {payoutCards && payoutCards ? (<div className="col-md-12 mb-3"><div className="col-md-2" style={{ padding: '10px', background: '#ededed'}}> {payoutCards && payoutCards.brand} </div> <div className="col-md-2" style={{ padding: '10px', background: '#ededed'}}>{<a ><span style={{background: '#3A6CFF', color: '#fff', padding: '5px', borderRadius: '5px' }}>Default</span></a>}</div> <div className="col-md-4" style={{ padding: '10px', background: '#ededed'}}>**** **** **** {payoutCards && payoutCards.lastFour}</div> </div>) : ""}
                     
                  </div>

                  <a href="" data-toggle="modal" data-target="#stripe-modal" className="btn btn-success float-right"  onClick={() => { setCard('PAYOUT') }} >{ payoutCards && payoutCards ? 'Change Card' : 'Add Card' } </a>
               </form>
               <hr />
               {/*<h5 className="mb-4"> REAL-TIME NOTIFICATIONS </h5>
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
                     <hr />*/}
               <h5 className="mb-4"> Change Password </h5>
               <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Enter Old Password </label>
                     <div className="col-md-8">
                        <Field type="password" onChange={handleChange} name="old_password" value={values.old_password} className="form-control" required="" />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Enter New Password </label>
                     <div className="col-md-8">
                        <Field type="password" onChange={handleChange} name="new_password" value={values.new_password} className="form-control" required="" />
                     </div>
                  </div>
                  <div className="form-group row">
                     <label className="col-md-4 col-form-label"> Confirm New Password </label>
                     <div className="col-md-8">
                        <Field type="password" onChange={handleChange} name="confirm_password" value={values.confirm_password} className="form-control" required="" />
                     </div>
                  </div>
                  <button type="submit" className="btn btn-success float-right">
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

         <div className="modal fade stripe" id="stripe-modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <i className="fa fa-sign-in fa-log"></i>
                                        <h5 className="modal-title">Enter Card Details</h5>
                                        <button className="close" type="button" data-dismiss="modal"><span>&times;</span></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit} >
                                            <div className="form-group">
                                                <Field type="text" name="name" value={values.name} onChange={handleChange} required placeholder="Enter Your Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <Field type="text" required name="number" value={values.number} maxLength="16" onChange={handleChange} placeholder="Enter Card Number" className={'form-control numbers' + (errors.number && touched.number ? ' is-invalid' : '')} />
                                                <ErrorMessage name="number" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <Field type="text" required name="month" value={values.month} maxLength="2" onChange={handleChange} placeholder="Month" className={'form-control numbers' + (errors.month && touched.month ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="month" component="div" className="invalid-feedback" />
                                                    </div>
                                                    
                                                    <div className="col-md-4 col-sm-12">
                                                        <Field type="text" required name="year" value={values.year} maxLength="4" onChange={handleChange} placeholder="Year" className={'form-control numbers' + (errors.year && touched.year ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="year" component="div" className="invalid-feedback" />
                                                    </div>
                                                    
                                                    <div className="col-md-4 col-sm-12">
                                                        <Field type="text" required name="cvc" value={values.cvc} maxLength="3" onChange={handleChange} placeholder="CVC" className={'form-control numbers' + (errors.cvc && touched.cvc ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="cvc" component="div" className="invalid-feedback" />
                                                    </div>

                                                </div>
                                            </div>
                                            <button onClick={addcard} className="btn btn-success btn-block">Add Card</button>
                                        </form>
                                      
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

export default Account;