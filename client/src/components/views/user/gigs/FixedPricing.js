import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { updatePricing } from "../../../../_actions/gigs.action";
import { getDeliveryTime, getPackage } from "../../../../_actions/user.action";

const FixedPricing = (props) => {
   //const { addToast } = useToasts()
   const dispatch = useDispatch();

   const changePrice = (e) => {
      props.changePrice(e);
   };


   let history = useHistory();
   const params = useParams();
   useEffect(() => {
      dispatch(getDeliveryTime())
      dispatch(getPackage())

   }, [params.id]);

   const delivery = useSelector(state => state.user.delivery_times && state.user.delivery_times.responseData);

   let delivery_times = [props.pricing && props.pricing.length > 0 && props.pricing[0].DeliveryTime];
   let revisions = [props.pricing && props.pricing.length > 0 && props.pricing[0].revisions];
   let prices = [props.pricing && props.pricing.length > 0 && props.pricing[0].price];

   return (
<Formik

         enableReinitialize

         initialValues={{
            id: params.id,
            fixed_price: props.price,
            delivery_time_id: delivery_times,
            revisions: revisions,
            price: prices,
         }
         }

         validationSchema={Yup.object().shape({
             price: Yup.array().of(
                 Yup.number().required('Price is required')
             ),
             revisions: Yup.array().of(
                 Yup.string().trim().required('Revisions is required')
             ),
             delivery_time_id: Yup.array().of(
                 Yup.string().trim().required('Delivery Time is required')
             )
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('values', values);
            let data = {
               id: values.id,
               delivery_time_id: values.delivery_time_id,
               revisions: values.revisions,
               price: values.price,
               fixed_price: props.price
            };

            /*if (params.id) {
                dispatch(updateCategory(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    history.push('/admin/category/')
                })
            } else {*/
            dispatch(updatePricing(data)).then(res => {
               //console.log(res.responseData._id);
               history.push('/gig/faq/' + res.responseData._id)
               //addToast(res.message, { appearance: res.status, autoDismiss: true, })
            })
            //}
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
               handleReset,
               setFieldValue,
            } = props;

            return (
               <Fragment>

                  <nav className="gig-tab-nav" id="tabs">

                     <div className="container">

                        <div className="breadcrumb flat mb-0 nav" role="tablist">
                           <div className="breadcrumbList">
                              <a className="nav-link" href="#overview">
                                 Overview      </a>

                              <a className="nav-link d-none " href="#video">
                                 Video Settings      </a>

                              <a className="nav-link  d-none" href="#instant-delivery">
                                 Instant Delivery      </a>

                              <a className="nav-link  active" href="#pricing">
                                 Pricing     </a>

                              <a className="nav-link " href="#description">
                                 Description & FAQ     </a>
                              <a className="nav-link  " href="#requirements">
                                 Requirements      </a>
                              <a className="nav-link " href="#gallery">
                                 Gallery     </a>
                              <a className="nav-link" href="#publish">Submit For Approval</a>
                           </div>
                        </div>

                     </div>

                  </nav>

                  <div className="container mt-5 mb-5">
                     <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-2">

                           <div className="tab-content card card-body">

                              <div className="tab-pane fade show active" id="pricing">
                                 <h5 className="font-weight-normal float-left">Pricing</h5>
                                 <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="float-right switch-box">
                                       <span className="text">Fixed Price :</span>
                                       <label class='switch'>
                                          <input type='checkbox' checked='checked' onChange={ changePrice } />
                                          <span class='slider round'></span>
                                       </label>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr className="mt-0" />
                                    <div className="fixed_priced">
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          <div className="col-md-7">
                                             <label>Proposal Price</label>
                                             <div className="input-group">
                                                <span className="input-group-addon font-weight-bold"> &#036; </span>
                                                <div>
                                                   <div>
                                                      <Field name={`price.${0}`} onChange={handleChange} values={`price.${0}`} placeholder="Price"  style={{ width: '419px' }} className={'form-control' + (errors.price && errors.price[0] && touched.price && touched.price[0] ? ' is-invalid' : '')} />
                                                   </div>
                                                </div>
                                             </div>

                                                <ErrorMessage name={`price.${0}`} component="div" className="error-message" />
                                             {/*<small>If you want to use packages, you need to set this field value to 0.</small>*/}

                                          </div>
                                       </div>
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          <div className="col-md-7">
                                             <label>Proposal Revisions</label>
                                             <div>
                                                <div>
                                                   <Field component="select" name={`revisions.${0}`} className={'form-control' + (errors.revisions && errors.revisions[0] && errors.revisions && errors.revisions[0] ? ' is-invalid' : '')}>
                                                      <option value="">Select Revision</option>
                                                      <option value='0' >0</option>
                                                      <option value='1' >1</option>
                                                      <option value='2' >2</option>
                                                      <option value='3' >3</option>
                                                      <option value='4' >4</option>
                                                      <option value='5' >5</option>
                                                      <option value='6' >6</option>
                                                      <option value='7' >7</option>
                                                      <option value='8' >8</option>
                                                      <option value='9' >9</option>
                                                      <option value='10' >10</option>
                                                      <option value='unlimited' >Unlimited Revisions</option>
                                                   </Field>
                                                </div>
                                             </div>
                                             <ErrorMessage name={`revisions.${0}`} component="div" className="error-message" />
                                             <small>Set to 0 if your proposal is configured for instant delivery.</small>
                                          </div>
                                          <small className="form-text text-danger"></small>
                                       </div>
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          <div className="col-md-7">
                                             <label>Delivery Time</label>

                                             <div>
                                                <Field component="select" name={`delivery_time_id.${0}`} className={'form-control' + (errors.delivery_time_id && errors.delivery_time_id[0] && errors.delivery_time_id && errors.delivery_time_id[0] ? ' is-invalid' : '')}>
                                                   <option value="">Select Delivery Time</option>
                                                   {delivery && delivery.deliveryTime.map((deliveryTime) => (<option key={deliveryTime._id} value={deliveryTime.name} >{deliveryTime.name}</option>))}
                                                </Field>
                                             </div>

                                             <ErrorMessage name={`delivery_time_id.${0}`} component="div" className="error-message" />
                                             <small>Please select 1 day if this is for an instant delivery.</small>
                                          </div>
                                          <small className="form-text text-danger"></small>
                                       </div>
                                    </div>

                                    {/*<div className="form-group row add-attribute justify-content-center">
                                       <div className="col-md-7">
                                          <div className="input-group">
                                             <input className="form-control form-control-sm attribute-name" placeholder="Add New Attribute" name="" />
                                             <button className="btn btn btn-success input-group-addon insert-attribute" >
                                                <i className="fa fa-cloud-upload"></i> &nbsp;Insert
                                             </button>
                                          </div>
                                       </div>
                                    </div>*/}

                                    <div className="form-group mt-4 mb-0">
                                       <a href="#" className="btn btn-secondary float-left back-to-instant">Back</a>
                                       <button type="submit" className="btn btn-success mr-3 float-right">Save & Continue</button>
                                    </div>
                                 </form>
                              </div>

                              <input type="hidden" name="section" value="instant_delivery" />
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

export default FixedPricing;