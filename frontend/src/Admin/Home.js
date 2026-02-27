
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiServices from './ApiServices';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';


export default function Home() {
  var[totalEmp,settotalEmp]=useState('');
  var[tasks,settasks]=useState('');
  var[totalprojects,setporojects]=useState('')
  const [load,setload]=useState(true);
  let obj = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999
  }
  useEffect(()=>{
    ApiServices.Dashboard(null,{headers:{authorization:sessionStorage.getItem("token")}})
    .then((res)=>{
      console.log(res);
      setload(false);
      setporojects(res.data.totalprojects)
      settasks(res.data.totaltasks)
      settotalEmp(res.data.totalUsers)
    })
  },[])
  return (


    <>
      
      <ToastContainer/>
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
        <div className="pagetitle">
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
            <div className="col-lg-8">
              <div className="row"> {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                   
                    <div className="card-body">
                      <h5 className="card-title">
                        Total Employees<span></span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people" />
                        </div>
                        <div className="ps-3">
                          <h6>{totalEmp}</h6>
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
                        Total Tasks<span></span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-graph-up" />
                        </div>
                        <div className="ps-3">
                          <h6>{tasks}</h6>
                          
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
                        Total Projects <span></span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart" />
                        </div>
                        <div className="ps-3">
                          <h6>{totalprojects}</h6> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sales Card */}
                
               
                {/* Reports */}
                <div className="col-12">
                  <div className="card">
                    
                 
                  </div>
                </div>
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
      {/* End #main */}
      
     
    </>
  )
}