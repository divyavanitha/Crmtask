import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getGigbyId, createOrder, getPackage, addCart, getCartList, deleteCart } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';


const Cart = (props) =>  {

    const dispatch = useDispatch();
    const params = useParams();
    let history = useHistory();


    const [total, setTotal] = useState(0);

    useEffect(() => {

        dispatch(getGigbyId(params.gig))
        dispatch(getPackage())

        $('body').on('click', '.delete', function (e) {
          alert();
          var that = $(this);
          e.preventDefault();
          const sid = that.data('id');
          console.log('id',sid);
          console.log(that.closest('.cart-card'));
          $('.delete-modal').modal("show");
          $(".delete-modal-btn")
            .off()
            .on("click", function () {
              dispatch(deleteCart(sid)).then(res => {
                //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                that.closest('.cart-card').remove();
                $('.delete-modal').modal("hide");

              })

            });
        });



    }, [params.gig]);
    const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);
    const packages = useSelector(state => state.user && state.user.packages && state.user.packages.responseData && state.user.packages.responseData.packages);
    const cart = useSelector((state) => state.user && state.user.cart_lists && state.user.cart_lists.carts);
    
    $(document).ready(function () {
      
      var len = cart && cart;
      console.log('cart1',len);
      var total = 0;
        $.each(len, function (index, value) {
          
            total = total + value.price;
        });

        setTotal(total);
    });

    return (

        <Formik

            enableReinitialize
            initialValues={{
                /*gig_id: params.gig,
                price: price,
                quantity: '1',
                package_id: package_id*/

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
                console.log('values', values);
                let data = {
                   /* gig_id: params.gig,
                    price: values.price,
                    quantity: values.quantity,
                    package_id: values.package_id*/
                };

                if (values.action == "cart") {
                    dispatch(addCart(data)).then(res => {
                        console.log(res.responseData.length);
                        $(".cart-count").text(res.responseData.length);
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        
                    })
                } else {
                    dispatch(addCart(data)).then(res => {
                      console.log('id',res.responseData._id);
                      history.push('/gig/post/order/'+res.responseData._id)
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                    })
                }
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
      <div className="row">
         <div className="col-md-12">
            <h1 className="mb-4">
               Cart          
            </h1>
         </div>
      </div>
      <div className="row">
         <div className="col-md-12">
            <div className="card mb-3">
               <div className="card-body">
                  <h5 className="float-left mt-2 pt-2 count_cart" id="count_cart" > Your Cart (1) </h5>
                  <h5 className="float-right mb-0"> 
                     <Link to="/" className="btn btn-success" href="">
                     Continue Shopping                </Link> 
                  </h5>
               </div>
            </div>
         </div>
      </div>
      <div className="row cart-add-sect" id="cart-show">
         <div className="col-md-7">
            {cart && cart.map((list) => ( <div className="card cart-card mb-3" key={list._id} >
               <div className="card-body">
                  <div className="cart-proposal">
                     <div className="row">
                        <div className="col-lg-3 mb-2">
                           <a className="proposalImg" href="">
                           <img src={list.gig ? list.gig.photo[0] : ""} className="img-fluid" />
                           </a>
                        </div>
                        <div className="col-lg-9">
                           <a href="">
                              <h6 className="text-success make-black">{list.gig.title} </h6>
                              <ul className="ml-0 mb-2" style={{ listStyleType: "circle" }}>
                              </ul>
                           </a>
                           <a href="javascript:;" data-id={list._id} className="text-muted remove-link delete">
                           <i className="fa fa-times"></i> Remove Proposal </a>
                        </div>
                     </div>
                     <hr />
                     <h6 className="clearfix">
                        Proposal/Service Quantity                    
                        <strong className="float-right price ml-2 mt-2">
                        &#036;{list.price}                   
                        </strong>
                        <input type="text" name="quantity" className="float-right form-control quantity" min="1" data-proposal_id="4" value={list.quantity} />
                     </h6>
                     <hr />
                  </div>
                  <h3 className="float-right">Total: &#036;{list.price} </h3>
               </div>
            </div>))}
         </div>
         <div className="col-md-5">
            <div className="card">
               <div className="card-body cart-order-details">
                  <p>
                     Cart Subtotal <span className="float-right">&#036;{total}</span>
                  </p>
                  <hr />
                  {/* <p>Apply Coupon Code</p>
                   <form className="input-group" method="post">
                     <input type="text" name="code" className="form-control apply-disabled" placeholder="Enter Coupon Code">
                     <button type="submit" name="coupon_submit" className="input-group-addon btn btn-success">
                     Apply</button>
                  </form> 
                  <hr /> */}
                  {/* <p>
                     Processing Fee 
                     <span className="float-right">&#036;0.50</span>
                  </p> 
                  <hr /> */}
                  <p>
                     Total 
                     <span className="font-weight-bold float-right">&#036;{total}</span>
                  </p>
                  <hr />
                  <Link to="/cart-payment-option" className="btn btn-lg btn-success btn-block">Proceed To Payment</Link>
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