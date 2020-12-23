import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { createRequest } from "../../../../_actions/request.action";
import { getCategory, getSubCategory, getDeliveryTime } from "../../../../_actions/user.action";

const AddRequest = (props) => {

   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();
   const [categorylist, setCategorylist] = useState('');
   useEffect(() => {
      dispatch(getDeliveryTime())
      dispatch(getCategory())
   }, [params.id]);

   const category = useSelector(state => state.user.category);

   const category_list = category && category.responseData.categories;

   const deliveryTime = useSelector((state) => state.user && state.user.delivery_times && state.user.delivery_times.responseData && state.user.delivery_times.responseData.deliveryTime);

   const [subCategory, setSubCategory] = useState([])

   const handleCategoryChange = async (value, setFieldValue) => {
      setCategorylist(value);
      if (value) {
         setFieldValue('category_id', value);
         const sub_category = await dispatch(getSubCategory(value));
         if (sub_category && sub_category.responseData.sub_categories) {
            setSubCategory(sub_category.responseData.sub_categories)
         }
      }


   }


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
            dispatch(createRequest(data)).then(res => {
               history.push('/request/manage')
               //addToast(res.message, { appearance: res.status, autoDismiss: true, })
            })

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


                  <div className="container mt-5 mb-5 post-request-container">
                     <h1 className="mb-5">What Service Are You Looking For?</h1>
                     <div className="row">
                        <div className="col-xl-8 col-lg-8 post-request col-md-12 ">
                           <div className="card">
                              <div className="card-body">
                                 <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="row row-1">
                                       <div className="col-md-12 col-sm-12">
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">
                                                <label className="mt-3">Request Title</label>
                                                <div className="form-group">
                                                   <input type="text" name="title" placeholder="Request Title" onChange={handleChange} value={values.title} className={'form-control input-lg' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                   <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">
                                                <label className="mt-3">Request Description</label>
                                                <div className="form-group">
                                                   <textarea name="description" id="textarea" rows="5" cols="73" maxLength="380" onChange={handleChange} placeholder="Request Description" value={values.description} className={'form-control input-lg' + (errors.description && touched.description ? ' is-invalid' : '')} ></textarea>
                                                   <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">

                                                <div className="form-group">
                                                   <input type="file" id="files" name="files" onChange={(e) => { setFieldValue("files", e.currentTarget.files[0]) }} className="form-control" id="file" />
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row-2">
                                       <hr className="card-hr" />
                                       <div className="row">
                                          <div className="col-md-10 col-sm-12">
                                             <h5 className="mb-4">Chose A Category</h5>
                                          </div>
                                       </div>
                                       <div className="row mb-2 ">
                                          <div className="col-xl-6 col-md-6 mb-2">
                                             <select name="category_id" className={'form-control mb-3' + (errors.category_id && touched.category_id ? ' is-invalid' : '')} onChange={(e) => { handleCategoryChange(e.currentTarget.value, setFieldValue) }}>
                                                <option value="">Select Catagory</option>

                                                {category_list && category_list.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleCategoryChange}>{c_list.name}</option>))}

                                             </select>
                                             <ErrorMessage name="category_id" component="div" className="invalid-feedback" />
                                             <small className="form-text text-danger"></small>
                                          </div>
                                          <div className="col-xl-6 col-md-6 mb-2">
                                             {categorylist && (<Fragment><select name="sub_category_id" className={'form-control' + (errors.sub_category_id && touched.sub_category_id ? ' is-invalid' : '')} onChange={(e) => { setFieldValue('sub_category_id', e.currentTarget.value); }} >

                                                <option value="">Sub Catagory</option>

                                                {subCategory.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                             </select>
                                                <ErrorMessage name="sub_category_id" component="div" className="invalid-feedback" /></Fragment>)}
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row-3">
                                       <hr className="card-hr" />
                                       <div className="row">
                                          <div className="col-md-10 col-sm-12">
                                             <h5 className="mb-4">Once you place your order, when would you like your service delivered?</h5>
                                          </div>
                                       </div>
                                    
                                       <div className="row mb-4">
                                          <div className="col-md-11 col-sm-12">
                                             <div className="serviceDelivaryLsit">
                                             { deliveryTime && deliveryTime.map((time) => (  <label key={time._id} className="custom-control custom-radio">
                                                   <input type="radio" name="duration" 

                                                   checked={values.duration === time.name}
                                                   onChange={() => setFieldValue("duration", time.name)}

                                                   className={'custom-control-input' + (errors.duration && touched.duration ? ' is-invalid' : '')} />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">{time.name}</span>
                                                </label> ) ) }
                                                <ErrorMessage name="duration" component="div" className="invalid-feedback" />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row-4">
                                       <hr className="card-hr" />
                                       <div className="row">
                                          <div className="col-md-10 col-sm-12">
                                             <h5 className="mb-4">What is your budget for this service? (Optional)</h5>
                                          </div>
                                       </div>
                                       <div className="row">
                                          <div className="col-md-12 col-sm-12">
                                             <div className="row">
                                                <div className="col-xl-4 col-lg-12 text-right">
                                                   <label className="mt-3">Budget</label>
                                                </div>
                                                <div className="col-md-8 col-sm-12">
                                                   <div className="input-group form-curb budget-form">
                                                      <span className="input-group-addon font-weight-bold" > &#036; </span>
                                                      <input name="budget" min="5" onChange={handleChange} value={values.budget} className={'decimal form-control input-lg' + (errors.description && touched.description ? ' is-invalid' : '')}  />
                                                      <ErrorMessage name="budget" component="div" className="invalid-feedback" />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <hr className="card-hr" />
                                    <button type="submit" className="btn btn-success btn-lg float-right">Submit Your Request</button>
                                 </form>
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

export default AddRequest;