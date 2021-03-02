import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { sellerDetails } from "../../../../_actions/admin/request.action";
import moment from 'moment';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';

const Pending = () => {
  const { addToast } = useToasts()
  const dispatch = useDispatch();
  let history = useHistory();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(sellerDetails(params.id))

  }, []);

  const details = useSelector((state) => state.requests && state.requests.details && state.requests.details.responseData);
  console.log(details && details.user);

  return (
    <Fragment>

    <div className="breadcrumbs">
    <div className="col-sm-4">
        <div className="page-header float-left">
            <div className="page-title">
                <h1><i className="menu-icon fa fa-user"></i> User on GigToDo</h1>
            </div>
        </div>
    </div>
    <div className="col-sm-8">
        <div className="page-header float-right">
            <div className="page-title">
                <ol className="breadcrumb text-right">
                    <li className="active">Single Seller Details</li>
                </ol>
            </div>
        </div>
    </div>
</div>

       <div className="container">

<div className="row">

<div className="col-lg-12">
    
<div className="card">

<div className="card-header">

    <h4 className="h4">

        <i className="fa fa-info-circle text-success"></i>  
        {details && details.user.firstName}'s Info

    </h4>

</div>

    <div className="card-body row">

        <div className="col-md-4">

            <div className="seller-info mb-3">

                
                <img src={details && details.user.profilePhoto} className="rounded img-fluid" />

                
                <div className="seller-info-title">

                    <span className="seller-info-inner text-capitalize"> {details && details.user.firstName} </span>

                    <span className="seller-info-type"> {details && details.user.country ? details && details.user.name : ""} </span>


                </div>

            </div>

            <div className="mb-3">

                <div className="widget-content-expanded">

                    <p className="lead">

                        <span className="font-weight-bold"> Full Name : </span> {details && details.user.firstName} {details && details.user.lastName}
                    </p>


                    <p className="lead">

                        <span className="font-weight-bold"> Username : </span> {details && details.user.firstName}
                    </p>

                    <p className="lead">
                        <span className="font-weight-bold"> Email : </span> {details && details.user.email}
                    </p>

                
                    <p className="lead">
                        <span className="font-weight-bold"> Phone : </span> {details && details.user.mobile}                     
                    </p>
                    
                    <p className="lead">
                     <span className="font-weight-bold"> Level : </span> {details && details.user.type}
                    </p>

                    <p className="lead">

                        <span className="font-weight-bold">Main Conversational Language :</span>
                        {details && details.user.language.map((list, index) => (
                          <span>{list.language}</span>))} 
                    </p>


                    {/* <p className="lead">

                        <span className="font-weight-bold"> Email Verification : </span>

                        Ok
                    </p>


                    <p className="lead">

                        <span className="font-weight-bold"> Ip Address : </span> 14.99.217.246
                    </p> */}


                    <p className="lead">

                        <span className="font-weight-bold"> Country : </span> {details && details.user.country ? details && details.user && details && details.user.country.name : ""}
                    </p>


                    <p className="lead">

                        <span className="font-weight-bold"> Register Date : </span> { moment(details && details.user.created_at).format('MMMM DD, YYYY') }
                    </p>

                </div>

                <hr className="dotted short" />

                <h5 className="text-muted font-weight-bold"> Headline </h5>

                <p>
                    {details && details.user.headline}                
                </p>

            </div>

            <div className="mb-3">

                <hr className="dotted" />

                <h5 className="text-muted font-weight-bold">About</h5>

                <p>{details && details.user.description}</p>

            </div>

        </div>

        <div className="col-md-8">

            <h3 className="pb-1">{details && details.user.firstName}'s Orders </h3>

            <div className="row box" style={{height:"auto"}}>

                <div className="text-center border-box col-md-3">

                    <p> Canceled Orders </p>

                    
                    <h2>{details && details.cancelled_order.length}</h2>

                </div>


                <div className="text-center border-box col-md-3">

                    <p> Delivered Orders </p> 
                    <h2>
                        {details && details.delivered_order.length}                   
                    </h2>

                </div>


                <div className="text-center border-box col-md-3">

                    <p> Completed Orders </p>

                    
                    <h2>
                        {details && details.completed_order.length}                   
                    </h2>

                </div>



                <div className="text-center border-box col-md-3">

                    <p>Current Active Orders </p>

                    
                    <h2>{details && details.active_order.length} </h2>

                </div>

            </div>

            <h3 className="pb-1">{details && details.user.firstName}'s Earnings</h3>

            <div className="row box" style={{height:"auto"}}>

                <div className="text-center border-box col-md-3">

                    <p> Withdrawals </p>

                    <h2>{(details && details.withdrawl.length > 0) ? details && details.withdrawl && details.withdrawl[0].total : "0"}</h2>

                </div>

                <div className="text-center border-box col-md-3">

                    <p> Used on Proposals</p>

                    <h2>2656</h2>

                </div>

                <div className="text-center border-box col-md-3">

                    <p> Pending </p>

                    <h2>{(details && details.withdrawl && details.pending_withdrawl.length > 0) ? details && details.withdrawl && details.pending_withdrawl[0].total : "0"}</h2>

                </div>


                <div className="text-center border-box col-md-3">

                    <p> Availble Income </p>

                    <h2>
                          {details && details.user.wallet}               
                    </h2>

                </div>

            </div>

            <h2>{details && details.user.firstName}'s Proposals/Services</h2>

            <div className="table-responsive pt-1">

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Proposal's Title</th>

                            <th>Proposal's Image</th>

                            <th>Proposal's Price</th>

                            <th>Proposal's Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        
                        {details && details.gig.map((list, index) => (<tr key={index}>

                            <td>
                               {list.title}                            
                            </td>

                            <td>

                                <img src={(list.photo.length > 0) ? list.photo[0].photo : "" } width="60" height="60" />

                            </td>

                            <td>
                                &#036;{(list.pricing.length > 0) ? list.pricing[0].price : "0" }                            
                            </td>

                            <td>
                                {list.status}                                
                            </td>

                        </tr>))} 

                        
                        
                    </tbody>

                </table>

            </div>

    {/* <h2> Moneygram Details </h2>
    <div className="box mt-3" style={{height:"auto"}}>
        <p> Id Type : <span className="font-weight-bold float-right">$type</span> </p>
        <p className="mt-3 mb-3"> Id File : 
        <span className="font-weight-bold float-right">
          <a className="btn-link" href="../plugins/paymentGateway/id_files/video-animation_1599467170.png" download>video-animation_1599467170.png</a>
        </span>
        </p>
        <p className="mt-3 mb-3">Full Name : <span className="font-weight-bold float-right">60</span> </p>
        <p className="mt-3 mb-3">Address : <span className="font-weight-bold float-right">newyork</span> </p>
        <p className="mt-3 mb-3">Mobile No : <span className="font-weight-bold float-right">186363737</span> </p>
        <p className="mt-3 mb-3">Preferred Currency : <span className="font-weight-bold float-right">USD</span> </p>
    </div> */}

    {/* <h2> Seller Bank Account Details </h2>
    <div className="box mt-3" style={{height:"auto"}}>
      <h4 className="mt-2 text-center"> Bank Details Are Not Added Yet. </h4>
    </div>*/}     
    </div>

    </div>

    </div>

    </div>

    </div>
    </div>
      
    </Fragment >
  );
};

export default Pending;
