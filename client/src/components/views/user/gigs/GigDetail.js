import React, { Fragment, useState } from 'react';
import { withRouter, useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import parse from 'html-react-parser';
import moment from 'moment';
import * as Yup from 'yup';
import $ from 'jquery';
import "./Gig.css";
import { getGigbyId, getGigbyName, getPackage, addCart } from "../../../../_actions/user.action";

import OwlCarousel from 'react-owl-carousel';
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton
} from "react-share";


const GigDetail = (props) => {

    const dispatch = useDispatch();
    const params = useParams();
    let history = useHistory();
    const auth = useSelector((state) => state.user);

    const [price, setPrice] = useState(0);
    const [package_id, setPackage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [proposal, setProposal] = useState([]);
    const [deliveryTime, setDeliveryTime] = useState(0);
    const [revision, setRevision] = useState(0);

    const addQuantity = () => {
        setQuantity(quantity+1)
    }

    const removeQuantity = () => {
        setQuantity(quantity-1 != 0 ? quantity-1 : quantity)
    }

    const updateQuantity = ({currentTarget: input}) => {
        setQuantity(input.value != 0 ? parseInt(input.value) : 1)
    }

    const updateProposal = (value, status, setFieldValue) => {
        let proposalValue = proposal;

        var index = proposalValue.indexOf(value);
        if (index !== -1) {
            if(status == false) proposalValue.splice(index, 1);
        } else {
            if(status == true) proposal.push(value);
        }
        setProposal(proposalValue);
    }

    useEffect(() => {

        dispatch(getGigbyName(params.gig))
        dispatch(getPackage());

    }, []);


    const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);
    console.log('gig', gig);
    const orderCount = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.orderCount);
    const reviews = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.reviews);

    const packages = useSelector(state => state.user && state.user.packages && state.user.packages.responseData && state.user.packages.responseData.packages);
    const settings = useSelector((state) => state.settings);

    const levelOneRating = settings && settings.settings && settings.settings.seller.levelOneRating;
    const levelOneCompletedOrder = settings && settings.settings && settings.settings.seller.levelOneCompletedOrder;
    const levelTwoRating = settings && settings.settings && settings.settings.seller.levelOneRating;
    const levelTwoCompletedOrder = settings && settings.settings && settings.settings.seller.levelOneCompletedOrder;
    const topRatedRating = settings && settings.settings && settings.settings.seller.levelOneRating;
    const topRatedCompletedOrder = settings && settings.settings && settings.settings.seller.levelOneCompletedOrder;
    const gigRating = gig && gig.rating ? gig.rating : 0;

    let level = 'New Seller';
    let description = '';

    if((gig && gig.user.ratingPercent) >= levelOneRating && gig.user.completedOrder >= levelOneCompletedOrder) {
        level = 'Level One';
    }

    if(gig && gig.user.ratingPercent >= levelTwoRating && gig.user.completedOrder >= levelTwoCompletedOrder) {
        level = 'Level Two';
    }

    if(gig && gig.user.ratingPercent >= topRatedRating && gig.user.completedOrder >= topRatedCompletedOrder) {
        level = 'Top Rated';
    }

    if(gig && gig.description) {
        description = gig.description;
    }

    const shareUrl = window.location.origin + (gig && "/gig/" + gig.user.firstName + "/" + gig.title);
    const title = settings && settings.settings && settings.settings.site.title;

    return (

        <Formik

            enableReinitialize
            initialValues={{
                gig_id: gig && gig._id,
                price: gig && gig.pricing[0].price ,
                package_id: package_id,
                deliveryTime: deliveryTime,
                revision: revision,
                proposal: proposal

            }
            }

            validationSchema={Yup.object().shape({

            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                let data = {
                    gig_id: gig && gig._id,
                    price: values.price,
                    quantity: quantity,
                    package_id: values.package_id,
                    deliveryTime: values.deliveryTime,
                    revision: values.revision,
                    proposal: proposal
                };
                if(values.package_id == ""); delete data["package_id"]; 

                if (values.action == "cart") {
                    dispatch(addCart(data)).then(res => {
                    }).catch(e => {})
                } else {
                    dispatch(addCart(data)).then(res => {
                        history.push('/cart-payment-option/' + res.responseData.carts._id)
                    }).catch(e => {})
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
                                                        <Link to="/">Home</Link>
                                                        <Link to={"/categories/" + (gig && gig.category ? gig && gig.category.name : "") }>{gig && gig.category ? gig && gig.category.name : "" }</Link>
                                                        <Link to={"/categories/" + (gig && gig.category ? gig && gig.category.name : "") + "/" + (gig && gig.subCategory ? gig && gig.subCategory.name : "") }>{gig && gig.subCategory ? gig && gig.subCategory.name : ""}</Link>
                                                    </nav>

                                                     { new Array(Math.ceil(gigRating)).fill(Math.ceil(gigRating)).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  ) }

                                                    { new Array(5 - Math.ceil(gigRating)).fill(0).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_blank.png')} />  ) } 

                                                    <span className="text-muted span"> {reviews && reviews.length > 0 ? "("+ reviews.length +")" : '' } &nbsp;{ orderCount != 0 ? orderCount + " Order "+(orderCount > 1 ? 's' : '' ) + " In Queue" : '' }.</span>
                                                    <div className="sharethis-inline-share-buttons  st-right  st-inline-share-buttons st-animated" style={{ marginTop: "-36px" }} id="st-1">
                                                    
                                                    <WhatsappShareButton url={shareUrl} title={title} className="st-btn st-first" style={{ display: "inline-block", background: "#25d366"  }} >
                                                        <img alt="whatsapp sharing button" src="https://platform-cdn.sharethis.com/img/whatsapp.svg" />
                                                    </WhatsappShareButton>
                                                    
                                                    <FacebookShareButton url={shareUrl} quote={title} className="st-btn st-first" style={{ display: "inline-block", background: "#4267B2" }} >
                                                        <img alt="facebook sharing button" src="https://platform-cdn.sharethis.com/img/facebook.svg" />
                                                    </FacebookShareButton>
                                                    
                                                    <TwitterShareButton url={shareUrl} title={title} className="st-btn st-first" style={{ display: "inline-block", background: "#55acee" }} >
                                                        <img alt="twitter sharing button" src="https://platform-cdn.sharethis.com/img/twitter.svg" />
                                                    </TwitterShareButton>
                                                    
                                                    <LinkedinShareButton url={shareUrl} className="st-btn st-first" style={{ display: "inline-block", background: "#0077b5" }} >
                                                        <img alt="linkedin sharing button" src="https://platform-cdn.sharethis.com/img/linkedin.svg" />
                                                    </LinkedinShareButton>
                                                    
                                                    <EmailShareButton url={shareUrl} subject={title} className="st-btn st-first" style={{ display: "inline-block", background: "#EA4335" }} >
                                                        <img alt="mail sharing button" src="https://platform-cdn.sharethis.com/img/email.svg" />
                                                    </EmailShareButton>
                                                    

                                                    </div>
                                                </div>

                                                <div id="myCarousel" className="carousel slide">

                                                    <OwlCarousel className="carousel-inner" loop dots={true} autoplay={true} items={1} >

                                                        {gig && gig.photo.map((list, i) => (<div key={i} className="row"><div className="carousel-item active"><a><img className="img-fluid d-block w-100" src={list.photo} alt="videosales-1.png" /></a>

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
                                                { parse( description ) }

                                            </div>
                                        </div>
                                        <div className="card proposal-reviews rounded-0 mb-5" id="reviews">
                                            <div className="card-header">
                                                <h4 className="mb-0 ">
                                                    <div className="float-left">
                                                        <span className="mr-2"> { orderCount != 0 ? orderCount +' Reviews' : '' } </span>

                                                        { new Array(Math.ceil(gigRating)).fill(Math.ceil(gigRating)).map(() => <img className='mb-2' src={require('../../../../assets/images/user_rate_full_big.png')} />  ) }

                                                        { new Array(5 - Math.ceil(gigRating)).fill(0).map(() => <img className='mb-2' src={require('../../../../assets/images/user_rate_blank_big.png')} />  ) }

                                                        

                                                        <span className="text-muted ml-2"> { gig && gig.rating } </span>
                                                    </div>
                                                    {/*<div className="float-right">
                                                        <button id="dropdown-button" className="btn btn-success dropdown-toggle" data-toggle="dropdown">
                                                            Most Recent        </button>
                                                        <ul className="dropdown-menu proposalDropdown" style={{ width: "auto !important" }}>
                                                            <li className="dropdown-item active all">Most Recent</li>
                                                            <li className="dropdown-item good">Positive Reviews</li>
                                                            <li className="dropdown-item bad">Negative Reviews</li>
                                                        </ul>
                                                    </div>*/}
                                                </h4>
                                            </div>
                                            <div className="card-body ">
                                                <article id="all" className="proposal-reviews">
                                                    <ul className="reviews-list">
                                                        
                                                        { reviews && reviews.map((review) => (<li className="star-rating-row">
                                                            <span className="user-picture" >
                                                                <img src={ review.buyer.profilePhoto } width="60" height="60" />
                                                            </span>
                                                            <h4>
                                                                <a className="text-success" href="#" className="mr-1"> {review.buyer.firstName} {review.buyer.lastName} </a>
                                                                { new Array(Math.ceil(review.buyerRating)).fill(Math.ceil(review.buyerRating)).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  ) }

                                                                { new Array(Math.ceil(5 - review.buyerRating)).fill(Math.ceil(0)).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_blank.png')} />  ) }
                                                            </h4>
                                                            <div className="msg-body">
                                                                {review.buyerComment}
                                                            </div>
                                                            <span className="rating-date"> { moment(review.buyer_at).format('MMM DD, YYYY') } </span>
                                                           { gig && gig.user._id == auth.user._id ? ( <ul style={{ listStyle: 'none' }}>
                                                                <li className="star-rating-row">
                                                            <span className="user-picture" >
                                                                <img src={ review.seller.profilePhoto } width="60" height="60" />
                                                            </span>
                                                            <h4>
                                                                <a className="text-success" href="#" className="mr-1"> {review.seller.firstName} {review.seller.lastName} </a>
                                                                { new Array(Math.ceil(review.sellerRating)).fill(Math.ceil(review.sellerRating)).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  ) }

                                                                { new Array(5 - Math.ceil(review.sellerRating)).fill(Math.ceil(0)).map(() => <img className='mb-1' src={require('../../../../assets/images/user_rate_blank.png')} />  ) }
                                                            </h4>
                                                            <div className="msg-body">
                                                                {review.sellerComment}
                                                            </div>
                                                            <span className="rating-date"> { moment(review.seller_at).format('MMM DD, YYYY') } </span>
                                                        </li>
                                                            </ul>) : '' }
                                                        </li>)) }



                                                    </ul>
                                                    {/* <!-- reviews-list Ends --> */}
                                                </article>
                                                {/* <!-- proposal-reviews Ends --> */}

                                            </div>
                                        </div>
                                        <div className="proposal-tags-container mt-2 ">
                                            { gig && gig.tags.map((tag, index) => <div key={index} className="proposal-tag mb-3" ><Link to={"/tags/"+tag} ><span>{ tag }</span></Link></div> ) }
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-4 col-md-5 proposal-sidebar">

                                    <div className="card mb-5 rounded-0 gigPlanType">
                                        { gig && !gig.fixed_price && (<div className="card-header pt-0 pl-3 tabs-header">
                                            <ul className="nav nav-tabs card-header-tabs rounded-0 justify-content-center">
                                                {packages && packages.map((pack, index) => (<li key={index} className="nav-item">
                                                    <a className="nav-link  " href="#tab_2506" data-toggle="tab" formid="checkoutForm1" data-node-id={pack.name}>
                                                        {pack.name}   </a>
                                                </li>))}

                                            </ul>
                                        </div>) }
                                        <div className="card-body order-box tab-content">

                                            <div className="purchase-form">
                                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                                    <Field type="hidden" onChange={handleChange} name="package_id" value={values.package_id} />
                                                    <Field type="hidden" onChange={handleChange} name="price" value={values.price} />
                                                    <h3 className="package-price"> Price
                                                        <span className="float-right font-weight-normal"> &#036;<span className='total-price-1'>{ gig && gig.pricing[0].price }</span> </span>
                                                        <span className="total-price-1-num d-none">40</span>
                                                    </h3>
                                                    <h6 className="mb-3">
                                                        <i className="fa fa-clock-o delivery"> { gig && gig.pricing[0].DeliveryTime } Delivery </i> &nbsp; &nbsp; <i className="fa fa-refresh revision"> { gig && gig.pricing[0].revisions } Revisions </i>
                                                    </h6>
                                                    <hr />
                                                    <ul className="buyables m-b-25 list-unstyled ">
                                                        <li className="basket-item mb-4">
                                                            <span className="item "><span className="name"><span>Quantity:</span></span></span>
                                                            <div className="quantity-control ">
                                                                <div className="increase ">
                                                                    <a className="btn btn-plus" onClick={addQuantity}>+</a>
                                                                </div>
                                                                <span className="quantity"><input className="form-control numbers" onChange={updateQuantity} value={quantity} min="1" maxLength="2" style={{ width: '50px', textAlign: 'center', padding: '10px' }} name="quantity" /></span>
                                                                <div className="decrease ">
                                                                    <a className="btn btn-plus" onClick={removeQuantity}>-</a>
                                                                </div>
                                                            </div>
                                                            {/* <!-- &#036;<span className="total-price">10</span>.00 --> */}
                                                        </li>
                                                        <li className="">
                                                            { gig && gig.proposals.map((proposal) => (
                                                                <label key={proposal._id}>
                                                                    <input className="mb-2 form-control" style={{ width: '15px', height: '15px' }} type="checkbox" onChange={ e => updateProposal(proposal._id, e.currentTarget.checked, setFieldValue) } /> &nbsp;
                                                                    <span className="js-express-delivery-text ">{ proposal.name }</span>
                                                                    <span className='price '>
                                                                        <b className='currency'>&#036;{ proposal.price }</b>
                                                                        <b className="num d-none">50</b>
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </li>
                                                    </ul>
{ gig && gig.user._id != auth.user._id ? (<Fragment>
                                                    <button type="submit" onClick={() => setFieldValue("action", "cart")} className="btn btn-order primary added mb-3">
                                                        <i className="fa fa-shopping-cart"></i> &nbsp;<strong>Add to cart</strong>
                                                    </button>
                                                    <button type="submit" onClick={() => setFieldValue("action", "order")} name="add_order" value="1" className="btn btn-order">
                                                        <strong>Order Now (&#036;<span className='total-price-1'>{ gig && gig.pricing[0].price * quantity }</span>)</strong>
                                                    </button></Fragment>) : '' }

                                                </form>
                                        
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card seller-bio mb-3 rounded-0">
                                        <div className="card-body ">
                                            <center className="mb-4">
                                                <img src={ gig && gig.user.profilePhoto } width="100" className="rounded-circle" />
                                            </center>
                                            <h3 className="text-center h3">
                                                <a className="text-success" href={gig && gig.user.firstName} >
                                                    {gig && gig.user.firstName} {gig && gig.user.lastName}  </a> <span className="divider"> </span> <span className="text-muted">{level}</span>
                                            </h3>
                                            { gig && gig.user._id != auth.user._id ? <a href="../../conversations/message?seller_id=2" className="btn btn-lg btn-block btn-success rounded-0">Message me</a> : '' }
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="text-muted"><i className="fa fa-check pr-1"></i> From</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{ gig && gig.user.city && gig.user.city.name } <b>{ gig && gig.user.country && gig.user.country.name }</b> </p>
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
                                                    <p> { gig && gig.user.ratingPercent }% </p>
                                                    <p> July 31, 2020 </p>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="text-left "> { gig && gig.user.description } </p>
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