import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { getBuyerRequests, deleteRequest, changeRequestStatus } from "../../../../_actions/admin/request.action";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';

const Request = () => {
  const { addToast } = useToasts()
  const dispatch = useDispatch();
  let history = useHistory();

  const [activeRequest, setActiveRequest] = useState(0);
  const [pendingRequest, setPendingRequest] = useState(0);
  const [pausedRequest, setPausedRequest] = useState(0);
  const [declinedRequest, setDeclinedRequest] = useState(0);
  const [allRequest, setAllRequest] = useState(0);

  useEffect(() => {


    $('body').on('click', '.delete', function (e) {
      e.preventDefault();
      const sid = $(this).data('id');
      console.log($(this).closest('tr'));
      $('.delete-modal').modal("show");
      $(".delete-modal-btn")
        .off()
        .on("click", function () {
          dispatch(deleteRequest(sid)).then(res => {
            addToast(res.message, { appearance: res.status, autoDismiss: true, })
            $('#datatable').DataTable().row($(this).closest('tr')).remove().draw(false);
            $('.delete-modal').modal("hide");

          })

        });
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
        "url": '/api/admin/requests?type=active',
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
          console.log(response);
          var data = JSON.parse(response);
          var json = {};

          setAllRequest(data.responseData.all_count);
          setDeclinedRequest(data.responseData.declined_count);
          setPausedRequest(data.responseData.paused_count);
          setActiveRequest(data.responseData.active_count);
          setPendingRequest(data.responseData.pending_count);

          json.recordsTotal = data.responseData.requests.total;
          json.recordsFiltered = data.responseData.requests.total;
          json.data = data.responseData.requests.data.requests;
          
          return JSON.stringify(json); // return JSON string
        }
      },
      "columns": [
        {
          "data": "id", render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { "data": "title" },
        { "data": "description" },
        { "data": "files", render: function (data, type, row) {
                if(data){
                    return "<img src='"+data+"' style='height: 50px; width: 50px;'>";
                }else{
                    return "<h6>NA</h6>"
                }
            }
        },
        {
          "data": "duration"
        },
        { "data": "budget" },

        {
          "data": function (data, type, row) {
            var button = `<a title="Delete Proposal" data-id=`+data._id+` class="delete"><i class="fa fa-trash"></i></a> &nbsp`;
            if(data.status == 'PENDING'){
           button += `<a title="Approve" class="change-status" data-id=`+data._id+` data-status="APPROVE"><i class="fa fa-check-square-o"></i> </a> &nbsp`;
            button +=  `<a title="Decline" class="change-status" data-id=`+data._id+` data-status="DECLINE"><i class="fa fa-ban"></i></a>`;
            }

            return button;


          }
        }

      ]
    });

    $('body').on('click', '.change-status', function () {

      var id = $(this).data('id');
      var status = $(this).data('status');

      dispatch(changeRequestStatus(id, status)).then(res => {

        addToast(res.message, { appearance: res.status, autoDismiss: true, })
        window.location.reload();
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
                  <h1><i className="menu-icon fa fa-cubes"></i> Buyer Requests </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="box box-block bg-white">
                <h5 className="mb-1">View Pending Buyer Requests
                </h5>
                <div className="card-body">
                  <ul className="nav nav-tabs flex-column flex-sm-row mt-4">
                  <li className="nav-item">
                    <Link to="/admin/request"  className="nav-link make-black">All ({allRequest})</Link>
                  </li>

                    <li className="nav-item">
                    <Link to="/admin/active/request"  className="nav-link active make-black">Active ({activeRequest})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/decline/request" className="nav-link make-black">Declined ({declinedRequest})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/pending/request"  className="nav-link make-black">Pending ({pendingRequest})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/paused/request"  className="nav-link make-black">Paused ({pausedRequest})</Link>
                    </li>
                  </ul>
                </div>

             <div className="">
                <div className="tableContent">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>File</th>
                        <th>Duration</th>
                        <th>Budget</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                  </table>
                </div>
              </div>
        </div>
      </div>
    </div>
    </div>

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

export default Request;
