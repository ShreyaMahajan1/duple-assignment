import React from 'react';
import ApiServices, { BASE_URL } from '../Admin/ApiServices';
import { useEffect } from 'react';
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
import { Toast } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

export default function Profile() {
  var [profile, setProfile] = useState('');
  
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeePassword, setNewEmployeePassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState('');
  const [newEmployeeContact, setNewEmployeeContact] = useState('');
  const [newEmployeeExperience, setNewEmployeeExperience] = useState('');
  const [newEmployeeJoindate, setNewEmployeeJoinDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const nav = useNavigate();
  const [load,setLoad]=useState(true)
  const obj={
    display:"block",
    margin:"0 auto"
  }

  useEffect(() => {
    let emptoken = sessionStorage.getItem('Emptoken');
    let id = sessionStorage.getItem('employeeId');
    let data = {
      _id: id,
    };
    ApiServices.getSingleEmp(data, { headers: { authorization: emptoken } }).then((res) => {
      console.log(res.data);
      setProfile(res.data.data);
      setLoad(false);
      setNewEmployeeName(res.data.data.name);
      setNewEmployeeContact(res.data.data.contact);
      setNewEmployeeEmail(res.data.data.email);
      setNewEmployeeExperience(res.data.data.experience);
      setNewEmployeeJoinDate(res.data.data.joiningdate);
      setNewEmployeeDesignation(res.data.data.jobtitle);
      // Do not set image file here
      // setImageFile(res.data.data.picture);
    });
  }, []);

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    if (
      newEmployeeName.trim() === '' ||
      newEmployeeEmail.trim() === '' ||
      newEmployeeDesignation.trim() === '' ||
      newEmployeeContact.trim() === '' ||
      newEmployeeJoindate.trim() === ''
    ) {
      toast.error('Please fill out all required fields for the employee.');
      return;
    }
    const formData = new FormData();
    formData.append('_id', sessionStorage.getItem('employeeId'));
    formData.append('name', newEmployeeName);
    formData.append('email', newEmployeeEmail);
    formData.append('contact', newEmployeeContact);
    formData.append('experience', newEmployeeExperience);
    formData.append('jobtitle', newEmployeeDesignation);
    formData.append('joiningdate', newEmployeeJoindate);

    // Check if there's a new image selected
    if (imageFile) {
      formData.append('picture', imageFile);
    } else {
      // If no new image selected, send the old image
      formData.append('picture', profile.picture);
    }

    var token = sessionStorage.getItem('Emptoken');
    console.log('token is', token);
    ApiServices.UpdateProfileEmp(formData, { Headers: { authorization: token } })
      .then((res) => {
        console.log(res);
        toast.success("Profile Updated");
        // nav("/")
      })
      .catch((error) => {
        console.error('Error Updating employee:', error);
        toast.error('Error adding employee. Please try again.');
      });
  };
  const changepassword = (e) => {
    e.preventDefault();
    if (confirmpassword != newEmployeePassword) {
      console.log("false");
      toast.warning("please re-enter again password")
    }
    else {
      console.log("true");
      let data = {
        _id: sessionStorage.getItem("userId"),
        currentpassword: oldpassword,
        newpassword: newEmployeePassword
      }
      var token = sessionStorage.getItem('Emptoken');
      ApiServices.changepassword(data, { Headers: { authorization: token } })
        .then((res) => {
          if(res.data.success == true){
          console.log("change updated", res);
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        else{
          toast.error(res.data.message);
        }
        })
        .catch(err => {
          console.log(err);
          toast.warning("something went wrong");
          // toast.warning(res.message);
        })
    }

  }
  const changeImg = (e) => {
    // e.preventDefault(); 
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
  };


  return (
    <>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <ToastContainer />
            <div className="col-xl-4">

              {profile && (
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img
                      src={BASE_URL + profile?.picture}
                      alt="Profile"
                      className="rounded-circle"
                    />
                    <h2>{profile?.name}</h2>
                    <h3>{profile?.email}</h3>
                    <div className="social-links mt-2">
                      <a href="#" className="twitter">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="#" className="facebook">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="#" className="instagram">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="#" className="linkedin">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              )}


            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    {/* <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li> */}
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >

                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">Full Name</div>
                        <div className="col-lg-9 col-md-8">{profile?.name}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Contact</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.contact}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job</div>
                        <div className="col-lg-9 col-md-8">{profile?.jobtitle}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Joining Date</div>
                        <div className="col-lg-9 col-md-8"><Moment  format="YYYY/MM/DD">{profile?.joiningdate}</Moment></div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job Title</div>
                        <div className="col-lg-9 col-md-8">
                          {profile.jobtitle}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}

                      <form className="add-employee-form bg-light rounded p-4 shadow" onSubmit={handleUpdateEmployee}>


                        <label>Employee Name</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Employee Name"
                          value={newEmployeeName}
                          onChange={(e) => setNewEmployeeName(e.target.value)}
                        />
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control mb-3"
                          placeholder="Employee Email"
                          value={newEmployeeEmail}
                          onChange={(e) => setNewEmployeeEmail(e.target.value)}
                        />
                        <label>Contact</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Employee Contact"
                          value={newEmployeeContact}
                          onChange={(e) => setNewEmployeeContact(e.target.value)}
                        />
                        <label>Experience</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Employee Experience"
                          value={newEmployeeExperience}
                          onChange={(e) => setNewEmployeeExperience(e.target.value)}
                        />

                        <label>Designation</label>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Employee Designation"
                          value={newEmployeeDesignation}
                          onChange={(e) => setNewEmployeeDesignation(e.target.value)}
                        />
                        <label className='form-label'> Update Image </label>
                        <input type="file" onChange={changeImg} /><br />
                        <button className="btn btn-primary btn-block rounded w-100 py-2 px-2 mt-2" >
                          Update
                        </button>
                      </form>

                      {/* End Profile Edit Form */}
                    </div>
                    <div className="tab-pane fade pt-3" id="profile-settings">
                      {/* Settings Form */}
                      <form>
                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email Notifications
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="changesMade"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="changesMade"
                              >
                                Changes made to your account
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="newProducts"
                                defaultChecked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="newProducts"
                              >
                                Information on new products and services
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="proOffers"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="proOffers"
                              >
                                Marketing and promo offers
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="securityNotify"
                                defaultChecked=""
                                disabled=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="securityNotify"
                              >
                                Security alerts
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                      {/* End settings Form */}
                    </div>
                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    >
                      <ToastContainer />
                      {/* Change Password Form */}
                      <form onSubmit={changepassword}>
                        <div className="row mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="currentPassword"
                              value={oldpassword}
                              onChange={(e) => {
                                setoldpassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="newPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="newpassword"
                              type="password"
                              className="form-control"
                              id="newPassword"
                              value={newEmployeePassword}
                              onChange={(e) => {
                                setNewEmployeePassword(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="renewPassword"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="renewpassword"
                              type="password"
                              className="form-control"
                              id="renewPassword"
                              value={confirmpassword}
                              onChange={(e) => {
                                setconfirmpassword(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </form>
                      {/* End Change Password Form */}
                    </div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* End #main */}


    </>
  )
}