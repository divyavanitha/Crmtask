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
import { getDeliveryTime, getGigbyId, getPackage } from "../../../../_actions/user.action";

const Pricing = (props) => {

   const dispatch = useDispatch();

   let history = useHistory();
   const params = useParams();

   const [price, setPrice] = useState(1);
   useEffect(() => {

      dispatch(getGigbyId(params.id)).then( async (res) => {
         setPrice(res.responseData.gig.fixed_price);
       /*  setTags(res.responseData.gig.tags);
         setCategorylist(res.responseData.gig.category._id);
         const sub_category = await dispatch(getSubCategory(res.responseData.gig.category._id));
         if (sub_category && sub_category.responseData.sub_categories) {
            setSubCategory(sub_category.responseData.sub_categories)
         }*/

      });

   }, [params.id]);

   const gig = useSelector((state) => state.user && state.user.gig_details && state.user.gig_details.responseData && state.user.gig_details.responseData.gig);
   
   const changePrice = e => {
      e.preventDefault();
      if($(e.currentTarget).is(":checked")) {
         setPrice(1);
      } else {
         setPrice(0);
      }
   };

   return (
      (price == 1) ? <FixedPricing price={price} pricing={gig && gig.pricing} changePrice={changePrice} /> : <PackagePricing price={price} pricing={gig && gig.pricing}  changePrice={changePrice} /> 
   );
};

export default Pricing;