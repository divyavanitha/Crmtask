import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import { updatePricing } from "../../../../_actions/gigs.action";
import { getDeliveryTime, getPackage } from "../../../../_actions/user.action";

const PackagePricing = (props) => {
   //const { addToast } = useToasts()
   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();
   useEffect(() => {
      dispatch(getDeliveryTime())
      dispatch(getPackage())
   }, [params.id]);

   const delivery = useSelector(state => state.user.delivery_times && state.user.delivery_times.responseData);
   const packages = useSelector(state => state.user && state.user.packages && state.user.packages.responseData && state.user.packages.responseData.packages);

   const changePrice = (e) => {
      props.changePrice(e);
   };

   let descriptions = [];
   let delivery_times = [];
   let revisions = [];
   let prices = [];
   let package_id = [];
   if (packages) {
      if(props.pricing && props.pricing.length == packages.length) {
         for (let i in packages) {
            descriptions.push(props.pricing && props.pricing[i].description);
            delivery_times.push(props.pricing && props.pricing[i].DeliveryTime);
            revisions.push(props.pricing && props.pricing[i].revisions);
            prices.push(props.pricing && props.pricing[i].price);
            package_id.push(packages[i]._id);
         }
      } else {
         for (let i in packages) {
            descriptions.push("");
            delivery_times.push("");
            revisions.push("");
            prices.push("");
            package_id.push("");
         }
      }
      
   }
   return (
<Formik

         enableReinitialize

         initialValues={{
            id: params.id,
            fixed_price: 0,
            package_id: package_id,
            description: descriptions,
            delivery_time_id: delivery_times,
            revisions: revisions,
            price: prices,
         }
         }

         validationSchema={Yup.object().shape({
           
             package_id: Yup.array().of(
                 Yup.string().trim().required('Package is required')
             ),
             description: Yup.array().of(
                 Yup.string().trim().required('Description is required')
             ),
             delivery_time_id: Yup.array().of(
                 Yup.string().trim().required('Delivery Time is required')
             ),
             revisions: Yup.array().of(
                 Yup.string().trim().required('Revisions is required')
             ),
             price: Yup.array().of(
                 Yup.string().trim().required('Price is required')
             )
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {

            let data = {
               id: values.id,
               package_id: values.package_id,
               description: values.description,
               delivery_time_id: values.delivery_time_id,
               revisions: values.revisions,
               price: values.price,
               fixed_price: props.price
            };

            /*if (params.id) {
                dispatch(updatePricing(data)).then(res => {
                  console.log(res.responseData._id);
                  history.push('/gig/faq/' + res.responseData._id)
                  //addToast(res.message, { appearance: res.status, autoDismiss: true, })
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
                                          <input type='checkbox' onChange={ changePrice } />
                                          <span class='slider round'></span>
                                       </label>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr className="mt-0" />

                                    <div className="packages">
                                       <table className="table table-bordered packages">
                                          <thead>
                                             <tr>
                                                <th></th>
                                                {packages && packages.map((pack, index) => (
                                                   <th key={index} >{pack.name}
                                                      <Field name={`package_id.${index}`} onChange={handleChange} value={values.package_id} type="hidden" className="form-control" />
                                                   </th>
                                                ))}
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <td>Description</td>

                                                {descriptions.map((description, index) => (
                                                   <td key={index}  className="p-0">
                                                   <Field as="textarea" name={`description.${index}`} onChange={handleChange} values={values.description.[index]} placeholder="Description" rows="3" className={'form-control' + (errors.description && errors.description[index] && touched.description && touched.description[index] ? ' is-invalid' : '')} />
                                                   <ErrorMessage name={`description.${index}`} component="div" className="invalid-feedback" />
                                                   </td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Delivery Time</td>
                                                {delivery_times.map((delivery_time, index) => (
                                                   <td key={index}  className="p-0">
                                                   <Field component="select" name={`delivery_time_id.${index}`} className={'form-control' + (errors.delivery_time_id && errors.delivery_time_id[index] && touched.delivery_time_id && touched.delivery_time_id[index] ? ' is-invalid' : '')}>
                                                      <option value="">Select Delivery Time</option>
                                                      {delivery && delivery.deliveryTime.map((deliveryTime) => (<option key={deliveryTime._id} value={deliveryTime.name} >{deliveryTime.name}</option>))}
                                                   </Field>
                                                   <ErrorMessage name={`delivery_time_id.${index}`} component="div" className="invalid-feedback" /></td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Revisions</td>
                                                {revisions.map((revision, index) => (
                                                   <td key={index}  className="p-0">
                                                      <Field component="select" name={`revisions.${index}`} className={'form-control' + (errors.revisions && errors.revisions[0] && touched.revisions && touched.revisions[0] ? ' is-invalid' : '')}>
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
                                                   <ErrorMessage name={`revisions.${index}`} component="div" className="invalid-feedback" /></td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Price</td>
                                                {prices.map((price, index) => (
                                                   <td key={index}  className="p-0">
                                                   <Field name={`price.${index}`} onChange={handleChange} className={'decimal form-control' + (errors.price && errors.price[0] && touched.price && touched.price[0] ? ' is-invalid' : '')} values={`price.${index}`}  placeholder="Price" />
                                                   <ErrorMessage name={`price.${index}`} component="div" className="invalid-feedback" /></td>
                                                ))}
                                             </tr>
                                          </tbody>
                                       </table>
                                       <div className="modal fade" id="edit-modal" role="dialog">
                                          <div className="modal-dialog" role="document">
                                             <div className="modal-content">
                                                <div className="modal-header">
                                                   <h5 className="modal-title">Edit Attribute Name</h5>
                                                   <button type="button" className="close" data-dismiss="modal">
                                                      <span>&times;</span>
                                                   </button>
                                                </div>
                                                <div className="modal-body">
                                                   <form action="" method="post" className="update-attribute">
                                                      <input type="hidden" name="name" value="" />
                                                      <div className="form-group">
                                                         <input type="text" className="form-control" name="new_name" placeholder="Attribute Name" />
                                                      </div>
                                                      <div className="form-group text-center mb-0">
                                                         <input type="submit" className="btn btn-success" value="Update Attribute Name" />
                                                      </div>
                                                   </form>
                                                </div>
                                             </div>
                                          </div>
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

export default PackagePricing;