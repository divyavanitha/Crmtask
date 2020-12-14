import React, { Fragment, useState, FormEvent, Dispatch, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
//import { useToasts } from 'react-toast-notifications'

import FixedPricing from "./FixedPricing";
import PackagePricing from "./PackagePricing";
import { updatePricing } from "../../../../_actions/gigs.action";
import { getDeliveryTime, getPackage } from "../../../../_actions/user.action";

const Pricing = (props) => {

   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();

   const [price, setPrice] = useState(0);

   const changePrice = e => {
      e.preventDefault();
      if($(e.currentTarget).is(":checked")) {
         setPrice(1);
      } else {
         setPrice(0);
      }
   };

   return (
      (price == 1) ? <FixedPricing price={price} changePrice={changePrice} /> : <PackagePricing price={price} changePrice={changePrice} /> 
   );
};

export default Pricing;