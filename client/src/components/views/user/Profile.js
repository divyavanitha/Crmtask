import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMenu } from "../../../_actions/user_actions";
import Gig from "./gigs/Gig"



import OwlCarousel from 'react-owl-carousel';



function Profile() {



   return (

      <React.Fragment>

<div className="container mt-5 mb-5 myProfileContainer" id="myProfile">
  
   
   
  <div className="row terms-page" >
     <div className="col-md-3 mb-3">
        <div className="mpLeft">
        <div className="card">
           <div className="card-body">
              <div className="welcome-box">
                 <center>
                   <img src="images/img-03.jpg" className="img-fluid rounded-circle mb-3" />
                </center>
                <h5>Welcome, <span className="text-success">Tyrone</span> </h5>
             </div>
           {/* <!-- <hr /> --> */}
              <ul className="nav nav-pills flex-column mt-2">
                 <li className="nav-item">
                    <a data-toggle="pill" href="#profile_settings" className="nav-link active">
                    Profile Settings						</a>
                 </li>
                 <li className="nav-item">
                    <a data-toggle="pill" href="#account_settings" className="nav-link">
                    Account Settings							</a>
                 </li>
                 <li className="nav-item">
                    <a data-toggle="pill" href="#my_proposal" className="nav-link">
                    My proposal                    </a>
                 </li>
              </ul>
           </div>
        </div>
      </div>
     </div>
     <div className="col-md-9">
        <div className="mpRight">
           <div className="">
              <div className="tab-content">
                 <div id="profile_settings" className="tab-pane fade active show">
                    <div className="card">
                    <div className="card-header">
                    <h2>Profile Settings</h2>
                  </div>
                  <div className="card-body">
                    <form method="post" enctype="multipart/form-data" runat="server" autocomplete="off">
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Full Name </label>
                          <div className="col-md-8">
                             <input type="text" name="seller_name" value="Tyrone Yes" className="form-control" />
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Email </label>
                          <div className="col-md-8">
                             <input type="text" name="seller_email" value="tyrone@gigtodo.com" className="form-control" />
                          </div>
                       </div>
                       <div className="form-group row">
                          {/* <!-- form-group row Starts --> */} 
                          <label className="col-md-4 col-form-label"> Country </label>
                          <div className="col-md-8">
                             <select name="seller_country" className="form-control" required="">
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Aland Islands">Aland Islands</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua And Barbuda">Antigua And Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei Darussalam">Brunei Darussalam</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (keeling) Islands">Cocos (keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Congo, The Democratic Republic Of">Congo, The Democratic Republic Of</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote D">Cote D'ivoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (malvinas)">Falkland Islands (malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-bissau">Guinea-bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard Island And Mcdonald Islands">Heard Island And Mcdonald Islands</option>
                                <option value="Holy See (vatican City State)">Holy See (vatican City State)</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran, Islamic Republic Of">Iran, Islamic Republic Of</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle Of Man">Isle Of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea, Democratic People">Korea, Democratic People's Republic Of</option>
                                <option value="Korea, Republic Of">Korea, Republic Of</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Lao People">Lao People's Democratic Republic</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="North Macedonia">North Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia, Federated States Of">Micronesia, Federated States Of</option>
                                <option value="Moldova, Republic Of">Moldova, Republic Of</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">Netherlands Antilles</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russian Federation">Russian Federation</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">Saint Helena</option>
                                <option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre And Miquelon">Saint Pierre And Miquelon</option>
                                <option value="Saint Vincent And The Grenadines">Saint Vincent And The Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome And Principe">Sao Tome And Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia And Montenegro">Serbia And Montenegro</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia And The South Sandwich Islands">South Georgia And The South Sandwich Islands</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard And Jan Mayen">Svalbard And Jan Mayen</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                <option value="Taiwan, Province Of China">Taiwan, Province Of China</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania, United Republic Of">Tanzania, United Republic Of</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-leste">Timor-leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad And Tobago">Trinidad And Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks And Caicos Islands">Turks And Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States" selected="">United States</option>
                                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Viet Nam">Viet Nam</option>
                                <option value="Virgin Islands, British">Virgin Islands, British</option>
                                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                <option value="Wallis And Futuna">Wallis And Futuna</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                                <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                             </select>
                          </div>
                       </div>
                       {/* <!-- form-group row Ends --> */} 
                       <div className="form-group row">
                          {/* <!-- form-group row Starts --> */} 
                          <label className="col-md-4 col-form-label"> City </label>
                          <div className="col-md-8">
                             <input type="text" name="seller_city" placeholder="Enter Your City Name Here" value="sydney" className="form-control" required="" />
                          </div>
                       </div>
                       {/* <!-- form-group row Ends --> */}
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Timezone </label>
                          <div className="col-md-8">
                             <select name="seller_timezone" className="form-control site_logo_type" required="">
                                <option value="Africa/Abidjan">
                                   Africa/Abidjan            
                                </option>
                                <option value="Africa/Accra">
                                   Africa/Accra            
                                </option>
                                <option value="Africa/Addis_Ababa">
                                   Africa/Addis_Ababa            
                                </option>
                                <option value="Africa/Algiers">
                                   Africa/Algiers            
                                </option>
                                <option value="Africa/Asmara">
                                   Africa/Asmara            
                                </option>
                                <option value="Africa/Asmera">
                                   Africa/Asmera            
                                </option>
                                <option value="Africa/Bamako">
                                   Africa/Bamako            
                                </option>
                                <option value="Africa/Bangui">
                                   Africa/Bangui            
                                </option>
                                <option value="Africa/Banjul">
                                   Africa/Banjul            
                                </option>
                                <option value="Africa/Bissau">
                                   Africa/Bissau            
                                </option>
                                <option value="Africa/Blantyre">
                                   Africa/Blantyre            
                                </option>
                                <option value="Africa/Brazzaville">
                                   Africa/Brazzaville            
                                </option>
                                <option value="Africa/Bujumbura">
                                   Africa/Bujumbura            
                                </option>
                                <option value="Africa/Cairo">
                                   Africa/Cairo            
                                </option>
                                <option value="Africa/Casablanca">
                                   Africa/Casablanca            
                                </option>
                                <option value="Africa/Ceuta">
                                   Africa/Ceuta            
                                </option>
                                <option value="Africa/Conakry">
                                   Africa/Conakry            
                                </option>
                                <option value="Africa/Dakar">
                                   Africa/Dakar            
                                </option>
                                <option value="Africa/Dar_es_Salaam">
                                   Africa/Dar_es_Salaam            
                                </option>
                                <option value="Africa/Djibouti">
                                   Africa/Djibouti            
                                </option>
                                <option value="Africa/Douala">
                                   Africa/Douala            
                                </option>
                                <option value="Africa/El_Aaiun">
                                   Africa/El_Aaiun            
                                </option>
                                <option value="Africa/Freetown">
                                   Africa/Freetown            
                                </option>
                                <option value="Africa/Gaborone">
                                   Africa/Gaborone            
                                </option>
                                <option value="Africa/Harare">
                                   Africa/Harare            
                                </option>
                                <option value="Africa/Johannesburg">
                                   Africa/Johannesburg            
                                </option>
                                <option value="Africa/Juba">
                                   Africa/Juba            
                                </option>
                                <option value="Africa/Kampala">
                                   Africa/Kampala            
                                </option>
                                <option value="Africa/Khartoum">
                                   Africa/Khartoum            
                                </option>
                                <option value="Africa/Kigali">
                                   Africa/Kigali            
                                </option>
                                <option value="Africa/Kinshasa">
                                   Africa/Kinshasa            
                                </option>
                                <option value="Africa/Lagos">
                                   Africa/Lagos            
                                </option>
                                <option value="Africa/Libreville">
                                   Africa/Libreville            
                                </option>
                                <option value="Africa/Lome">
                                   Africa/Lome            
                                </option>
                                <option value="Africa/Luanda">
                                   Africa/Luanda            
                                </option>
                                <option value="Africa/Lubumbashi">
                                   Africa/Lubumbashi            
                                </option>
                                <option value="Africa/Lusaka">
                                   Africa/Lusaka            
                                </option>
                                <option value="Africa/Malabo">
                                   Africa/Malabo            
                                </option>
                                <option value="Africa/Maputo">
                                   Africa/Maputo            
                                </option>
                                <option value="Africa/Maseru">
                                   Africa/Maseru            
                                </option>
                                <option value="Africa/Mbabane">
                                   Africa/Mbabane            
                                </option>
                                <option value="Africa/Mogadishu">
                                   Africa/Mogadishu            
                                </option>
                                <option value="Africa/Monrovia">
                                   Africa/Monrovia            
                                </option>
                                <option value="Africa/Nairobi">
                                   Africa/Nairobi            
                                </option>
                                <option value="Africa/Ndjamena">
                                   Africa/Ndjamena            
                                </option>
                                <option value="Africa/Niamey">
                                   Africa/Niamey            
                                </option>
                                <option value="Africa/Nouakchott">
                                   Africa/Nouakchott            
                                </option>
                                <option value="Africa/Ouagadougou">
                                   Africa/Ouagadougou            
                                </option>
                                <option value="Africa/Porto-Novo">
                                   Africa/Porto-Novo            
                                </option>
                                <option value="Africa/Sao_Tome">
                                   Africa/Sao_Tome            
                                </option>
                                <option value="Africa/Timbuktu">
                                   Africa/Timbuktu            
                                </option>
                                <option value="Africa/Tripoli">
                                   Africa/Tripoli            
                                </option>
                                <option value="Africa/Tunis">
                                   Africa/Tunis            
                                </option>
                                <option value="Africa/Windhoek">
                                   Africa/Windhoek            
                                </option>
                                <option value="America/Adak">
                                   America/Adak            
                                </option>
                                <option value="America/Anchorage">
                                   America/Anchorage            
                                </option>
                                <option value="America/Anguilla">
                                   America/Anguilla            
                                </option>
                                <option value="America/Antigua">
                                   America/Antigua            
                                </option>
                                <option value="America/Araguaina">
                                   America/Araguaina            
                                </option>
                                <option value="America/Argentina/Buenos_Aires">
                                   America/Argentina/Buenos_Aires            
                                </option>
                                <option value="America/Argentina/Catamarca">
                                   America/Argentina/Catamarca            
                                </option>
                                <option value="America/Argentina/ComodRivadavia">
                                   America/Argentina/ComodRivadavia            
                                </option>
                                <option value="America/Argentina/Cordoba">
                                   America/Argentina/Cordoba            
                                </option>
                                <option value="America/Argentina/Jujuy">
                                   America/Argentina/Jujuy            
                                </option>
                                <option value="America/Argentina/La_Rioja">
                                   America/Argentina/La_Rioja            
                                </option>
                                <option value="America/Argentina/Mendoza">
                                   America/Argentina/Mendoza            
                                </option>
                                <option value="America/Argentina/Rio_Gallegos">
                                   America/Argentina/Rio_Gallegos            
                                </option>
                                <option value="America/Argentina/Salta">
                                   America/Argentina/Salta            
                                </option>
                                <option value="America/Argentina/San_Juan">
                                   America/Argentina/San_Juan            
                                </option>
                                <option selected="" value="America/Argentina/San_Luis">
                                   America/Argentina/San_Luis            
                                </option>
                                <option value="America/Argentina/Tucuman">
                                   America/Argentina/Tucuman            
                                </option>
                                <option value="America/Argentina/Ushuaia">
                                   America/Argentina/Ushuaia            
                                </option>
                                <option value="America/Aruba">
                                   America/Aruba            
                                </option>
                                <option value="America/Asuncion">
                                   America/Asuncion            
                                </option>
                                <option value="America/Atikokan">
                                   America/Atikokan            
                                </option>
                                <option value="America/Atka">
                                   America/Atka            
                                </option>
                                <option value="America/Bahia">
                                   America/Bahia            
                                </option>
                                <option value="America/Bahia_Banderas">
                                   America/Bahia_Banderas            
                                </option>
                                <option value="America/Barbados">
                                   America/Barbados            
                                </option>
                                <option value="America/Belem">
                                   America/Belem            
                                </option>
                                <option value="America/Belize">
                                   America/Belize            
                                </option>
                                <option value="America/Blanc-Sablon">
                                   America/Blanc-Sablon            
                                </option>
                                <option value="America/Boa_Vista">
                                   America/Boa_Vista            
                                </option>
                                <option value="America/Bogota">
                                   America/Bogota            
                                </option>
                                <option value="America/Boise">
                                   America/Boise            
                                </option>
                                <option value="America/Buenos_Aires">
                                   America/Buenos_Aires            
                                </option>
                                <option value="America/Cambridge_Bay">
                                   America/Cambridge_Bay            
                                </option>
                                <option value="America/Campo_Grande">
                                   America/Campo_Grande            
                                </option>
                                <option value="America/Cancun">
                                   America/Cancun            
                                </option>
                                <option value="America/Caracas">
                                   America/Caracas            
                                </option>
                                <option value="America/Catamarca">
                                   America/Catamarca            
                                </option>
                                <option value="America/Cayenne">
                                   America/Cayenne            
                                </option>
                                <option value="America/Cayman">
                                   America/Cayman            
                                </option>
                                <option value="America/Chicago">
                                   America/Chicago            
                                </option>
                                <option value="America/Chihuahua">
                                   America/Chihuahua            
                                </option>
                                <option value="America/Coral_Harbour">
                                   America/Coral_Harbour            
                                </option>
                                <option value="America/Cordoba">
                                   America/Cordoba            
                                </option>
                                <option value="America/Costa_Rica">
                                   America/Costa_Rica            
                                </option>
                                <option value="America/Creston">
                                   America/Creston            
                                </option>
                                <option value="America/Cuiaba">
                                   America/Cuiaba            
                                </option>
                                <option value="America/Curacao">
                                   America/Curacao            
                                </option>
                                <option value="America/Danmarkshavn">
                                   America/Danmarkshavn            
                                </option>
                                <option value="America/Dawson">
                                   America/Dawson            
                                </option>
                                <option value="America/Dawson_Creek">
                                   America/Dawson_Creek            
                                </option>
                                <option value="America/Denver">
                                   America/Denver            
                                </option>
                                <option value="America/Detroit">
                                   America/Detroit            
                                </option>
                                <option value="America/Dominica">
                                   America/Dominica            
                                </option>
                                <option value="America/Edmonton">
                                   America/Edmonton            
                                </option>
                                <option value="America/Eirunepe">
                                   America/Eirunepe            
                                </option>
                                <option value="America/El_Salvador">
                                   America/El_Salvador            
                                </option>
                                <option value="America/Ensenada">
                                   America/Ensenada            
                                </option>
                                <option value="America/Fort_Wayne">
                                   America/Fort_Wayne            
                                </option>
                                <option value="America/Fortaleza">
                                   America/Fortaleza            
                                </option>
                                <option value="America/Glace_Bay">
                                   America/Glace_Bay            
                                </option>
                                <option value="America/Godthab">
                                   America/Godthab            
                                </option>
                                <option value="America/Goose_Bay">
                                   America/Goose_Bay            
                                </option>
                                <option value="America/Grand_Turk">
                                   America/Grand_Turk            
                                </option>
                                <option value="America/Grenada">
                                   America/Grenada            
                                </option>
                                <option value="America/Guadeloupe">
                                   America/Guadeloupe            
                                </option>
                                <option value="America/Guatemala">
                                   America/Guatemala            
                                </option>
                                <option value="America/Guayaquil">
                                   America/Guayaquil            
                                </option>
                                <option value="America/Guyana">
                                   America/Guyana            
                                </option>
                                <option value="America/Halifax">
                                   America/Halifax            
                                </option>
                                <option value="America/Havana">
                                   America/Havana            
                                </option>
                                <option value="America/Hermosillo">
                                   America/Hermosillo            
                                </option>
                                <option value="America/Indiana/Indianapolis">
                                   America/Indiana/Indianapolis            
                                </option>
                                <option value="America/Indiana/Knox">
                                   America/Indiana/Knox            
                                </option>
                                <option value="America/Indiana/Marengo">
                                   America/Indiana/Marengo            
                                </option>
                                <option value="America/Indiana/Petersburg">
                                   America/Indiana/Petersburg            
                                </option>
                                <option value="America/Indiana/Tell_City">
                                   America/Indiana/Tell_City            
                                </option>
                                <option value="America/Indiana/Vevay">
                                   America/Indiana/Vevay            
                                </option>
                                <option value="America/Indiana/Vincennes">
                                   America/Indiana/Vincennes            
                                </option>
                                <option value="America/Indiana/Winamac">
                                   America/Indiana/Winamac            
                                </option>
                                <option value="America/Indianapolis">
                                   America/Indianapolis            
                                </option>
                                <option value="America/Inuvik">
                                   America/Inuvik            
                                </option>
                                <option value="America/Iqaluit">
                                   America/Iqaluit            
                                </option>
                                <option value="America/Jamaica">
                                   America/Jamaica            
                                </option>
                                <option value="America/Jujuy">
                                   America/Jujuy            
                                </option>
                                <option value="America/Juneau">
                                   America/Juneau            
                                </option>
                                <option value="America/Kentucky/Louisville">
                                   America/Kentucky/Louisville            
                                </option>
                                <option value="America/Kentucky/Monticello">
                                   America/Kentucky/Monticello            
                                </option>
                                <option value="America/Knox_IN">
                                   America/Knox_IN            
                                </option>
                                <option value="America/Kralendijk">
                                   America/Kralendijk            
                                </option>
                                <option value="America/La_Paz">
                                   America/La_Paz            
                                </option>
                                <option value="America/Lima">
                                   America/Lima            
                                </option>
                                <option value="America/Los_Angeles">
                                   America/Los_Angeles            
                                </option>
                                <option value="America/Louisville">
                                   America/Louisville            
                                </option>
                                <option value="America/Lower_Princes">
                                   America/Lower_Princes            
                                </option>
                                <option value="America/Maceio">
                                   America/Maceio            
                                </option>
                                <option value="America/Managua">
                                   America/Managua            
                                </option>
                                <option value="America/Manaus">
                                   America/Manaus            
                                </option>
                                <option value="America/Marigot">
                                   America/Marigot            
                                </option>
                                <option value="America/Martinique">
                                   America/Martinique            
                                </option>
                                <option value="America/Matamoros">
                                   America/Matamoros            
                                </option>
                                <option value="America/Mazatlan">
                                   America/Mazatlan            
                                </option>
                                <option value="America/Mendoza">
                                   America/Mendoza            
                                </option>
                                <option value="America/Menominee">
                                   America/Menominee            
                                </option>
                                <option value="America/Merida">
                                   America/Merida            
                                </option>
                                <option value="America/Metlakatla">
                                   America/Metlakatla            
                                </option>
                                <option value="America/Mexico_City">
                                   America/Mexico_City            
                                </option>
                                <option value="America/Miquelon">
                                   America/Miquelon            
                                </option>
                                <option value="America/Moncton">
                                   America/Moncton            
                                </option>
                                <option value="America/Monterrey">
                                   America/Monterrey            
                                </option>
                                <option value="America/Montevideo">
                                   America/Montevideo            
                                </option>
                                <option value="America/Montreal">
                                   America/Montreal            
                                </option>
                                <option value="America/Montserrat">
                                   America/Montserrat            
                                </option>
                                <option value="America/Nassau">
                                   America/Nassau            
                                </option>
                                <option value="America/New_York">
                                   America/New_York            
                                </option>
                                <option value="America/Nipigon">
                                   America/Nipigon            
                                </option>
                                <option value="America/Nome">
                                   America/Nome            
                                </option>
                                <option value="America/Noronha">
                                   America/Noronha            
                                </option>
                                <option value="America/North_Dakota/Beulah">
                                   America/North_Dakota/Beulah            
                                </option>
                                <option value="America/North_Dakota/Center">
                                   America/North_Dakota/Center            
                                </option>
                                <option value="America/North_Dakota/New_Salem">
                                   America/North_Dakota/New_Salem            
                                </option>
                                <option value="America/Ojinaga">
                                   America/Ojinaga            
                                </option>
                                <option value="America/Panama">
                                   America/Panama            
                                </option>
                                <option value="America/Pangnirtung">
                                   America/Pangnirtung            
                                </option>
                                <option value="America/Paramaribo">
                                   America/Paramaribo            
                                </option>
                                <option value="America/Phoenix">
                                   America/Phoenix            
                                </option>
                                <option value="America/Port-au-Prince">
                                   America/Port-au-Prince            
                                </option>
                                <option value="America/Port_of_Spain">
                                   America/Port_of_Spain            
                                </option>
                                <option value="America/Porto_Acre">
                                   America/Porto_Acre            
                                </option>
                                <option value="America/Porto_Velho">
                                   America/Porto_Velho            
                                </option>
                                <option value="America/Puerto_Rico">
                                   America/Puerto_Rico            
                                </option>
                                <option value="America/Rainy_River">
                                   America/Rainy_River            
                                </option>
                                <option value="America/Rankin_Inlet">
                                   America/Rankin_Inlet            
                                </option>
                                <option value="America/Recife">
                                   America/Recife            
                                </option>
                                <option value="America/Regina">
                                   America/Regina            
                                </option>
                                <option value="America/Resolute">
                                   America/Resolute            
                                </option>
                                <option value="America/Rio_Branco">
                                   America/Rio_Branco            
                                </option>
                                <option value="America/Rosario">
                                   America/Rosario            
                                </option>
                                <option value="America/Santa_Isabel">
                                   America/Santa_Isabel            
                                </option>
                                <option value="America/Santarem">
                                   America/Santarem            
                                </option>
                                <option value="America/Santiago">
                                   America/Santiago            
                                </option>
                                <option value="America/Santo_Domingo">
                                   America/Santo_Domingo            
                                </option>
                                <option value="America/Sao_Paulo">
                                   America/Sao_Paulo            
                                </option>
                                <option value="America/Scoresbysund">
                                   America/Scoresbysund            
                                </option>
                                <option value="America/Shiprock">
                                   America/Shiprock            
                                </option>
                                <option value="America/Sitka">
                                   America/Sitka            
                                </option>
                                <option value="America/St_Barthelemy">
                                   America/St_Barthelemy            
                                </option>
                                <option value="America/St_Johns">
                                   America/St_Johns            
                                </option>
                                <option value="America/St_Kitts">
                                   America/St_Kitts            
                                </option>
                                <option value="America/St_Lucia">
                                   America/St_Lucia            
                                </option>
                                <option value="America/St_Thomas">
                                   America/St_Thomas            
                                </option>
                                <option value="America/St_Vincent">
                                   America/St_Vincent            
                                </option>
                                <option value="America/Swift_Current">
                                   America/Swift_Current            
                                </option>
                                <option value="America/Tegucigalpa">
                                   America/Tegucigalpa            
                                </option>
                                <option value="America/Thule">
                                   America/Thule            
                                </option>
                                <option value="America/Thunder_Bay">
                                   America/Thunder_Bay            
                                </option>
                                <option value="America/Tijuana">
                                   America/Tijuana            
                                </option>
                                <option value="America/Toronto">
                                   America/Toronto            
                                </option>
                                <option value="America/Tortola">
                                   America/Tortola            
                                </option>
                                <option value="America/Vancouver">
                                   America/Vancouver            
                                </option>
                                <option value="America/Virgin">
                                   America/Virgin            
                                </option>
                                <option value="America/Whitehorse">
                                   America/Whitehorse            
                                </option>
                                <option value="America/Winnipeg">
                                   America/Winnipeg            
                                </option>
                                <option value="America/Yakutat">
                                   America/Yakutat            
                                </option>
                                <option value="America/Yellowknife">
                                   America/Yellowknife            
                                </option>
                                <option value="Antarctica/Casey">
                                   Antarctica/Casey            
                                </option>
                                <option value="Antarctica/Davis">
                                   Antarctica/Davis            
                                </option>
                                <option value="Antarctica/DumontDUrville">
                                   Antarctica/DumontDUrville            
                                </option>
                                <option value="Antarctica/Macquarie">
                                   Antarctica/Macquarie            
                                </option>
                                <option value="Antarctica/Mawson">
                                   Antarctica/Mawson            
                                </option>
                                <option value="Antarctica/McMurdo">
                                   Antarctica/McMurdo            
                                </option>
                                <option value="Antarctica/Palmer">
                                   Antarctica/Palmer            
                                </option>
                                <option value="Antarctica/Rothera">
                                   Antarctica/Rothera            
                                </option>
                                <option value="Antarctica/South_Pole">
                                   Antarctica/South_Pole            
                                </option>
                                <option value="Antarctica/Syowa">
                                   Antarctica/Syowa            
                                </option>
                                <option value="Antarctica/Troll">
                                   Antarctica/Troll            
                                </option>
                                <option value="Antarctica/Vostok">
                                   Antarctica/Vostok            
                                </option>
                                <option value="Arctic/Longyearbyen">
                                   Arctic/Longyearbyen            
                                </option>
                                <option value="Asia/Aden">
                                   Asia/Aden            
                                </option>
                                <option value="Asia/Almaty">
                                   Asia/Almaty            
                                </option>
                                <option value="Asia/Amman">
                                   Asia/Amman            
                                </option>
                                <option value="Asia/Anadyr">
                                   Asia/Anadyr            
                                </option>
                                <option value="Asia/Aqtau">
                                   Asia/Aqtau            
                                </option>
                                <option value="Asia/Aqtobe">
                                   Asia/Aqtobe            
                                </option>
                                <option value="Asia/Ashgabat">
                                   Asia/Ashgabat            
                                </option>
                                <option value="Asia/Ashkhabad">
                                   Asia/Ashkhabad            
                                </option>
                                <option value="Asia/Baghdad">
                                   Asia/Baghdad            
                                </option>
                                <option value="Asia/Bahrain">
                                   Asia/Bahrain            
                                </option>
                                <option value="Asia/Baku">
                                   Asia/Baku            
                                </option>
                                <option value="Asia/Bangkok">
                                   Asia/Bangkok            
                                </option>
                                <option value="Asia/Beirut">
                                   Asia/Beirut            
                                </option>
                                <option value="Asia/Bishkek">
                                   Asia/Bishkek            
                                </option>
                                <option value="Asia/Brunei">
                                   Asia/Brunei            
                                </option>
                                <option value="Asia/Calcutta">
                                   Asia/Calcutta            
                                </option>
                                <option value="Asia/Chita">
                                   Asia/Chita            
                                </option>
                                <option value="Asia/Choibalsan">
                                   Asia/Choibalsan            
                                </option>
                                <option value="Asia/Chongqing">
                                   Asia/Chongqing            
                                </option>
                                <option value="Asia/Chungking">
                                   Asia/Chungking            
                                </option>
                                <option value="Asia/Colombo">
                                   Asia/Colombo            
                                </option>
                                <option value="Asia/Dacca">
                                   Asia/Dacca            
                                </option>
                                <option value="Asia/Damascus">
                                   Asia/Damascus            
                                </option>
                                <option value="Asia/Dhaka">
                                   Asia/Dhaka            
                                </option>
                                <option value="Asia/Dili">
                                   Asia/Dili            
                                </option>
                                <option value="Asia/Dubai">
                                   Asia/Dubai            
                                </option>
                                <option value="Asia/Dushanbe">
                                   Asia/Dushanbe            
                                </option>
                                <option value="Asia/Gaza">
                                   Asia/Gaza            
                                </option>
                                <option value="Asia/Hanoi">
                                   Asia/Hanoi            
                                </option>
                                <option value="Asia/Harbin">
                                   Asia/Harbin            
                                </option>
                                <option value="Asia/Hebron">
                                   Asia/Hebron            
                                </option>
                                <option value="Asia/Ho_Chi_Minh">
                                   Asia/Ho_Chi_Minh            
                                </option>
                                <option value="Asia/Hong_Kong">
                                   Asia/Hong_Kong            
                                </option>
                                <option value="Asia/Hovd">
                                   Asia/Hovd            
                                </option>
                                <option value="Asia/Irkutsk">
                                   Asia/Irkutsk            
                                </option>
                                <option value="Asia/Istanbul">
                                   Asia/Istanbul            
                                </option>
                                <option value="Asia/Jakarta">
                                   Asia/Jakarta            
                                </option>
                                <option value="Asia/Jayapura">
                                   Asia/Jayapura            
                                </option>
                                <option value="Asia/Jerusalem">
                                   Asia/Jerusalem            
                                </option>
                                <option value="Asia/Kabul">
                                   Asia/Kabul            
                                </option>
                                <option value="Asia/Kamchatka">
                                   Asia/Kamchatka            
                                </option>
                                <option value="Asia/Karachi">
                                   Asia/Karachi            
                                </option>
                                <option value="Asia/Kashgar">
                                   Asia/Kashgar            
                                </option>
                                <option value="Asia/Kathmandu">
                                   Asia/Kathmandu            
                                </option>
                                <option value="Asia/Katmandu">
                                   Asia/Katmandu            
                                </option>
                                <option value="Asia/Khandyga">
                                   Asia/Khandyga            
                                </option>
                                <option value="Asia/Kolkata">
                                   Asia/Kolkata            
                                </option>
                                <option value="Asia/Krasnoyarsk">
                                   Asia/Krasnoyarsk            
                                </option>
                                <option value="Asia/Kuala_Lumpur">
                                   Asia/Kuala_Lumpur            
                                </option>
                                <option value="Asia/Kuching">
                                   Asia/Kuching            
                                </option>
                                <option value="Asia/Kuwait">
                                   Asia/Kuwait            
                                </option>
                                <option value="Asia/Macao">
                                   Asia/Macao            
                                </option>
                                <option value="Asia/Macau">
                                   Asia/Macau            
                                </option>
                                <option value="Asia/Magadan">
                                   Asia/Magadan            
                                </option>
                                <option value="Asia/Makassar">
                                   Asia/Makassar            
                                </option>
                                <option value="Asia/Manila">
                                   Asia/Manila            
                                </option>
                                <option value="Asia/Muscat">
                                   Asia/Muscat            
                                </option>
                                <option value="Asia/Nicosia">
                                   Asia/Nicosia            
                                </option>
                                <option value="Asia/Novokuznetsk">
                                   Asia/Novokuznetsk            
                                </option>
                                <option value="Asia/Novosibirsk">
                                   Asia/Novosibirsk            
                                </option>
                                <option value="Asia/Omsk">
                                   Asia/Omsk            
                                </option>
                                <option value="Asia/Oral">
                                   Asia/Oral            
                                </option>
                                <option value="Asia/Phnom_Penh">
                                   Asia/Phnom_Penh            
                                </option>
                                <option value="Asia/Pontianak">
                                   Asia/Pontianak            
                                </option>
                                <option value="Asia/Pyongyang">
                                   Asia/Pyongyang            
                                </option>
                                <option value="Asia/Qatar">
                                   Asia/Qatar            
                                </option>
                                <option value="Asia/Qyzylorda">
                                   Asia/Qyzylorda            
                                </option>
                                <option value="Asia/Rangoon">
                                   Asia/Rangoon            
                                </option>
                                <option value="Asia/Riyadh">
                                   Asia/Riyadh            
                                </option>
                                <option value="Asia/Saigon">
                                   Asia/Saigon            
                                </option>
                                <option value="Asia/Sakhalin">
                                   Asia/Sakhalin            
                                </option>
                                <option value="Asia/Samarkand">
                                   Asia/Samarkand            
                                </option>
                                <option value="Asia/Seoul">
                                   Asia/Seoul            
                                </option>
                                <option value="Asia/Shanghai">
                                   Asia/Shanghai            
                                </option>
                                <option value="Asia/Singapore">
                                   Asia/Singapore            
                                </option>
                                <option value="Asia/Srednekolymsk">
                                   Asia/Srednekolymsk            
                                </option>
                                <option value="Asia/Taipei">
                                   Asia/Taipei            
                                </option>
                                <option value="Asia/Tashkent">
                                   Asia/Tashkent            
                                </option>
                                <option value="Asia/Tbilisi">
                                   Asia/Tbilisi            
                                </option>
                                <option value="Asia/Tehran">
                                   Asia/Tehran            
                                </option>
                                <option value="Asia/Tel_Aviv">
                                   Asia/Tel_Aviv            
                                </option>
                                <option value="Asia/Thimbu">
                                   Asia/Thimbu            
                                </option>
                                <option value="Asia/Thimphu">
                                   Asia/Thimphu            
                                </option>
                                <option value="Asia/Tokyo">
                                   Asia/Tokyo            
                                </option>
                                <option value="Asia/Ujung_Pandang">
                                   Asia/Ujung_Pandang            
                                </option>
                                <option value="Asia/Ulaanbaatar">
                                   Asia/Ulaanbaatar            
                                </option>
                                <option value="Asia/Ulan_Bator">
                                   Asia/Ulan_Bator            
                                </option>
                                <option value="Asia/Urumqi">
                                   Asia/Urumqi            
                                </option>
                                <option value="Asia/Ust-Nera">
                                   Asia/Ust-Nera            
                                </option>
                                <option value="Asia/Vientiane">
                                   Asia/Vientiane            
                                </option>
                                <option value="Asia/Vladivostok">
                                   Asia/Vladivostok            
                                </option>
                                <option value="Asia/Yakutsk">
                                   Asia/Yakutsk            
                                </option>
                                <option value="Asia/Yekaterinburg">
                                   Asia/Yekaterinburg            
                                </option>
                                <option value="Asia/Yerevan">
                                   Asia/Yerevan            
                                </option>
                                <option value="Atlantic/Azores">
                                   Atlantic/Azores            
                                </option>
                                <option value="Atlantic/Bermuda">
                                   Atlantic/Bermuda            
                                </option>
                                <option value="Atlantic/Canary">
                                   Atlantic/Canary            
                                </option>
                                <option value="Atlantic/Cape_Verde">
                                   Atlantic/Cape_Verde            
                                </option>
                                <option value="Atlantic/Faeroe">
                                   Atlantic/Faeroe            
                                </option>
                                <option value="Atlantic/Faroe">
                                   Atlantic/Faroe            
                                </option>
                                <option value="Atlantic/Jan_Mayen">
                                   Atlantic/Jan_Mayen            
                                </option>
                                <option value="Atlantic/Madeira">
                                   Atlantic/Madeira            
                                </option>
                                <option value="Atlantic/Reykjavik">
                                   Atlantic/Reykjavik            
                                </option>
                                <option value="Atlantic/South_Georgia">
                                   Atlantic/South_Georgia            
                                </option>
                                <option value="Atlantic/St_Helena">
                                   Atlantic/St_Helena            
                                </option>
                                <option value="Atlantic/Stanley">
                                   Atlantic/Stanley            
                                </option>
                                <option value="Australia/ACT">
                                   Australia/ACT            
                                </option>
                                <option value="Australia/Adelaide">
                                   Australia/Adelaide            
                                </option>
                                <option value="Australia/Brisbane">
                                   Australia/Brisbane            
                                </option>
                                <option value="Australia/Broken_Hill">
                                   Australia/Broken_Hill            
                                </option>
                                <option value="Australia/Canberra">
                                   Australia/Canberra            
                                </option>
                                <option value="Australia/Currie">
                                   Australia/Currie            
                                </option>
                                <option value="Australia/Darwin">
                                   Australia/Darwin            
                                </option>
                                <option value="Australia/Eucla">
                                   Australia/Eucla            
                                </option>
                                <option value="Australia/Hobart">
                                   Australia/Hobart            
                                </option>
                                <option value="Australia/LHI">
                                   Australia/LHI            
                                </option>
                                <option value="Australia/Lindeman">
                                   Australia/Lindeman            
                                </option>
                                <option value="Australia/Lord_Howe">
                                   Australia/Lord_Howe            
                                </option>
                                <option value="Australia/Melbourne">
                                   Australia/Melbourne            
                                </option>
                                <option value="Australia/NSW">
                                   Australia/NSW            
                                </option>
                                <option value="Australia/North">
                                   Australia/North            
                                </option>
                                <option value="Australia/Perth">
                                   Australia/Perth            
                                </option>
                                <option value="Australia/Queensland">
                                   Australia/Queensland            
                                </option>
                                <option value="Australia/South">
                                   Australia/South            
                                </option>
                                <option value="Australia/Sydney">
                                   Australia/Sydney            
                                </option>
                                <option value="Australia/Tasmania">
                                   Australia/Tasmania            
                                </option>
                                <option value="Australia/Victoria">
                                   Australia/Victoria            
                                </option>
                                <option value="Australia/West">
                                   Australia/West            
                                </option>
                                <option value="Australia/Yancowinna">
                                   Australia/Yancowinna            
                                </option>
                                <option value="Brazil/Acre">
                                   Brazil/Acre            
                                </option>
                                <option value="Brazil/DeNoronha">
                                   Brazil/DeNoronha            
                                </option>
                                <option value="Brazil/East">
                                   Brazil/East            
                                </option>
                                <option value="Brazil/West">
                                   Brazil/West            
                                </option>
                                <option value="CET">
                                   CET            
                                </option>
                                <option value="CST6CDT">
                                   CST6CDT            
                                </option>
                                <option value="Canada/Atlantic">
                                   Canada/Atlantic            
                                </option>
                                <option value="Canada/Central">
                                   Canada/Central            
                                </option>
                                <option value="Canada/East-Saskatchewan">
                                   Canada/East-Saskatchewan            
                                </option>
                                <option value="Canada/Eastern">
                                   Canada/Eastern            
                                </option>
                                <option value="Canada/Mountain">
                                   Canada/Mountain            
                                </option>
                                <option value="Canada/Newfoundland">
                                   Canada/Newfoundland            
                                </option>
                                <option value="Canada/Pacific">
                                   Canada/Pacific            
                                </option>
                                <option value="Canada/Saskatchewan">
                                   Canada/Saskatchewan            
                                </option>
                                <option value="Canada/Yukon">
                                   Canada/Yukon            
                                </option>
                                <option value="Chile/Continental">
                                   Chile/Continental            
                                </option>
                                <option value="Chile/EasterIsland">
                                   Chile/EasterIsland            
                                </option>
                                <option value="Cuba">
                                   Cuba            
                                </option>
                                <option value="EET">
                                   EET            
                                </option>
                                <option value="EST">
                                   EST            
                                </option>
                                <option value="EST5EDT">
                                   EST5EDT            
                                </option>
                                <option value="Egypt">
                                   Egypt            
                                </option>
                                <option value="Eire">
                                   Eire            
                                </option>
                                <option value="Etc/GMT">
                                   Etc/GMT            
                                </option>
                                <option value="Etc/GMT+0">
                                   Etc/GMT+0            
                                </option>
                                <option value="Etc/GMT+1">
                                   Etc/GMT+1            
                                </option>
                                <option value="Etc/GMT+10">
                                   Etc/GMT+10            
                                </option>
                                <option value="Etc/GMT+11">
                                   Etc/GMT+11            
                                </option>
                                <option value="Etc/GMT+12">
                                   Etc/GMT+12            
                                </option>
                                <option value="Etc/GMT+2">
                                   Etc/GMT+2            
                                </option>
                                <option value="Etc/GMT+3">
                                   Etc/GMT+3            
                                </option>
                                <option value="Etc/GMT+4">
                                   Etc/GMT+4            
                                </option>
                                <option value="Etc/GMT+5">
                                   Etc/GMT+5            
                                </option>
                                <option value="Etc/GMT+6">
                                   Etc/GMT+6            
                                </option>
                                <option value="Etc/GMT+7">
                                   Etc/GMT+7            
                                </option>
                                <option value="Etc/GMT+8">
                                   Etc/GMT+8            
                                </option>
                                <option value="Etc/GMT+9">
                                   Etc/GMT+9            
                                </option>
                                <option value="Etc/GMT-0">
                                   Etc/GMT-0            
                                </option>
                                <option value="Etc/GMT-1">
                                   Etc/GMT-1            
                                </option>
                                <option value="Etc/GMT-10">
                                   Etc/GMT-10            
                                </option>
                                <option value="Etc/GMT-11">
                                   Etc/GMT-11            
                                </option>
                                <option value="Etc/GMT-12">
                                   Etc/GMT-12            
                                </option>
                                <option value="Etc/GMT-13">
                                   Etc/GMT-13            
                                </option>
                                <option value="Etc/GMT-14">
                                   Etc/GMT-14            
                                </option>
                                <option value="Etc/GMT-2">
                                   Etc/GMT-2            
                                </option>
                                <option value="Etc/GMT-3">
                                   Etc/GMT-3            
                                </option>
                                <option value="Etc/GMT-4">
                                   Etc/GMT-4            
                                </option>
                                <option value="Etc/GMT-5">
                                   Etc/GMT-5            
                                </option>
                                <option value="Etc/GMT-6">
                                   Etc/GMT-6            
                                </option>
                                <option value="Etc/GMT-7">
                                   Etc/GMT-7            
                                </option>
                                <option value="Etc/GMT-8">
                                   Etc/GMT-8            
                                </option>
                                <option value="Etc/GMT-9">
                                   Etc/GMT-9            
                                </option>
                                <option value="Etc/GMT0">
                                   Etc/GMT0            
                                </option>
                                <option value="Etc/Greenwich">
                                   Etc/Greenwich            
                                </option>
                                <option value="Etc/UCT">
                                   Etc/UCT            
                                </option>
                                <option value="Etc/UTC">
                                   Etc/UTC            
                                </option>
                                <option value="Etc/Universal">
                                   Etc/Universal            
                                </option>
                                <option value="Etc/Zulu">
                                   Etc/Zulu            
                                </option>
                                <option value="Europe/Amsterdam">
                                   Europe/Amsterdam            
                                </option>
                                <option value="Europe/Andorra">
                                   Europe/Andorra            
                                </option>
                                <option value="Europe/Athens">
                                   Europe/Athens            
                                </option>
                                <option value="Europe/Belfast">
                                   Europe/Belfast            
                                </option>
                                <option value="Europe/Belgrade">
                                   Europe/Belgrade            
                                </option>
                                <option value="Europe/Berlin">
                                   Europe/Berlin            
                                </option>
                                <option value="Europe/Bratislava">
                                   Europe/Bratislava            
                                </option>
                                <option value="Europe/Brussels">
                                   Europe/Brussels            
                                </option>
                                <option value="Europe/Bucharest">
                                   Europe/Bucharest            
                                </option>
                                <option value="Europe/Budapest">
                                   Europe/Budapest            
                                </option>
                                <option value="Europe/Busingen">
                                   Europe/Busingen            
                                </option>
                                <option value="Europe/Chisinau">
                                   Europe/Chisinau            
                                </option>
                                <option value="Europe/Copenhagen">
                                   Europe/Copenhagen            
                                </option>
                                <option value="Europe/Dublin">
                                   Europe/Dublin            
                                </option>
                                <option value="Europe/Gibraltar">
                                   Europe/Gibraltar            
                                </option>
                                <option value="Europe/Guernsey">
                                   Europe/Guernsey            
                                </option>
                                <option value="Europe/Helsinki">
                                   Europe/Helsinki            
                                </option>
                                <option value="Europe/Isle_of_Man">
                                   Europe/Isle_of_Man            
                                </option>
                                <option value="Europe/Istanbul">
                                   Europe/Istanbul            
                                </option>
                                <option value="Europe/Jersey">
                                   Europe/Jersey            
                                </option>
                                <option value="Europe/Kaliningrad">
                                   Europe/Kaliningrad            
                                </option>
                                <option value="Europe/Kiev">
                                   Europe/Kiev            
                                </option>
                                <option value="Europe/Lisbon">
                                   Europe/Lisbon            
                                </option>
                                <option value="Europe/Ljubljana">
                                   Europe/Ljubljana            
                                </option>
                                <option value="Europe/London">
                                   Europe/London            
                                </option>
                                <option value="Europe/Luxembourg">
                                   Europe/Luxembourg            
                                </option>
                                <option value="Europe/Madrid">
                                   Europe/Madrid            
                                </option>
                                <option value="Europe/Malta">
                                   Europe/Malta            
                                </option>
                                <option value="Europe/Mariehamn">
                                   Europe/Mariehamn            
                                </option>
                                <option value="Europe/Minsk">
                                   Europe/Minsk            
                                </option>
                                <option value="Europe/Monaco">
                                   Europe/Monaco            
                                </option>
                                <option value="Europe/Moscow">
                                   Europe/Moscow            
                                </option>
                                <option value="Europe/Nicosia">
                                   Europe/Nicosia            
                                </option>
                                <option value="Europe/Oslo">
                                   Europe/Oslo            
                                </option>
                                <option value="Europe/Paris">
                                   Europe/Paris            
                                </option>
                                <option value="Europe/Podgorica">
                                   Europe/Podgorica            
                                </option>
                                <option value="Europe/Prague">
                                   Europe/Prague            
                                </option>
                                <option value="Europe/Riga">
                                   Europe/Riga            
                                </option>
                                <option value="Europe/Rome">
                                   Europe/Rome            
                                </option>
                                <option value="Europe/Samara">
                                   Europe/Samara            
                                </option>
                                <option value="Europe/San_Marino">
                                   Europe/San_Marino            
                                </option>
                                <option value="Europe/Sarajevo">
                                   Europe/Sarajevo            
                                </option>
                                <option value="Europe/Simferopol">
                                   Europe/Simferopol            
                                </option>
                                <option value="Europe/Skopje">
                                   Europe/Skopje            
                                </option>
                                <option value="Europe/Sofia">
                                   Europe/Sofia            
                                </option>
                                <option value="Europe/Stockholm">
                                   Europe/Stockholm            
                                </option>
                                <option value="Europe/Tallinn">
                                   Europe/Tallinn            
                                </option>
                                <option value="Europe/Tirane">
                                   Europe/Tirane            
                                </option>
                                <option value="Europe/Tiraspol">
                                   Europe/Tiraspol            
                                </option>
                                <option value="Europe/Uzhgorod">
                                   Europe/Uzhgorod            
                                </option>
                                <option value="Europe/Vaduz">
                                   Europe/Vaduz            
                                </option>
                                <option value="Europe/Vatican">
                                   Europe/Vatican            
                                </option>
                                <option value="Europe/Vienna">
                                   Europe/Vienna            
                                </option>
                                <option value="Europe/Vilnius">
                                   Europe/Vilnius            
                                </option>
                                <option value="Europe/Volgograd">
                                   Europe/Volgograd            
                                </option>
                                <option value="Europe/Warsaw">
                                   Europe/Warsaw            
                                </option>
                                <option value="Europe/Zagreb">
                                   Europe/Zagreb            
                                </option>
                                <option value="Europe/Zaporozhye">
                                   Europe/Zaporozhye            
                                </option>
                                <option value="Europe/Zurich">
                                   Europe/Zurich            
                                </option>
                                <option value="GB">
                                   GB            
                                </option>
                                <option value="GB-Eire">
                                   GB-Eire            
                                </option>
                                <option value="GMT">
                                   GMT            
                                </option>
                                <option value="GMT+0">
                                   GMT+0            
                                </option>
                                <option value="GMT-0">
                                   GMT-0            
                                </option>
                                <option value="GMT0">
                                   GMT0            
                                </option>
                                <option value="Greenwich">
                                   Greenwich            
                                </option>
                                <option value="HST">
                                   HST            
                                </option>
                                <option value="Hongkong">
                                   Hongkong            
                                </option>
                                <option value="Iceland">
                                   Iceland            
                                </option>
                                <option value="Indian/Antananarivo">
                                   Indian/Antananarivo            
                                </option>
                                <option value="Indian/Chagos">
                                   Indian/Chagos            
                                </option>
                                <option value="Indian/Christmas">
                                   Indian/Christmas            
                                </option>
                                <option value="Indian/Cocos">
                                   Indian/Cocos            
                                </option>
                                <option value="Indian/Comoro">
                                   Indian/Comoro            
                                </option>
                                <option value="Indian/Kerguelen">
                                   Indian/Kerguelen            
                                </option>
                                <option value="Indian/Mahe">
                                   Indian/Mahe            
                                </option>
                                <option value="Indian/Maldives">
                                   Indian/Maldives            
                                </option>
                                <option value="Indian/Mauritius">
                                   Indian/Mauritius            
                                </option>
                                <option value="Indian/Mayotte">
                                   Indian/Mayotte            
                                </option>
                                <option value="Indian/Reunion">
                                   Indian/Reunion            
                                </option>
                                <option value="Iran">
                                   Iran            
                                </option>
                                <option value="Israel">
                                   Israel            
                                </option>
                                <option value="Jamaica">
                                   Jamaica            
                                </option>
                                <option value="Japan">
                                   Japan            
                                </option>
                                <option value="Kwajalein">
                                   Kwajalein            
                                </option>
                                <option value="Libya">
                                   Libya            
                                </option>
                                <option value="MET">
                                   MET            
                                </option>
                                <option value="MST">
                                   MST            
                                </option>
                                <option value="MST7MDT">
                                   MST7MDT            
                                </option>
                                <option value="Mexico/BajaNorte">
                                   Mexico/BajaNorte            
                                </option>
                                <option value="Mexico/BajaSur">
                                   Mexico/BajaSur            
                                </option>
                                <option value="Mexico/General">
                                   Mexico/General            
                                </option>
                                <option value="NZ">
                                   NZ            
                                </option>
                                <option value="NZ-CHAT">
                                   NZ-CHAT            
                                </option>
                                <option value="Navajo">
                                   Navajo            
                                </option>
                                <option value="PRC">
                                   PRC            
                                </option>
                                <option value="PST8PDT">
                                   PST8PDT            
                                </option>
                                <option value="Pacific/Apia">
                                   Pacific/Apia            
                                </option>
                                <option value="Pacific/Auckland">
                                   Pacific/Auckland            
                                </option>
                                <option value="Pacific/Bougainville">
                                   Pacific/Bougainville            
                                </option>
                                <option value="Pacific/Chatham">
                                   Pacific/Chatham            
                                </option>
                                <option value="Pacific/Chuuk">
                                   Pacific/Chuuk            
                                </option>
                                <option value="Pacific/Easter">
                                   Pacific/Easter            
                                </option>
                                <option value="Pacific/Efate">
                                   Pacific/Efate            
                                </option>
                                <option value="Pacific/Enderbury">
                                   Pacific/Enderbury            
                                </option>
                                <option value="Pacific/Fakaofo">
                                   Pacific/Fakaofo            
                                </option>
                                <option value="Pacific/Fiji">
                                   Pacific/Fiji            
                                </option>
                                <option value="Pacific/Funafuti">
                                   Pacific/Funafuti            
                                </option>
                                <option value="Pacific/Galapagos">
                                   Pacific/Galapagos            
                                </option>
                                <option value="Pacific/Gambier">
                                   Pacific/Gambier            
                                </option>
                                <option value="Pacific/Guadalcanal">
                                   Pacific/Guadalcanal            
                                </option>
                                <option value="Pacific/Guam">
                                   Pacific/Guam            
                                </option>
                                <option value="Pacific/Honolulu">
                                   Pacific/Honolulu            
                                </option>
                                <option value="Pacific/Johnston">
                                   Pacific/Johnston            
                                </option>
                                <option value="Pacific/Kiritimati">
                                   Pacific/Kiritimati            
                                </option>
                                <option value="Pacific/Kosrae">
                                   Pacific/Kosrae            
                                </option>
                                <option value="Pacific/Kwajalein">
                                   Pacific/Kwajalein            
                                </option>
                                <option value="Pacific/Majuro">
                                   Pacific/Majuro            
                                </option>
                                <option value="Pacific/Marquesas">
                                   Pacific/Marquesas            
                                </option>
                                <option value="Pacific/Midway">
                                   Pacific/Midway            
                                </option>
                                <option value="Pacific/Nauru">
                                   Pacific/Nauru            
                                </option>
                                <option value="Pacific/Niue">
                                   Pacific/Niue            
                                </option>
                                <option value="Pacific/Norfolk">
                                   Pacific/Norfolk            
                                </option>
                                <option value="Pacific/Noumea">
                                   Pacific/Noumea            
                                </option>
                                <option value="Pacific/Pago_Pago">
                                   Pacific/Pago_Pago            
                                </option>
                                <option value="Pacific/Palau">
                                   Pacific/Palau            
                                </option>
                                <option value="Pacific/Pitcairn">
                                   Pacific/Pitcairn            
                                </option>
                                <option value="Pacific/Pohnpei">
                                   Pacific/Pohnpei            
                                </option>
                                <option value="Pacific/Ponape">
                                   Pacific/Ponape            
                                </option>
                                <option value="Pacific/Port_Moresby">
                                   Pacific/Port_Moresby            
                                </option>
                                <option value="Pacific/Rarotonga">
                                   Pacific/Rarotonga            
                                </option>
                                <option value="Pacific/Saipan">
                                   Pacific/Saipan            
                                </option>
                                <option value="Pacific/Samoa">
                                   Pacific/Samoa            
                                </option>
                                <option value="Pacific/Tahiti">
                                   Pacific/Tahiti            
                                </option>
                                <option value="Pacific/Tarawa">
                                   Pacific/Tarawa            
                                </option>
                                <option value="Pacific/Tongatapu">
                                   Pacific/Tongatapu            
                                </option>
                                <option value="Pacific/Truk">
                                   Pacific/Truk            
                                </option>
                                <option value="Pacific/Wake">
                                   Pacific/Wake            
                                </option>
                                <option value="Pacific/Wallis">
                                   Pacific/Wallis            
                                </option>
                                <option value="Pacific/Yap">
                                   Pacific/Yap            
                                </option>
                                <option value="Poland">
                                   Poland            
                                </option>
                                <option value="Portugal">
                                   Portugal            
                                </option>
                                <option value="ROC">
                                   ROC            
                                </option>
                                <option value="ROK">
                                   ROK            
                                </option>
                                <option value="Singapore">
                                   Singapore            
                                </option>
                                <option value="Turkey">
                                   Turkey            
                                </option>
                                <option value="UCT">
                                   UCT            
                                </option>
                                <option value="US/Alaska">
                                   US/Alaska            
                                </option>
                                <option value="US/Aleutian">
                                   US/Aleutian            
                                </option>
                                <option value="US/Arizona">
                                   US/Arizona            
                                </option>
                                <option value="US/Central">
                                   US/Central            
                                </option>
                                <option value="US/East-Indiana">
                                   US/East-Indiana            
                                </option>
                                <option value="US/Eastern">
                                   US/Eastern            
                                </option>
                                <option value="US/Hawaii">
                                   US/Hawaii            
                                </option>
                                <option value="US/Indiana-Starke">
                                   US/Indiana-Starke            
                                </option>
                                <option value="US/Michigan">
                                   US/Michigan            
                                </option>
                                <option value="US/Mountain">
                                   US/Mountain            
                                </option>
                                <option value="US/Pacific">
                                   US/Pacific            
                                </option>
                                <option value="US/Samoa">
                                   US/Samoa            
                                </option>
                                <option value="UTC">
                                   UTC            
                                </option>
                                <option value="Universal">
                                   Universal            
                                </option>
                                <option value="W-SU">
                                   W-SU            
                                </option>
                                <option value="WET">
                                   WET            
                                </option>
                                <option value="Zulu">
                                   Zulu            
                                </option>
                             </select>
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Main Conversational Language </label>
                          <div className="col-md-8">
                             <select name="seller_language" className="form-control" required="">
                                <option value="35" selected=""> English  </option>
                                <option value="37"> Spanish </option>
                                <option value="38"> Arabic </option>
                                <option value="39"> Chinese </option>
                                <option value="40"> Urdu </option>
                                <option value="41"> German </option>
                                <option value="42"> Italiano </option>
                                <option value="43"> Turkish </option>
                                <option value="44"> Dutch </option>
                                <option value="45"> Francais </option>
                                <option value="46"> ru </option>
                                <option value="47"> thai </option>
                                <option value="48"> Arabic </option>
                                <option value="49"> Yoruba </option>
                                <option value="50"> ar </option>
                                <option value="51"> Urdu </option>
                                <option value="52"> Bengali </option>
                                <option value="53"> Português </option>
                                <option value="54"> Indonesian </option>
                                <option value="55"> Indonesia </option>
                                <option value="56"> kkkkkk </option>
                                <option value="57"> Indonesia </option>
                                <option value="58"> Indonesia </option>
                                <option value="59"> Português </option>
                                <option value="60"> Martian </option>
                                <option value="61"> hi </option>
                                <option value="62"> arabic </option>
                                <option value="63"> korean </option>
                                <option value="64"> korean </option>
                                <option value="65"> Português  </option>
                                <option value="66"> Russian </option>
                                <option value="67"> Czech </option>
                                <option value="68"> Indonesia </option>
                                <option value="69"> French </option>
                                <option value="70"> Persian </option>
                                <option value="71"> Fr </option>
                                <option value="72"> Español </option>
                                <option value="73"> Español </option>
                                <option value="74"> Spanish </option>
                                <option value="75"> arabic </option>
                                <option value="76"> Español </option>
                                <option value="77"> italiano </option>
                                <option value="78"> Spanish </option>
                                <option value="79"> Spanish </option>
                                <option value="80"> arabic </option>
                                <option value="81"> Tamil </option>
                                <option value="82"> じゃ </option>
                                <option value="83"> Tr </option>
                                <option value="84"> Russian </option>
                                <option value="85"> Armenian </option>
                                <option value="86"> Russia </option>
                                <option value="87"> tr </option>
                                <option value="88"> arabic </option>
                                <option value="89"> Punjabi </option>
                                <option value="90"> Español </option>
                                <option value="91"> Ukraine </option>
                                <option value="92"> French </option>
                                <option value="93"> hu </option>
                                <option value="94"> Español </option>
                                <option value="95"> Sinhala </option>
                                <option value="96"> Indonesia </option>
                                <option value="97"> Turkish </option>
                                <option value="98"> Armenian </option>
                                <option value="99"> Arabic </option>
                                <option value="100"> Arabic </option>
                                <option value="101"> Русский </option>
                                <option value="102"> ar </option>
                                <option value="103"> sss </option>
                             </select>
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Profile Photo </label>
                          <div className="col-md-8">
                             <input type="file" name="profile_photo" className="form-control" />
                             <input type="hidden" name="profile_photo" />
                             <p className="mt-2">
                                This photo is your identity on GigToDo. <br />It appears on your profile, messages and proposals/services pages.      
                             </p>
                             <img src="https://www.gigtodo.com//user_images/ty_1574032240.png" width="80" className="img-thumbnail img-circle" />
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Cover Photo </label>
                          <div className="col-md-8">
                             <input type="file" name="cover_photo" id="cover" className="form-control" />
                             <p className="mt-2">
                                This is your cover photo on your <a target="_blank" className="text-success" href="https://www.gigtodo.com/tyrone">Profile Page</a>      
                             </p>
                             <img src="https://www.gigtodo.com//cover_images/s65 final edition (48 of 50)_1578370110.jpg" width="80" className="img-thumbnail img-circle" />
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Headline </label>
                          <div className="col-md-8">
                             <textarea name="seller_headline" id="textarea-headline" rows="3" className="form-control" maxlength="150">Freelance DJ</textarea>
                             <span className="float-right mt-1">
                             <span className="count-headline"> 0 </span> / 150 Max      </span>
                          </div>
                       </div>
                       <div className="form-group row">
                          <label className="col-md-4 col-form-label"> Description</label>
                          <div className="col-md-8">
                             <textarea name="seller_about" id="textarea-about" rows="5" className="form-control" maxlength="300" placeholder="Tell us something about yourself...">I like to make music and pretty things like logos, websites, pictures and videos. Clients include law firms, doctors, technology and medical companies.</textarea>
                             <span className="float-right mt-1">
                             <span className="count-about"> 0 </span> / 300 Max      </span>
                          </div>
                       </div>
                       <hr />
                       <button type="submit" name="submit" className="btn btn-success float-right" >
                       <i className="fa fa-floppy-o"></i> Save Changes  </button>
                    </form>
  
                   
                      </div>
                      </div>
                 </div>
                 <div id="account_settings" className="tab-pane fade">
                    <div className="card">
                     <div className="card-header">
                       <h2>Account Settings</h2>
                     </div>
                     <div className="card-body">
                          <h5 className="mb-4"> PayPal For Withdrawing Revenue </h5>
                        <form method="post" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Enter Paypal Email </label>
                                <div className="col-md-8">
                                   <input type="text" name="seller_paypal_email" value="shoail@gigtodo.com" placeholder="Enter Paypal email" className="form-control" required="" />
                                </div>
                             </div>
                             <button type="submit" name="submit_paypal_email" className="btn btn-success float-right">
                             Change Paypal Email  </button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> Moneygram For Withdrawing Revenue </h5>
                          <form method="post" enctype="multipart/form-data" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Id Type </label>
                                <div className="col-md-8">
                                   <select name="id_type" className="form-control" required="">
                                      <option value="$type">Passport</option>
                                      <option value="$type">National Id</option>
                                      <option value="$type">Drivers License</option>
                                   </select>
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Id File </label>
                                <div className="col-md-8">
                                   <input type="file" name="id_file" className="form-control" id="cover" />
                                   <small className="text-muted">Please Upload Id Front And Back In Zip Format.</small>
                                   <p className="mb-0 small"><a href="plugins/paymentGateway/id_files/video-animation_1599467170.png" className="text-primary" download=""><i className="fa fa-download"></i> video-animation_1599467170.png</a></p>
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Full Name </label>
                                <div className="col-md-8">
                                   <input type="text" name="full_name" value="Tyrone" className="form-control" placeholder="Full Name" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Address/Location </label>
                                <div className="col-md-8">
                                   <input type="text" name="address" className="form-control" value="newyork" placeholder="Address" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Mobile No </label>
                                <div className="col-md-8">
                                   <input type="number" name="mobile_no" className="form-control" value="186363737" placeholder="Mobile No" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Preferred Currency </label>
                                <div className="col-md-8">
                                   <input type="text" name="preferred_currency" className="form-control" value="USD" required="" />
                                </div>
                             </div>
                             <button type="submit" name="update_moneygram" className="btn btn-success float-right">Update Moneygram Details</button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> Bank Transfer For Withdrawing Revenue </h5>
                          <form method="post" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Bank Name </label>
                                <div className="col-md-8">
                                   <input type="text" name="bank_name" value="BCA" placeholder="Enter Your Bank Name" className="form-control" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                {/* <!-- form-group row Starts --> */} 
                                <label className="col-md-4 col-form-label"> Bank Country </label>
                                <div className="col-md-8">
                                   <select name="bank_country" className="form-control" required="">
                                      <option value="Afghanistan">Afghanistan</option>
                                      <option value="Aland Islands">Aland Islands</option>
                                      <option value="Albania">Albania</option>
                                      <option value="Algeria">Algeria</option>
                                      <option value="American Samoa">American Samoa</option>
                                      <option value="Andorra">Andorra</option>
                                      <option value="Angola">Angola</option>
                                      <option value="Anguilla">Anguilla</option>
                                      <option value="Antarctica">Antarctica</option>
                                      <option value="Antigua And Barbuda">Antigua And Barbuda</option>
                                      <option value="Argentina">Argentina</option>
                                      <option value="Armenia">Armenia</option>
                                      <option value="Aruba">Aruba</option>
                                      <option value="Australia">Australia</option>
                                      <option value="Austria">Austria</option>
                                      <option value="Azerbaijan">Azerbaijan</option>
                                      <option value="Bahamas">Bahamas</option>
                                      <option value="Bahrain">Bahrain</option>
                                      <option value="Bangladesh">Bangladesh</option>
                                      <option value="Barbados">Barbados</option>
                                      <option value="Belarus">Belarus</option>
                                      <option value="Belgium">Belgium</option>
                                      <option value="Belize">Belize</option>
                                      <option value="Benin">Benin</option>
                                      <option value="Bermuda">Bermuda</option>
                                      <option value="Bhutan">Bhutan</option>
                                      <option value="Bolivia">Bolivia</option>
                                      <option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option>
                                      <option value="Botswana">Botswana</option>
                                      <option value="Bouvet Island">Bouvet Island</option>
                                      <option value="Brazil">Brazil</option>
                                      <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                      <option value="Brunei Darussalam">Brunei Darussalam</option>
                                      <option value="Bulgaria">Bulgaria</option>
                                      <option value="Burkina Faso">Burkina Faso</option>
                                      <option value="Burundi">Burundi</option>
                                      <option value="Cambodia">Cambodia</option>
                                      <option value="Cameroon">Cameroon</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Cape Verde">Cape Verde</option>
                                      <option value="Cayman Islands">Cayman Islands</option>
                                      <option value="Central African Republic">Central African Republic</option>
                                      <option value="Chad">Chad</option>
                                      <option value="Chile">Chile</option>
                                      <option value="China">China</option>
                                      <option value="Christmas Island">Christmas Island</option>
                                      <option value="Cocos (keeling) Islands">Cocos (keeling) Islands</option>
                                      <option value="Colombia">Colombia</option>
                                      <option value="Comoros">Comoros</option>
                                      <option value="Congo">Congo</option>
                                      <option value="Congo, The Democratic Republic Of">Congo, The Democratic Republic Of</option>
                                      <option value="Cook Islands">Cook Islands</option>
                                      <option value="Costa Rica">Costa Rica</option>
                                      <option value="Cote D'ivoire">Cote D'ivoire</option>
                                      <option value="Croatia">Croatia</option>
                                      <option value="Cuba">Cuba</option>
                                      <option value="Cyprus">Cyprus</option>
                                      <option value="Czech Republic">Czech Republic</option>
                                      <option value="Denmark">Denmark</option>
                                      <option value="Djibouti">Djibouti</option>
                                      <option value="Dominica">Dominica</option>
                                      <option value="Dominican Republic">Dominican Republic</option>
                                      <option value="Ecuador">Ecuador</option>
                                      <option value="Egypt">Egypt</option>
                                      <option value="El Salvador">El Salvador</option>
                                      <option value="Equatorial Guinea">Equatorial Guinea</option>
                                      <option value="Eritrea">Eritrea</option>
                                      <option value="Estonia">Estonia</option>
                                      <option value="Ethiopia">Ethiopia</option>
                                      <option value="Falkland Islands (malvinas)">Falkland Islands (malvinas)</option>
                                      <option value="Faroe Islands">Faroe Islands</option>
                                      <option value="Fiji">Fiji</option>
                                      <option value="Finland">Finland</option>
                                      <option value="France">France</option>
                                      <option value="French Guiana">French Guiana</option>
                                      <option value="French Polynesia">French Polynesia</option>
                                      <option value="French Southern Territories">French Southern Territories</option>
                                      <option value="Gabon">Gabon</option>
                                      <option value="Gambia">Gambia</option>
                                      <option value="Georgia">Georgia</option>
                                      <option value="Germany">Germany</option>
                                      <option value="Ghana">Ghana</option>
                                      <option value="Gibraltar">Gibraltar</option>
                                      <option value="Greece">Greece</option>
                                      <option value="Greenland">Greenland</option>
                                      <option value="Grenada">Grenada</option>
                                      <option value="Guadeloupe">Guadeloupe</option>
                                      <option value="Guam">Guam</option>
                                      <option value="Guatemala">Guatemala</option>
                                      <option value="Guernsey">Guernsey</option>
                                      <option value="Guinea">Guinea</option>
                                      <option value="Guinea-bissau">Guinea-bissau</option>
                                      <option value="Guyana">Guyana</option>
                                      <option value="Haiti">Haiti</option>
                                      <option value="Heard Island And Mcdonald Islands">Heard Island And Mcdonald Islands</option>
                                      <option value="Holy See (vatican City State)">Holy See (vatican City State)</option>
                                      <option value="Honduras">Honduras</option>
                                      <option value="Hong Kong">Hong Kong</option>
                                      <option value="Hungary">Hungary</option>
                                      <option value="Iceland">Iceland</option>
                                      <option value="India">India</option>
                                      <option value="Indonesia" selected="">Indonesia</option>
                                      <option value="Iran, Islamic Republic Of">Iran, Islamic Republic Of</option>
                                      <option value="Iraq">Iraq</option>
                                      <option value="Ireland">Ireland</option>
                                      <option value="Isle Of Man">Isle Of Man</option>
                                      <option value="Israel">Israel</option>
                                      <option value="Italy">Italy</option>
                                      <option value="Jamaica">Jamaica</option>
                                      <option value="Japan">Japan</option>
                                      <option value="Jersey">Jersey</option>
                                      <option value="Jordan">Jordan</option>
                                      <option value="Kazakhstan">Kazakhstan</option>
                                      <option value="Kenya">Kenya</option>
                                      <option value="Kiribati">Kiribati</option>
                                      <option value="Korea, Democratic People's Republic Of">Korea, Democratic People's Republic Of</option>
                                      <option value="Korea, Republic Of">Korea, Republic Of</option>
                                      <option value="Kuwait">Kuwait</option>
                                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                                      <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                      <option value="Latvia">Latvia</option>
                                      <option value="Lebanon">Lebanon</option>
                                      <option value="Lesotho">Lesotho</option>
                                      <option value="Liberia">Liberia</option>
                                      <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                      <option value="Liechtenstein">Liechtenstein</option>
                                      <option value="Lithuania">Lithuania</option>
                                      <option value="Luxembourg">Luxembourg</option>
                                      <option value="Macao">Macao</option>
                                      <option value="North Macedonia">North Macedonia</option>
                                      <option value="Madagascar">Madagascar</option>
                                      <option value="Malawi">Malawi</option>
                                      <option value="Malaysia">Malaysia</option>
                                      <option value="Maldives">Maldives</option>
                                      <option value="Mali">Mali</option>
                                      <option value="Malta">Malta</option>
                                      <option value="Marshall Islands">Marshall Islands</option>
                                      <option value="Martinique">Martinique</option>
                                      <option value="Mauritania">Mauritania</option>
                                      <option value="Mauritius">Mauritius</option>
                                      <option value="Mayotte">Mayotte</option>
                                      <option value="Mexico">Mexico</option>
                                      <option value="Micronesia, Federated States Of">Micronesia, Federated States Of</option>
                                      <option value="Moldova, Republic Of">Moldova, Republic Of</option>
                                      <option value="Monaco">Monaco</option>
                                      <option value="Mongolia">Mongolia</option>
                                      <option value="Montserrat">Montserrat</option>
                                      <option value="Morocco">Morocco</option>
                                      <option value="Mozambique">Mozambique</option>
                                      <option value="Myanmar">Myanmar</option>
                                      <option value="Namibia">Namibia</option>
                                      <option value="Nauru">Nauru</option>
                                      <option value="Nepal">Nepal</option>
                                      <option value="Netherlands">Netherlands</option>
                                      <option value="Netherlands Antilles">Netherlands Antilles</option>
                                      <option value="New Caledonia">New Caledonia</option>
                                      <option value="New Zealand">New Zealand</option>
                                      <option value="Nicaragua">Nicaragua</option>
                                      <option value="Niger">Niger</option>
                                      <option value="Nigeria">Nigeria</option>
                                      <option value="Niue">Niue</option>
                                      <option value="Norfolk Island">Norfolk Island</option>
                                      <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                      <option value="Norway">Norway</option>
                                      <option value="Oman">Oman</option>
                                      <option value="Pakistan">Pakistan</option>
                                      <option value="Palau">Palau</option>
                                      <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                      <option value="Panama">Panama</option>
                                      <option value="Papua New Guinea">Papua New Guinea</option>
                                      <option value="Paraguay">Paraguay</option>
                                      <option value="Peru">Peru</option>
                                      <option value="Philippines">Philippines</option>
                                      <option value="Pitcairn">Pitcairn</option>
                                      <option value="Poland">Poland</option>
                                      <option value="Portugal">Portugal</option>
                                      <option value="Puerto Rico">Puerto Rico</option>
                                      <option value="Qatar">Qatar</option>
                                      <option value="Reunion">Reunion</option>
                                      <option value="Romania">Romania</option>
                                      <option value="Russian Federation">Russian Federation</option>
                                      <option value="Rwanda">Rwanda</option>
                                      <option value="Saint Helena">Saint Helena</option>
                                      <option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
                                      <option value="Saint Lucia">Saint Lucia</option>
                                      <option value="Saint Pierre And Miquelon">Saint Pierre And Miquelon</option>
                                      <option value="Saint Vincent And The Grenadines">Saint Vincent And The Grenadines</option>
                                      <option value="Samoa">Samoa</option>
                                      <option value="San Marino">San Marino</option>
                                      <option value="Sao Tome And Principe">Sao Tome And Principe</option>
                                      <option value="Saudi Arabia">Saudi Arabia</option>
                                      <option value="Senegal">Senegal</option>
                                      <option value="Serbia And Montenegro">Serbia And Montenegro</option>
                                      <option value="Seychelles">Seychelles</option>
                                      <option value="Sierra Leone">Sierra Leone</option>
                                      <option value="Singapore">Singapore</option>
                                      <option value="Slovakia">Slovakia</option>
                                      <option value="Slovenia">Slovenia</option>
                                      <option value="Solomon Islands">Solomon Islands</option>
                                      <option value="Somalia">Somalia</option>
                                      <option value="South Africa">South Africa</option>
                                      <option value="South Georgia And The South Sandwich Islands">South Georgia And The South Sandwich Islands</option>
                                      <option value="Spain">Spain</option>
                                      <option value="Sri Lanka">Sri Lanka</option>
                                      <option value="Sudan">Sudan</option>
                                      <option value="Suriname">Suriname</option>
                                      <option value="Svalbard And Jan Mayen">Svalbard And Jan Mayen</option>
                                      <option value="Swaziland">Swaziland</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Switzerland">Switzerland</option>
                                      <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                      <option value="Taiwan, Province Of China">Taiwan, Province Of China</option>
                                      <option value="Tajikistan">Tajikistan</option>
                                      <option value="Tanzania, United Republic Of">Tanzania, United Republic Of</option>
                                      <option value="Thailand">Thailand</option>
                                      <option value="Timor-leste">Timor-leste</option>
                                      <option value="Togo">Togo</option>
                                      <option value="Tokelau">Tokelau</option>
                                      <option value="Tonga">Tonga</option>
                                      <option value="Trinidad And Tobago">Trinidad And Tobago</option>
                                      <option value="Tunisia">Tunisia</option>
                                      <option value="Turkey">Turkey</option>
                                      <option value="Turkmenistan">Turkmenistan</option>
                                      <option value="Turks And Caicos Islands">Turks And Caicos Islands</option>
                                      <option value="Tuvalu">Tuvalu</option>
                                      <option value="Uganda">Uganda</option>
                                      <option value="Ukraine">Ukraine</option>
                                      <option value="United Arab Emirates">United Arab Emirates</option>
                                      <option value="United Kingdom">United Kingdom</option>
                                      <option value="United States">United States</option>
                                      <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                      <option value="Uruguay">Uruguay</option>
                                      <option value="Uzbekistan">Uzbekistan</option>
                                      <option value="Vanuatu">Vanuatu</option>
                                      <option value="Venezuela">Venezuela</option>
                                      <option value="Viet Nam">Viet Nam</option>
                                      <option value="Virgin Islands, British">Virgin Islands, British</option>
                                      <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                      <option value="Wallis And Futuna">Wallis And Futuna</option>
                                      <option value="Western Sahara">Western Sahara</option>
                                      <option value="Yemen">Yemen</option>
                                      <option value="Zambia">Zambia</option>
                                      <option value="Zimbabwe">Zimbabwe</option>
                                      <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                   </select>
                                </div>
                             </div>
                             {/* <!-- form-group row Ends --> */}
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Bank State/Province/Region </label>
                                <div className="col-md-8">
                                   <input type="text" name="bank_state_province_region" value="DKI" placeholder="Enter Your Bank State/Province/Region" className="form-control" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Bank City </label>
                                <div className="col-md-8">
                                   <input type="text" name="bank_city" value="Jakarta" placeholder="Enter Your Bank City" className="form-control" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                {/* <!-- form-group row Starts --> */}
                                <label className="col-md-4 col-form-label"> Account Holder Name </label>
                                <div className="col-md-8">
                                   <input type="text" name="account_name" value="Ah" placeholder="Enter Your Account Holder Name" className="form-control" required="" />
                                </div>
                             </div>
                             {/* <!-- form-group row Ends --> */}
                             <div className="form-group row">
                                {/* <!-- form-group row Starts --> */}
                                <label className="col-md-4 col-form-label"> Account No </label>
                                <div className="col-md-8">
                                   <input type="text" name="account_no" value="60" placeholder="Enter Your Account No" className="form-control" required="" />
                                </div>
                             </div>
                             {/* <!-- form-group row Ends --> */}
                             <div className="form-group row">
                                {/* <!-- form-group row Starts --> */}
                                <label className="col-md-4 col-form-label"> Iban Number (optional) </label>
                                <div className="col-md-8">
                                   <input type="text" name="iban_number" value="" placeholder="Enter Your Iban Number" className="form-control" />
                                </div>
                             </div>
                             {/* <!-- form-group row Ends --> */}
                             <div className="form-group row">
                                {/* <!-- form-group row Starts --> */}
                                <label className="col-md-4 col-form-label"> Swift Code (optional) </label>
                                <div className="col-md-8">
                                   <input type="text" name="swift_code" value="" placeholder="Enter Your Swift Code" className="form-control" />
                                </div>
                             </div>
                             {/* <!-- form-group row Ends --> */}
                             <button type="submit" name="update_bank_details" className="btn btn-success float-right">Update Bank Details</button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> Payoneer For Withdrawing Revenue </h5>
                          <form method="post" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Enter Payoneer Email </label>
                                <div className="col-md-8">
                                   <input type="text" name="seller_payoneer_email" value="" placeholder="Enter payoneer email" className="form-control" required="" />
                                </div>
                             </div>
                             <button type="submit" name="submit_payoneer_email" className="btn btn-success float-right">
                             Change Payoneer Email  </button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> Bitcoin Wallet For Withdrawing Revenue </h5>
                          <form method="post" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Wallet Address </label>
                                <div className="col-md-8">
                                   <input type="text" name="seller_wallet" value="1HJeW2NrDBmqQRX9pBSFiMq6Y6yuZJpCUR" placeholder="Enter Wallet Address" className="form-control" />
                                   <small className="text-danger">! Warning You Only Need To Enter Your Bitcoin Wallet Address Not Any Other.</small>
                                </div>
                             </div>
                             <button type="submit" name="submit_wallet" className="btn btn-success float-right">
                             Update Wallet Address  </button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> REAL-TIME NOTIFICATIONS </h5>
                          <form method="post" className="clearfix">
                             <div className="form-group row mb-3">
                                <label className="col-md-4 col-form-label"> Enable/disable sound </label>
                                <div className="col-md-8">
                                   <select name="enable_sound" className="form-control">
                                      <option value="yes"> Yes </option>
                                      <option value="no"> No </option>
                                   </select>
                                </div>
                             </div>
                             <div className="form-group row mb-3">
                                <label className="col-md-4 col-form-label"> Enable Sliding Notifications </label>
                                <div className="col-md-8">
                                   <select name="enable_notifications" className="form-control">
                                      <option value="1"> Yes </option>
                                      <option value="0"> No </option>
                                   </select>
                                </div>
                             </div>
                             <button type="submit" name="update_sound" className="btn btn-success mt-1 float-right">
                             Update Changes  </button>
                          </form>
                          <hr />
                          <h5 className="mb-4"> Change Password </h5>
                          <form method="post" className="clearfix mb-3">
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Enter Old Password </label>
                                <div className="col-md-8">
                                   <input type="text" name="old_pass" className="form-control" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Enter New Password </label>
                                <div className="col-md-8">
                                   <input type="text" name="new_pass" className="form-control" required="" />
                                </div>
                             </div>
                             <div className="form-group row">
                                <label className="col-md-4 col-form-label"> Confirm New Password </label>
                                <div className="col-md-8">
                                   <input type="text" name="new_pass_again" className="form-control" required="" />
                                </div>
                             </div>
                             <button type="submit" name="change_password" className="btn btn-success float-right">
                             Change Password  </button>
                          </form>
                          
                     </div>
                  </div>
                    
                 </div>
                 <div id="my_proposal" className="tab-pane fade">
                    <div className="card">
                     <div className="card-header">
                       <h2>My Proposal</h2>
                     </div>
                     <div className="card-body">
                       <div className="my_proposal_listing">
                          <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                    <img src="assets/images/postImg/img-03.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-02.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                             <div className="onePress-seller-tooltip">
                                Level Two       
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Create A Professional Custom Explainer Video</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>4.8</strong> (22)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;10.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over">
                    <img src="proposals/proposal_files/voice-over-1.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-03.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="shoail" className="seller-name">shoail</a>
                             <div className="onePress-seller-tooltip">
                                New Seller        
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="5" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Record Your Brazilian Portuguese Voice Over</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>5.0</strong> (7)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;10.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                    <img src="proposals/proposal_files/game-1.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-01.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="thili00traffi" className="seller-name">thili00traffi</a>
                             <div className="onePress-seller-tooltip">
                                New Seller        
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>4.0</strong> (4)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;20.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video">
                    <img src="assets/images/postImg/img-03.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-02.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="mir_digimarket" className="seller-name">mir_digimarket</a>
                             <div className="onePress-seller-tooltip">
                                Level Two       
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="4" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/mir_digimarket/i-will-create-a-professional-custom-explainer-video" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Create A Professional Custom Explainer Video</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>4.8</strong> (22)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;10.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over">
                    <img src="proposals/proposal_files/voice-over-1.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-03.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="shoail" className="seller-name">shoail</a>
                             <div className="onePress-seller-tooltip">
                                New Seller        
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="5" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/shoail/i-will-record-your-brazilian-portuguese-voice-over" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Record Your Brazilian Portuguese Voice Over</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>5.0</strong> (7)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;10.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
                 <div className="proposal-card-base mp-proposal-card">
                    {/* <!--- proposal-card-base mp-proposal-card Starts ---> */}
                    <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit">
                    <img src="proposals/proposal_files/game-1.jpg" className="img-fluid" />
                    </a>
                    <div className="proposal-card-caption">
                       {/* <!--- proposal-card-caption Starts ---> */}
                       <div className="proposal-seller-info">
                          {/* <!--- onePress-seller-info Starts ---> */}
                          <span className="fit-avatar s24">
                          <img src="images/userlisting/img-01.jpg" className="rounded-circle" width="32" height="32" />
                          </span>
                          <div className="seller-info-wrapper">
                             <a href="thili00traffi" className="seller-name">thili00traffi</a>
                             <div className="onePress-seller-tooltip">
                                New Seller        
                             </div>
                          </div>
                          <div className="favoriteIcon">
                             <i data-id="7" href="#" className="fa fa-heart proposal-favorite" data-toggle="tooltip" data-placement="top" title="Favorite"></i>
                          </div>
                       </div>
                       {/* <!--- onePress-seller-info Ends ---> */}
                       <a href="proposals/thili00traffi/i-will-develop-and-reskin-3d-and-2d-games-in-unit" className="proposal-link-main js-proposal-card-imp-data">
                          <h3>I Will Develop And Reskin 3d And 2d Games In Unity</h3>
                       </a>
                       <div className="rating-badges-container">
                          <span className="proposal-rating">
                          <i className="fa fa-star"></i>
                          <span>
                          <strong>4.0</strong> (4)
                          </span>
                          </span>
                       </div>
                    </div>
                    {/* <!--- proposal-card-caption Ends ---> */}
                    <footer className="proposal-card-footer">
                       {/* <!--- proposal-card-footer Starts ---> */}
                       <div className="proposal-price">
                          <a>
                          <small>STARTING AT</small>&#036;20.00     </a>
                       </div>
                    </footer>
                    {/* <!--- proposal-card-footer Ends ---> */}
                 </div>
                 {/* <!--- proposal-card-base mp-proposal-card Ends ---> */}        
              </div>
        
           </div>
  
                       </div> {/* <!-- my_proposal_listing --> */} 
                     </div>
                  </div>
               </div>
              </div>
           </div>
        </div>
     </div>
  </div>
  
  
  
  </div>
  


      </React.Fragment>
   );
}

export default Profile;