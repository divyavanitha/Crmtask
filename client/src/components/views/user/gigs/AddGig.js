import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import * as Yup from 'yup';
//import { useToasts } from 'react-toast-notifications'

import { creategigs } from "../../../../_actions/gigs.action";
import { getCategory, getSubCategory, getGigbyId } from "../../../../_actions/user.action";

const AddGig = (props) => {
   //const { addToast } = useTasts()
   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();

   const [tags, setTags] = useState([]);
   const [subCategory, setSubCategory] = useState([]);
   useEffect(() => {
      dispatch(getCategory())
      if(params.id){
         dispatch(getGigbyId(params.id)).then( async (res) => {
            setTags(res.responseData.gig.tags);
            setCategorylist(res.responseData.gig.category._id);
            const sub_category = await dispatch(getSubCategory(res.responseData.gig.category._id));
            if (sub_category && sub_category.responseData.sub_categories) {
               setSubCategory(sub_category.responseData.sub_categories)
            }

         });
      }

   }, [params.id]);

   const category = useSelector(state => state.user.category);
   const category_list = category && category.responseData.categories;
   const [categorylist, setCategorylist] = useState('');

   const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);


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

   const handleTagChange = (tag, setFieldValue) => {
      setTags(tag);
      setFieldValue('tags', tag);
   }

   return (

      <Formik

         enableReinitialize
         initialValues={{
            id: gig ? gig._id : '',
            title: gig ? gig.title : '',
            category_id: gig ? gig.category && gig.category._id : '',
            sub_category_id: gig ? gig.subCategory && gig.subCategory._id : '',
            tags: []

         }
         }

         validationSchema={Yup.object().shape({
            title: Yup.string()
               .required('Title is required'),
            category_id: Yup.string()
               .required('Category is required'),
            sub_category_id: Yup.string()
               .required('Sub Category is required'),
            tags: Yup.array().of(
                 Yup.string().trim().required('Tags is required')
             ),
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {

            let data = {
               id: gig && gig._id,
               title: values.title,
               category_id: values.category_id,
               sub_category_id: values.sub_category_id,
               tags: tags
            };

            /*if (params.id) {
                dispatch(updateCategory(data)).then(res => {
                    addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    history.push('/admin/category/')
                })
            } else {*/
            dispatch(creategigs(data)).then(res => {
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


                  <nav className="gig-tab-nav" id="tabs">

                     <div className="container">

                        <div className="breadcrumb flat mb-0 nav" role="tablist">
                           <div className="breadcrumbList">
                              <a className="nav-link active" href="#overview">
                                 Overview      </a>

                              <a className="nav-link d-none " href="#video">
                                 Video Settings      </a>

                              <a className="nav-link  d-none" href="#instant-delivery">
                                 Instant Delivery      </a>

                              <a className="nav-link  " href="#pricing">
                                 Pricing     </a>

                              <a className="nav-link " href="#description">
                                 Description & FAQ     </a>
                              <a className="nav-link  " href="#requirements">
                                 Requirements      </a>
                              <a className="nav-link " href="#gallery">
                                 Gallery     </a>
                              <a className="nav-link " href="#publish">Submit For Approval</a>
                           </div>
                        </div>

                     </div>

                  </nav>

                  <div className="container mt-5 mb-5">
                     <div className="row">
                        <div className="col-xl-8 col-lg-12 col-md-12 offset-xl-2">

                           <div className="tab-content card card-body">
                              {/* <!--- tab-content Starts ---> */}
                              <div className="tab-pane fade show active" id="overview">
                                 <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    {/* <!--- form Starts --> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-3">Gig Title</div>
                                       <div className="col-md-9">
                                          <textarea name="title" value={values.title} onChange={handleChange} rows="2" placeholder="Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} >logo making </textarea>
                                          <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                       </div>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                    {/* <!--- form-group row Ends ---> */}
                                    <div className="form-group row">
                                       {/* <!--- form-group row Starts ---> */}
                                       <div className="col-md-3"> Category </div>
                                       <div className="col-md-9">
                                          <select name="category_id" value={gig && gig.category && gig.category._id} className={'form-control mb-3' + (errors.category_id && touched.category_id ? ' is-invalid' : '')} onChange={(e) => { handleCategoryChange(e.currentTarget.value, setFieldValue) }}>
                                             <option value="">Select Catagory</option>

                                             {category_list && category_list.map((c_list) => (<option key={c_list._id} value={c_list._id} onChange={handleCategoryChange}>{c_list.name}</option>))}

                                          </select>
                                          <ErrorMessage name="category_id" component="div" className="invalid-feedback" />
                                          <small className="form-text text-danger"></small>

                                          {categorylist && (<Fragment><select name="sub_category_id" value={gig && gig.subCategory && gig.subCategory._id} className={'form-control' + (errors.sub_category_id && touched.sub_category_id ? ' is-invalid' : '')} onChange={(e) => { setFieldValue('sub_category_id', e.currentTarget.value); }} >

                                             <option value="">Sub Catagory</option>

                                             {subCategory.map((s_list) => (<option key={s_list._id} value={s_list._id} >{s_list.name}</option>))}
                                          </select>
                                             <ErrorMessage name="sub_category_id" component="div" className="invalid-feedback" /></Fragment>)}

                                       </div>
                                    </div>

                                    <div className="form-group row">
                                       <div className="col-md-3">Tags</div>
                                       <div className="col-md-9">
                                          <TagsInput value={tags} name="tags" onChange={(e) => handleTagChange(e, setFieldValue)} className={'form-control' + (errors.tags && touched.tags ? ' is-invalid' : '')} data-role="tagsinput" />
                                          <ErrorMessage name="tags" component="div" className="invalid-feedback" />
                                       </div>
                                       <small className="form-text text-danger"></small>
                                    </div>
                                    <div className="form-group mb-0">
                                       <Link to="/gigs" className="float-left btn btn-secondary">Cancel</Link>
                                       <button type="submit" className="btn btn-success mr-3 float-right">Save & Continue</button>
                                    </div>
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

export default AddGig;