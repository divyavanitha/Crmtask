import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {


    return (

        <React.Fragment>

            
                <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                        <img src={require('../../../../assets/images/postImg/img-03.jpg')} className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                        {/* <!--- proposal-card-caption Starts ---> */}
                        <div className="proposal-seller-info">
                            {/* <!--- onePress-seller-info Starts ---> */}
                            <span className="fit-avatar s24">
                                <img src={require('../../../../assets/images/userlisting/img-02.jpg')} className="rounded-circle" width="32" height="32" />
                            </span>
                            <div className="seller-info-wrapper">
                                <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
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
                        <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video"
                            className="proposal-link-main js-proposal-card-imp-data">
                            <h3>I Will Create A Professional Custom Explainer Video</h3>
                        </a>
                        <div className="rating-badges-container">
                            <span className="proposal-rating">
                                <i className="fa fa-star"></i>
                                <span>
                                    <strong>4.8</strong> (22)
                        </span>
                            </span>
                        </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                        {/* <!--- proposal-card-footer Starts ---> */}
                        <div className="proposal-price">
                            <a>
                                <small>STARTING AT</small>&#036;10.00 </a>
                        </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                </div>
                {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}
            


        </React.Fragment>
    );
}

export default App;