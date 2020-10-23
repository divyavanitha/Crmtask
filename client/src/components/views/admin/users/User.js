import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import "datatables.net/js/jquery.dataTables.min.js"
import $ from 'jquery'

const User = () => {
  const dispatch = useDispatch();
  
  const products = [{
    id: 1, name: "Chocolate", description: "This is Chocolate and it is Sweet",
    amount: 10, price: 4, hasExpiryDate: true, category: "Sweet"
  },
  {
    id: 2, name: "Apple", description: "This is Apple and it is healthy",
    amount: 5, price: 2, hasExpiryDate: true, category: "Fruit"
  },
  {
    id: 3, name: "Straw", description: "This is Straw and you can use it for your drink",
    amount: 100, price: 1, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 4, name: "Spoon", description: "This is Spoon and it is useful while eating",
    amount: 3, price: 2, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 5, name: "Sugar", description: "This is Sugar and it is to make your life sweet",
    amount: 15, price: 5, hasExpiryDate: true, category: "Sweet"
  },{
    id: 6, name: "Chocolate", description: "This is Chocolate and it is Sweet",
    amount: 10, price: 4, hasExpiryDate: true, category: "Sweet"
  },
  {
    id: 7, name: "Apple", description: "This is Apple and it is healthy",
    amount: 5, price: 2, hasExpiryDate: true, category: "Fruit"
  },
  {
    id: 8, name: "Straw", description: "This is Straw and you can use it for your drink",
    amount: 100, price: 1, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 9, name: "Spoon", description: "This is Spoon and it is useful while eating",
    amount: 3, price: 2, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 10, name: "Sugar", description: "This is Sugar and it is to make your life sweet",
    amount: 15, price: 5, hasExpiryDate: true, category: "Sweet"
  },
  {
    id: 11, name: "Sugar", description: "This is Sugar and it is to make your life sweet",
    amount: 15, price: 5, hasExpiryDate: true, category: "Sweet"
  },{
    id: 12, name: "Chocolate", description: "This is Chocolate and it is Sweet",
    amount: 10, price: 4, hasExpiryDate: true, category: "Sweet"
  },
  {
    id: 13, name: "Apple", description: "This is Apple and it is healthy",
    amount: 5, price: 2, hasExpiryDate: true, category: "Fruit"
  },
  {
    id: 14, name: "Straw", description: "This is Straw and you can use it for your drink",
    amount: 100, price: 1, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 15, name: "Spoon", description: "This is Spoon and it is useful while eating",
    amount: 3, price: 2, hasExpiryDate: false, category: "Kitchen"
  },
  {
    id: 16, name: "Sugar", description: "This is Sugar and it is to make your life sweet",
    amount: 15, price: 5, hasExpiryDate: true, category: "Sweet"
  }];

  $(document).ready(function () {
    $('#example').DataTable();
  });


  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Users</h1>
      <p className="mb-4">User List</p>
      <div className="row">
        <Link className="btn btn-primary" style={{ float: "right" }} to="/admin/users/add">Add User</Link>

      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">User List</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table" id="example" className="display">



                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>


                  <tbody>
                    {products.map(product => {
                      if (!product) { return null; }
                      return (
                        <tr className={`table-row ${(products.selectedProduct && products.selectedProduct.id === product.id) ? "selected" : ""}`} key={`product_${product.id}`}>
                          <th scope="row">{product.id}</th>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.amount}</td>
                          <td>{product.price}</td>
                          <td><button className="btn btn-success" ><i className="fa fa-edit"></i></button><button className="btn btn-danger"><i className="fa fa-remove"></i></button></td>
                        </tr>);
                    })}
                  </tbody>





                </table>
              </div>
            </div>
          </div>
        </div>

      </div>


    </Fragment >
  );
};

export default User;
