import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ApiServices, { BASE_URL } from './ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { ClipLoader } from 'react-spinners';

const ManageEmployee = () => {
  
  const [isUpdate,setIsUpdate]=useState(false)  
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeId, setNewEmployeeID] = useState('');
  const [newEmployeePassword, setNewEmployeePassword] = useState('');
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState('');
  const [newEmployeeContact, setNewEmployeeContact] = useState('');
  const [newEmployeeExperience, setNewEmployeeExperience] = useState('');
  const [newEmployeeJoindate, setNewEmployeeJoinDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [load,setload]=useState(true);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  const handleEdit = (employeeId) => {
    console.log(employeeId);
    setEditingEmployee(employeeId);
  };
  useEffect(()=>{
    var token = sessionStorage.getItem("token")
    ApiServices.getEmployee(null,{headers : {authorization:token}})
    .then(res =>{
      console.log(res);
      setload(false);
      setEmployees(res.data.data)
    })
  },[isUpdate])
  
  useEffect(()=>{
    if (!!editingEmployee) {
      // console.log("editing emploee",editingEmployee);
      let data = {
        _id:editingEmployee, // Use 'userId' property here
      };
      let token = sessionStorage.getItem("token");
      ApiServices.getsingleEmployee(data, { headers: { authorization: token } })
        .then((res) => {
          console.log("single user", res);
          setEditingEmployee(res.data.data.userId)
          setNewEmployeeName(res.data.data.name);
          setNewEmployeeEmail(res.data.data.email);
          setNewEmployeeContact(res.data.data.contact);
          setNewEmployeeExperience(res.data.data.experience);
          setNewEmployeeDesignation(res.data.data.jobtitle);
          setImageFile(res.data.data.picture);
          const originalDate = res.data.data.joiningdate;
          const formattedDate = new Date(originalDate).toISOString().split('T')[0];
          console.log("date is ",formattedDate); 
          setNewEmployeeJoinDate(formattedDate);
          // setNewName()
          setIsUpdate(true);

        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdate(false)
  },[editingEmployee])

  const changeImg = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
  };
  const handleSave = () => {

    const formData = new FormData();
      // const formattedJoinDate = new Date(newEmployeeJoindate).toISOString().split('T')[0];
          // formData.append('joiningdate', formattedJoinDate);
    formData.append('_id',editingEmployee)
    formData.append('name', newEmployeeName);
    formData.append('email', newEmployeeEmail);
    formData.append('contact', newEmployeeContact);
    formData.append('experience', newEmployeeExperience);
    formData.append('jobtitle', newEmployeeDesignation);
    formData.append('joiningdate', newEmployeeJoindate);
    if (imageFile) {
      formData.append('picture', imageFile);
    }
    var token = sessionStorage.getItem("token")
    console.log("token is",token)
    ApiServices.ManageEmployee(formData,{headers:{authorization:token}})
    .then(res =>{
      if(res.data.success == true){

      
      console.log(res);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    else{
      toast.error(res.data.message);
    }
    })
    .catch((err)=>{
      console.log(err);
        toast.danger("Something went wrong");
    })
    // setEmployees(updatedEmployees);
    setEditingEmployee(null);
    clearFormData();
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    clearFormData();
  };

  const clearFormData = () => {
    setEditingEmployee('');
    setNewEmployeeContact('');
    setNewEmployeeName('');
    setNewEmployeeJoinDate('');
    setNewEmployeeDesignation('');
    setNewEmployeeExperience('');
    setNewEmployeeJoinDate('');

    // setNewPassword('');
    // setNewDepartment('');
    // setNewDesignation('');
    // setNewProfileImage('');
  };

  const handleDelete = (id, status) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    else{
      let data = {
        _id:id,
        status:status
      }
      ApiServices.EmployeeDelete(data,{headers:{authorization:token}})
      .then((res)=>{
        toast.success(res.data.message);
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }).catch((err)=>{
        toast.error("Something went wrong try again later")
      })
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manage Employee</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Employee</a>
            </li>
            <li className="breadcrumb-item active">Manage Employee</li>
          </ol>
        </nav>
      </div>
      <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 mt-5">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Employee</th>
                  <th>Coins</th>
                  <th>Experience</th>
                  <th>Job Title</th>
                  <th>Joining Date</th>
                  <th className="text-nowrap">Profile Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((employee,index) => (
                  <tr key={employee.id}>
                    <td>{index+1}</td>
                    <td>
                      <i className='bi bi-person'></i>{employee.name} <br/>
                      <i className='bi bi-envelop'></i> {employee.email} <br/>
                      <i className='bi bi-phone'></i> {employee.contact} 
                    </td>
                    <td><b>{employee.coins}</b></td>
                    <td>{employee.experience}</td>
                    <td>{employee.jobtitle}</td>
                    {/* <td>{employee.userId}</td> */}
                    
                    <td>{new Date(employee.joiningdate ).toISOString().split('T')[0]}</td>
                    {/* <td>{employee.userId}</td> */}
                    <td><img src={BASE_URL+employee?.picture} alt={employee.name} style={{ maxWidth: '100px' }} /></td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => handleEdit(employee._id)}><FontAwesomeIcon icon={faEdit} /></button>
                        {employee?.status == true? <button className="btn btn-danger"  onClick={() => handleDelete(employee.userId, "false")}>Block</button>: <button className="btn btn-success" onClick={() => handleDelete(employee.userId, "true")}>Unblock</button>} 
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* Modal for editing employee */}
      {editingEmployee && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee: {editingEmployee.name}</h5> {/* Display employee name */}
                <button type="button" className="close" onClick={handleCancel}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form className="add-employee-form bg-light rounded p-4 shadow">
              <h3 className="mb-4 mt-2">Update Employee</h3>
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
              <label>Joining Date</label>
              <input
                type="date"
                className="form-control mb-3"
                placeholder="Joining Date"
                value={newEmployeeJoindate}
                onChange={(e) => setNewEmployeeJoinDate(e.target.value)}
              />
              <label>Image</label>
              <input
                  type="file"
                  className="form-control mb-3"
                  onChange={changeImg}
                />

              {/* <button className="btn btn-primary btn-block rounded w-100 py-2 px-2 mt-2" onClick={handleEdit}>
                Edit Employee
              </button> */}
            </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageEmployee;
