import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getGigWithoutAuth, addFavourite } from "../../../../_actions/user.action";

function Gig(props) {

    const dispatch = useDispatch();

    const [favourite, setFavourite] = useState(false);

    const favourites = useSelector((state) => state.user && state.user && state.user.favourites);

    let fav = favourites && favourites.length > 0 && favourites.find( (fav) => { return fav.gig._id == props.list._id } );

    useEffect(() => {

        dispatch(getGigWithoutAuth())

    }, []);

    const auth = useSelector((state) => state.user);
    const gigRating = props.list && props.list.rating ? props.list.rating : 0;

    const addFav = (id) => {
       
      dispatch( addFavourite(id) ).then((res) => {
        setFavourite(res.status);
        /*console.log(res.status)
        console.log(favourites)*/
      })
    }

    return (

        <Fragment>

            <div className={props.styles ? props.styles : "col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 pr-lg-1"}>
                <div className="proposal-card-base mp-proposal-card">
                    <Link to={props.list.user ? "/gig/" + props.list.user.firstName + "/" + props.list.title : ""}>
                        <img src={props.list.photo[0] ? props.list.photo[0].photo : ""} className="img-fluid" />
                    </Link>
                    <div className="proposal-card-caption">
                        <div className="proposal-seller-info">
                            <span className="fit-avatar s24">
                                <img src={props.list.user ? props.list.user.profilePhoto : ""} className="rounded-circle" width="32" height="32" />
                            </span>
                            <div className="seller-info-wrapper">
                                <Link to={props.list.user ? "/profile/" + props.list.user._id + "/" + props.list.user.firstName : ""} className="seller-name">{props.list.user ? props.list.user.firstName : ""} {props.list.user ? props.list.user.lastName : ""}</Link>
                                <div className="onePress-seller-tooltip">
                                    {props.list.user.type}
                                </div>
                            </div>
                            <div className="favoriteIcon">
                              {auth.isAuthenticated == true && (<i data-id="4" onClick={() => addFav(props.list._id) } className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite" style={ favourite || fav && fav.gig._id == props.list._id ? { color:'#E91E63'} : {}} ></i>) }
                            </div>
                        </div>
                        <Link to={props.list.user ? "/gig/" + props.list.user.firstName + "/" + props.list.title : ""} className="proposal-link-main js-proposal-card-imp-data">
                            <h3>{props.list.title}</h3>
                        </Link>
                        <div className="rating-badges-container">
                            <span className="proposal-rating">

                            { gigRating != 0 && new Array(Math.ceil(gigRating)).fill(Math.ceil(gigRating)).map((i) => <img key={i} className='mb-1' src={require('../../../../assets/images/user_rate_full.png')} />  ) }

                            { new Array(5 - Math.ceil(gigRating)).fill(0).map((i, j) => <img key={j} className='mb-1' src={require('../../../../assets/images/user_rate_blank.png')} />  ) } 
                            </span>
                        </div>
                    </div>
                    <footer className="proposal-card-footer">
                        <div className="proposal-price">
                            <a>
                                <small>STARTING AT</small>&#036;{props.list.pricing[0] ? props.list.pricing[0].price : "0.00"} </a>
                        </div>
                    </footer>
                </div>
            </div>



        </Fragment>
    );
}

export default Gig;