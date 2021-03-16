import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';

import { freelancerList } from "../../../_actions/user.action";

const Freelancer = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const [freelancers, setFreelancers] = useState([]);
   useEffect(() => {
      dispatch(freelancerList()).then((res) => {
         setFreelancers(res.responseData.data.freelancers)
         console.log("res", res.responseData.data.freelancers);
      })


   }, []);


   return (


      <Fragment>

<div className="container-fluid mt-5">
     <div className="row">
       <div className="col-md-12">
         <center>
         <h1> Freelancers </h1>
         <p className="lead">Home / Search Freelancers</p>
         </center>
         <hr className="mt-5 pt-2" />
       </div>
     </div>
   <div className="row mt-3 justify-content-center">
            
      <div className="col-xl-10 col-lg-12 col-md-12">
         <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 ">
                         
               <div className="card border-success mb-3">
                  <div className="card-body pb-2 pt-3 ">
                     <ul className="nav flex-column">
                        <li className="nav-item checkbox checkbox-success">
                           <label>
                              <input type="checkbox" value="1" className="get_online_sellers" />
                              <span>Show Online Sellers</span>
                           </label>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="card border-success mb-3">
                  <div className="card-header bg-success">
                     <h3 className="float-left text-white h5">Seller Location</h3>
                     <button className="btn btn-secondary btn-sm float-right clear_seller_country clearlink" onclick="clearCountry()">
                        <i className='fa fa-times-circle'></i> Clear Filter    </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="France" className="get_seller_country" />
                        <span>France</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Ecuador" className="get_seller_country" />
                        <span>Ecuador</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Canada" className="get_seller_country" />
                        <span>Canada</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="pakistan" className="get_seller_country" />
                        <span>pakistan</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="United States" className="get_seller_country" />
                        <span>United States</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Austria" className="get_seller_country" />
                        <span>Austria</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Saudi Arabia" className="get_seller_country" />
                        <span>Saudi Arabia</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Germany" className="get_seller_country" />
                        <span>Germany</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="US" className="get_seller_country" />
                        <span>US</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Efc" className="get_seller_country"/>
                        <span>Efc</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Jamaica" className="get_seller_country"/>
                        <span>Jamaica</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="India" className="get_seller_country" />
                        <span>India</span>
                        </label>
                     </li>
                        <li className="nav-item checkbox checkbox-success">
                        <label>
                        <input type="checkbox" value="Peru" className="get_seller_country"/>
                        <span>Peru</span>
                        </label>
                     </li>
                       </ul>
                  </div>
               </div>

               <div className="card border-success mb-3">
                  <div className="card-header bg-success">
                     <h3 className="float-left text-white h5">Seller Level</h3>
                     <button className="btn btn-secondary btn-sm float-right clear_seller_level clearlink" onclick="clearLevel()">
                        <i className='fa fa-times-circle'></i> Clear Filter    </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="4" className="get_seller_level" />
                           <span>Top Rated</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="3" className="get_seller_level" />
                           <span>Level Two</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="1" className="get_seller_level" />
                           <span>New Seller</span>
                           </label>
                        </li>
                        <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="2" className="get_seller_level" />
                           <span>Level One</span>
                           </label>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="card border-success mb-3">
                  <div className="card-header bg-success">
                     <h3 className="float-left text-white h5">Seller Lang</h3>
                     <button className="btn btn-secondary btn-sm float-right clear_seller_language clearlink" onclick="clearLanguage()">
                        <i className='fa fa-times-circle'></i> Clear Filter       
                     </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                                 <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="45" className="get_seller_language" />
                           <span>Francais</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="35" className="get_seller_language" />
                           <span>English </span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="38" className="get_seller_language" />
                           <span>Arabic</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="37" className="get_seller_language" />
                           <span>Spanish</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value="43" className="get_seller_language" />
                           <span>Turkish</span>
                           </label>
                        </li>
                             
                     </ul>
                  </div>
               </div>        
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 ">
               <div className="row flex-wrap" id="freelancers">                   
                  {freelancers && freelancers.map((list, index) => (<Fragment><div className="col-md-12">
                     <div className="card card-body mb-4 freelancerBox">
                        <figure className="wt-userlistingimg">
                           <img src={list.profilePhoto} width="100" className="rounded img-fluid" />
                              <small className="text-muted mt-1">
                                 <i className='fa fa-circle text-danger'></i>
                                 Offline     
                              </small>
                           <div className="wt-userdropdown wt-away template-content tipso_style wt-tipso">
                              <img src="images/level_badge_3.png" className="level_badge" />
                           </div>
                           <a id="chatBtn" data-toggle="tooltip" data-placement="top" title="Chat With Me" href="conversations/message.php?seller_id=1" className="btn btn-success mt-4 text-white "><i className="fa fa-comments-o" aria-hidden="true"></i> 
                              Chat
                           </a>
                        </figure>
                        <div className="request-description">
                           <div className="row">
                              <div className="col-lg-9 col-md-12">
                                 <a href="fixmywebsite">
                                 <h6 className="font-weight-normal"><i className="fa fa-check-circle" style={{color:"#00cc8d"}}></i> fixmywebsite </h6>
                                 <h5 className="text-success"> Website Fixer </h5>
                                 </a>
                                 <ul className="tagline mb-2 p-0">
                                    <li>
                                       <i className="fa fa-user"></i>
                                       <strong>Member Since: </strong> January 2, 2018             
                                    </li>
                                    <li>
                                       <i className="fa fa-truck fa-flip-horizontal"></i>
                                       <strong>Recent Delivery: </strong> October 30, 2020               
                                    </li>
                                    <li>
                                       <i className="fa fa-map-marker"></i>
                                       <strong>Country: </strong> France               
                                    </li>
                                    <li>
                                       <a href="conversations/message.php?seller_id=1"><i className="fa fa-comments-o"></i> <strong>Contact:</strong> fixmywebsite </a>
                                    </li>
                                 </ul>
                              </div>
                              <div className="col-lg-3 col-md-12">
                                 <div className="star-rating">
                                  <i className='fa fa-star'></i>  <i className='fa fa-star'></i>  <i className='fa fa-star'></i>  <i className='fa fa-star'></i>  <i className='fa fa-star-o'></i>            <h4 className="mb-1">4.7/<small className="text-muted font-weight-normal">5</small></h4>
                                 <a>(9 Reviews)</a>
                                 </div>
                              </div>
                           </div>
                           <p className="lead mb-2 mt-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here.</p>
                           <div className="skills">
                           </div>
                        </div>
                     </div>
                  </div></Fragment>))}
               </div>
               <div id="wait"></div>
                      <br />
             <div className="row justify-content-center mb-5 mt-0">
                  <nav>
                    <ul className="pagination" id="freelancer_pagination">    
                        <li className='page-item'>
                        <a className='page-link' href='?page=1&'>First Page</a>
                        </li><li className='page-item active'><a className='page-link' href='?page=1&'>1</a></li><li className='page-item'><a href='?page=2&' className='page-link'>2</a></li><li className='page-item'><a href='?page=3&' className='page-link'>3</a></li><li className='page-item'><a href='?page=4&' className='page-link'>4</a></li><li className='page-item'><a href='?page=5&' className='page-link'>5</a></li><li className='page-item'><a href='?page=6&' className='page-link'>6</a></li><li className='page-item' href='#'><a className='page-link'>...</a></li><li className='page-item '><a className='page-link' href='?page=24&'>24</a></li>  
                        <li className='page-item'>
                        <a className='page-link' href='?page=24&'>Last Page</a>
                        </li>              
                     </ul>
                  </nav>
             </div>
            </div>
         </div>
       </div>
     </div>
   </div>
  
      </Fragment>

   );
};

export default Freelancer;