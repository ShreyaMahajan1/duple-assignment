
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiServices from '../Admin/ApiServices';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Moment from 'react-moment';
import { Toast } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
export default function UserHome() {


  const [dashboardData, setDashboardData] = useState([]);
  const [load, setload] = useState(false);
  let obj = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999
  }
  useEffect(() => {
    let emptoken = sessionStorage.getItem('Emptoken');
    let id = sessionStorage.getItem('employeeId');
    let data = { _id: id }
    ApiServices.EmpDashboard(data, { headers: { authorization: emptoken } })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setDashboardData(res.data)
        }
        // else{
        //   toast.error(res.data.message)
        // } 

      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (

    <>
      <ToastContainer />
      {load && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <ClipLoader loading={load} size={100} color="#0891b2" />
        </div>
      )}
      <main id="main" className="main">
          <div className="pagetitle" >
            <h1>Dashboard</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </nav>
          </div>
          {/* End Page Title */}
          <section className="section dashboard">
            <div className="row">
              {/* Left side columns */}
              <div className="col-lg-12">
                <div className="row"> {/* Customers Card */}
                  <div className="col-xxl-4 col-xl-12">
                    <div className="card info-card customers-card">

                      <div className="card-body">
                        <h5 className="card-title">
                          Total Pending Tasks<span></span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-clock" />
                          </div>
                          <div className="ps-3">
                            <h6>{dashboardData?.totalpendingtasks}</h6>
                            {/* <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            decrease
                          </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Customers Card */}{/* Revenue Card */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card revenue-card">

                      <div className="card-body">
                        <h5 className="card-title">
                          Total Working Tasks<span></span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-graph-up" />
                          </div>
                          <div className="ps-3">
                            <h6>{dashboardData?.totalworkingtasks}</h6>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Revenue Card */}
                  {/* Sales Card */}
                  <div className="col-xxl-4 col-md-6">
                    <div className="card info-card sales-card">

                      <div className="card-body">
                        <h5 className="card-title">
                          Total Complete Projects <span></span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-check" />
                          </div>
                          <div className="ps-3">
                            <h6>{dashboardData?.totalcompletetasks}</h6>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Sales Card */}


                  {/* Reports */}
                  {/* <div className="col-12">
                    <div className="card">


                    </div>
                  </div> */}
                  {/* End Reports */}
                  {/* Recent Tasks */}

                  {/* End Recent Sales */}
                  {/* Top Selling */}

                  {/* End Top Selling */}
                </div>
              </div>
              {/* End Left side columns */}
              {/* Right side columns */}

              {/* End Right side columns */}
            </div>
          </section>
        </main>

      <main id="main" className="main">
        
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        
        {/* End Page Title */}
        <section className="section dashboard"> 
                <div className="col-12">
                  <div className="card top-selling overflow-auto">

                    <div className="card-body pb-5">
                      <h5 className="card-title">
                        Information
                      </h5>
                      <table className="table table-borderless">

                        <tbody>
                          <tr>
                            <th>Total Projects</th>
                            <th>{dashboardData?.totalprojects}</th>
                          </tr>
                          <tr>
                            <th>My Teams</th>
                            <th>{dashboardData?.totalprojectteams}</th>
                          </tr>
                          <tr>
                            <th>My Pending Tasks </th>
                            <th>{dashboardData?.totalpendingtasks}</th>
                          </tr>
                          <tr>
                            <th>My Working Tasks </th>
                            <th>{dashboardData?.totalworkingtasks}</th>
                          </tr>
                          <tr>
                            <th>My Complete Tasks </th>
                            <th>{dashboardData?.totalcompletetasks}</th>
                          </tr>
                          <tr>
                            <th>My Coins </th>
                            <th>{dashboardData?.coins}</th>
                          </tr>
                        </tbody>





                      </table>
                    </div>
                  </div>
                </div>
                
          
        </section>
      </main>
      {/* End #main */}


    </>
  )
}