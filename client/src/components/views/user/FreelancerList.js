import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
function FreelancerList(props) {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user);
    const [favourite, setFavourite] = useState(false);

    const favourites = useSelector((state) => state.user && state.user && state.user.favourites);

    let fav = favourites && favourites.length > 0 && favourites.find( (fav) => { return fav.gig._id == props.list._id } );


    const gigRating = props.list && props.list.rating ? props.list.rating : 0;



    return (

        <Fragment>

            <div className="col-md-12">
                     <div className="card card-body mb-4 freelancerBox">                        
                           <figure className="wt-userlistingimg">
                              <img src={props.list.profilePhoto} width="100" className="rounded img-fluid" />
                                 <small className="text-muted mt-1">
                                    <i className={'fa fa-circle' + (auth.isAuthenticated ? 'text-success' : 'text-danger')}></i>
                                    {auth.isAuthenticated ? "Online" : "Offline"}     
                                 </small>
                              <div className="wt-userdropdown wt-away template-content tipso_style wt-tipso">
                                 <img src="images/level_badge_3.png" className="level_badge" />
                              </div>
                              <Link id="chatBtn" data-toggle="tooltip" data-placement="top" title="Chat With Me" to={(auth.user._id != props.list._id) ? "/chat/" + props.list._id : "/" } className="btn btn-success mt-4 text-white "><i className="fa fa-comments-o" aria-hidden="true"></i> 
                                 Chat
                              </Link>
                           </figure>                        
                        <div className="request-description">
                           <div className="row">
                              <div className="col-lg-9 col-md-12">
                                 <a href="fixmywebsite">
                                 <h6 className="font-weight-normal"><i className="fa fa-check-circle" style={{color:"#00cc8d"}}></i> {props.list.firstName} </h6>
                                 <h5 className="text-success"> {props.list.headline} </h5>
                                 </a>
                                 <ul className="tagline mb-2 p-0">
                                    <li>
                                       <i className="fa fa-user"></i>
                                       <strong>Member Since: </strong> { moment(props.list.created_at).format('MMMM DD, YYYY') }             
                                    </li>
                                    <li>
                                       <i className="fa fa-truck fa-flip-horizontal"></i>
                                       <strong>Recent Delivery: </strong> { moment(props.list.recentDelivery).format('MMMM DD, YYYY') }               
                                    </li>
                                    <li>
                                       <i className="fa fa-map-marker"></i>
                                       <strong>Country: </strong> {props.list.country ? props.list.country.name : ""}               
                                    </li>
                                    <li>
                                       <a href="conversations/message.php?seller_id=1"><i className="fa fa-comments-o"></i> <strong>Contact:</strong> {props.list.firstName} </a>
                                    </li>
                                 </ul>
                              </div>
                              <div className="col-lg-3 col-md-12">
                                 <div className="star-rating">
                                
                                  { gigRating && new Array(Math.ceil(gigRating)).fill(Math.ceil(gigRating)).map((i) => <img key={i} className='mb-1' src={require('../../../assets/images/user_rate_full.png')} />  ) }

                                  { new Array(5 - Math.ceil(gigRating)).fill(0).map((i, j) => <img key={j} className='mb-1' src={require('../../../assets/images/user_rate_blank.png')} />  ) }         
                                  <h4 className="mb-1">{props.list.rating ? props.list.rating : 0}/<small className="text-muted font-weight-normal">5</small></h4>
                                 {/* <a>(9 Reviews)</a> */}
                                 </div>
                              </div>
                           </div>
                           <p className="lead mb-2 mt-0">{props.list.description}</p>
                           <div className="skills">
                           {props.list.skill && props.list.skill.map((list, index) => (<button className="btn btn-light tags-19">{list.skill}</button>))}
                           </div>
                        </div>
                     </div>
                  </div>



        </Fragment>
    );
}

export default FreelancerList;