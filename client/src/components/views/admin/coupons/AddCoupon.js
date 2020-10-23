import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import DatePicker from "../DatePicker";
import * as Yup from 'yup';
import $ from 'jquery';

import { addCoupon, getCouponbyId, updateCoupon } from "../../../../_actions/admin/coupon.action";
import { addNotification } from "../../../../_actions/admin/notifications.action";

const AddCategory = (props) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState("");
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {
         $("body").on('keyup', "#percentage", function(){
            var per=$(this).val()||0;
            var max=$("#maxAmount").val()||0;
            //var description = $("#description").val(per+'% off, Max discount is '+max);
            setDescription(per+'% off, Max discount is '+max);
        });

        $("body").on('keyup', "#maxAmount", function(){
            var max=$(this).val()||0;
            var per=$("#percentage").val()||0;
            //var description = $("#description").val(per+'% off, Max discount is '+max);
            setDescription(per+'% off, Max discount is '+max);
        });
        // Update the document title using the browser API



        dispatch(getCouponbyId(params.id))

    }, [params.id]);
    const coupon = useSelector(state => state.coupons && state.coupons.coupon && state.coupons.coupon.responseData.coupon);
    console.log('cats', coupon);
    console.log('desc', description);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: coupon ? coupon._id : '',
                code: coupon ? coupon.code : '',
                percentage: coupon ? coupon.percentage : '',
                maxAmount: coupon ? coupon.maxAmount : '',
                expiration: coupon ? coupon.expiration : '',
                description: coupon ? coupon.description : description

            }
            }

            validationSchema={Yup.object().shape({
                code: Yup.string()
                    .required('Promocode is required'),
                percentage: Yup.string()
                    .required('Percentage is required'),
                maxAmount: Yup.string()
                    .required('Maximum Amount is required'),
                expiration: Yup.string()
                    .required('Expiration is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
console.log('values', values);
                let data = {
                    id: values.id,
                    code: values.code,
                    percentage: values.percentage,
                    maxAmount: values.maxAmount,
                    expiration: values.expiration,
                    description: values.description
                };

                if (params.id) {
                    dispatch(updateCoupon(data)).then(res => { 
                        history.push('/admin/promocode/')
                    })
                } else {
                    dispatch(addCoupon(data));
                }
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
                } = props;

                return (
                    <Fragment>


                        <div className="container">
                            <div className="breadcrumbs">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="page-header float-left">
                                            <div className="page-title">
                                                <h1><i className="menu-icon fa fa-cubes"></i> Categories / {params.id ? "Edit Promocode" : "Add Promocode"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                    <div className="page-header float-right">
                                        <div className="page-title">
                                        <ol className="breadcrumb text-right">
                                            <li className="active"><Link className="btn btn-info" to="/admin/promocode" >Back</Link></li>
                                        </ol>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="h4">{params.id ? "Edit Promocode" : "Add Promocode"}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Promocode : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="code" name="code" value={values.code} onChange={handleChange} maxLength={100} placeholder="Promocode"  className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="code" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Percentage : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="percentage" name="percentage" value={values.percentage} onChange={handleChange} maxLength={100} placeholder="Percentage"  className={'form-control' + (errors.percentage && touched.percentage ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="percentage" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Maximum Amount : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="maxAmount" name="maxAmount" value={values.maxAmount} onChange={handleChange} maxLength={100} placeholder="Maximum Amount"  className={'form-control' + (errors.maxAmount && touched.maxAmount ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="maxAmount" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Expiration : </label>
                                                    <div className="col-md-6">
                                                        <DatePicker id="expiration" name="expiration" value={values.expiration} onChange={handleChange} className={'form-control' + (errors.expiration && touched.expiration ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="expiration" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Description : </label>
                                                    <div className="col-md-6">
                                                        <Field component="textarea" rows="2" id="description" value={values.description} name="description"  onChange={handleChange} maxLength={100}  className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                {/* <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Status : </label>
                                                    <div className="col-md-6">
                                                        <input type="radio" name="enable_watermark" value="1" required="" />
                                                        <label> Yes </label>
                                                        <input type="radio" name="enable_watermark" value="0" required="" checked="" />
                                                        <label> No </label>
                                                    </div>
                                                </div> */}
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"></label>
                                                    <div className="col-md-6">
                                                        {params.id ? <button type="submit" className="btn btn-success">Update</button> :<button type="submit" className="btn btn-success">Save</button>}
                                                        <Link className="btn btn-danger" to="/admin/category">Cancel</Link>
                                                    </div>
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

export default AddCategory;