import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { viewOffer } from "../../../../_actions/request.action";

const ViewOffer = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const params = useParams();

   useEffect(() => {
      dispatch(viewOffer(params.id))
   }, [params.id]);

const offer = useSelector((state) => state.request && state.request.view_offer && state.request.view_offer.responseData);

console.log('offer', offer && offer.offers);

   return (

      <Formik

         enableReinitialize
         initialValues={{
            title: '',
            description: '',
            category_id: '',
            files: '',
            sub_category_id: '',
            duration: '',
            budget: ''

         }
         }

         validationSchema={Yup.object().shape({
            title: Yup.string()
               .required('Title is required'),
            description: Yup.string()
               .required('Description is required'),
            category_id: Yup.string()
               .required('Category is required'),
            sub_category_id: Yup.string()
               .required('Sub Category is required'),
            duration: Yup.string()
               .required('Duration is required'),
            budget: Yup.number()
               .required('Budget is required'),
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            var input = document.getElementById("files");
            const data = new FormData();
            data.append('title', values.title)
            data.append('description', values.description)
            data.append('category_id', values.category_id)
            data.append('sub_category_id', values.sub_category_id)
            data.append('files', values.files)
            data.append('duration', values.duration)
            data.append('budget', values.budget)
console.log(values)
            /*dispatch(createRequest(data)).then(res => {
               history.push('/request/manage')
               //addToast(res.message, { appearance: res.status, autoDismiss: true, })
            })*/

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


                  <div className="container mt-4 mb-4">
                     <div className="row view-offers">
                        <h2 className="mb-3 ml-3"> View Offers ({offer && offer.request.offerCount ? offer && offer.request.offerCount : "0"}) </h2>
                        <div className="col-md-12">
                           <div className="card mb-4 rounded-0">
                              <div className="card-body">
                                 <h5 className="font-weight-bold"> Request Description: </h5>
                                 <p className="offer-p">{offer && offer.request.description}</p>
                                 <p className="offer-p">
                                 <i className="fa fa-money"></i> <span> Request Budget: </span><span className="text-muted"> &#036;{offer && offer.request.budget} </span><br />
                                 <i className="fa fa-calendar"></i> <span> Request Date: </span><span className="text-muted"> {offer && offer.request.created_at}</span> <br />
                                 <i className="fa fa-clock-o"></i> <span> Request Duration: </span><span className="text-muted">  {offer && offer.request.duration} </span>  <br />
                                 <i className="fa fa-archive"></i> <span> Request Category: </span><span className="text-muted"> {offer && offer.request.category.name} / {offer && offer.request.subCategory.name} </span>
                                 </p>
                              </div>
                           </div>
                        { offer && offer.offers.map((list, index) => (<div className="card rounded-0 mb-3">
                           <div className="card-body">
                              <div className="row">
                                 <div className="col-md-2">
                                    <img src={(list.gig.photo.length > 0) ? list.gig.photo[0].photo : ""} className="img-fluid" />
                                 </div>
                              <div className="col-md-7">
                                    <h5 className="mt-md-0 mt-2">
                                    <a href="../proposals/pat/i-will-design-your-dream-logo" className="text-success"> 
                                    {list.gig.title}                     </a>
                                    </h5>
                                    <p className="mb-1">{list.description}</p>
                                    <p className="offer-p">
                                    <i className="fa fa-money"></i> Offer Budget: <span className="font-weight-normal text-muted"> &#036;{list.amount} </span><br />
                                    <i className="fa fa-calendar"></i> Offer Duration: <span className="font-weight-normal text-muted"> {list.duration} </span>
                                    </p>
                              </div>
                           <div className="col-md-3 responsive-border pt-md-0 pt-3">
                              <div className="offer-seller-picture">
                                 <a href="../pat" target="_blank"><img src={list.seller.profilePhoto} className="rounded-circle" /></a>
                                 <img src="../images/level_badge_3.png" className="level-badge" />
                              </div>
                              <div className="offer-seller mb-4">
                                 <p className="font-weight-bold mb-1">
                                 {list.seller.firstName}  <small className="text-success"> online  </small>
                                 </p>
                                 <p className="user-link">
                                    <a href="../pat" className="text-success" target="blank"> User Profile </a>
                                 </p>
                              </div>
                              <a href="../conversations/message?seller_id=19&offer_id=97" className="btn btn-sm btn-success rounded-0">
                                 Contact Now
                              </a> &nbsp;
                              <button id="order-button-97" className="btn btn-sm btn-success rounded-0">
                                 Order Now
                              </button>
                          </div>
                          </div>
                           </div>
                        </div>))}
               </div>
            </div>
         </div>
         
               </Fragment>
            );
         }}
      </Formik>
   );
};

export default ViewOffer;