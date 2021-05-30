import React, { Fragment, useState } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPost } from "../../../_actions/profile.action";

import moment from 'moment';
import OwlCarousel from 'react-owl-carousel';

import "../../../assets/css/foundation.css";
import "../../../assets/css/header.css";
import "../../../assets/css/icon-fonts.css";
import "../../../assets/css/hover.css";
import "../../../assets/css/footer-bottom.css";
import "../../../assets/css/menu.css";
import "../../../assets/css/blog.css";
import "../../../assets/css/fonts.css";
import "../../../assets/css/color.css";


function Landing() {
   let history = useHistory();
   const dispatch = useDispatch();
   let auth = useSelector((state) => state.user);
   const [service, setService] = useState("");

   useEffect(() => {
      dispatch(getPost())
   }, []);

   let post = useSelector((state) => state.profile && state.profile.posts && state.profile.posts.responseData && state.profile.posts.responseData.post);

   const handleSearch = async () => {
      history.push({
        pathname: '/search',
        search: '',
        state: { service }
      })
   }

   return (

      <Fragment>

         <div className="content-wrapper">
        <section id="main-content">

            <div className="row">
                {post && post.map((list) => (<div className="large-12 columns" role="content">

                    <article>

                        <h1><a href="#">{list.title}</a></h1>
                        <p className="article_pub-date">Published
                              <time datetime="2014-05-13" pubdate="">{ moment(list.createdAt).format('MMMM DD, YYYY') }</time>
                        </p>

                        <div className="row">
                            <div className="large-12 columns">
                                <img className="float-right" src={list.layoutPhoto} />
                                <p>{list.description}</p>
                                
                            </div>
                        </div>
                    <Link to={"/post/" + list._id} className="button">Read More</Link>
                    </article>

                    <hr />

                   
                </div>))}

              
            </div>

        </section>
       
    </div>


      </Fragment>
   );
}

export default Landing;