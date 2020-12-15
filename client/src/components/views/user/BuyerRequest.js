import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function BuyerRequest() {



   return (

      <Fragment>

        <div className="container">
   <div className="row buyer-requests proposals-container mb-5">
      <div className="col-md-12 mt-5">
         <div className="row">
            <div className="col-md-9">
               <h1>
                  Recent Buyer Requests        
               </h1>
            </div>
            <div className="col-md-3">
               <div className="input-group">
                  <input type="text" id="search-input"  placeholder="Search Buyer Requests" className="form-control" />
                  <span className="input-group-btn">
                  <button className="btn btn-success"> <i className="fa fa-search"></i> </button>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div className="col-md-12 mt-4">
         <div className="card">
            <div className="card-header">
               <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                     <a href="#active-requests" data-toggle="tab" className="nav-link active make-black">
                     Active <span className="badge badge-success"> 
                     49            </span>
                     </a>
                  </li>
                  <li className="nav-item">
                     <a href="#sent-offers" data-toggle="tab" className="nav-link make-black">
                     Offers Sent <span className="badge badge-success"> 12  </span>
                     </a>
                  </li>
               </ul>
            </div>
            <div className="card-body">
               <div className="tab-content">
                  <div id="active-requests" className="tab-pane fade show active">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Buyer Requests </h3>
                        <select id="sub-category" className="form-control float-right sort-by mb-3">
                           <option value="all"> All Subcategories </option>
                           <option value='1'> Logo Design </option>
                           <option value='2'> Business Cards &amp; Stationery </option>
                           <option value='31'> Proofreading & Editing </option>
                           <option value='70'> Virtual Assistant </option>
                           <option value='84'> Health, Nutrition & Fitness </option>
                           <option value='86'> Spiritual & Healing </option>
                           <option value='88'> Collectibles </option>
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Offers</th>
                                 <th>Date</th>
                                 <th>Duration</th>
                                 <th>Budget</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                              <tr id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> sdfsdf </h5>
                                       <p className="lead mb-2"> sdfsdfsdfsdfsf </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> October 05, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_367"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;33.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_348">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> design  a logo for us </h5>
                                       <p className="lead mb-2"> hi we need a logo  </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> September 21, 2020 </td>
                                 <td> 
                                    5 Days 
                                    <a href="#" className="remove-link text-danger remove_request_348"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;5.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_307">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> еуые </h5>
                                       <p className="lead mb-2"> ываываыва </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 22, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_307"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;111,111.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_297">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> fghfhgfjg </h5>
                                       <p className="lead mb-2"> jfhjgfjgcm </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Business Cards &amp; Stationery </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 13, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_297"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;34.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_296">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Required Logo Designer </h5>
                                       <p className="lead mb-2"> Test </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 13, 2020 </td>
                                 <td> 
                                    8 
                                    <a href="#" className="remove-link text-danger remove_request_296"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;10.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_292">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Logo ABC </h5>
                                       <p className="lead mb-2"> nama : ABC
                                          warna : biru 
                                       </p>
                                       <a href="https://www.gigtodo.com/requests/request_files/Screenshot%202020-07-11%20at%201.14.10%20PM_1594613213.png" download>
                                       <i className="fa fa-arrow-circle-down"></i> Screenshot 2020-07-11 at 1.14.10 PM_1594613213.png                        </a>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 12, 2020 </td>
                                 <td> 
                                    2 Days 
                                    <a href="#" className="remove-link text-danger remove_request_292"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;50.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_287">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Hi I need help with abcd </h5>
                                       <p className="lead mb-2"> Hi I need help with abcd </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 04, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_287"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;10.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_284">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">Patricia</a> 
                                       </h6>
                                       <h5 className="text-success"> Looking for a talented logo designer [Urgent] </h5>
                                       <p className="lead mb-2"> I am in search for a very talented logo designer to help come up with a concept for my new clothing line. I need someone with at least a couple years of experience. Send me offers! </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>1</td>
                                 <td> June 25, 2020 </td>
                                 <td> 
                                    4 Days 
                                    <a href="#" className="remove-link text-danger remove_request_284"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;250.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_279">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> efef </h5>
                                       <p className="lead mb-2"> sgfg </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> June 12, 2020 </td>
                                 <td> 
                                    2 Days 
                                    <a href="#" className="remove-link text-danger remove_request_279"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;5.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div id="sent-offers" className="tab-pane fade">
                     <div className="table-responsive">
                        <h3 className="float-left mb-3 pt-2"> Sent Offers </h3>
                        <select id="sub-category" className="form-control float-right sort-by mb-3">
                           <option value="all"> All Subcategories </option>
                           <option value='1'> Logo Design </option>
                           <option value='2'> Business Cards &amp; Stationery </option>
                           <option value='31'> Proofreading & Editing </option>
                           <option value='70'> Virtual Assistant </option>
                           <option value='84'> Health, Nutrition & Fitness </option>
                           <option value='86'> Spiritual & Healing </option>
                           <option value='88'> Collectibles </option>
                        </select>
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>Request</th>
                                 <th>Offers</th>
                                 <th>Date</th>
                                 <th>Duration</th>
                                 <th>Budget</th>
                              </tr>
                           </thead>
                           <tbody id="load-data">
                              <tr id="request_tr_367">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> sdfsdf </h5>
                                       <p className="lead mb-2"> sdfsdfsdfsdfsf </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> October 05, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_367"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;33.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_348">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> design  a logo for us </h5>
                                       <p className="lead mb-2"> hi we need a logo  </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> September 21, 2020 </td>
                                 <td> 
                                    5 Days 
                                    <a href="#" className="remove-link text-danger remove_request_348"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;5.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_307">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> еуые </h5>
                                       <p className="lead mb-2"> ываываыва </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 22, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_307"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;111,111.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_297">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> fghfhgfjg </h5>
                                       <p className="lead mb-2"> jfhjgfjgcm </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Business Cards &amp; Stationery </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 13, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_297"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;34.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_296">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Required Logo Designer </h5>
                                       <p className="lead mb-2"> Test </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 13, 2020 </td>
                                 <td> 
                                    8 
                                    <a href="#" className="remove-link text-danger remove_request_296"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;10.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_292">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Logo ABC </h5>
                                       <p className="lead mb-2"> nama : ABC
                                          warna : biru 
                                       </p>
                                       <a href="https://www.gigtodo.com/requests/request_files/Screenshot%202020-07-11%20at%201.14.10%20PM_1594613213.png" download>
                                       <i className="fa fa-arrow-circle-down"></i> Screenshot 2020-07-11 at 1.14.10 PM_1594613213.png                        </a>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 12, 2020 </td>
                                 <td> 
                                    2 Days 
                                    <a href="#" className="remove-link text-danger remove_request_292"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;50.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_287">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> Hi I need help with abcd </h5>
                                       <p className="lead mb-2"> Hi I need help with abcd </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> July 04, 2020 </td>
                                 <td> 
                                    1 Day 
                                    <a href="#" className="remove-link text-danger remove_request_287"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;10.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_284">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">Patricia</a> 
                                       </h6>
                                       <h5 className="text-success"> Looking for a talented logo designer [Urgent] </h5>
                                       <p className="lead mb-2"> I am in search for a very talented logo designer to help come up with a concept for my new clothing line. I need someone with at least a couple years of experience. Send me offers! </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>1</td>
                                 <td> June 25, 2020 </td>
                                 <td> 
                                    4 Days 
                                    <a href="#" className="remove-link text-danger remove_request_284"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;250.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                              <tr id="request_tr_279">
                                 <td>
                                    <a href="">
                                    <img src="assets/images/comp/profileIcon.png" className="request-img rounded-circle" />
                                    </a>
                                    <div className="request-description">
                                       <h6> 
                                          <a href="">pat</a> 
                                       </h6>
                                       <h5 className="text-success"> efef </h5>
                                       <p className="lead mb-2"> sgfg </p>
                                       <ul className="request-category">
                                          <li> Graphics &amp; Design </li>
                                          <li> Logo Design </li>
                                       </ul>
                                    </div>
                                 </td>
                                 <td>0</td>
                                 <td> June 12, 2020 </td>
                                 <td> 
                                    2 Days 
                                    <a href="#" className="remove-link text-danger remove_request_279"> Remove Request </a>
                                 </td>
                                 <td className="text-success font-weight-bold">
                                    &#036;5.00                                            <br />
                                    <button className="btn btn-success btn-sm mt-4 send_button">Send Offer</button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="append-modal"></div>
         <div id="quota-finish" className="modal fade">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title h5"><i className="fa fa-frown-o fa-move-up"></i> Request Quota Reached</h5>
                     <button className="close" data-dismiss="modal"> &times; </button>
                  </div>
                  <div className="modal-body">
                     <center>
                        <h5>You can only send a max of 10 offers per day. Today you've maxed out. Try again tomorrow. </h5>
                     </center>
                  </div>
                  <div className="modal-footer">
                     <button className="btn btn-success" data-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div className="append-modal">
   <div id="send-offer-modal" className="modal fade" style={{ display: 'none' }} aria-hidden="true">


   <div className="modal-dialog">

      <div className="modal-content">

         <div className="modal-header">

            <h5 className="modal-title">Select A Proposal/Service To Offer</h5>

            <button className="close" data-dismiss="modal"> <span> ×</span></button>
            

         </div>

         <div className="modal-body p-0">

            <div className="request-summary">
                    
                                    
                     <img src="https://www.gigtodo.com/user_images/cool-profile-picastures-coo_1602176634.png" width="50" height="50" className="rounded-circle" />

            
            <div id="request-description">

               <h6 className="text-success mb-1"> sdfsdf </h6>

               <p>sdfsdfsdfsdfsf</p>

            </div>
               

            </div>


            <div className="request-proposals-list">
                    
               
               <div className="proposal-picture">

               <input type="radio" id="radio-623" className="radio-custom" name="proposal_id" value="623" required="" />

               <label for="radio-623" className="radio-custom-label"></label>

               <img src="https://www.gigtodo.com/proposals/proposal_files/man-iand-woman-doing-a-handshake-3874034_1588269353.png" width="50" height="50" style={{ borderRadius: '2% !important' }} />

               </div> 

               <div className="proposal-title">

               <p>I will do a video session and prepare you for any job interview</p>

               </div>

               <hr />
                    
                    
               <div className="proposal-picture">

               <input type="radio" id="radio-890" className="radio-custom" name="proposal_id" value="890" required="" />

               <label for="radio-890" className="radio-custom-label"></label>

               <img src="https://www.gigtodo.com/proposals/proposal_files/poster%206_1595619408.png" width="50" height="50" style={{ borderRadius: "2% !important;" }} />

               </div> 

               <div className="proposal-title">

               <p>i will design a perfect logo for your company</p>

               </div>

               <hr />
                    
                    
               <div className="proposal-picture">

               <input type="radio" id="radio-904" className="radio-custom" name="proposal_id" value="904" required="" />

               <label for="radio-904" className="radio-custom-label"></label>

               <img src="https://www.gigtodo.com/proposals/proposal_files/screenshot-premium11.web-hosting.com_2083-2020.07.29-06_54_39_1596023798.png" width="50" height="50" style={{ borderRadius: "2% !important;" }} />

               </div> 

               <div className="proposal-title">

               <p>dsfgfdghfrghrfhcxvbsdfhgdfhg</p>

               </div>

               <hr />
                    
                    
            </div>

         </div>

         <div className="modal-footer">

            <button className="btn btn-secondary" data-dismiss="modal"> Close</button>

            <button className="btn btn-success" id="submit-proposal" data-toggle="modal" data-dismiss="modal" data-target="#submit-proposal-details" title="Choose an offer before clicking continue">Continue</button>

         </div>

      </div>

   </div>

</div>
</div>



      </Fragment>
   );
}

export default BuyerRequest;