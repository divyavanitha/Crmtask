import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMenu } from "../../../_actions/user.action";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Gig from "./gigs/Gig";
import OwlCarousel from 'react-owl-carousel';
import moment from 'moment';
import { getBuyerRequest, requestOffer, sentOffer } from "../../../_actions/request.action";
import { gigSubCatoegory, requestGigs, getDeliveryTime } from "../../../_actions/user.action";
import * as Yup from 'yup';
import $ from 'jquery';

const BuyerRequest = (props) => {
   const dispatch = useDispatch();
   let history = useHistory();
   let auth = useSelector((state) => state.user);
   let [gig, setGig] = useState([]);
   let [gigId, setGigId] = useState(0);
   let [gigTitle, setGigTitle] = useState("");
   let [buyerRequest, setbuyerRequest] = useState([]);
   let [response, setResponse] = useState([]);
   useEffect(() => {
      dispatch(getBuyerRequest()).then((response) => {
        setResponse(response);
        setbuyerRequest(response);

      });
      dispatch(gigSubCatoegory())
      dispatch(getDeliveryTime())
      dispatch(sentOffer())
      $('body').on('click', '.send_offer', function (e) {
        
         var that = $(this);
         e.preventDefault();
         const id = that.data('id');
         const sub = that.data('sub');
         console.log('id', id);
         console.log('sub', sub);
         dispatch(requestGigs(id,sub)).then(res => {
            console.log('request', res);
               setGig(res); 

         })

         $('.send-offer-modal').modal("show");
         $(".send-offer-modal-btn")
            .off()
            .on("click", function () {
               var gig_id = $("input[name='gig_id']:checked").val();
               var title = $("input[name='gig_id']:checked").data('title');
               console.log(gig_id, title);
               setGigId(gig_id);
               setGigTitle(title);
               $('.submit-proposal-details').modal("show");

               $('.back')
               .off()
               .on("click", function () { 
                  $('.send-offer-modal').modal("show");
               });

            });
      });

   }, []);
  
   const gig_subcategory = useSelector((state) => state.user && state.user.gig_subcategory);
   const deliveryTime = useSelector((state) => state.user && state.user.delivery_times && state.user.delivery_times.responseData && state.user.delivery_times.responseData.deliveryTime);
   const offer = useSelector((state) => state.request && state.request.offer && state.request.offer.responseData);

   const handleChangeCategory = ({currentTarget : input}) => {
      if(input.value){
        setbuyerRequest(response && response.filter((request) => { return request.subCategory._id == input.value }));
      } else {
        setbuyerRequest(response);
      }
      
   }

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id:  '',
                description:  '',
                delivery_time: '',
                amount: '',
                gig_id: gigId,
                request_id: gig.request && gig.request[0]._id
            }
            }

            validationSchema={Yup.object().shape({
                description: Yup.string()
                    .required('Description is required'),
                delivery_time: Yup.string()
                    .required('Delivery Time is required'),
                amount: Yup.number()
                    .required('Amount is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
               console.log('values', values);
                let data = {
                    description: values.description,
                    delivery_time: values.delivery_time,
                    amount: values.amount,
                    gig_id: gigId,
                    request_id: gig.request && gig.request[0]._id
                };

                
                 dispatch(requestOffer(data)).then(res => {
                     $('.submit-proposal-details').modal("hide");
                     window.location.reload();
                 })
                
                resetForm();
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
                    setFieldValue,
                    handleReset,
                } = props;

                return (
                    <Fragment>


<div className="container">
   <div className="row buyer-requests proposals-container mb-5">
      <div className="col-md-12 mt-5">
         <div className="row">
            <div className="col-md-9">
               <h1>
                  Recent Buyer Requests        
               </h1>
            </div>
            <div className="col-md-3">
               <div className="input-group">
                  <input type="text" id="search-input"  placeholder="Search Buyer Requests" className="form-control" />
                  <span className="input-group-btn">
                  <button className="btn btn-success"> <i className="fa fa-search"></i> </button>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div className="col-md-12 mt-4">
         <div className="card">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#active-requests" data-toggle="tab" className="nav-link active make-black">
                     Active <span className="badge badge-success"> 
                     {buyerRequest && buyerRequest.length}            </span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#sent-offers" data-toggle="tab" className="nav-link make-black">
                     Offers Sent <span className="badge badge-success"> {offer && offer.length}  </span>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content">
                  <div id="active-requests" className="tab-pane fade show active">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Buyer Requests </h3>
                        <select id="sub-category"  onChange={handleChangeCategory} className="form-control float-right sort-by mb-3">
                           <option value=""> All Subcategories </option>
                           {gig_subcategory && gig_subcategory.map((c_list, index) => (<option key={index} value={c_list.subCategory._id} >{c_list.subCategory.name}</option>))}
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Date</th>
                                 <th>Duration</th>
                                 <th>Budget</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                               {buyerRequest && buyerRequest.map((list, index) => (<tr key={index} id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src={list.files} className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">{list.user.firstName}</a> 
                                       </h6>
                                       <h5 className="text-success"> {list.title} </h5>
                                       <p className="lead mb-2">  {list.description} </p>
                                       <ul className="request-category">
                                          <li> {list.category.name} </li>
                                          <li> {list.subCategory.name} </li>
                                       </ul>
                                    </div>
                                 </td>                                 
                                 <td> { moment(list.created_at).format('MMMM DD, YYYY') } </td>
                                 <td> 
                                    {list.duration}
                                    
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;{list.budget}                                            <br />
                                    <a data-id={list._id} data-sub={list.subCategory._id} className="btn btn-success btn-sm mt-4 send_offer">Send Offer</a>
                                 </td>
                              </tr>))}
                              
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div id="sent-offers" className="tab-pane fade">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Sent Offers </h3>
                        <select id="sub-category" className="form-control float-right sort-by mb-3">
                           <option value="all"> All Subcategories </option>
                           {gig_subcategory && gig_subcategory.map((c_list, index) => (<option key={index} value={c_list._id} onChange={handleChange}>{c_list.subCategory.name}</option>))}
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Offer Duration</th>
                                 <th>Offer Price</th>
                                 <th>Your Request</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                              {offer && offer.map((list, index) => (<tr key={index} id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src={list.request.files ? list.request.files : ""} className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">{list.request.user.firstName}</a> 
                                       </h6>
                                       <h5 className="text-success"> {list.request.title} </h5>
                                       <p className="lead mb-2"> {list.request.description} </p>
                                       <ul className="request-category">
                                       <li> {list.request.category.name} </li>
                                          <li> {list.request.subCategory.name} </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>{list.duration}</td>
                                 <td> {list.amount} </td>
                                 <td className="text-success font-weight-bold">
                                    <h6>{list.gig.title}</h6> <br />
                                    <p>{list.description}</p>
                                 </td>
                              </tr>))}
                              
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="append-modal"></div>
         <div id="quota-finish" className="modal fade">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title h5"><i className="fa fa-frown-o fa-move-up"></i> Request Quota Reached</h5>
                     <button className="close" data-dismiss="modal"> &times; </button>
                  </div>
                  <div className="modal-body">
                     <center>
                        <h5>You can only send a max of 10 offers per day. Today you've maxed out. Try again tomorrow. </h5>
                     </center>
                  </div>
                  <div className="modal-footer">
                     <button className="btn btn-success" data-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
   
    <div className="modal send-offer-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Select A Proposal/Service To Offer</h5>
                     <button className="close" data-dismiss="modal"> <span> ×</span></button>
                  </div>
                  <div className="modal-body p-0">

            <div className="request-summary">
                                      
               <img src={auth.user && auth.user.profilePhoto ? auth.user && auth.user.profilePhoto : require('../../../assets/images/img-03.jpg')} width="50" height="50" className="rounded-circle" />
            
               <div id="request-description">

                  <h6 className="text-success mb-1"> {gig.request && gig.request[0].title} </h6>

                  <p>{gig.request && gig.request[0].description}</p>

               </div>    

            </div>
            <div className="request-proposals-list">
               {gig.gig && gig.gig.map((list, index) => (<div key={list._id}>
               <div className="proposal-picture">

                  <input type="radio" id={list._id} value={list._id}  className="radio-custom" onChange={() => { console.log("lai", list._id); setGigId(list._id) } } data-title={list.title} name="gig_id" checked={gigId == list._id ? true: false}   />

                  <label htmlFor="input" className="radio-custom-label"></label>

                  <img src={list.photo ? list.photo[0].photo : ""} width="50" height="50" style={{ borderRadius: '2% !important' }} />

               </div> 

               <div className="proposal-title">

                  <p>{list.title}</p>

               </div>
               </div>))}

               <hr />

            </div>

         </div>
            
         <div className="modal-footer">

            <button className="btn btn-secondary" data-dismiss="modal"> Close</button>

            <button className="btn btn-success send-offer-modal-btn" id="submit-proposal" data-toggle="modal" data-dismiss="modal" data-target="#submit-proposal-details" title="Choose an offer before clicking continue">Continue</button>

         </div>
         </div>
      </div>
   </div>

   <div className="modal submit-proposal-details" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">

      <div className="modal-dialog">

         <div className="modal-content">

            <div className="modal-header">

               <h5 className="modal-title h5"> Specify Your Proposal Details </h5>

               <button className="close" data-dismiss="modal"> × </button>

            </div>

            <div className="modal-body p-0">
               <div className="request-summary">
                  <img src="https://www.gigtodo.com/user_images/images_1608630531.png" width="50" height="50" className="rounded-circle" />
                  <div id="request-description">
                     <h6 className="text-success mb-1"> {gig.request && gig.request[0].title} </h6>
                     <p> {gig.request && gig.request[0].description} </p>
                  </div>
               </div>
               <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="selected-proposal p-3">
                     <h5> {gigTitle} </h5>
                     <hr />

                     <div className="form-group">

                        <label className="font-weight-bold"> Description :  </label>

                        <Field component="textarea" name="description" value={values.description} onChange={handleChange}  className="form-control" className={'form-control' + (errors.description && errors.description && errors.description && errors.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="error-message" />
                     </div>

                     <hr />

                     <div className="form-group">

                        <label className="font-weight-bold"> Delivery Time :  </label>

                        <Field component="select" className="form-control float-right" onChange={handleChange} name="delivery_time" className={'form-control' + (errors.delivery_time && errors.delivery_time && errors.delivery_time && errors.delivery_time ? ' is-invalid' : '')}>
                           <option value=""> Select Delivery Time </option>
                           { deliveryTime && deliveryTime.map((time, index) => (<option key={index} value={time.name}> {time.name} </option> ) ) }
                        </Field>
                        <ErrorMessage name='delivery_time' component="div" className="error-message" />
                     </div>

                     <hr />
                     <div className="form-group">
                        <label className="font-weight-bold"> Total Offer Amount :  </label>

                        <div className="input-group float-right">

                           <span className="input-group-addon font-weight-bold"> $ </span>

                           <Field name="amount" className="form-control" value={values.amount} min="5" onChange={handleChange} placeholder="5 Minimum" className={'decimal form-control' + (errors.amount && errors.amount && errors.amount && errors.amount ? ' is-invalid' : '')} />
                           <ErrorMessage name='amount' component="div" className="error-message" />
                        </div>
                  </div>
            </div>
            <div className="modal-footer">
               <button type="button" className="btn btn-secondary back" data-dismiss="modal" data-toggle="modal" data-target="#send-offer-modal">Back</button>

               <button type="submit" className="btn btn-success submit-proposal-details-btn">Submit Offer</button>
            </div>
         </form>

      </div>

      </div>

<div id="insert_offer"></div>


</div>

</div>



   
                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default BuyerRequest;