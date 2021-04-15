import React, { Fragment, useState, FormEvent, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
//import { useToasts } from 'react-toast-notifications'
import $ from 'jquery';
import moment from 'moment';
import { freelancerList, getCountry, getLanguage, freelancerCountryList } from "../../../_actions/user.action";
import ReactPaginate from 'react-paginate';
import '../../../../src/pagination.css';
import FreelancerList from "./FreelancerList";

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
   const [selectedPage, setSelectedPage] = useState([]);

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
      setSelectedPage((e.selected)+1);
      dispatch(freelancerList((e.selected)+1)).then((res) => {
         setPerPage(res.responseData.per_page)
         setFreelancers(res.responseData.data.freelancers)
         setPageCount(Math.ceil((res.responseData.total) / res.responseData.per_page))
      })
   };

   
   const freelancerFilter = () => {
      var  country = $("input[name=get_seller_country]:checked").map( function() {
         return this.value;
      }).get();

      var seller_level = $("input[name=get_seller_level]:checked").map(function() {
         return this.value;
      }).get();

      var lang = $("input[name=get_seller_language]:checked").map(function() {
        console.log(this.value);
         return this.value;
      }).get();
      console.log(lang);

      dispatch(freelancerList(selectedPage, country, seller_level, lang)).then((res) => {
        console.log("response",res);
         setPerPage(res.responseData.per_page)
         setFreelancers(res.responseData.data.freelancers)
         setPageCount(Math.ceil((res.responseData.total) / res.responseData.per_page))
      })

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
                     <button className="btn btn-secondary btn-sm float-right clear_seller_country clearlink">
                        <i className='fa fa-times-circle'></i> Clear Filter    </button>
                  </div>
                  <div className="card-body">
                     <ul className="nav flex-column">
                        {countries && countries.map((list, index) => (<li key={index} className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" name="get_seller_country" onClick={freelancerFilter} value={list._id} className="get_seller_country" />
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
                           <input type="checkbox" name="get_seller_level" onClick={freelancerFilter} value="TOPRATED" className="get_seller_level" />
                           <span>Top Rated</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" onClick={freelancerFilter} name="get_seller_level" value="LEVELTWO" className="get_seller_level" />
                           <span>Level Two</span>
                           </label>
                        </li>
                              <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" onClick={freelancerFilter} name="get_seller_level" value="NEWSELLER" className="get_seller_level" />
                           <span>New Seller</span>
                           </label>
                        </li>
                        <li className="nav-item checkbox checkbox-success">
                           <label>
                           <input type="checkbox" onClick={freelancerFilter} name="get_seller_level" value="LEVELONE" className="get_seller_level" />
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
                           <input type="checkbox" name="get_seller_language" onClick={freelancerFilter} value={list.name} className="get_seller_language" />
                           <span>{list.name}</span>
                           </label>
                        </li>))}
                     </ul>
                  </div>
               </div>        
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 ">
               <div className="row flex-wrap" id="freelancers">    
                  {freelancers && freelancers.map((list) => (<FreelancerList key={list._id} list={list} />))}               

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