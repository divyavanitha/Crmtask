import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Footer() {


    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;


    return (

        <Fragment>

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="footerAbout">
                                <div className="footerLogo"><a href=""><img src={site && site.logo} /></a></div>
                                <p className="f-abt-desc">
                                {site && site.description}
                     </p>
                                <div className="collapse show" id="collapsefindusOn">
                                    <ul className="list-inline social_icon">
                                        <li className="list-inline-item"><a href="#"><i className="fa fa-google-plus-official"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                        <li className="list-inline-item"><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                    </ul>
                                    <img src={require('../../../../assets/images/google.png')} className="pic" />
                                    <img src={require('../../../../assets/images/app.png')} className="pic1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className="h3Border" data-toggle="collapse" data-target="#collapsecategories2">Company</h3>
                            <ul className="collapse show list-unstyled" id="collapsecategories2">
                                <li className="list-unstyled-item"><a href="">About Us</a></li>
                                <li className="list-unstyled-item"><a href="">Common Problems</a></li>
                                <li className="list-unstyled-item"><a href="">Tips For Sellers</a></li>
                                <li className="list-unstyled-item"><a href="">Tips For Buyers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className="h3Border" data-toggle="collapse" data-target="#collapseabout">Explore More</h3>
                            <ul className="collapse show list-unstyled" id="collapseabout">
                                <li className="list-unstyled-item"><a href=""><i className="fa fa-file-text-o"></i> Terms & Conditions</a></li>
                                <li className="list-unstyled-item"><a href=""><i className="fa fa fa-life-ring"></i> Customer Support</a></li>
                                <li className="list-unstyled-item"><a href=""><i className="fa fa-question-circle"></i> How It Works</a></li>
                                <li className="list-unstyled-item"><a href=""><i className="fa fa-book"></i> Knowledge Bank</a></li>
                                <li className="list-unstyled-item"><a href=""><i className="fa fa-rss"></i> Blog - Stay Informed</a></li>
                                <li className="list-unstyled-item"><a href=""><i className="fa fa-comments"></i> Feedback/Forum </a></li>
                            </ul>
                        </div>

                    </div>
                </div>
                <br />
            </footer>
            <section className="post_footer">
                {site && site.copyright}
      </section>

        </Fragment>
    );
}

export default Footer;