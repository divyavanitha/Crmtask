import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { getGigs } from "../../../../_actions/admin/gig.action";

import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import 'datatables.net-buttons-bs4';
//import 'jszip';
import 'datatables.net-buttons';

const Gigs = () => {
  const { addToast } = useToasts()
  const dispatch = useDispatch();
  let history = useHistory();

  const [activeGig, setActiveGiG] = useState(0);
  const [pendingGig, setPendingGiG] = useState(0);
  const [pausedGig, setPausedGiG] = useState(0);
  const [featuredGig, setFeaturedGiG] = useState(0);
  const [allGig, setAllGiG] = useState(0);

  useEffect(() => {

    //dispatch(getGigs())

    /*$('body').on('click', '.delete', function (e) {
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
    });*/


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
      "autoWidth": false,
      "ajax": {
        "url": '/api/admin/gigs?type=all',
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
          console.log(data.responseData.gigs.total);
          setAllGiG(data.responseData.all_count);
          setFeaturedGiG(data.responseData.featured_count);
          setPausedGiG(data.responseData.paused_count);
          setActiveGiG(data.responseData.active_count);
          setPendingGiG(data.responseData.pending_count);

          json.recordsTotal = data.responseData.gigs.total;
          json.recordsFiltered = data.responseData.gigs.total;
          json.data = data.responseData.gigs.data.gigs;
          
          return JSON.stringify(json); // return JSON string
        }
      },
      "columns": [
        { "data": "title" },
        { "data": "photo", render: function (data, type, row) {
                if(data){
                    return "<img src='"+data[0].photo+"' style='height: 50px; width: 50px;'>";
                }else{
                    return "<h6>NA</h6>"
                }
            }
        },
        { "data": "pricing", render: function (data, type, row) {
                if(data){
                    return data[0].price;
                }else{
                    return "<h6>0</h6>"
                }
            }
        }, 
        {
          "data": "category", render: function (data, type, row, meta) {
             return data.name;
          }
        },
        { "data": "status" },
        { "data": "status" },
        {
          "data": function (data, type, row) {
            console.log('data', data);
            var button = `<a title="View Proposal" href="../proposals/Rocks/add-seo-200000-gsa-dofollow-high-quality-backlinks-for-google-first-page" target="_blank"> <i class="fa fa-eye"></i> </a> &nbsp;`
             if(data.featured == false){
                button += `<a href="index?feature_proposal=1133" title="Make Your Proposal Featured"><i class="fa fa-star"></i></a> &nbsp;`
             }else{
                button += `<a href="index?feature_proposal=1133" title="Remove Proposal From Featured Listing"><i class="fa fa-star-half-o"></i></a> &nbsp`;
             }
             if(data.top_rated == true){
                button += `<a class="text-danger" href="index?removetoprated_proposal=1133" title="Remove Proposal From Top Rated Listing."><i class="fa fa-heartbeat" aria-hidden="true"></i></a> &nbsp;`
             }else{
                button += `<a href="index?toprated_proposal=1131" title="Make Your Proposal Top Rated"><i class="fa fa-heart" aria-hidden="true"></i></a> &nbsp`;
             }

             if(data.status != "PAUSED"){
                button += `<a title="Pause/Deactivate Proposal" href="index?pause_proposal=1133"><i class="fa fa-pause-circle"></i></a> &nbsp;`
             }else{
                button += `<a title="Unpause Proposal" href="index?unpause_proposal=623"><i class="fa fa-refresh"></i> </a> &nbsp;`
             }
           
           button += `
           <a title="Submit For Modification" href="index?submit_modification=1130"><i class="fa fa-edit"></i> </a>&nbsp;
           <a title="Approve" href="index?approve_proposal=1129"><i class="fa fa-check-square-o"></i> </a> &nbsp;
           <a title="Decline" href="index?payouts&status=declined"><i class="fa fa-ban"></i></a> &nbsp;
           <a title="Delete Proposal" href="index?move_to_trash=1133"><i class="fa fa-trash"></i></a>`

            return button;


          }
        }

      ]
    });

    /*$('body').on('change', '.status_enable', function () {

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
    });*/

  }, []);

let gigs = useSelector((state) => state.gigs && state.gigs.gigs && state.gigs.gigs.responseData);

console.log('giigg', gigs);

  return (
    <Fragment>

      <div className="container">
        <div className="breadcrumbs">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-header">
                <div className="page-title">
                  <h1><i className="menu-icon fa fa-cubes"></i> Gigs </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="box box-block bg-white">
                <h5 className="mb-1">Gigs
                </h5>
                <div className="card-body">
                  <ul className="nav nav-tabs flex-column flex-sm-row mt-4">
                  <li className="nav-item">
                    <Link to="/admin/gigs"  className="nav-link active make-black">All ({allGig})</Link>
                  </li>

                    <li className="nav-item">
                    <Link to="/admin/active/gigs"  className="nav-link make-black">Active ({activeGig})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/feature/gigs" className="nav-link make-black">Featured ({featuredGig})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/pending/gigs"  className="nav-link make-black">Pending Approval ({pendingGig})</Link>
                    </li>

                    <li className="nav-item">
                    <Link to="/admin/paused/gigs"  className="nav-link make-black">Paused ({pausedGig})</Link>
                    </li>

                    {/* <li className="nav-item">
                    <a href="#trash" data-toggle="tab" className="nav-link make-black">Trash (0)</a>
                    </li> */}
                  </ul>
                </div>

             <div className="">
                <div className="tableContent">
                  <table className="table table-striped" id="datatable">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Display Image</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Order Queue</th>
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

export default Gigs;
