import React, { Fragment, useState } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu, getSlide, getGigWithService, getRecent, getFavourites, addFavourite, buyItAgain  } from "../../../_actions/user.action";
import Gig from "./gigs/Gig"

import OwlCarousel from 'react-owl-carousel';


function Search(props) {

  console.log("props", props);
   let search_service = props && props.location && props.location.state && props.location.state.service;
   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);
   const [service, setService] = useState(search_service);
   const [gig, setGig] = useState([]);
   let history = useHistory();

   useEffect(() => {
    //console.log("service", search_service);
      dispatch(getMenu())
      dispatch(getSlide())
      if(search_service != undefined) dispatch(getGigWithService(search_service)).then((res) => {
        console.log("service", res && res.gigs)
        setGig(res && res.gigs);
      })
    
   }, [search_service]);

   const handleSearch = async () => {
      history.push({
        pathname: '/search',
        search: '',
        state: { service }
      })
   }

   const slide = useSelector((state) => state.user && state.user.slide && state.user.slide.responseData && state.user.slide.responseData.slides);


   return (

      <Fragment>
         <div className="container mt-3">
            <div className="row">
               <div className="col-md-3 ">
                
                   <div className="row justify-content-center">
                     <div className="">
                        
                           <div className="input-group space20 bannerFormBox" style={{ left: '490px' }}>
                              <input type="text" value={service} name="search_query" onChange={e => setService(e.target.value)} className="form-control" placeholder="Find Services" style={{ top: 0 }} />
                              <div className="input-group-append move-icon-up" style={{ top: 0 }}>
                                 <button name="search" onClick={handleSearch} type="submit" className="search_button">
                                    <img src={require('../../../assets/images/srch.png')} className="srch2" />
                                 </button>
                              </div>
                           </div>
                       
                     </div>
                  </div>
                  <br />

               </div>
               <div className="col-md-12 ">
                  <div id="demo3" className="carousel slide">

                     <OwlCarousel className="carousel-inner" loop dots={true} autoplay={true} items={1} >

                        {slide && slide.map((list) => (<div key={list._id} className="carousel-item active"><a><img className="img-fluid" src={list.layoutPhoto} /></a>
                           <div className="carousel-caption d-lg-block d-md-block d-none " >
                              <h3>{list.title}</h3>
                              <p>{list.description}</p></div>
                        </div>))}

                     </OwlCarousel>

                  </div>


                  <div className="row mt-4 mb-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Featured Proposals/Services</h2>
                           <button className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row"> {gig && gig.map((list) => (<Gig key={list._id} list={list} />))} </div>




                  {/* <!-- If You have no gigs, show random gigs on homepage Ends --> */}

                  {/* 
                  <div className="row mt-2 mb-3 mt-3">
                     <div className="col-md-12">
                        <div className="secTitle">
                           <h2 className="float-left">Recent Buyer Requests</h2>
                           <button type="button" className="float-right btn btn-success">VIEW ALL</button>
                        </div>
                     </div>
                  </div>
                  <div className="row buyer-requests">
                     <div className="col-md-12">
                        <div className="table-responsive box-table tableContent">
                           <table className="table table-striped">
                              <thead>
                                 <tr>
                                    <th>Request Message</th>
                                    <th>Offers</th>
                                    <th>Duration</th>
                                    <th>Budget</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr id="request_tr_367">
                                    <td>
                                       <img src={require('../../../assets/images/userlisting/img-01.jpg')} className="request-img rounded-circle" />
                                       <div className="request-description">
                                          <h6>Pat</h6>
                                          <h6 className="text-success">sdfsdf</h6>
                                          <p className="lead">sdfsdfsdfsdfsf </p>
                                       </div>
                                    </td>
                                    <td>0</td>
                                    <td>1 Day</td>
                                    <td className="text-success">
                                       &#036;33.00 <br />
                                       <button className="btn btn-success btn-sm mt-4 send_button_367">
                                          Send Offer </button>
                                    </td>
                 
                                 </tr>

                              </tbody>
                           </table>
                           <center>
                              <a href="requests/buyer_requests" className="btn btn-success btn-lg mb-3">
                                 <i className="fa fa-spinner"></i> Load More </a>
                           </center>
                        </div>
                     </div>
                  </div>
*/}

               </div>
            </div>

         </div>



      </Fragment>
   );
}

export default Search;