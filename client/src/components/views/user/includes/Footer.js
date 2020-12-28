import React, { useState, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function Footer() {


    let settings = useSelector((state) => state.settings);

    let site = settings.settings && settings.settings.site;

    let appLink = settings.settings && settings.settings.appLink;

    let socialLink = settings.settings && settings.settings.socialLink;

    let pageList = useSelector((state) => state.user && state.user.page_list);

    let pages = pageList && pageList.filter(i => i.type == 'PAGE');

    let about = pageList && pageList.filter(i => i.type == 'ABOUT');

    return (

        <Fragment>

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="footerAbout">
                                <div className="footerLogo"><a href=""><img src={site && site.logo} /></a></div>
                                <p className="f-abt-desc">{site && site.description}</p>
                                <p className="f-abt-desc"><span className="bold">Phone:</span> {site && site.email}</p>
                                <p className="f-abt-desc"><span className="bold">Email:</span> {site && site.mobile}</p>
                                <div className="collapse show" id="collapsefindusOn">
                                    <ul className="list-inline social_icon">
                                        {socialLink && socialLink.map((social, index) => (social.url != "" && (<li key={index} className="list-inline-item"><a href={social.url} target="_blank"><img src={social.picture} className="pic" /></a></li>)))}
                                    </ul>
                                    {appLink && appLink.map((app, index) => (app.status == 1 && (<a key={index} href={app.url} target="_blank"><img src={app.picture} className="pic" /></a>)))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className="h3Border" data-toggle="collapse" data-target="#collapsecategories2">Pages</h3>
                            <ul className="collapse show list-unstyled" id="collapsecategories2">
                                { pages && pages.map(page => (
                                    <li key={page._id} className="list-unstyled-item"><Link to={"/pages/"+page.url}>{page.title}</Link></li>
                                )
                            )}
                            </ul>
                        </div>
                        <div className="col-md-3 col-12">
                            <h3 className="h3Border" data-toggle="collapse" data-target="#collapseabout">About</h3>
                            <ul className="collapse show list-unstyled" id="collapseabout">
                            { about && about.map(page => (
                                    <li key={page._id}  className="list-unstyled-item"><Link to={"/pages/"+page.url}>{page.title}</Link></li>
                                )
                            )}
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