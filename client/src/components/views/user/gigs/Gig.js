import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGigWithoutAuth } from "../../../../_actions/user.action";

function Gig() {

    const dispatch = useDispatch();

   useEffect(() => {
      
      dispatch(getGigWithoutAuth())
   }, []);
    const gig = useSelector((state) => state.user && state.user.gig && state.user.gig.responseData && state.user.gig.responseData.gigs);
    //console.log('gig',gig);

    return (

        <Fragment>
            
                {gig && gig.map((list) => (<div key={list._id} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1">
                    <div className="proposal-card-base mp-proposal-card">
                    {console.log(list)}
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <Link to={list.user ? "/gig/"+list.user.firstName+"/"+list._id : ""}>
                        <img src={list.photo[0] ? list.photo[0].photo : ""} className="img-fluid" />
                    </Link>
                    <div className="proposal-card-caption">
                        {/* <!--- proposal-card-caption Starts ---> */}
                        <div className="proposal-seller-info">
                            {/* <!--- onePress-seller-info Starts ---> */}
                            <span className="fit-avatar s24">
                                <img src={list.user ? list.user.profilePhoto : ""} className="rounded-circle" width="32" height="32" />
                            </span>
                            <div className="seller-info-wrapper">
                                <a href={list.user ? list.user.firstName : ""} className="seller-name">{list.user ? list.user.firstName : ""} {list.user ? list.user.lastName : ""}</a>
                                <div className="onePress-seller-tooltip">
                                    Level Two
                                </div>
                            </div>
                            <div className="favoriteIcon">
                                <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip"
                                    data-placement="top" title="Favorite"></i>
                            </div>
                        </div>
                        {/* <!--- onePress-seller-info Ends ---> */}
                        <Link to={list.user ? "/gig/"+list.user.firstName+"/"+list._id : ""} className="proposal-link-main js-proposal-card-imp-data">
                            <h3>{list.title}</h3>
                        </Link>
                        <div className="rating-badges-container">
                            <span className="proposal-rating">
                                <i className="fa fa-star"></i>
                                <span>
                                    <strong>{list.user ? list.user.rating : "3"}</strong> (22)
                        </span>
                            </span>
                        </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                        {/* <!--- proposal-card-footer Starts ---> */}
                        <div className="proposal-price">
                            <a>
                                <small>STARTING AT</small>&#036;{list.pricing[0] ? list.pricing[0].price : "0.00"} </a>
                        </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                </div>
                </div>))}
                {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
            


        </Fragment>
    );
}

export default Gig;