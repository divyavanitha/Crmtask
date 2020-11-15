import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'

import { creategigs } from "../../../../_actions/gigs.action";
import { getCategory, getSubCategory } from "../../../../_actions/user.action";

const RequestList = (props) => {

   return (


      <Fragment>

         <div className="container view-proposals proposals-container">

            <div className="row mt-5 mb-3">

               <div className="col-md-6">

                  <h1 className="pull-left">View My Proposals</h1>
               </div>
               <div className="col-md-6">
                  <Link className="btn btn-success pull-right" to="/request/add"><i className="fa fa-plus-circle"></i> Add New Request </Link>
               </div>
            </div>
            <div className="row">
               <div className="col-md-12">

                  <div className="clearfix"></div>
                  <ul className="nav nav-tabs flex-column flex-sm-row mt-4">
                     <li className="nav-item">
                        <a href="#active-proposals" data-toggle="tab" className="nav-link active make-black">
                           Active Proposals <span className="badge badge-success">9</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pause-proposals" data-toggle="tab" className="nav-link make-black">
                           Paused Proposals <span className="badge badge-success">0</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#pending-proposals" data-toggle="tab" className="nav-link make-black">
                           Pending Proposals <span className="badge badge-success">4</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#modification-proposals" data-toggle="tab" className="nav-link make-black">
                           Requires Modification <span className="badge badge-success">2</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#draft-proposals" data-toggle="tab" className="nav-link make-black">
                           Draft <span className="badge badge-success">18</span>
                        </a>
                     </li>
                     <li className="nav-item">
                        <a href="#declined-proposals" data-toggle="tab" className="nav-link make-black">
                           Declined <span className="badge badge-success">0</span>
                        </a>
                     </li>
                  </ul>
                  <div className="tab-content">
                     <div id="active-proposals" className="tab-pane fade show active">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="proposal-title"> I will do a video session and prepare you for any job interview </td>
                                    <td className="text-success"> &#036;10.00 </td>
                                    <td>21</td>
                                    <td>22</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> i will design a perfect logo for your company </td>
                                    <td className="text-success"> &#036;10.00 </td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> texto ejemplo </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>4</td>
                                    <td>1</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> w5nb547yn4 573457 n 76 </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>5</td>
                                    <td>2</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> dsfgfdghfrghrfhcxvbsdfhgdfhg </td>
                                    <td className="text-success"> &#036;25.00 </td>
                                    <td>4</td>
                                    <td>1</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> instant </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>7</td>
                                    <td>1</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> pro00001 </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>5</td>
                                    <td>1</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> vggg </td>
                                    <td className="text-success"> &#036;9,000.00 </td>
                                    <td>21</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Хорошо поесть за 3-их </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>6</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="#" className="dropdown-item text-success">Already Featured </a>
                                             <a href="" className="dropdown-item"> Deactivate Proposal</a>
                                             <a href="" className="dropdown-item"> View Coupons</a>
                                             <a href="" className="dropdown-item"> View Referrals</a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>

                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="pause-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                              </tbody>
                           </table>
                           <center>
                              <h3 class='pt-4 pb-4'><i class='fa fa-smile-o'></i> You currently have no paused proposals/services.</h3>
                           </center>
                        </div>
                     </div>
                     <div id="pending-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="proposal-title"> عنوان آزمايشي </td>
                                    <td className="text-success"> &#036;8.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> نمونه محصول </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> zdfsdgsdgsdgsdgsdgsgsdg </td>
                                    <td className="text-success"> &#036;100.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> test2 </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="modification-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Modification Proposal Title</th>
                                    <th>Modification Message</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="proposal-title"> fdsfd  hg </td>
                                    <td> more details </td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Submit For Approval </a>
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Help to gain 1000 followers every week on Instagram </td>
                                    <td> scammer, piss off</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Submit For Approval </a>
                                             <a href="" className="dropdown-item"> Preview </a>
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="draft-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="proposal-title"> I will design your webstie for $200 </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> to test </td>
                                    <td className="text-success"> &#036;600.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> I need health content </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> ewrrwerwrw </td>
                                    <td className="text-success"> &#036;1,000.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> dsf adsf asdf asdf asdf </td>
                                    <td className="text-success"> &#036;1,000.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> cvbcbcbc </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> texto </td>
                                    <td className="text-success"> &#036;10.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Voy a hacerte un diseño de logo profesional </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Voy a hacerte un logo  </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Logo </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> Voy a hacer tu logo </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> I will teach HTML and CSS on video call </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> instant 1 </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> ecommerce </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> gddfghgdsgdsgsd </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> logo making  </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> tescsac </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="proposal-title"> asdasdasd </td>
                                    <td className="text-success"> &#036;5.00 </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td className="text-center">
                                       <div className="dropdown">
                                          <button className="btn btn-success dropdown-toggle" data-toggle="dropdown"></button>
                                          <div className="dropdown-menu">
                                             <a href="" className="dropdown-item"> Edit </a>
                                             <a href="" className="dropdown-item"> Delete </a>
                                          </div>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div id="declined-proposals" className="tab-pane fade show">
                        <div className="table-responsive box-table mt-4">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Proposal's Title</th>
                                    <th>Proposal's Price</th>
                                    <th>Views</th>
                                    <th>Orders</th>
                                    <th>Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                              </tbody>
                           </table>
                           <center>
                              <h3 class='pt-4 pb-4'><i class='fa fa-smile-o'></i> You currently have no proposals/services declined.</h3>
                           </center>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="featured-proposal-modal"></div>


      </Fragment>

   );
};

export default RequestList;