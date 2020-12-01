import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGigWithoutAuth } from "../../../../_actions/user.action";

function Gig(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getGigWithoutAuth())
    }, []);
    const gig = useSelector((state) => state.user && state.user.gigs && state.user.gigs.responseData && state.user.gigs.responseData.gigs);
    //console.log('gig',gig);
    return (

        <Fragment>

            <div className={props.styles ? props.styles : "col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1"}>
                <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <Link to={props.list.user ? "/gig/" + props.list.user.firstName + "/" + props.list._id : ""}>
                        <img src={props.list.photo[0] ? props.list.photo[0].photo : ""} className="img-fluid" />
                    </Link>
                    <div className="proposal-card-caption">
                        {/* <!--- proposal-card-caption Starts ---> */}
                        <div className="proposal-seller-info">
                            {/* <!--- onePress-seller-info Starts ---> */}
                            <span className="fit-avatar s24">
                                <img src={props.list.user ? props.list.user.profilePhoto : ""} className="rounded-circle" width="32" height="32" />
                            </span>
                            <div className="seller-info-wrapper">
                                <a href={props.list.user ? props.list.user.firstName : ""} className="seller-name">{props.list.user ? props.list.user.firstName : ""} {props.list.user ? props.list.user.lastName : ""}</a>
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
                        <Link to={props.list.user ? "/gig/" + props.list.user.firstName + "/" + props.list._id : ""} className="proposal-link-main js-proposal-card-imp-data">
                            <h3>{props.list.title}</h3>
                        </Link>
                        <div className="rating-badges-container">
                            <span className="proposal-rating">
                                <i className="fa fa-star"></i>
                                <span>
                                    <strong>{props.list.user ? props.list.user.rating : "3"}</strong> (22)
                        </span>
                            </span>
                        </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                        {/* <!--- proposal-card-footer Starts ---> */}
                        <div className="proposal-price">
                            <a>
                                <small>STARTING AT</small>&#036;{props.list.pricing[0] ? props.list.pricing[0].price : "0.00"} </a>
                        </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                </div>
            </div>
            {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}



        </Fragment>
    );
}

export default Gig;