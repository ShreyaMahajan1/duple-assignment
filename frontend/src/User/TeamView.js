import React, { useState } from 'react';
import { useEffect } from 'react';
import ApiServices, { BASE_URL } from '../Admin/ApiServices';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ViewProjectTeam = () => {
  const [load,setload]=useState(true);
  const [initialProjectTeam, setInitialProjectTeam] = useState([]);

  // setInitialProjectTeam(res.data.data);

  useEffect(() => {
    const fetchProjects = () => {
      let emptoken = sessionStorage.getItem("Emptoken");
      ApiServices.GetProjectTeamforEmp({headers:{authorization:emptoken}})
      .then(res =>{
        console.log(res.data.data);
        let data = res.data.data;
        const filteredData = data.filter(item => item.employees.some(emp => emp._id === sessionStorage.getItem("employeeId")));
        console.log("filterdata",filteredData);
        setInitialProjectTeam(filteredData);
        setload(false);
      })
      .catch(err => {
        console.error(err);
        setload(false);
      });
    };

    fetchProjects();
  }, []);

  const handleCheckboxChange = (id) => {
    // Update checkbox state
  };

  const handleUpdate = () => {
    // Handle update logic
  };

  return (
    <>
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
        <h1>Project Teams</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Project</a>
            </li>
            <li className="breadcrumb-item active">All Project Team</li>
          </ol>
        </nav>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="container">
        <h1> Project Team</h1>
        <div className="card mt-2">
          <div className="card-body mt-4">
            {initialProjectTeam.map(member => (
              <div key={member.id} className="form-check">
                {/* <input
                <h1>{}</h1>
                  type="checkbox"
                  id={`member-${member.id}`}
                  checked={member.selected}
                  onChange={() => handleCheckboxChange(member.id)}
                  className={`form-check-input ${member.selected ? 'selected' : ''}`}
                /> */}
                {/* <label htmlFor={`member-${member.id}`}> */}
                <div className="card w-100">
                  <div className='row p-3'>
                    <div className='col-md-6'>
                      <span className="fw-bold">Project Name  :{member.projectId ? member.projectId.name : "N/A"}
                      </span> <br />
                      <span> Project Technology  :{member.projectId ? member.projectId.technology : "N/A"}
                      </span> <br />
                      <span>Project Client  :{member.projectId ? member.projectId.client : "N/A"}  <br />
                      </span>
                      {Array.isArray(member.employees) && member.employees.length > 0 && (
                        <ul>
                          {member.employees.map(employee => (
                            <li key={employee.id}>{employee.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <img className='w-50 border-1'style=
                        {{height:"200px"}} src={BASE_URL + member.projectId.attachment} /> <br />
                      <span className='fw-bold'>Description:{member?.projectId?.description}</span> <br />
                    </div>
                  </div>
                </div>
              </div>
              
            ))}
          </div>
        </div>
        {/* <button type="button" className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button> */}
      </div>
    </main>
    </>
  );
};
export default ViewProjectTeam;
