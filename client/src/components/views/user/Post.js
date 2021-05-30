import React, { Fragment, useState } from 'react';
import { withRouter, Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPostbyId, createComment, getComments } from "../../../_actions/profile.action";
import $ from 'jquery';
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
   const params = useParams();
   const [service, setService] = useState("");
   const [comment, setComment] = useState();

   useEffect(() => {
      dispatch(getPostbyId(params.id))
      dispatch(getComments()).then((res) => {
        console.log("res", res.responseData);
        setComment(res && res.responseData && res.responseData.comment);

      })
   }, []);

   let post = useSelector((state) => state.profile && state.profile.post && state.profile.post.responseData && state.profile.post.responseData.post);

   console.log("post", post);

   const onSubmit = () => {

      console.log($("textarea[name=comment]").val());

      let data = {
        comments: $("textarea[name=comment]").val()
      }

      dispatch(createComment(data)).then((res) => {

        console.log("ersr", res.responseData);

        setComment(res && res.responseData);


      })
   }


   return (

      <Fragment>

         <div className="content-wrapper">
        <section id="main-content">

            <div className="row">
               <div className="large-12 columns" role="content">

                    <div className="large-12 columns" role="content">

                      <article>

                          <h1><a href="#">{post && post.title}</a></h1>
                          <p className="article_pub-date">Published
                                <time datetime="2014-05-13" pubdate="">{ moment(post && post.createdAt).format('MMMM DD, YYYY') }</time>
                          </p>

                          <div className="row">
                              <div className="large-12 columns">
                                  <img className="float-right" src={post && post.layoutPhoto} />
                                  <p>{post && post.description}</p>
                                  
                              </div>
                          </div>

                          <p>Reviews:</p>

                          <div className="row">
                              {comment && comment.map((list) => (<div className="large-12 columns">

                                  <h4>{list.user.firstName} {list.user.lastName}</h4>
                                 
                                  <p>{list.comments}</p>


                                  
                              </div>))}
                          </div>



                          <div className="col-md-8 ">
                                  <p>Place your comments:</p>
                                 <textarea rows="5" id="comment" name="comment" maxLength={100} className='form-control mb-2' />

                                 <button type="submit" onClick={() => onSubmit()} className="btn btn-success"> Submit Review </button>

                         </div>
                      
                      </article>

                    <hr />

                   
                </div>

              </div>
            </div>

        </section>
       
    </div>


      </Fragment>
   );
}

export default Landing;