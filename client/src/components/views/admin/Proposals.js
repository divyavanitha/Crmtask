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
      <h1 className="h3 mb-2 text-gray-800">Dashboard</h1>
      <p className="mb-4">Summary and overview of our admin stuff here</p>

      <div className="row">
        <TopCard title="PRODUCT COUNT" text={`${numberItemsCount}`} icon="box" class="primary" />
        <TopCard title="PRODUCT AMOUNT" text={`${totalProductAmount}`} icon="warehouse" class="danger" />
        <TopCard title="SUMMARY PRICE" text={`$${totalPrice}`} icon="dollar-sign" class="success" />
        <TopCard title="SALES" text={totalSales.toString()} icon="donate" class="primary" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Product list</h6>
            </div>
            <div className="card-body">
             {/*  <ProductList /> */}
            </div>
          </div>

        </div>

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Order list</h6>
            </div>
            <div className="card-body">
             {/*  <OrderList /> */}
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Home;