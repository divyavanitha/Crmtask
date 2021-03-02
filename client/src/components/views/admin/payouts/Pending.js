import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { changeWithdrawlStatus } from "../../../../_actions/admin/request.action";

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

  useEffect(() => {

    $('body').on('click', '.userdetails', function (e) {
      e.preventDefault();
      history.push('/admin/userdetails/' + $(this).data('id'))
    });
    
    $('#datatable').DataTable({
      language: {
        searchPlaceholder: "Search"
      },
      fnDrawCallback: function ( oSettings ){
            if(oSettings.fnRecordsTotal() <= 10){     
               $('.dataTables_length').hide();
               $('.dataTables_paginate').hide();
               $('.dataTables_filter').hide();
               $('.dataTables_wrapper').addClass('noFilters');
            } else {
               $('.dataTables_length').show();
               $('.dataTables_paginate').show(); 
               $('.dataTables_filter').show();
               $('.dataTables_wrapper.noFilters').removeClass('noFilters');
            }
      },
      "bLengthChange": false,
      "info": false,
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": '/api/admin/withdrawl?type=pending',
        "type": "GET",
        data: function (data) {

          var info = $('#datatable').DataTable().page.info();
          delete data.columns;
          data.page = info.page + 1;
          data.search_text = data.search['value'];
          data.order_by = $('#datatable tr').eq(0).find('th').eq(data.order[0]['column']).data('value');
          data.order_direction = data.order[0]['dir'];

        },
        dataFilter: function (response) {
          var data = JSON.parse(response);
          var json = {};
          json.recordsTotal = data.responseData.total;
          json.recordsFiltered = data.responseData.total;
          json.data = data.responseData.data.withdrawl;
          return JSON.stringify(json); // return JSON string
        }
      },
      "columns": [
        {
          "data": "id", render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { "data": "refId" },
        {
          "data": "user", render: function (data, type, row, meta) {
            return data.firstName;
          }
        },
        { "data": "payment_mode" },
        { "data": "price" },
        {
          "data": "created_at", "render": function (data) {
            var date = new Date(data);
            var month = date.getMonth() + 1;

            return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
          }
        },
        { "data": "status" },
        {
          "data": function (data, type, row) {
            var button = `<a title="Approve" data-id=`+data._id+` data-status="COMPLETED" class="change-status"><i class="fa fa-thumbs-up"></i></a> &nbsp`;
           
            button +=  `<a title="Decline" class="change-status" data-id=`+data._id+` data-status="DECLINED"><i class="fa fa-thumbs-down"></i></a>&nbsp`;
            button +=  `<a title="user-details" class="userdetails" data-id=`+data.user._id+` ><i class="fa fa-info-circle"></i></a>`;

            return button;


          }
        }

      ]
    });

    $('body').on('click', '.change-status', function () {
      let that = this;
      var id = $(this).data('id');
      var status = $(this).data('status');

      dispatch(changeWithdrawlStatus(id, status)).then(res => {
        addToast(res.message, { appearance: res.status, autoDismiss: true, })
        $('#datatable').DataTable().row($(this).closest('tr')).remove().draw()
      })
    });

  }, []);

  return (
    <Fragment>

       <div className="container">
        <div className="breadcrumbs">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-header">
                <div className="page-title">
                  <h1><i className="menu-icon fa fa-cubes"></i> Payouts </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="box box-block bg-white">
              <h5 className="mb-1">View Pending Payouts
               {/*<div className="rightBtn-Group">
                  <form className="form-inline d-flex mb-4 justify-content-center" method="get" action="">
                  
                  <input type="hidden" name="payouts" />
                  <input type='hidden' name='status' value='pending' />        
                  <div className="form-group">
                    <label className="mb-2 mr-sm-2 mb-sm-0"> Enter Ref No : </label>
                    <div className="input-group">
                    <span className="input-group-addon"><b>P-</b></span>
                    <input type="text" name="ref" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="320154PR" value="" />
                    </div>
                  </div>
                  
                  <button type="submit" className="form-control btn btn-success" value="Search">Search</button>
                  
                  
                </form>
                </div>*/}
              </h5>
              <div className="">
                <div className="tableContent">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Ref No</th>
                        <th>Seller Name</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container">
          <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="h4">View Pending Payouts</h4>
              </div>
              <div className="card-body">
                <h3 className="text-center mb-3"> Search Payouts </h3>
                <form className="form-inline d-flex mb-4 justify-content-center" method="get" action="">
                  
                  <input type="hidden" name="payouts" />
                  <input type='hidden' name='status' value='pending' />        
                  <div className="form-group">
                    <label className="mb-2 mr-sm-2 mb-sm-0"> Enter Ref No : </label>
                    <div className="input-group">
                    <span className="input-group-addon"><b>P-</b></span>
                    <input type="text" name="ref" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="320154PR" value="" />
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-success" value="Search">Search</button>
                  </div>
                  
                </form>
                
                <table className="table table-bordered">
                <thead>
                <tr>
                <th>No</th>
                <th>Ref No</th>
                <th>Seller Name</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr> <td colspan='8' className='text-center'>No Pending Payout Requests.</td> </tr>      
                </tbody>
                </table>
                <div className="d-flex justify-content-center">
                  <ul className="pagination">
                  <li className='page-item'>
                  <a href='index?payouts=1&status=pending' className='page-link'> First Page </a>
                  </li>
                  <li className='page-item active'>
                  <a className='page-link' href='index?payouts=1&status=pending'>1</a>
                  </li>
                  <li className='page-item'>
                  <a href='index?payouts=0&status=pending' className='page-link'>Last Page </a>
                  </li>        
                  </ul>
              </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        */}
      <div className="modal delete-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm Delete</h4>
            </div>
            <div className="modal-body p-2"> Are you sure want to delete? </div>
            <div className="modal-footer">
              <button type="button" className="btn default" data-dismiss="modal">Close</button>
              <button type="button" data-value="1" className="btn btn-danger delete-modal-btn">Delete</button>
            </div>
          </div>

        </div>

      </div>
      
    </Fragment >
  );
};

export default Pending;
