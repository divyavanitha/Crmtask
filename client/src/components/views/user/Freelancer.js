import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';
import moment from 'moment';
import { freelancerList, getCountry, getLanguage } from "../../../_actions/user.action";
import ReactPaginate from 'react-paginate';
import '../../../../src/pagination.css';

const Freelancer = (props) => {

   const dispatch = useDispatch();
   let history = useHistory();
   const auth = useSelector((state) => state.user);
   const [freelancers, setFreelancers] = useState([]);
   const [offset, setOffset] = useState(0);
   const [perPage, setPerPage] = useState(1);
   const [pageCount, setPageCount] = useState(0);
   const [countries, setCountries] = useState([]);
   const [languages, setLanguages] = useState([]);

   useEffect(() => {
      dispatch(freelancerList()).then((res) => {
         setPerPage(res.responseData.per_page)
         setFreelancers(res.responseData.data.freelancers)
         setPageCount(Math.ceil((res.responseData.total) / res.responseData.per_page))
      })

      dispatch(getCountry()).then((res) => {
         console.log(res)
         setCountries(res.countries)
      });

      dispatch(getLanguage()).then((res) => {
         console.log(res, "res")
         setLanguages(res.languages)
      })

   }, []);

   const handlePageClick = (e) => {
      console.log(e);
      const selectedPage = e.selected;

      dispatch(freelancerList(selectedPage+1)).then((res) => {
         setPerPage(res.responseData.per_page)
         setFreelancers(res.responseData.data.freelancers)
         setPageCount(Math.ceil((res.responseData.total) / res.responseData.per_page))
      })
   };

   const countryChange = (country_name) => {

      console.log(country_name)

   }


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
            {/*<div className="col-lg-3 col-md-4 col-sm-12 ">
                         
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
                     <button className="btn btn-secondary btn-sm float-right clear_seller_country clearlink">
                        <i className='fa fa-times-circle'></i> Clear Filter    </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                        {countries && countries.map((list, index) => (<li key={index} className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" onClick={countryChange(list.name)} value={list.name} className="get_seller_country" />
                           <span>{list.name}</span>
                           </label>
                        </li>))}
                       
                       </ul>
                  </div>
               </div>

               <div className="card border-success mb-3">
                  <div className="card-header bg-success">
                     <h3 className="float-left text-white h5">Seller Level</h3>
                     <button className="btn btn-secondary btn-sm float-right clear_seller_level clearlink" >
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
                     <button className="btn btn-secondary btn-sm float-right clear_seller_language clearlink" >
                        <i className='fa fa-times-circle'></i> Clear Filter       
                     </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                        {languages && languages.map((list, index) => (<li key={index} className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" value={list._id} className="get_seller_language" />
                           <span>{list.name}</span>
                           </label>
                        </li>))}
                     </ul>
                  </div>
               </div>        
            </div>*/}
            <div className="col-lg-9 col-md-8 col-sm-12 ">
               <div className="row flex-wrap" id="freelancers">                   
                  {freelancers && freelancers.map((list, index) => (<Fragment key={index}><div className="col-md-12">
                     <div className="card card-body mb-4 freelancerBox">                        
                           <figure className="wt-userlistingimg">
                              <img src={list.profilePhoto} width="100" className="rounded img-fluid" />
                                 <small className="text-muted mt-1">
                                    <i className={'fa fa-circle' + (auth.isAuthenticated ? 'text-success' : 'text-danger')}></i>
                                    {auth.isAuthenticated ? "Online" : "Offline"}     
                                 </small>
                              <div className="wt-userdropdown wt-away template-content tipso_style wt-tipso">
                                 <img src="images/level_badge_3.png" className="level_badge" />
                              </div>
                              <Link id="chatBtn" data-toggle="tooltip" data-placement="top" title="Chat With Me" to={(auth.user._id != list._id) ? "/chat/" + list._id : "/" } className="btn btn-success mt-4 text-white "><i className="fa fa-comments-o" aria-hidden="true"></i> 
                                 Chat
                              </Link>
                           </figure>                        
                        <div className="request-description">
                           <div className="row">
                              <div className="col-lg-9 col-md-12">
                                 <a href="fixmywebsite">
                                 <h6 className="font-weight-normal"><i className="fa fa-check-circle" style={{color:"#00cc8d"}}></i> {list.firstName} </h6>
                                 <h5 className="text-success"> {list.headline} </h5>
                                 </a>
                                 <ul className="tagline mb-2 p-0">
                                    <li>
                                       <i className="fa fa-user"></i>
                                       <strong>Member Since: </strong> { moment(list.created_at).format('MMMM DD, YYYY') }             
                                    </li>
                                    <li>
                                       <i className="fa fa-truck fa-flip-horizontal"></i>
                                       <strong>Recent Delivery: </strong> { moment(list.recentDelivery).format('MMMM DD, YYYY') }               
                                    </li>
                                    <li>
                                       <i className="fa fa-map-marker"></i>
                                       <strong>Country: </strong> {list.country ? list.country.name : ""}               
                                    </li>
                                    <li>
                                       <a href="conversations/message.php?seller_id=1"><i className="fa fa-comments-o"></i> <strong>Contact:</strong> {list.firstName} </a>
                                    </li>
                                 </ul>
                              </div>
                              <div className="col-lg-3 col-md-12">
                                 <div className="star-rating">
                                  <i className='fa fa-star'></i>  
                                  <i className='fa fa-star'></i>  
                                  <i className='fa fa-star'></i>  
                                  <i className='fa fa-star'></i>  
                                  <i className='fa fa-star-o'></i>            
                                  <h4 className="mb-1">{list.rating ? list.rating : 0}/<small className="text-muted font-weight-normal">5</small></h4>
                                 {/* <a>(9 Reviews)</a> */}
                                 </div>
                              </div>
                           </div>
                           <p className="lead mb-2 mt-0">{list.description}</p>
                           <div className="skills">
                           {list && list.skill.map((list, index) => (<button className="btn btn-light tags-19">{list.skill}</button>))}
                           </div>
                        </div>
                     </div>
                  </div></Fragment>))}
               </div>

               <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
               />

               <div id="wait"></div>
                      <br />
             
            </div>
         </div>
       </div>
     </div>
   </div>
  
      </Fragment>

   );
};

export default Freelancer;