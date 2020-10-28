import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
/* import { updateCurrentPath } from "../../store/actions/root.actions"; */
import TopCard from "./common/TopCard";
/* import ProductList from "../Products/ProductsList";
import OrderList from "../Orders/OrderList"; */

const Home = () => {
  //const products = useSelector((state) => state.products);
  const numberItemsCount =  100;//products.products.length;
  const totalPrice =  100;//products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const totalProductAmount = 100;// products.products.reduce((prev, next) => prev + (next.amount || 0), 0);

  const orders=  100;//useSelector((state) => state.orders.orders);
  const totalSales =  100;//orders.reduce((prev, next) => prev + next.totalPrice, 0);
  const totalOrderAmount =  100;//orders.reduce((prev, next) => prev + next.amount, 0);

  const dispatch = useDispatch();
  //dispatch(updateCurrentPath("home", ""));

  return (
    <Fragment>
      <div className="container">
      <div class="breadcrumbs">
        <div class="row">
          <div class="col-sm-12">
            <div class="page-header">
              <div class="page-title">
                <h1><i class="menu-icon fa fa-cubes"></i> Dashboard <span>(Summary and overview of our admin stuff here)</span> </h1>
              </div>
              </div>
            </div>
          </div>
        </div>
      {/* <h1 className="h3 mb-2 text-gray-800">Dashboard</h1> */}
      {/* <p className="mb-4">Summary and overview of our admin stuff here</p> */}

      <div className="row">
        <div className="col-lg-12">
          <div className="box box-block bg-white">

            <div className="overallStatus">
              <div className="row">
                  <TopCard title="PRODUCT COUNT" text={`${numberItemsCount}`} icon="bar-chart" className="primary" />
                  <TopCard title="PRODUCT AMOUNT" text={`${totalProductAmount}`} icon="money" className="danger" />
                  <TopCard title="SUMMARY PRICE" text={`$${totalPrice}`} icon="bar-chart" className="success" />
                  <TopCard title="SALES" text={totalSales.toString()} icon="bar-chart" className="primary" />
              </div>
            </div>
            <div className="productListContainer">
            <div className="row">
              <div className="col-xl-6 col-lg-6 pr-2">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="">Product list</h5>
                  </div>
                  <div className="card-body">
                  {/*  <ProductList /> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 pl-2">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="">Order list</h5>
                  </div>
                  <div className="card-body">
                  {/*  <OrderList /> */}
                  </div>
                </div>
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>

      
      </div>

    </Fragment>
  );
};

export default Home;
