import React, { Fragment, useState, FormEvent, Dispatch, useEffect, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import io from "socket.io-client";
import $ from 'jquery';
import moment from 'moment';
import { getUserList, getChatList, postMessage, getUser } from "../../../_actions/chat.action";
import { gigSubCatoegory, profileGigs, getDeliveryTime } from "../../../_actions/user.action";

const Chat = (props) => {

   const dispatch = useDispatch();
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState();
   const [newMessage, setNewMessage] = useState(null);
   const [gig, setGig] = useState([]);
   const [gigId, setGigId] = useState(0);
   const [gigTitle, setGigTitle] = useState("");
   const [chats, setChats] = useState([]);
   const history = useHistory();
   const userList = getUserList();
   const auth = useSelector((state) => state.user);
   var { id } = useParams();
   let chatBottom = useRef(null);
   var socket = io(process.env.REACT_APP_URL);

   const getChat = (id) => {
     
         history.push("/chat/"+id);
      
   }

   const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

   useEffect(() => {
      if(id) {

         let room_name;

         if( auth.user._id < id){
            room_name=auth.user._id+'_'+id;
         }
         else{
            room_name=id+'_'+auth.user._id;
         }

         socket.emit('joinChatRoom', room_name);
         socket.on("socketStatus", (data) => { console.log(data) });

         dispatch(getChatList(id)).then((res) => {
            console.log("res", res)
            if (res.userList) setChats(res.userList);
            if (res.user) setUser(res.user)
            scrollToBottom();
         });

         $('body').on('click', '.send_offer', function (e) {
        
            var that = $(this);
            e.preventDefault();

            dispatch(profileGigs(id)).then(res => {
               console.log('request', res);
                  setGig(res.responseData.gig); 
            })

            $('.send-offer-modal').modal("show");
            $(".send-offer-modal-btn")
               .off()
               .on("click", function () {
                  var gig_id = $("input[name='gig_id']:checked").val();
                  var title = $("input[name='gig_id']:checked").data('title');
                  console.log(gig_id, title);
                  setGigId(gig_id);
                  setGigTitle(title);
                  $('.submit-proposal-details').modal("show");

                  $('.back')
                  .off()
                  .on("click", function () { 
                     $('.send-offer-modal').modal("show");
                  });

               });
         });
      }
      
   }, [id]);

   useEffect(() => {
      dispatch(getUserList()).then((res) => {
         if (res.userList) setUsers(res.userList);
      });

      dispatch(getDeliveryTime())

      if(newMessage) {
         let chatData = [...chats];

         let response = {};
         response._id = "60422bf03c051561ff56cbe3";
         response.date = "1615277026893";
         response.message = newMessage.message;
         response.participants = [
            {
               "_id": "60405ff1edc6f2238a912ada",
               "firstName": "User",
               "lastName": "Demo"
            },
            {
               "_id": "6040c1170eb9446922dd87d8",
               "firstName": "Uday",
               "lastName": "Demo"
            }
         ];

         chatData.push(response);

         setChats(chatData);
         scrollToBottom();
      }

   }, [newMessage]);

   const deliveryTime = useSelector((state) => state.user && state.user.delivery_times && state.user.delivery_times.responseData && state.user.delivery_times.responseData.deliveryTime);

   socket.on("newMessage", (data) => setNewMessage(data) );


   return (

      <Formik

         enableReinitialize
         initialValues={{
            to: id,
            message: ''
         }}

         validationSchema={Yup.object().shape({
            message: Yup.string().required('Message is required')
         })}
         onSubmit={(values, { setSubmitting, resetForm }) => {
            const data = new FormData();
            data.append("to", id);
            data.append("message", values.message);
            data.append("type", "text");

            dispatch(postMessage(data)).then(res => {
                //window.location.reload();
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
               handleReset,
               setFieldValue,
            } = props;

            return (
               <Fragment>

                  <div className="dashboardContainer proposals-container no-bg" id="myProfile">


                     <div className="container mt-5 mb-5">
                        <div className="row">
                           <div className="col-md-3">

                              <div className="card mb-3 contacts-sidebar">
                                 <div className="select-table-col">
                                    <div id="text-type" className="cselect">
                                       <input type="text" disabled placeholder="All Conversations" /><span></span>
                                       <div id="table-select" className="cselect-menu filters">
                                          <ul >
                                             <li className="active" data-filter="all">All Conversations</li>
                                             <li data-filter="unread">Unread</li>
                                             <li data-filter="starred">Starred</li>
                                             <li data-filter="agency">Agency</li>
                                             <li data-filter="archived">Archived</li>
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="search-icon">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                 </div>
                                 <div className="search-box">
                                    <input type="search" name="search-user" />
                                    <span className="close_btn"><i className="fa fa-times" aria-hidden="true"></i></span>
                                 </div>
                                 <div className="card-body filters-content">
                                    <ul>
                                       {users && users.map((user, i) => (
                                          <a onClick={() => getChat(user.participants.find(u => u._id !== auth.user._id)._id)} key={i} className="all unread msg-active">
                                             <img src={require('../../../assets/images/comp/profileIcon.png')} className="rounded-circle" width="50" height="50" />
                                             <h3>{user.participants.find(u => u._id !== auth.user._id).firstName}<span className="time">{user.lastMessage && user.date} ago</span></h3>
                                             <p className="write-msg">{user.lastMessage}</p>
                                          </a>
                                       ))}
                                    </ul>
                                 </div>

                              </div>



                           </div>
                           <div className="col-md-9">

                              {id ?

                                 <div className="userDetailBox convertion-detail">
                              
                                    <div className="user-pro-col">
                                       <div className="row">
                                          <div className="col-md-6">
                                             <div className="profile-detail">
                                                <h3>{user && user.firstName}</h3>
                                                {/* <p><strong>Offline</strong> | <span className="time">Local Time <i className="fa fa-clock-o" aria-hidden="true"></i> Feb 16, 07:46 AM</span></p> */}
                                             </div>
                                          </div>

                                          <div className="col-md-6">
                                             <div className="user-action">
                                                <ul className="d-flex justify-content-end">
                                                   <li>
                                                      <a href=""><i className="fa fa-star-o" aria-hidden="true"></i></a>
                                                   </li>
                                                   <li>
                                                      <a href=""><i className="fa fa-envelope-o" aria-hidden="true"></i></a>
                                                   </li>
                                                   <li>
                                                      <a href=""><i className="fa fa-download" aria-hidden="true"></i></a>
                                                   </li>
                                                   <li>
                                                      <a href=""><i className="fa fa-trash-o" aria-hidden="true"></i></a>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-8">

                                          <div className="convertion-list">
                                             <ul>

                                                {chats.map((chat, index) => <li key={index}>
                                                   <div className="user-img"><img src={((chat.from && chat.from.profilePhoto == "") || (chat.from && chat.from.profilePhoto == undefined)) ? require('../../../assets/images/comp/profileIcon.png') : chat.from && chat.from.profilePhoto} className="rounded-circle" width="50" height="50" /></div>
                                                   <div className="user-detail">
                                                      <b>{chat.from && chat.from.firstName} {chat.from && chat.from.lastName}  <span>{chat.date} |<i className="fa fa-flag" aria-hidden="true"></i> <a href=""> Report</a></span></b>
                                                      <p>{chat.message}</p>
                                                   </div>
                                                  
                                                </li>)}

                                             </ul>

                                                <div ref={chatBottom} />
                                          </div>

                                          <form onSubmit={handleSubmit} encType="multipart/form-data">

                                          <div className="message-box">
                                             <textarea id="message" name="message" value={values.message} onChange={handleChange}  cols="10" rows="5" placeholder="Enter your Message here"></textarea>
                                          </div>

                                          <div className="submit-col d-flex justify-content-between">
                                             <div className="file-attachement">
                                                <div className="file-box">
                                                   <input type="file" name="file-6[]" id="file-6" className="inputfile inputfile-5" data-multiple-caption="{count} files selected" multiple />
                                                   <label htmlFor="file-6"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" fill="#3a6cff" /></svg></figure> <span></span></label>
                                                </div>
                                                <div className="create-offer">
                                                   <a className="btn btn-success btn-sm mt-4 send_offer">Create An Offer</a>
                                                </div>
                                             </div>
                                             <div className="submit-btn">
                                                <input type="submit" name="send" value="send" />
                                             </div>
                                          </div>

                                          </form>


                                       </div>
                                       <div className="col-md-4 user-profile-detail-col">
                                          <div className="order">
                                             <h3>Order</h3>
                                             <p>Post Order</p>
                                          </div>
                                          <div className="about-user">
                                             <h3>About</h3>
                                            
                                             <div className="profile-name-photo text-center">
                                                <img src={((user && user.profilePhoto == "") || (user && user.profilePhoto == undefined)) ? require('../../../assets/images/comp/profileIcon.png') : user && user.profilePhoto } className="rounded-circle" width="100px" height="100px" />
                                                <strong>{user && user.firstName}</strong>
                                                <p>{user && user.type}</p>
                                             </div>
                                             <div className="other-detail">
                                                <table>
                                                   <tr>
                                                      <td align="left"><i className="fa fa-star" aria-hidden="true"></i> Rating</td>
                                                      <td align="right">{user && user.ratingPercent}%</td>
                                                   </tr>
                                                   <tr>
                                                      <td align="left"><i className="fa fa-map-marker" aria-hidden="true"></i> From</td>
                                                      <td align="right">{user && user.country && user.country.name}</td>
                                                   </tr>
                                                   <tr>
                                                      <td align="left"><i className="fa fa-truck" aria-hidden="true"></i>  Last delivery</td>
                                                      <td align="right">{ moment(user && user.recentDelivery).format('MMMM DD, YYYY') }</td>
                                                   </tr>
                                                   {user && user.language.map((list, index) => (<tr>
                                                      <td align="left"><i className="fa fa-language" aria-hidden="true"></i> {list.language}</td>
                                                      <td align="right">{list.level}</td>
                                                   </tr>))}
                                                </table>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div> :

                                 <div className="userDetailBox select-convertion">
                                    <img src={require('../../../assets/images/comp/chat.png')} />
                                    <h3>Select a Conversation</h3>
                                    <p>Try selecting a conversation or searching for someone specific.</p>
                                 </div>}





                           </div>
                        </div>
                     </div>
                  </div>


      <div className="modal send-offer-modal" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">Select A Proposal/Service To Offer</h5>
                     <button className="close" data-dismiss="modal"> <span> ×</span></button>
                  </div>
                  <div className="modal-body p-0">

            {/* <div className="request-summary">
                                      
               <img src={auth.user && auth.user.profilePhoto ? auth.user && auth.user.profilePhoto : require('../../../assets/images/img-03.jpg')} width="50" height="50" className="rounded-circle" />
            
               <div id="request-description">

                  <h6 className="text-success mb-1"> {gig.request && gig.request[0].title} </h6>

                  <p>{gig.request && gig.request[0].description}</p>

               </div>    

            </div> */}
            <div className="request-proposals-list">
               {gig && gig.map((list, index) => (<div key={list._id}>
               <div className="proposal-picture">

                  <input type="radio" id="radio" className="radio-custom" data-title={list.title} name="gig_id" value={list._id}  />

                  <label for="radio" className="radio-custom-label"></label>

                  <img src={list.photo ? list.photo[0].photo : ""} width="50" height="50" style={{ borderRadius: '2% !important' }} />

               </div> 

               <div className="proposal-title">

                  <p>{list.title}</p>

               </div>
               </div>))}

               <hr />

            </div>

         </div>
            
         <div className="modal-footer">

            <button className="btn btn-secondary" data-dismiss="modal"> Close</button>

            <button className="btn btn-success send-offer-modal-btn" id="submit-proposal" data-toggle="modal" data-dismiss="modal" data-target="#submit-proposal-details" title="Choose an offer before clicking continue">Continue</button>

         </div>
         </div>
      </div>
   </div>

   <div className="modal submit-proposal-details" tabIndex="-1" role="basic" aria-hidden="true" data-backdrop="static" data-keyboard="false">

      <div className="modal-dialog">

         <div className="modal-content">

            <div className="modal-header">

               <h5 className="modal-title h5"> Specify Your Proposal Details </h5>

               <button className="close" data-dismiss="modal"> × </button>

            </div>

            <div className="modal-body p-0">
               {/* <div className="request-summary">
                  <img src="https://www.gigtodo.com/user_images/images_1608630531.png" width="50" height="50" className="rounded-circle" />
                  <div id="request-description">
                     <h6 className="text-success mb-1"> {gig.request && gig.request[0].title} </h6>
                     <p> {gig.request && gig.request[0].description} </p>
                  </div>
               </div> */}
               <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="selected-proposal p-3">
                     <h5> {gigTitle} </h5>
                     <hr />

                     <div className="form-group">

                        <label className="font-weight-bold"> Description :  </label>

                        <Field component="textarea" name="description" value={values.description} onChange={handleChange}  className="form-control" className={'form-control' + (errors.description && errors.description && errors.description && errors.description ? ' is-invalid' : '')} />
                        <ErrorMessage name="description" component="div" className="error-message" />
                     </div>

                     <hr />

                     <div className="form-group">

                        <label className="font-weight-bold"> Delivery Time :  </label>

                        <Field component="select" className="form-control float-right" onChange={handleChange} name="delivery_time" className={'form-control' + (errors.delivery_time && errors.delivery_time && errors.delivery_time && errors.delivery_time ? ' is-invalid' : '')}>
                           <option value=""> Select Delivery Time </option>
                           { deliveryTime && deliveryTime.map((time) => (<option value={time.name}> {time.name} </option> ) ) }
                        </Field>
                        <ErrorMessage name='delivery_time' component="div" className="error-message" />
                     </div>

                     <hr />
                     <div className="form-group">
                        <label className="font-weight-bold"> Total Offer Amount :  </label>

                        <div className="input-group float-right">

                           <span className="input-group-addon font-weight-bold"> $ </span>

                           <Field name="amount" className="form-control" value={values.amount} min="5" onChange={handleChange} placeholder="5 Minimum" className={'decimal form-control' + (errors.amount && errors.amount && errors.amount && errors.amount ? ' is-invalid' : '')} />
                           <ErrorMessage name='amount' component="div" className="error-message" />
                        </div>
                  </div>
            </div>
            <div className="modal-footer">
               <button type="button" className="btn btn-secondary back" data-dismiss="modal" data-toggle="modal" data-target="#send-offer-modal">Back</button>

               <button type="submit" className="btn btn-success submit-proposal-details-btn">Submit Offer</button>
            </div>
         </form>

      </div>

      </div>

<div id="insert_offer"></div>


</div>

</div>

               </Fragment>
            );
         }}
      </Formik >
   );
};

export default Chat;