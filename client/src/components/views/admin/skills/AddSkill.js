import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { addSkill, getSkillbyId, updateSkill } from "../../../../_actions/admin/skill.action";

const AddDeliveryTime = (props) => {
    const dispatch = useDispatch();
    //console.log('param',props.match.params.id);
    
  let history = useHistory();
    const params = useParams();
    useEffect(() => {

        // Update the document title using the browser API

        dispatch(getSkillbyId(params.id))

    }, [params.id]);
   const skill = useSelector(state => state.skills && state.skills.skill && state.skills.skill.responseData.skill);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                id: skill ? skill._id : '',
                name: skill ? skill.name : ''

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

                if (params.id) {
                    dispatch(updateSkill(data)).then(res => { 
                        history.push('/admin/skill')
                    })
                } else {
                    dispatch(addSkill(data));
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
                                                <h1><i className="menu-icon fa fa-cubes"></i> Skills / {params.id ? "Edit Skill" : "Add Skill"} </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                    <div className="page-header float-right">
                                        <div className="page-title">
                                        <ol className="breadcrumb text-right">
                                            <li className="active"><Link className="btn btn-info" to="/admin/skill" >Back</Link></li>
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
                                            <h4 className="h4">{params.id ? "Edit Skill" : "Add Skill"}</h4>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className="form-group row">
                                                    <label className="col-md-4 control-label"> Name : </label>
                                                    <div className="col-md-6">
                                                        <Field type="text" id="name" name="name" value={values.name} onChange={handleChange} maxLength={100} placeholder="Name"  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}  />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
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
                                                        <Link className="btn btn-danger" to="/admin/skill">Cancel</Link>
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

export default AddDeliveryTime;