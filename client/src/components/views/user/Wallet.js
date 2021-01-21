import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { getCard, addMoney, withdraw, findUser } from "../../../_actions/user.action";
import * as Yup from 'yup';
import $ from 'jquery';



import OwlCarousel from 'react-owl-carousel';



function Wallet() {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.user);
    const [cards, setCards] = useState([]);



    const [gigAmount, setGigAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [price, setPrice] = useState("");
    const [revenues, setRevenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [wallet, setWallet] = useState(0);

    let settings = useSelector((state) => state.settings);

    let gigSetting = settings.settings && settings.settings.gig;

    const user = useSelector((state) => state.user && state.user.find_user && state.user.find_user.responseData && state.user.find_user.responseData.user);

    useEffect(() => {
      setIsLoading(true);
      dispatch(getCard()).then((response) => {
        setCards(response.cards);
        setIsLoading(false);
         /*setGigAmount(response.gigAmount);
         setPendingAmount(response.pendingAmount);
         setWithdrawalAmount(response.withdrawalAmount);
         setRevenues(response.revenues);
         setIsLoading(false)*/
      })

      dispatch(findUser())
      setWallet(user && user.wallet);
    }, []);

    const handleChange = ({currentTarget: input}) => {
      if(input.value) setPrice(input.value)
    }

    const transfer = (paymentMode) => {
      let data = {
         price: price,
         payment_mode: paymentMode
      }
      if(price && price != 0 && price >= (gigSetting && gigSetting.minimumWithdrawalLimit)) {
         setIsLoading(true);
         dispatch(withdraw(data)).then((response) => {
            $('#stripe_Modal').modal('hide');
            setIsLoading(false)
            setPrice("");
         })
      }
    }

    

   return (

        <Formik

            enableReinitialize
            initialValues={{
                id:  '',
                amount:  ''
            }
            }

            validationSchema={Yup.object().shape({
                id: Yup.string()
                    .required('Card is required'),
                amount: Yup.string()
                    .required('Amount is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("values", values);
                let data = {
                    id: values.id,
                    amount: values.amount,
                };
                
                 dispatch(addMoney(data)).then(res => {
                  
                 })
                
                resetForm();
                setSubmitting(false);
            }}>

            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    handleReset,
                } = props;

                return (
                    <Fragment>

      {isLoading && <div style={{position: 'fixed', opacity: 0.7, top: 0, width: '100%', height: '100%', background: '#000', zIndex: 99 }} >
                    <Loader style={{position: 'absolute', zIndex: 99, top: '30%', left: '45%' }} visible={isLoading} type="Rings" color="#00BFFF" height={100} width={100} />
                    </div>}

        <div className="dashboardContainer proposals-container no-bg">
<div className="container mt-5 mb-3">
   <div className="row">
      <div className="col-md-12">
         <h2 className="pull-left">Revenue Earned</h2>
         <p className="lead pull-right">
            Available For Withdrawal: <span className="font-weight-bold text-success"> &#036;{wallet}</span>
         </p>
      </div>
      <div className="col-md-12">
         
         
         <div className="revenueDetailList">
         <div className="card">
            <div className="card-body">
               <div className="revenueStatement mb-3">
                  <div className="card">
                     <div className="card-body">
                        <div className="row">
                           <div className="col-md-8">
                              <div className="rs-detail">
                                <div className="row">
                                <div className="col-md-12">
                                 <form onSubmit={handleSubmit}>
                                 <p> Add Amount </p>
                                 <Field name="amount" value={values.amount} onChange={handleChange} onChange={handleChange} className={'form-control decimal' + (errors.delivery_time && errors.delivery_time && errors.delivery_time && errors.delivery_time ? ' is-invalid' : '')} placeholder="Enter Amount"  />
                                  <ErrorMessage name="amount" component="div" className="error-message" />
                                  <br /><br />
                                 <p> Card </p>
                                  <Field component="select" name="id" className="form-control"  onChange={handleChange} className={'form-control' + (errors.delivery_time && errors.delivery_time && errors.delivery_time && errors.delivery_time ? ' is-invalid' : '')}>
                                     <option value=""> Select Card </option>
                                     { cards && cards.map(card => (<option key={card._id} value={card._id}> {card.brand}  &nbsp; **** **** **** {card.lastFour} </option>)) }
                                  </Field>
                                  <ErrorMessage name="id" component="div" className="error-message" />
                                  <br /><br />
                                  <button type="submit" className="btn btn-success ml-2" data-toggle="modal" data-target="#stripe_Modal">Submit</button>
                                  </form>

                                  </div>
                                  </div>


                              </div>
                           </div>
                           <div className="col-md-4">
                              <div className="rs-detail">
                                 <p> Available Income </p>
                                 <h2> &#036;{wallet}</h2>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="listingDatatTable">
                  <table className="table table-striped dataTable" id="cus-table-2" width="100%">
                     <thead>
                        <tr>
                           <th>Date</th>
                           <th>For</th>
                           <th>Amount</th>
                        </tr>
                     </thead>
                     <tbody>
                     {revenues && revenues.map((revenue, index) => (
                        <tr key={index}>
                           <td>{ moment(revenue.completed_at).format('MMMM DD, YYYY') }</td>
                           <td> 
                              Order Revenue (<Link to={"/order/details/"+revenue._id} className="text-success"> View Order </Link>)
                           </td>
                           <td className="text-success"> +&#036;{revenue.total-revenue.adminCommission} </td>
                        </tr>
                     ))}
                     </tbody>
                  </table>
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
            }}
        </Formik>
    );
};


export default Wallet;