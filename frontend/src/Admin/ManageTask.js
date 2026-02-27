
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices, { BASE_URL } from './ApiServices';
import Moment from 'react-moment';
import { ClipLoader } from 'react-spinners';

const ManageTask = () => {
  const navigate = useNavigate();
  const[allprojects,setallprojects] = useState([])
  const[allemployees,setEmployeesss] =useState([])
  const[allsubcategories,setsubcategoriess] =useState([])
  const [isUpdate,setIsUpdate]=useState(false)
  const [editingTask, seteditingTask] = useState(null);
  const[tasks,setalltasks]=useState([])
  const [newProject, setProject] = useState('');
  const [newEmployee, setEmployee] = useState('');
  const [title, settitle] = useState('');
  const [description, setNewDescription] = useState('');
  const [deadline, setdeadline] = useState('');
  const [subcategory, setsubcategory] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  // const [newEmployeeJoindate, setNewEmployeeJoinDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const nav = useNavigate();
  const [load,setload]=useState(false);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  const changeImg = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
  };
  useEffect(()=>{
    setload(true);
    var token = sessionStorage.getItem("token")
    ApiServices.getAlllTasks(null,{headers : {authorization:token}})
    .then(res =>{
      console.log("all tasks",res);
      setalltasks(res.data.data);
      setload(false);
    })
    .catch(err => {
      console.error(err);
      setload(false);
    })
  },[isUpdate])
  useEffect(()=>{
    var token = sessionStorage.getItem("token");
    ApiServices.getAllprojects(null,{headers:{authorization:token}})
    .then((res)=>{
      console.log("all projects",res);
      setallprojects(res.data.data);
    })
    ApiServices.getEmployee(null,{headers:{authorization:token}})
    .then((res)=>{
      console.log("all Employess",res);
      setEmployeesss(res.data.data);
    })
    ApiServices.getSubCategory(null,{headers:{authorization:token}})
    .then((res)=>{
      console.log("all Subcategories",res);
      setsubcategoriess(res.data.data);
    })
  },[])
  useEffect(()=>{
    if (!!editingTask) {
      // console.log("editing emploee",editingEmployee);
      let data = {
        _id:editingTask, // Use 'userId' property here
      };
      let token = sessionStorage.getItem("token");
      ApiServices.getSingleTask(data, { headers: { authorization: token } })
        .then((res) => {
        
          console.log("single task", res);
          setProject(res.data.data.projectId)
          setEmployee(res.data.data.employeeId)
          settitle(res.data.data.title)
          setNewDescription(res.data.data.description)
          setdeadline(res.data.data.deadline)
          setsubcategory(res.data.data.subcategoryId)
          setTaskStatus(res.data.data.progress || 'Pending')
          setImageFile(res.data.data.attachment)
          // setNewEmployeeName(res.data.data.name);
          // setNewEmployeeEmail(res.data.data.email);
          // setNewEmployeeContact(res.data.data.contact);
          // setNewEmployeeExperience(res.data.data.experience);
          // setNewEmployeeDesignation(res.data.data.jobtitle);
          // setImageFile(res.data.data.picture);
          const originalDate = res.data.data.deadline;
          const formattedDate = new Date(originalDate).toISOString().split('T')[0];
          console.log("date is ",formattedDate); 
          setdeadline(formattedDate);
          // setNewName()
          setIsUpdate(true);

        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdate(false)
  },[editingTask])

  const handleEdit = (task) => {
    seteditingTask(task);

  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('_id',editingTask)
    formData.append('projectId', newProject);
    formData.append('employeeId', newEmployee);
    formData.append('subcategoryId', subcategory);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deadline',deadline);
    formData.append('progress', taskStatus);
    // formData.append('joiningdate', newEmployeeJoindate);
    if (imageFile) {
      formData.append('attachment', imageFile);
    }

  var token = sessionStorage.getItem("token")
  console.log("token is",token)
  ApiServices.UpdateTaskk(formData,{headers:{authorization:token}})
  .then(res =>{
    if(res.data.success == true){
      console.log(res);
      toast.success(res.data.message);
      window.location.reload();
      setload(true);
    }
    else{
      toast.error(res.data.message);
    }
    
  

  })
  .catch((err)=>{
    console.log(err);
      toast.danger("Something went wrong");
  })
    // setTasks(updatedTasks);
    seteditingTask(null);
    clearFormData();
    setload(false);
  };

  const handleCancel = () => {
    seteditingTask(null);
    clearFormData();
  };

  const clearFormData = () => {
    // setNewTitle('');
    // setNewDescription('');
    // setNewPriority('Low');
    // setNewDueDate('');
  };

  const handleDelete = (id) => {
    // setTasks(tasks.filter(task => task.id !== id));
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    else{
      let data = {
        _id:id,
        // status:"false",
      }
      ApiServices.DeleteTaskk(data,{headers:{authorization:token}})
      .then((res)=>{
        console.log(res.data.message);
        toast.success("task deleted");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log(res);
      })
      .catch(err =>{
        toast.error("Something went wrong");
      })
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manage Task</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Manage Task</a>
            </li>
            <li className="breadcrumb-item active">Manage Task</li>
          </ol>
        </nav>
      </div>
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
      <ToastContainer/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 mt-5">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Employee</th>
                  <th>Subcategory</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th className="text-nowrap">Attachment</th>
                  {/* <th>Attachment</th> */}
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((employee,index) => (
                  <tr key={employee.id}>
                    <td>{index+1}</td>
                    <td>{employee.projectId ? employee.projectId.name:"N/A" }</td>
                    <td>{employee.employeeId ? employee.employeeId.name:"N/A" }</td>
                    <td>{employee.subcategoryId ? employee.subcategoryId.name:"N/A" }</td>
                    <td>{employee.title}</td>
                    <td>{employee.description}</td>
                    <td><img src={BASE_URL+employee.attachment} alt={employee.name} style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                    <td><Moment format="YYYY/MM/DD">{employee.deadline}</Moment></td>
                    {/* <td>{employee.userId}</td> */}
                    <td>{employee.progress}</td>
                   
                    {/* <td>{employee.userId}</td> */}
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => handleEdit(employee._id)}><FontAwesomeIcon icon={faEdit} /></button>
                        <button className="btn btn-primary" onClick={() => handleDelete(employee._id)}><FontAwesomeIcon icon={faTrash} /></button>
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
  
      {/* Modal for editing employee */}
      {editingTask && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title">Edit Employee: {editingEmployee.name}</h5> Display employee name */}
                <button type="button" className="close" onClick={handleCancel}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form className="add-employee-form bg-light rounded p-4 shadow">
              <h3 className="mb-4 mt-2">Manage Task</h3>
              <label>Select Employee</label>
              <select value={newEmployee} className='form-control'
                onChange={(e) => setEmployee(e.target.value)}>
                  <option>select employee</option>
                  {
                      allemployees?.map((project)=>(
                        <>
                        <option value={project._id}>{project.name}</option>
                        </>
                      ))
                  }
              </select>
             
               <label>Select Project</label>
               <select value={newProject} className='form-control'
                onChange={(e) => setProject(e.target.value)}>
                  
                  <option disabled={true} selected>select Project</option>
                  {
                      allprojects.map((project)=>(
                        <>
                        <option value={project._id}>{project.name}</option>
                        </>
                      ))
                  }
              </select>
              <label>Title</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Task Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <label>Deadline</label>
              <input
                type="date"
                className="form-control mb-3"
                placeholder="Deadline"
                value={deadline}
                onChange={(e) => setdeadline(e.target.value)}
              />
            
              <label>Select Subcategory</label>
              <select value={subcategory} className='form-control'
                onChange={(e) => setsubcategory(e.target.value)}>
                  <option>select Subcategory</option>
                  {
                      allsubcategories?.map((project)=>(
                        <>
                        <option value={project._id}>{project.name}</option>
                        </>
                      ))
                  }
              </select>
              <label>Task Status</label>
              <select value={taskStatus} className='form-control mb-3'
                onChange={(e) => setTaskStatus(e.target.value)}>
                  <option value="Pending">Pending (To Do)</option>
                  <option value="Working">Working (In Progress)</option>
                  <option value="Complete">Complete (Done)</option>
              </select>
              <label>Image</label>
              <input
                  type="file"
                  className="form-control mb-3"
                  onChange={changeImg}
                />
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

export default ManageTask;
