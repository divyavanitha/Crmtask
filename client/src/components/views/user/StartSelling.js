import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import moment from 'moment';
import Gig from "./gigs/Gig";
import $ from 'jquery';


import OwlCarousel from 'react-owl-carousel';



function STARTED() {

   return (

      <Fragment>

         <header id="start_selling" style={{backgroundImage: "-webkit-linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../public/images/selling.jpeg)", backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../public/images/selling.jpeg)",backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed"}} >
            <h2 className="text-center text-white">Become A Seller On Our Platform</h2>
            <h3 className="text-center text-white">You bring the skill. We'll make earnings as easy as 1,2,3</h3>
            <div className="text-center btn_start_selling">
                <Link to="/gig/add" className="btn btn-success btn-lg btn_start_selling">
                  <i className="fa fa-pencil-square-o"></i> Create A Proposal
               </Link>
            </div>
         </header>
         <br /><br />

      <section id="start_selling_body">
         
         <div className="container">
          
            <h2 className="text-center pb-5 pt-5">How Does This Work?</h2>
          
            <div className="row row-1">
               
               <div className="col-md-4">
                 
                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/create-icon.png"} />
                  <h3 className="pb-4">Create a Proposal</h3>
                  <p>Once you create an account, all you have to do to become a seller is to create a proposal/service. Make sure you proposal is as captivating as possible. Potential customers actually read through your content.</p>
                  
               </div>
                      
               <div className="col-md-4">

                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/approve-icon.png"} />
                  <h3 className="pb-4">Submit Proposal</h3>
                  <p>After you've created your amazing proposal/service, submit it so the admin can make sure everything looks good. Admins rarely decline proposals, however, make sure everything looks good before submitting.</p>

               </div>
              
               <div className="col-md-4">

                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/receive-icon.png"} />
                  <h3 className="pb-4">Get Orders. Worldwide.</h3>
                  <p>Yay! so your proposal/service was approved by the admin. Now's the good part, start receiving a ton of orders from customer from all over the world. Just perform your very best on every single order.</p>
                  
               </div>
              
            </div>

          <br/><br/><hr /><br/><br/>
          
          <span style={{ padding: "200px" , margin:"200px" }}></span>
          
            <div className="row row-2">
                
               <div className="col-md-4">
                 
                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/delivered-icon.png"} />
                  <h3 className="pb-4">Deliver Masterpieces</h3>
                  <p>Once you've received orders, try your very best to satisfy your customers. This is very important for return customers and amazing reviews. Communication is key, make sure you are in touch with your customer.</p>

               </div>
                      
               <div className="col-md-4">

                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/rate-icon.png"} />
                  <h3 className="pb-4">Rate Your Customers</h3>
                  <p>A lot of customers do check their own ratings. It is important to rate customers based on their behavior during the order process. This is important for other sellers, and for the admins. Most sellers give 5 stars.</p>
                  
               </div>
              
               <div className="col-md-4">

                  <img src={window.location.protocol+"//"+window.location.host+"/public/images/earn-icon.png"} />

                  <h3 className="pb-4">Get Paid. On Time.</h3>
                  <p>Get paid on time, every time. After the clearance period, payment is transferred to you. Our system lets you transfer funds from our system to your PayPal, Mobile Money, Payoneer or Crypto account.</p>

               </div>
              
         </div>
          
      </div>

          <br/>
          <br/>
          <br/>
          
      </section>


      <div className="text-center btn_start_selling">
         <Link to="/gig/add" className="btn btn-success btn-lg btn_start_selling">
            <i className="fa fa-pencil-square-o"></i> Create A Proposal
         </Link>
      </div>
  
 

      </Fragment>
   );
}

export default STARTED;