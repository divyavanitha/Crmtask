import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
//import { useToasts } from 'react-toast-notifications'

import { updatePricing } from "../../../../_actions/gigs.action";
import { getDeliveryTime, getPackage } from "../../../../_actions/user.action";

const Pricing = (props) => {
   //const { addToast } = useToasts()
   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();
   useEffect(() => {
      dispatch(getDeliveryTime())
      dispatch(getPackage())

      $(".packages").show();
      $(".add-attribute").show();
      $(".fixed_price").hide();
      $('body').on('change', 'input[name=fixed_price]', function () {

         if ($(this).is(":checked")) {

            $('input[name=fixed_price]').val(1);
            $(".packages").hide();
            $(".add-attribute").hide();
            $(".fixed_price").show();
         } else {

            $('input[name=fixed_price]').val(0);
            $(".packages").show();
            $(".add-attribute").show();
            $(".fixed_price").hide();
         }

      });

   }, [params.id]);

   const delivery = useSelector(state => state.user.delivery_times && state.user.delivery_times.responseData);
   const packages = useSelector(state => state.user && state.user.packages && state.user.packages.responseData && state.user.packages.responseData.packages);
   console.log('package', packages);

   let descriptions = [];
   let delivery_times = [];
   let revisions = [];
   let prices = [];
   let package_id = [];
   if (packages) {
      for (let i in packages) {
         descriptions.push("sgh");
         delivery_times.push("");
         revisions.push("");
         prices.push("");
         package_id.push(packages[i]._id);
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

         /*validationSchema={Yup.object().shape({
           
             delivery_timing_id: Yup.string()
                 .required('Delivery Time is required'),
             revisions: Yup.string()
                 .required('Revision is required'),
             price: Yup.string()
                 .required('Price is required'),
         })}*/
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('values', values);
            let data = {
               id: values.id,
               package_id: values.package_id,
               description: values.description,
               delivery_time_id: values.delivery_time,
               revisions: values.revisions,
               price: values.price,
               fixed_price: values.fixed_price
            };

            /*if (params.id) {
                dispatch(updateCategory(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    history.push('/admin/category/')
                })
            } else {*/
            dispatch(updatePricing(data)).then(res => {
               console.log(res.responseData._id);
               history.push('/gig/post/faq/' + res.responseData._id)
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
                     {/* <!--- container mt-5 Starts ---> */}
                     <div className="row">
                        {/* <!--- row Starts ---> */}
                        <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-2">
                           {/* <!--- col-xl-8 Starts ---> */}

                           <div className="tab-content card card-body">
                              {/* <!--- tab-content Starts ---> */}

                              <div className="tab-pane fade show active" id="pricing">
                                 <h5 className="font-weight-normal float-left">Pricing</h5>
                                 <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="float-right switch-box">
                                       <span className="text">Fixed Price :</span>
                                       <label className='switch'>
                                          <input type='checkbox' onClick={(e) => { setFieldValue(`fixed_price`, e.currentTarget.checked); }} value={values.fixed_price} name='fixed_price' />
                                          <span className='slider round'></span>
                                       </label>
                                    </div>
                                    <div className="clearfix"></div>
                                    <hr className="mt-0" />
                                    <div className="fixed_price">
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          <div className="col-md-7">
                                             <label>Proposal Price</label>
                                             <div className="input-group">
                                                <span className="input-group-addon font-weight-bold">
                                                   &#036;    </span>

                                                <div>
                                                   <div>
                                                      <Field name={`price.${0}`} values={`price.${0}`} className="form-control" style={{ width: '419px' }} />

                                                   </div>
                                                </div>

                                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                                             </div>

                                             <small>If you want to use packages, you need to set this field value to 0.</small>

                                          </div>
                                       </div>
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          {/* <!--- form-group row Starts ---> */}
                                          <div className="col-md-7">
                                             <label>Proposal Revisions</label>
                                             <div>
                                                <div>
                                                   <Field component="select" name={`revisions.${0}`} className="form-control">
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
                                             <small>Set to 0 if your proposal is configured for instant delivery.</small>
                                          </div>
                                          <small className="form-text text-danger"></small>
                                       </div>
                                       {/* <!--- form-group row Ends ---> */}
                                       <div className="form-group row proposal-price justify-content-center mb-4">
                                          {/* <!--- form-group row Starts ---> */}
                                          <div className="col-md-7">
                                             <label>Delivery Time</label>
                                            
                                             
                                                      <div>
                                                         <Field component="select" name={`delivery_time.${0}`} className="form-control">
                                                            <option value="">Select Delivery Time</option>
                                                            {delivery && delivery.deliveryTime.map((deliveryTime) => (<option key={deliveryTime._id} value={deliveryTime.name} >{deliveryTime.name}</option>))}
                                                         </Field>
                                                      </div>

                                               
                                            
                                             <small>Please select 1 day if this is for an instant delivery.</small>
                                          </div>
                                          <small className="form-text text-danger"></small>
                                       </div>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}
                                    <div className="packages">
                                       <table className="table table-bordered packages">
                                          <thead>
                                             <tr>
                                                <th></th>
                                                {packages && packages.map((pack, index) => (
                                                   <th key={index}>{pack.name}
                                                      <Field name={`package_id.${index}`} onChange={handleChange} value={values.package_id} type="hidden" className="form-control" />
                                                   </th>
                                                ))}
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <td>Description</td>

                                                {descriptions.map((description, index) => (
                                                   <td className="p-0"><Field as="textarea" name={`description.${index}`} onChange={handleChange} className="form-control" values={`values.description.[index]`} placeholder="Description" rows="3" />

                                                   </td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Delivery Time</td>
                                                {delivery_times.map((delivery_time, index) => (
                                                   <td className="p-0"><Field component="select" name={`delivery_time.${index}`} className="form-control">
                                                      <option value="">Select Delivery Time</option>
                                                      {delivery && delivery.deliveryTime.map((s_list) => (<option key={s_list._id} values={s_list._id} >{s_list.name}</option>))}
                                                   </Field></td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Revisions</td>
                                                {revisions.map((revision, index) => (
                                                   <td className="p-0">
                                                      <Field component="select" name={`revisions.${index}`} className="form-control">
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
                                                      </Field></td>
                                                ))}
                                             </tr>
                                             <tr>
                                                <td>Price</td>
                                                {prices.map((price, index) => (
                                                   <td className="p-0"><Field name={`price.${index}`} onChange={handleChange} className="form-control numbers" values={values.price} placeholder="Price" rows="3" /></td>
                                                ))}
                                             </tr>
                                          </tbody>
                                       </table>
                                       {/* <!-- Modal --> */}
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
                                    <div className="form-group row add-attribute justify-content-center">
                                       <div className="col-md-7">
                                          <div className="input-group">
                                             <input className="form-control form-control-sm attribute-name" placeholder="Add New Attribute" name="" />
                                             <button className="btn btn btn-success input-group-addon insert-attribute" >
                                                <i className="fa fa-cloud-upload"></i> &nbsp;Insert
                      </button>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="form-group mt-4 mb-0">
                                       {/* <!--- form-group Starts ---> */}

                                       <a href="#" className="btn btn-secondary float-left back-to-instant">Back</a>
                                       <button type="submit" className="btn btn-success mr-3 float-right">Save & Continue</button>
                                    </div>
                                    {/* <!--- form-group Starts ---> */}
                                 </form>
                              </div>

                              <input type="hidden" name="section" value="instant_delivery" />
                           </div>
                           {/* <!--- tab-content Ends ---> */}
                        </div>
                        {/* <!--- col-md-8 Ends ---> */}
                     </div>
                     {/* <!--- row Ends ---> */}
                  </div>

               </Fragment>
            );
         }}
      </Formik>
   );
};

export default Pricing;