import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Contact() {



   return (

      <Fragment>

        <div className="dashboardContainer proposals-container no-bg">
<div className="container">
   <div className="row mt-5">
      <div className="col-md-12">
         <h1 className="pt-2"> Manage Contacts</h1>
      </div>
      
   </div>
   <div className="row">
      <div className="col-md-12 mt-3 mb-5">
         <div className="card">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#my_buyers" data-toggle="tab" className="nav-link make-black">
                     My Buyers <span className="badge badge-success">3</span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#my_sellers" data-toggle="tab" className="nav-link make-black active">
                     My Sellers <span className="badge badge-success">16</span>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content">
                  <div id="my_buyers" className="tab-pane fade">
                     <div className="table-responsive">
                        <h4 className="mt-3 mb-3 ml-2"> BUYERS WHO HAVE PURCHASED PROPOSALS/SERVICES FROM YOU. </h4>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Buyer's Name</th>
                                 <th>Completed Orders</th>
                                 <th>Amount Spent</th>
                                 <th>Last Order Date</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <img src="images/userlisting/img-02.jpg" className="rounded-circle contact-image" />
                                    <div className="contact-title">
                                       <h6> pat </h6>
                                       <a href="" target="blank" className="text-success"> User Profile </a> | 
                                       <a href="" className="text-success"> History </a>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td>$0.00</td>
                                 <td>
                                    December 01, 2020
                                 </td>
                                 <td className="text-center">
                                    <a href="" target="blank" className="btn btn-success">
                                    <i className="fa fa-comment"></i>
                                    </a>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div id="my_sellers" className="tab-pane fade active show">
                     <div className="table-responsive">
                        <h4 className="mt-3 mb-3 ml-2"> SELLERS FROM WHOM YOU HAVE PURCHASED PROPOSALS/SERVICES. </h4>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Seller's Name</th>
                                 <th>Completed Orders</th>
                                 <th>Amount Spent</th>
                                 <th>Last Order Date</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>
                                    <img src="images/userlisting/img-02.jpg" className="rounded-circle contact-image" />
                                    <div className="contact-title">
                                       <h6> lambada </h6>
                                       <a href="" target="blank" className="text-success"> User Profile </a> | 
                                       <a href="" target="blank" className="text-success"> History </a>
                                    </div>
                                 </td>
                                 <td>1</td>
                                 <td>$150.00</td>
                                 <td>
                                    May 20, 2020
                                 </td>
                                 <td className="text-center">
                                    <a href="" target="blank" className="btn btn-success">
                                    <i className="fa fa-comment"></i>
                                    </a>
                                 </td>
                              </tr>
                              
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
      </div>
   </div>
</div>
</div>



      </Fragment>
   );
}

export default Contact;