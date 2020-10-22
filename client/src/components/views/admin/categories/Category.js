import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { addNotification } from "../../../../_actions/admin/notifications.action";
import { getCategories, deleteCategory } from "../../../../_actions/admin/category.action";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';

const Category = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {


    $('body').on('click', '.edit', function (e) {
      e.preventDefault();
      history.push('/admin/category/' + $(this).data('id') + '/edit')
    });

    $('body').on('click', '.delete', function (e) {
      e.preventDefault();
      const sid = $(this).data('id');
      console.log($(this).closest('tr'));
       $('.delete-modal').modal("show");
      $(".delete-modal-btn")
        .off()
        .on("click", function () {
         dispatch(deleteCategory(sid)).then(res => { 
           
          $('#datatable').DataTable().row( $(this).closest('tr') ).remove().draw();
          $('.delete-modal').modal("hide");

          })
          
         // 
        }); 
    });




    $('#datatable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": '/api/admin/category',
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
          json.data = data.responseData.data.categories;
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
        { "data": "name" },
        {
          "data": function (data, type, row) {

            if (data.status == 1) {
              var status = "Active";
            } else {
              var status = "In-Active";
            }


            return status;


          }
        },
        {
          "data": function (data, type, row) {
            var button = `<a href="javascript:;" data-id=` + data._id + ` class="btn btn-danger delete">
             <i class="fa fa-trash text-white" ></i>
           </a>
             <a href="javascript:;" data-id=`+ data._id + ` class="btn btn-success edit">
             <i class="fa fa-pencil text-white"></i>
           </a>`;

            return button;


          }
        }

      ]
    });

  }, []);

  const [popup, setPopup] = useState(false);





  return (
    <Fragment>







      <div className="container">
        <div className="breadcrumbs">
          <div className="row">
            <div className="col-sm-4">
              <div className="page-header float-left">
                <div className="page-title">
                  <h1><i className="menu-icon fa fa-cubes"></i> Categories </h1>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="page-header float-right">
                <div className="page-title">
                  <ol className="breadcrumb text-right">
                    <li className="active"><Link className="btn btn-info" to="/admin/category/add" >Add Category</Link></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div className="">
                <div className="table-responsive box-table tableContent">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Title</th>
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

export default Category;
