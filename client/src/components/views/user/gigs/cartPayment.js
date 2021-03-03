import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getGigbyId, getPackage, addCart, getCartList, deleteCart, getCartbyId, findUser } from "../../../../_actions/user.action";
import { checkout } from "../../../../_actions/order.action";

import OwlCarousel from 'react-owl-carousel';


const Cart = (props) => {

   const dispatch = useDispatch();
   const params = useParams();
   let history = useHistory();

   const auth = useSelector((state) => state.user);

   const [total, setTotal] = useState(0);

   useEffect(() => {
      
      dispatch(getCartList())
      dispatch(getCartbyId(params.id))
      dispatch(findUser())

   }, []);

   
   const changePayment = async (status) => {

      if(status == "STRIPE"){
         $("#stripe-form").css("display", "block")
         $("#shopping-balance-form").css("display", "none")

      }else{
         $("#stripe-form").css("display", "none")
         $("#shopping-balance-form").css("display", "block")
      }
   }

   const cart = useSelector((state) => state.user && state.user.cart_lists && state.user.cart_lists.carts);

   const cart_details = useSelector((state) => state.user && state.user.cart_details && state.user.cart_details.responseData && state.user.cart_details.responseData.carts);
   let cartCount = useSelector((state) => state.user.cart_count);

   const user = useSelector((state) => state.user && state.user.find_user && state.user.find_user.responseData && state.user.find_user.responseData.user);

   $(document).ready(function () {
      var len = cart && cart;
      var total = 0;
      if (params.id) {
         total = cart_details && cart_details.price
      } else {
         $.each(len, function (index, value) {
            total = total + ((value.price) * (value.quantity));
         });
      }
      setTotal(total);
   });

   return (

      <Formik

         enableReinitialize
         initialValues={{
            total: total,
            payment_mode: ""
         }
         }

         validationSchema={Yup.object().shape({
            /* title: Yup.string()
                 .required('Title is required'),
             sub_category_id: Yup.string()
                 .required('Sub Category is required'),
             tags: Yup.string()
                 .required('Tags is required'),*/
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("values", values)
            let wallet = false;
            if (values.payment_mode == "WALLET") {
               wallet = true;
            }
            if(params.id){
              var data = {
                  id: params.id,
                  payment_mode: values.payment_mode,
                  wallet: wallet
               }; 
            }else{
               var data = {
                  payment_mode: values.payment_mode,
                  wallet: wallet
               };
            }
            

            dispatch(checkout(data)).then(res => {
               console.log(res,"resp")
               if(res.statusCode != 422) history.push('/buying-order-lists')
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
               handleReset,
               setFieldValue,
            } = props;

            return (

               <Fragment>

                  <div className="dashboardContainer proposals-container">
                     <div className="container mt-5 mb-5">
                        {/* <div className="card"> 
          <div className="card-body"> */}
                        <div className="row">
                           <div className="col-md-12">
                              <h1 className="mb-4">
                                 Checkout
                  </h1>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="card mb-3">
                                 <div className="card-body">
                                    <h5 className="float-left mt-2 pt-2 count_cart"> {cartCount != 0 ? 'Your cart ' + cartCount : ''} </h5>
                                    <h5 className="float-right mb-0">
                                       <Link to="/" className="btn btn-success">
                                          Continue Shopping
                           </Link>
                                    </h5>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-7">
                              <div className="row">
                                 <div className="col-md-12 mb-3">
                                    <div className="card payment-options">
                                       <div className="card-header">
                                          <h5 className="mt-2"><i className="fa fa-dollar">{user && user.wallet}</i> Available Shopping Balance</h5>
                                       </div>
                                       <div className="card-body">
                                          <div className="row">
                                          
                                             {((user && user.wallet) >= (params.id ? cart_details && cart_details.price : total)) ? <div className="col-1">
                                                <input id="shopping-balance" onClick={() => changePayment("WALLET")} type="radio" name="method" className="form-control radio-input" checked />
                                             </div> : "" }
                                             {((user && user.wallet) >= (params.id ? cart_details && cart_details.price : total)) ? <div className="col-11">
                                                <p className="lead mt-2">
                                                   Personal Balance - <b>{auth && auth.user.firstName}</b>
                                                   <span className="text-success font-weight-bold">&#036;{params.id ? cart_details && cart_details.price : total}</span>
                                                </p>
                                             </div> : "" }
                                         
                                          
                                             <div className="col-1">
                                                <input id="stripe" onClick={() => changePayment("STRIPE")} type="radio" name="method" className="form-control radio-input" />
                                             </div>
                                             <div className="col-11">
                                                <p className="lead mt-2">
                                                   Stripe - <b>{auth && auth.user.firstName}</b>
                                                   <span className="text-success font-weight-bold">&#036;{params.id ? cart_details && cart_details.price : total}</span>
                                                </p>
                                                
                                             </div>

                                          </div>

                                          </div>
                                       
                                    </div>
                                 </div>
                                 
                              </div>
                           </div>
                           <div className="col-md-5">
                              <div className="card">
                                 <div className="card-body cart-order-details">
                                    <p>Cart Subtotal <span className="float-right">&#036;{params.id ? cart_details && cart_details.price : total}</span></p>
                                    <hr />
                                    {/* <p className="processing-fee">Processing Fee <span className="float-right">&#036;0.50 </span></p> */}
                                    <hr className="processing-fee" />
                                    <p>Total <span className="float-right font-weight-bold total-price">&#036;{params.id ? cart_details && cart_details.price : total}</span></p>
                                    <hr />
                                    <form onSubmit={handleSubmit} encType="multipart/form-data" id="shopping-balance-form" style={{display: "block"}} >
                                       
                                       <button type="submit" onClick={() => setFieldValue("payment_mode", "WALLET")} name="cart_submit_order" className="btn btn-lg btn-success btn-block">
                                          Pay With Shopping Balance
                                       </button>
                                    </form>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{display: "none"}} id="stripe-form">
                                       
                                       <button type="submit" onClick={() => setFieldValue("payment_mode", "STRIPE")} name="cart_submit_order" className="btn btn-lg btn-success btn-block">
                                          Pay With Stripe
                                       </button>
                                    </form>
                                    
                                 </div>
                              </div>
                           </div>
                        </div>
                     
                     </div>
                  </div>


                  <div className="modal delete-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                     <div className="modal-dialog">
                        <div className="modal-content">
                           <div className="modal-header">
                              <h4 className="modal-title">Confirm Delete</h4>
                           </div>
                           <div className="modal-body p-2"> Are you sure want to delete? </div>
                           <div className="modal-footer">
                              <button type="button" className="btn default" data-dismiss="modal">Close</button>
                              <button type="button" data-value="1" className="btn btn-danger delete-modal-btn">Delete</button>
                           </div>
                        </div>

                     </div>

                  </div>



               </Fragment >
            );
         }}
      </Formik>
   );
};
export default Cart;