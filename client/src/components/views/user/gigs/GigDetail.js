import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getGigbyId, createOrder, getPackage, addCart } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';


const GigDetail = (props) =>  {

    const dispatch = useDispatch();
    const params = useParams();
    let history = useHistory();

    const [price, setPrice] = useState(0);
    const [package_id, setPackage] = useState("");

    useEffect(() => {

        dispatch(getGigbyId(params.gig))
        dispatch(getPackage())
        var $input = $("input[name='quantity']");
        

        // Colocar a 0 ao início
        $input.val(1);

        // Aumenta ou diminui o valor sendo 0 o mais baixo possível
        $(".qnty").click(function(){
            if ($(this).hasClass('plus'))
                $input.val(parseInt($input.val())+1);
            else if ($input.val()>=1)
                $input.val(parseInt($input.val())-1);
        });

        //$("body").on("click", ".nav-link", function () {
                //$(".body-sub-width").addClass("display-none");
                /*$(".nav-link").removeClass("active");
                var node_id = $(this).data('node-id');*/
                console.log(params.gig);
                
            $.ajax({
                url: "/api/gig/package/"+params.gig,
                type: "get",
                beforeSend: function (request) {
                    //showInlineLoader();
                },
                success: function(response, textStatus, jqXHR) {
                    
                    var data = response.responseData.gig;
                    console.log('gig',data);
                    if(data.fixed_price == true){
                        $(".tabs-header").hide();  
                        $(".total-price-1").text(data.pricing[0].price);
                        setPackage(data.pricing[0].package);
                        setPrice(data.pricing[0].price);      
                    }else{
                        $(".tabs-header").show();   
                        $("body").on("click", ".nav-link", function () {
                        var node_id = $(this).data('node-id');
                        /*$.each( data.pricing, function( key, value ) {

                            var index = $.inArray( value, node_id );
                            console.log('val',index);
                            if( index != -1 ) {
                                $(".total-price-1").text(value.price);
                            }
                        });*/
                        if(node_id == "Basic"){
                         $(".total-price-1").text(data.pricing[0].price);
                         setPackage(data.pricing[0].package);
                         setPrice(data.pricing[0].price);
                        }else if(node_id == "Standard"){
                         $(".total-price-1").text(data.pricing[1].price);
                         setPackage(data.pricing[1].package);
                         setPrice(data.pricing[1].price);
                        }else{
                         $(".total-price-1").text(data.pricing[2].price);  
                         setPackage(data.pricing[2].package);
                         setPrice(data.pricing[2].price);
                        }
                        });
                    }
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //
                    
                }
      });

           // });
    }, [params.gig]);
    const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);
    const packages = useSelector(state => state.user && state.user.packages && state.user.packages.responseData && state.user.packages.responseData.packages);
    //console.log('gig', gig);

    return (

        <Formik

            enableReinitialize
            initialValues={{
                gig_id: params.gig,
                price: price,
                quantity: '1',
                package_id: package_id

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
                    gig_id: params.gig,
                    price: values.price,
                    quantity: values.quantity,
                    package_id: values.package_id
                };

                if (values.action == "cart") {
                    dispatch(addCart(data)).then(res => {
                        console.log('cart',res.responseData.count.length);
                        $(".cart-count").text(res.responseData.count.length+1);
                        //addToast(res.message, { appearance: res.status, autoDismiss: true, })
                        
                    })
                } else {
                    dispatch(addCart(data)).then(res => {
                      console.log('id',res);
                      history.push('cart-payment-option/'+res.responseData.carts._id)
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


            <div className="mp-gig-top-nav">
                <nav>
                    <ul className="container text-center" id="mainNav">
                        <li className="selected">
                            <a href="#introduction" className="gig-page-nav-link">Introduction</a>
                        </li>
                        <li>
                            <a href="#details" className="gig-page-nav-link">Proposal Details</a>
                        </li>
                        <li>
                            <a href="#reviews" className="gig-page-nav-link">Reviews</a>
                        </li>
                        <li>
                            <a href="#related" className="gig-page-nav-link">Related Proposals</a>
                        </li>
                        <li className="btns d-none float-right">
                            <button className="order-now btn btn-secondary">
                                Order Now (&#036;<span className='total-price'>10.00</span>)
            </button>
                        </li>
                        <li className="btns d-none float-right">
                            <button className="add-to-cart btn btn-secondary">
                                <i className="fa fa-shopping-cart"></i>
               Add To Cart
            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="container mt-5" id="introduction">
                {/* <!-- Container starts --> */}
                <div className="row">
                    <div className="col-lg-8 col-md-7 mb-3">
                        {/* <!--- col-lg-8 col-md-7 mb-3 Starts ---> */}
                        <div className="wt-projectdetail-holder">
                            <div className="card rounded-0 mb-4 border-0 bg-none">
                                <div className="card-body details pt-0">
                                    <div className="proposal-info ">
                                        <h3>{gig && gig.title}</h3>
                                        <hr />
                                        <nav className="breadcrumbs h-text-truncate mb-2">
                                            <a href="../../">Home</a>
                                            <a href="../../categories/video-animation"> Video &amp; Animation </a>
                                            <a href="../../categories/video-animation/whiteboard-explainer-videos">
                                                Whiteboard & Explainer Videos          </a>
                                        </nav>
                                        <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='mb-1' src={require('../../../../assets/images/user_rate_blank.png')} />         <span className="text-muted span"> (22) &nbsp;309 Order(s) In Queue.</span>
                                        <div className="sharethis-inline-share-buttons  st-right  st-inline-share-buttons st-animated" style={{ marginTop: "-36px" }} id="st-1"><div className="st-btn st-first" data-network="whatsapp" style={{ display: "inline-block" }}>
                                            <img alt="whatsapp sharing button" src="https://platform-cdn.sharethis.com/img/whatsapp.svg" />

                                        </div><div className="st-btn" data-network="facebook" style={{ display: "inline-block" }}>
                                                <img alt="facebook sharing button" src="https://platform-cdn.sharethis.com/img/facebook.svg" />

                                            </div><div className="st-btn" data-network="twitter" style={{ display: "inline-block" }}>
                                                <img alt="twitter sharing button" src="https://platform-cdn.sharethis.com/img/twitter.svg" />

                                            </div><div className="st-btn" data-network="linkedin" style={{ display: "inline-block" }}>
                                                <img alt="linkedin sharing button" src="https://platform-cdn.sharethis.com/img/linkedin.svg" />

                                            </div><div className="st-btn" data-network="pinterest" style={{ display: "inline-block" }}>
                                                <img alt="pinterest sharing button" src="https://platform-cdn.sharethis.com/img/pinterest.svg" />

                                            </div><div className="st-btn st-last" data-network="sharethis" style={{ display: "inline-block" }}>
                                                <img alt="sharethis sharing button" src="https://platform-cdn.sharethis.com/img/sharethis.svg" />

                                            </div></div>
                                    </div>

                                    <div id="myCarousel" className="carousel slide">

                                        <OwlCarousel className="carousel-inner" loop dots={true} autoplay={true} items={1} >

                                            {gig && gig.photo.map((list) => (<div className="row"><div className="carousel-item active"><a><img className="img-fluid d-block w-100" src={list.photo} alt="videosales-1.png" /></a>


                                            </div></div>))}

                                        </OwlCarousel>
                                    </div>
                                    <div className="card mb-0 rounded-0 border-0">
                                        {/* <!-- card Starts --> */}
                                        <div className="card-body proposal-slider pb-0 pt-2 pl-0">
                                            {/* <!-- card-body Starts --> */}
                                            <div className="owl-carousel owl-theme">
                                                {/* <!--- owl-carousel owl-theme Starts ---> */}
                                                <div className="item active" data-position="0">
                                                    <a><img src="https://www.gigtodo.com/proposals/proposal_files/videosales-1.png" alt="videosales-1.png" /></a>
                                                </div>
                                                <div className="item" data-position="1">
                                                    <a>
                                                        <img src="https://www.gigtodo.com/proposals/proposal_files/videosales-2.jpg" alt="videosales-2.jpg" />
                                                    </a>
                                                </div>
                                                <div className="item" data-position="2">
                                                    <a>
                                                        <img src="https://www.gigtodo.com/proposals/proposal_files/videosales-3.jpg" alt="videosales-3.jpg" />
                                                    </a>
                                                </div>
                                            </div>
                                            {/* <!--- owl-carousel owl-theme Ends ---> */}
                                        </div>
                                        {/* <!-- card-body Ends --> */}
                                    </div>
                                    {/* <!-- card rounded-0 mb-3 Ends --> */}

                                </div>
                            </div>
                            <div className="card rounded-0 mb-1 " id="details">
                                <div className="card-header">
                                    <h4>About This Gig</h4>
                                </div>
                                <div className="card-body proposal-desc">
                                    <p>{gig && gig.description}</p>

                                </div>
                            </div>
                            <div className="card proposal-reviews rounded-0 mb-5" id="reviews">
                                <div className="card-header">
                                    <h4 className="mb-0 ">
                                        <div className="float-left">
                                            <span className="mr-2"> 22 Reviews </span>
                                            <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  <img className='mb-2' src={require('../../../../assets/images/user_rate_blank_big.png')} />  <span className="text-muted ml-2"> 4.8 </span>
                                        </div>
                                        <div className="float-right">
                                            <button id="dropdown-button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">
                                                Most Recent        </button>
                                            <ul className="dropdown-menu proposalDropdown" style={{ width: "auto !important" }}>
                                                <li className="dropdown-item active all">Most Recent</li>
                                                <li className="dropdown-item good">Positive Reviews</li>
                                                <li className="dropdown-item bad">Negative Reviews</li>
                                            </ul>
                                        </div>
                                    </h4>
                                </div>
                                <div className="card-body ">
                                    <article id="all" className="proposal-reviews">
                                        <ul className="reviews-list">
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={require('../../../../assets/images/userlisting/img-02.jpg')} width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Aug 17 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={require('../../../../assets/images/userlisting/img-02.jpg')} width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             çok begendim mükemmel
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Aug 15 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={require('../../../../assets/images/userlisting/img-02.jpg')} width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> fixmywebsite </a>
                                                    <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             gret, thanks
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Jun 21 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={require('../../../../assets/images/userlisting/img-01.jpg')} width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> volarex </a>
                                                    <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                                                </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> Jun 04 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}
                                            <li className="star-rating-row">
                                                {/* <!-- star-rating-row Starts --> */}
                                                <span className="user-picture" >
                                                    {/* <!-- user-picture Starts --> */}
                                                    <img src={require('../../../../assets/images/userlisting/img-06.jpg')} width="60" height="60" />
                                                </span>
                                                {/* <!-- user-picture Ends --> */}
                                                <h4>
                                                    {/* <!-- h4 Starts --> */}
                                                    <a className="text-success" href="#" className="mr-1"> shoail </a>
                                                    <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />  <img className='rating' src={require('../../../../assets/images/user_rate_full.png')} />
                                                </h4>
                                                {/* <!-- h4 Ends --> */}
                                                <div className="msg-body">
                                                    {/* <!-- msg-body Starts --> */}
                             shit
                          </div>
                                                {/* <!-- msg-body Ends --> */}
                                                <span className="rating-date"> May 29 2020 </span>
                                            </li>
                                            {/* <!-- star-rating-row Ends --> */}


                                        </ul>
                                        {/* <!-- reviews-list Ends --> */}
                                    </article>
                                    {/* <!-- proposal-reviews Ends --> */}

                                </div>
                            </div>
                            <div className="proposal-tags-container mt-2 ">
                                {/* <!--- proposal-tags-container Starts ---> */}
                                <div className="proposal-tag mb-3" ><a href="../../tags/explainer-video"><span>explainer video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-whiteboard-animation"><span> whiteboard animation</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-sales-video"><span> sales video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-Animated-video"><span> Animated video</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-video-marketing"><span> video marketing</span></a></div>
                                <div className="proposal-tag mb-3" ><a href="../../tags/-video"><span> video</span></a></div>
                            </div>
                            {/* <!--- proposal-tags-container Ends ---> */}
                        </div>

                    </div>

                    <div className="col-lg-4 col-md-5 proposal-sidebar">

                        <div className="card mb-5 rounded-0 gigPlanType">
                            <div className="card-header pt-0 pl-3 tabs-header">
                                <ul className="nav nav-tabs card-header-tabs rounded-0 justify-content-center">
                                    {packages && packages.map((pack, index) => (<li className="nav-item">
                                        <a className="nav-link  " href="#tab_2506" data-toggle="tab" formid="checkoutForm1" data-node-id={pack.name}>
                                            {pack.name}   </a>
                                    </li>))}
                                    
                                </ul>
                            </div>
                            <div className="card-body order-box tab-content">

                                <div className="purchase-form">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <Field type="hidden" onChange={handleChange} name="gig_id" value={params.gig} />
                                        <Field type="hidden" onChange={handleChange} name="package_id" value={values.package_id} />
                                        <Field type="hidden" onChange={handleChange} name="price" value={values.price} />
                                        <h3 className="package-price">
                                            Price
                                            <span className="float-right font-weight-normal">
                                                &#036;<span className='total-price-1'>0</span>
                                            </span>
                                            <span className="total-price-1-num d-none">40</span>
                                        </h3>
                                        <p>Post your song to my music website</p>
                                        <h6 className="mb-3">
                                            <i className="fa fa-clock-o"></i> 1 Days Delivery &nbsp; &nbsp; <i className="fa fa-refresh"></i> 0 Revisions
                                        </h6>
                                        <hr />
                                        <ul className="buyables m-b-25 list-unstyled ">
                                             <li className="basket-item mb-4">
                                                <span className="item "><span className="name"><span>Quantity:</span></span></span>
                                                <div className="quantity-control ">
                                                    <div className="increase ">
                                                    <a className="btn btn-plus plus qnty">+</a>
                                                    </div>
                                                    <span className="quantity "><input onChange={handleChange} value={values.quantity} min="1" style={{width: '23px'}} name="quantity" /></span>
                                                    <div className="decrease ">
                                                    <a className="btn btn-plus minus qnty">-</a>
                                                    </div>
                                                </div>
                                                {/* <!-- &#036;<span className="total-price">10</span>.00 --> */}
                                            </li>
                                            <li className="">
                                                <label className="">
                                                    <input className="mb-2" style={{ width: '15px', height: '15px' }} type="checkbox" name="proposal_extras[1]" data-packagenum="1" value="225" form="checkoutForm1" />
                                                    <span className="js-express-delivery-text "> Radio airplay      </span>
                                                    <span className='price '>
                                                        <b className='currency'>&#036;50.00</b>
                                                        <b className="num d-none">50</b>
                                                    </span>
                                                </label>
                                            </li>
                                            <li className="">
                                                <label className="">
                                                    <input className="mb-2" style={{ width: '15px', height: '15px' }} type="checkbox" name="proposal_extras[2]" data-packagenum="1" value="226" form="checkoutForm1" />
                                                    <span className="js-express-delivery-text "> YouTube song posting      </span>
                                                    <span className='price '>
                                                        <b className='currency'>&#036;50.00</b>
                                                        <b className="num d-none">50</b>
                                                    </span>
                                                </label>
                                            </li>
                                        </ul>
                                        <button type="submit" onClick={() => setFieldValue("action", "cart")} className="btn btn-order primary added mb-3">
                                            <i className="fa fa-shopping-cart"></i> &nbsp;<strong>Add to cart</strong>
                                        </button>
                                        <button type="submit" onClick={() => setFieldValue("action", "order")} name="add_order" value="1" className="btn btn-order">
                                            <strong>Order Now (&#036;<span className='total-price-1'>0</span>)</strong>
                                        </button>
                                    </form>
                                    {/* <form encType="multipart/form-data">
                                        <input type="hidden" name="proposal_id" value="4" />
                                        <input type="hidden" name="proposal_qty" value="1" />
                                        <div className="header">
                                            <span className="text ">
                                                <span className="dropdown" tabindex="0" data-toggle="popover">Order Details</span>
                                                <a href="#" className="secure ml-2">

                                                </a>
                                                <a href="#" id="favorite_4" className="favorite ml-2">
                                                    <i className="fa fa-heart dil1" data-toggle="tooltip" data-placement="top" title="Favorites"></i>
                                                </a>
                                            </span>
                                            <div className="price ">
                                                <b className="currency">
                                                    &#036;<span className='total-price'>10.00</span>      </b>
                                                <br />
                                                <span className="total-price-num d-none">10</span>
                                            </div>
                                        </div>
                                        <hr className="mt-0" />
                                        <div className="row">
                                            <div className="col-12 ml-2 p-2">
                                                <h6 className="mb-0 ">
                                                    <i className="fa fa-clock-o"></i> 1 Day Delivery
                                                        &nbsp;&nbsp;
                                                        <span className="float-right mr-4">
                                                        <i className="fa fa-refresh"></i>
                                                            Revisions
                                                        </span>
                                                </h6>
                                            </div>
                                        </div>
                                        <hr />
                                        <li className="basket-item mb-4">
                                            <span className="item "><span className="name"><span>Quantity:</span></span></span>
                                            <div className="quantity-control ">
                                                <div className="increase ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
                                                        <g className="icon" fill="#00CCBC">
                                                            <rect width="1.091" height="8.727" x="7.455" y="3.636" rx=".545"></rect>
                                                            <rect width="1.091" height="8.727" x="7.455" y="3.636" transform="rotate(90 8 8)" rx=".545"></rect>
                                                            <path d="M1.35,8 C1.35,11.6725489 4.32745108,14.65 8,14.65 C11.6725489,14.65 14.65,11.6725489 14.65,8 C14.65,4.32745108 11.6725489,1.35 8,1.35 C4.32745108,1.35 1.35,4.32745108 1.35,8 Z M0,8 C0,3.58186667 3.58186667,0 8,0 C12.4181333,0 16,3.58186667 16,8 C16,12.4181333 12.4181333,16 8,16 C3.58186667,16 0,12.4181333 0,8 Z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <span className="quantity ">1</span>
                                                <div class="decrease ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
                                                        <g class="icon" fill="#00CCBC">
                                                            <rect width="1.091" height="8.727" x="7.455" y="3.636" transform="rotate(90 8 8)" rx=".545"></rect>
                                                            <path d="M1.35,8 C1.35,11.6725489 4.32745108,14.65 8,14.65 C11.6725489,14.65 14.65,11.6725489 14.65,8 C14.65,4.32745108 11.6725489,1.35 8,1.35 C4.32745108,1.35 1.35,4.32745108 1.35,8 Z M0,8 C0,3.58186667 3.58186667,0 8,0 C12.4181333,0 16,3.58186667 16,8 C16,12.4181333 12.4181333,16 8,16 C3.58186667,16 0,12.4181333 0,8 Z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </li>
                                        <button type="submit" name="add_cart" value="1" className="btn btn-order primary mb-3">
                                            <i className="fa fa-shopping-cart"></i> &nbsp;<strong>Add to Cart</strong>
                                        </button>
                                        <button type="submit" name="add_order" value="1" className="btn btn-order">
                                            <strong>Order Now (&#036;<span className='total-price'>10.00</span>)</strong>
                                        </button>
                                    </form> */}
                                </div>
                            </div>
                            {/* <!--- card-body Ends ---> */}
                        </div>
                        <div className="card seller-bio mb-3 rounded-0">
                            <div className="card-body ">
                                <center className="mb-4">
                                    <img src={require('../../../../assets/images/userlisting/img-06.jpg')} width="100" className="rounded-circle" />
                                </center>
                                <h3 className="text-center h3">
                                    <a className="text-success" href={gig && gig.user.firstName} >
                                        {gig && gig.user.firstName} {gig && gig.user.lastName}  </a> <span className="divider"> </span> <span className="text-muted">Level Two</span>
                                </h3>
                                <a href="../../conversations/message?seller_id=2" className="btn btn-lg btn-block btn-success rounded-0">Message me</a>
                                <hr />
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="text-muted"><i className="fa fa-check pr-1"></i> From</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p> Ecuador</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-muted"><i className="fa fa-check pr-1"></i>  Speaks</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>
                                            <span>English </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-muted"><i className="fa fa-check pr-1"></i>  Positive Reviews</p>
                                        <p className="text-muted"><i className="fa fa-check pr-1"></i> Recent Delivery</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p> 7% </p>
                                        <p> July 31, 2020 </p>
                                    </div>
                                </div>
                                <hr />
                                <p className="text-left "> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here. </p>
                                <a href="../../mir_digimarket" className="text-success"> Read More </a>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Col ends --> */}
                </div>
            </div>


        </Fragment >
                );
            }}
        </Formik>
    );
};
export default GigDetail;