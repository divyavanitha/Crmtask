import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { addNotification } from "../../../../_actions/admin/notifications.action";
import { deleteSubCategory } from "../../../../_actions/admin/subcategory.action";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';

const SubCategory = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {


    $('body').on('click', '.edit', function (e) {
      e.preventDefault();
      console.log($(this).data('id'));
      history.push('/admin/subcategory/'+$(this).data('id')+'/edit')
    });

    $('body').on('click', '.delete', function (e) {
      e.preventDefault();
      const sid = $(this).data('id');
      $('.delete-modal').modal("show");
      $(".delete-modal-btn")
      .off()
      .on("click", function() {
          dispatch(deleteSubCategory(sid))
      $('.delete-modal').modal("hide");
      });
    });




    $('#datatable').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": '/api/admin/subcategory',
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

          json.data = data.responseData.data.subcategories;
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
          "data": "category", render: function (data, type, row, meta) {
             return data.name;
          }
        },
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

            //console.log('data', data._id);
            var button = `<a href="javascript:;" data-id=`+data._id+` class="btn btn-success edit"><i class="fa fa-edit"></i></a> 
            <a href="javascript:;" data-id=`+data._id+` class="btn btn-danger delete"><i class="fa fa-remove"></i></a>`;

            return button;


          }
        }

      ]
    });

  }, []);

  const [popup, setPopup] = useState(false);





  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Sub Categories</h1>
      <p className="mb-4">Sub Category List</p>
      <div className="row">
        <Link className="btn btn-primary" style={{ float: "right" }} to="/admin/subcategory/add">Add Sub Category</Link>

      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Sub Category List</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped" id="datatable">

                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Category</th>
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

      <div className="modal delete-modal" tabindex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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

      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Are you sure?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                setPopup(false);
              }}>Remove
              </button> &nbsp;
              <button type="button"
              className="btn btn-default"
              onClick={() => {
                setPopup(false);
              }}>Cancel
              </button>
          </div>
        </div>
      </Popup>

    </Fragment >
  );
};

export default SubCategory;
