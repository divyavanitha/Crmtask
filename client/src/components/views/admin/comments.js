import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { changeCommentStatus } from "../../../_actions/admin/post.action";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';
import "react-datepicker/dist/react-datepicker.css";


const Comment = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts()
  let history = useHistory();

  useEffect(() => {



    $('#datatable').DataTable({
      language: {
        searchPlaceholder: "Search"
      },
      fnDrawCallback: function (oSettings) {
        if (oSettings.fnRecordsTotal() <= 10) {
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
        "url": '/api/admin/comment',
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

          console.log("data", data.responseData.comments.total);
          json.recordsTotal = data.responseData.comments.total;
          json.recordsFiltered = data.responseData.comments.total;
          json.data = data.responseData.comments.data.comments;
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
        { "data": "comments" },

        {
          "data": function (data, type, row) {

            return "<label class='switch'><input " + ((data.status == 1) ? "checked" : "") + " type='checkbox' class='status_enable' value='true' data-id='" + data._id + "' data-value='" + ((data.status == 1) ? "1" : "0") + "'> <span class='slider round'></span></label>";
          }
        },
        {
          "data": function (data, type, row) {
            var button = `<a href="javascript:;" data-id=` + data._id + ` class="actionBtn delete">
             <i class="fa fa-trash" ></i>
           </a>
             <a href="javascript:;" data-id=`+ data._id + ` class="actionBtn edit">
             <i class="fa fa-pencil-square-o"></i>
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

      console.log(id, value);

      dispatch(changeCommentStatus(id, value)).then(res => {
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
                  <h1><i className="menu-icon fa fa-cubes"></i> Posts </h1>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-8">
              <div className="page-header float-right">
                <div className="page-title">
                  <ol className="breadcrumb text-right">
                    <li className="active"><Link className="btn btn-info" to="/admin/post/add" >Add Post</Link></li>
                  </ol>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="box box-block bg-white">
              <h5 className="mb-1">Posts
                <div className="rightBtn-Group">
                  <Link className="addMoreBtn" to="/admin/post/add" ><span className="txt text-capitalize"> Add New <span className="amIcon"><i className="fa fa-plus"></i></span></span></Link>
                </div>
              </h5>
              <div className="">
                <div className="tableContent">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Comments</th>
                       
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
            <div className="modal-body p-2">
              Are you sure want to delete?
                                        </div>
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

export default Comment;
