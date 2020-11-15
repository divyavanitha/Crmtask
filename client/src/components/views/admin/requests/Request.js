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
        "url": '/api/admin/requests',
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
          json.data = data.responseData.data.requests;
          console.log(json);
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
          "data": "duration", render: function (data, type, row, meta) {
             return data.name;
          }
        },
        { "data": "budget" },
        {
          "data": function (data, type, row) {
            console.log(data.status);
            return "<label class='switch'><input " + ((data.status == 1) ? "checked" : "") + " type='checkbox' class='status_enable' value='true' data-id='" + data._id + "' data-value='" + ((data.status == 1) ? "1" : "0") + "'> <span class='slider round'></span></label>";
          }
        },
        {
          "data": function (data, type, row) {
            var button = `<a href="javascript:;" data-id=` + data._id + ` class="actionBtn delete">
             <i class="fa fa-trash" ></i>
           </a>`;

            return button;


          }
        }

      ]
    });

    $('body').on('change', '.status_enable', function () {

      var id = $(this).data('id');
      var value = 0;
      var fail_status = true;

      if ($(this).is(":checked")) {
        value = 1;
        fail_status = false;
      }

      dispatch(changeRequestStatus(id, value)).then(res => {

        addToast(res.message, { appearance: res.status, autoDismiss: true, })
        if (res.statusCode != 200) $(this).prop('checked', fail_status);
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
                  <h1><i className="menu-icon fa fa-cubes"></i> Requests </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="box box-block bg-white">
                <h5 className="mb-1">Requests 
                
                </h5>
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
                        <th>Status</th>
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