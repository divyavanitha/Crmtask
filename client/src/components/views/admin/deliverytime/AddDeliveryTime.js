import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { addDeliveryTime, getDeliveryTimebyId, updateDeliveryTime } from "../../../../_actions/admin/deliverytime.action";
import { addNotification } from "../../../../_actions/admin/notifications.action";

const AddDeliveryTime = (props) => {
    const dispatch = useDispatch();
    //console.log('param',props.match.params.id);
    console.log(useParams());
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API
       
        dispatch(getDeliveryTimebyId(params.id))

    }, [params.id]);
    const deliverytime = useSelector(state => state.deliverytimes && state.deliverytimes.deliverytime && state.deliverytimes.deliverytime.responseData.delivery_time);
    
    console.log('subcats', deliverytime);

    return (

        <Formik 

            enableReinitialize
            initialValues={{
                id: deliverytime ? deliverytime._id : '',
                name: deliverytime ? deliverytime.name : ''
                
            }
            }

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                
            })}
            onSubmit={(values, { setSubmitting }) => {

                let data = {
                    id: values.id,
                    name: values.name
                };

                if(params.id){
                    dispatch(updateDeliveryTime(data));
                }else{
                    dispatch(addDeliveryTime(data));
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
                        {params.id ? <h1 className="h3 mb-2 text-gray-800">Edit Delivery Time</h1> : <h1 className="h3 mb-2 text-gray-800">Add Delivery Time</h1>}

                        <div className="row">
                            <Link className="btn btn-primary" style={{ float: "right" }} to="/admin/delivery/time">Back</Link>
                        </div>
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
                                {params.id ? <div className="card-header py-3">
                                   <h6 className="m-0 font-weight-bold text-green"> Edit </h6> 
                                    
                                </div> : <div className="card-header py-3">
                                   <h6 className="m-0 font-weight-bold text-green"> Create </h6> 
                                    
                                </div>}
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <Field id="id" name="id" type="hidden" value={values.id} onChange={handleChange} />
                                                <Field id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                       



                                        <Link className="btn btn-danger" to="/admin/delivery/time">Cancel</Link>
                                        <button type="submit" className={`btn btn-primary left-margin`}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            }}
        </Formik>
    );
};

export default AddDeliveryTime;
