import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { creategigs } from "../../../../_actions/gigs.action";
import { getCategory, getSubCategory } from "../../../../_actions/user.action";

const AddRequest = (props) => {
   //const { addToast } = useToasts()
   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();
   useEffect(() => {
      dispatch(getCategory())
      //dispatch(getCategorybyId(params.id))

   }, [params.id]);
   //const category = useSelector(state => state.categories && state.categories.category && state.categories.category.responseData.category);
   const category = useSelector(state => state.user.category);
   const category_list = category && category.responseData.categories;

   const [subCategory, setSubCategory] = useState([])

   const handleCategoryChange = async ({ target: input }) => {
      console.log(input.value);
      const sub_category = await dispatch(getSubCategory(input.value))
      if (sub_category && sub_category.responseData.sub_categories) {

         setSubCategory(sub_category.responseData.sub_categories)
      }

   }
   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: '',
            title: '',
            sub_category_id: '',
            tags: ''

         }
         }

         validationSchema={Yup.object().shape({
            title: Yup.string()
               .required('Title is required'),
            sub_category_id: Yup.string()
               .required('Sub Category is required'),
            tags: Yup.string()
               .required('Tags is required'),
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            let data = {
               id: values.id,
               title: values.title,
               sub_category_id: values.sub_category_id,
               tags: values.tags
            };

            /*if (params.id) {
                dispatch(updateCategory(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    history.push('/admin/category/')
                })
            } else {*/
            dispatch(creategigs(data)).then(res => {
               console.log('id', res.responseData._id);
               history.push('/gig/pricing/' + res.responseData._id)
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


                  <div className="container mt-5 mb-5 post-request-container">
                     <h1 className="mb-5">What Service Are You Looking For?</h1>
                     <div className="row">
                        <div className="col-xl-8 col-lg-8 post-request col-md-12 ">
                           <div className="card">
                              <div className="card-body">
                                 <form>
                                    <div className="row row-1">
                                       <div className="col-md-12 col-sm-12">
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">
                                                <label className="mt-3">Request Title</label>
                                                <div className="form-group">
                                                   <input type="text" name="request_title" placeholder="Request Title" className="form-control input-lg" required="" value="" />
                                                </div>
                                             </div>
                                          </div>
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">
                                                <label className="mt-3">Request Description</label>
                                                <div className="form-group">
                                                   <textarea name="request_description" id="textarea" rows="5" cols="73" maxlength="380" className="form-control" placeholder="Request Description" required=""></textarea>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="row">
                                             <div className="col-xl-12 col-lg-12">

                                                <div className="form-group">
                                                   <input type="file" name="request_file" className="form-control" id="file" />
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
                                             <select className="form-control" name="cat_id" id="category" required="">
                                                <option value="" className="hidden">
                                                   Select A Category
                            </option>
                                                <option value="1">
                                                   Graphics &amp; Design
                            </option>
                                                <option value="2">
                                                   Digital Marketing
                            </option>
                                                <option value="3">
                                                   Writing & Translation
                            </option>
                                                <option value="4">
                                                   Video &amp; Animation
                            </option>
                                                <option value="6">
                                                   Programming &amp; Tech
                            </option>
                                                <option value="7">
                                                   Business
                            </option>
                                                <option value="8">
                                                   Fun & Lifestyle
                            </option>
                                                <option value="9">
                                                   Music & Audio
                            </option>
                                                <option value="10">
                                                   Video Tutorials
                            </option>
                                                <option value="18">
                                                   On demand typing
                            </option>
                                                <option value="19">
                                                   Radio anuncio
                            </option>
                                                <option value="20">
                                                   test
                            </option>
                                                <option value="21">
                                                   test
                            </option>
                                             </select>
                                          </div>
                                          <div className="col-xl-6 col-md-6 mb-2">
                                             <select className="form-control" name="child_id" id="sub-category" required="">
                                                <option value="" className="hidden">
                                                   Select A Sub Category
                            </option>
                                                <option value="19">
                                                   Radio anuncio
                            </option>
                                                <option value="20">
                                                   Sub Category List One
                            </option>
                                                <option value="21">
                                                   test
                            </option>
                                             </select>
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
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="1 Day"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      1 Day
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="2 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      2 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="3 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      3 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="4 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      4 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="5 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      5 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="6 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      6 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="7 Days"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      7 Days
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="7+"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      7+
                           </span>
                                                </label>
                                                <label className="custom-control custom-radio">
                                                   <input type="radio" value="1"
                                                      name="delivery_time" className="custom-control-input" required="" />
                                                   <span className="custom-control-indicator"></span>
                                                   <span className="custom-control-description">
                                                      1
                           </span>
                                                </label>
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
                                                      <span className="input-group-addon font-weight-bold" >
                                                         &#036;
                                </span>
                                                      <input type="number" name="request_budget" min="5" placeholder="5 Minimum" className="form-control input-lg" value="" required />
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <hr className="card-hr" />
                                    <input type="submit" name="submit" value="Submit Your Request" style={{ cursor: 'pointer' }} className="btn btn-success btn-lg float-right" />
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