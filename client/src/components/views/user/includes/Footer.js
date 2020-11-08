import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Footer() {


    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

    let appLink = settings.settings && settings.settings.appLink;

    let socialLink = settings.settings && settings.settings.socialLink;

    return (

        <Fragment>

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="footerAbout">
                                <div className="footerLogo"><a href=""><img src={site && site.logo} /></a></div>
                                <p className="f-abt-desc">{site && site.description}</p>
                                <p class="f-abt-desc"><span class="bold">Phone:</span> {site && site.email}</p>
                                <p class="f-abt-desc"><span class="bold">Email:</span> {site && site.mobile}</p>
                                <div className="collapse show" id="collapsefindusOn">
                                    <ul className="list-inline social_icon">
                                    {socialLink && socialLink.map((social, index) => (social.url != ""  && (<li key={index} className="list-inline-item"><a href={social.url} target="_blank"><img src={social.picture} className="pic" /></a></li>) ) )}
                                    </ul>
                                    {appLink && appLink.map((app, index) => (app.status == 1  && (<a key={index} href={app.url} target="_blank"><img src={app.picture} className="pic" /></a>) ) )}
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