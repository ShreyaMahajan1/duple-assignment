import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from './ApiServices';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

const AddTask = () => {
  const navigate = useNavigate();
  const [allprojects, setAllProjects] = useState([]);
  const [allboards, setAllBoards] = useState([]);
  const [allemployees, setEmployees] = useState([]);
  const [allsubcategories, setSubcategories] = useState([]);
  const [newProject, setProject] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [newEmployee, setEmployee] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subcategory, setSubcategory] = useState('');
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

  useEffect(() => {
    var token = sessionStorage.getItem("token");
    ApiServices.getAllprojects(null, { headers: { authorization: token } })
      .then((res) => {
        console.log("all projects", res);
        setAllProjects(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching all projects:', error);
      });
    ApiServices.getSubCategory(null, { headers: { authorization: token } })
      .then((res) => {
        console.log("all subcategories", res);
        setSubcategories(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching all subcategories:', error);
        // toast.error('Error fetching all subcategories. Please try again.');
      });
  }, []);
  const handleProjec = (e)=>{
    const projectId = e.target.value;
    setProject(projectId);
    console.log("event callled");
    
    // Fetch project teams
    ApiServices.GetProjectTeam()
    .then((res)=>{
        console.log(res);
        let resdata = res.data.data;
        let filterdata = resdata.filter((x)=>{return x.projectId._id == projectId});
        console.log("filterdata is ",filterdata);
        setEmployees(filterdata)
    })
    .catch((err)=>{
          console.log(err);
    })
    
    // Fetch boards for selected project
    var token = sessionStorage.getItem("token");
    fetch('http://localhost:5000/admin/board/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify({ projectId: projectId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAllBoards(data.data);
      }
    })
    .catch(err => console.error(err));
  }
  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (
      newProject.trim() === '' ||
      newEmployee.trim() === '' ||
      title.trim() === '' ||
      description.trim() === '' ||
      deadline.trim() === ''
    ) {
      // console.log("proj"+newProject, "emp" + newEmployee, title, description, deadline);
      toast.error('Please fill out all required fields.');
      return;
    }
    
    const formData = new FormData();
    formData.append('projectId', newProject);
    formData.append('employeeId', newEmployee);
    formData.append('subcategoryId', subcategory);
    if (selectedBoard) {
      formData.append('boardId', selectedBoard);
    }
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deadline', deadline);
    if (imageFile) {
      formData.append('attachment', imageFile);
    }
    var token = sessionStorage.getItem("token");
    ApiServices.addTask(formData, { headers: { authorization: token } })
      .then((res) => {
        console.log(res);
        setload(true)
        toast.success(res.data.message);
        setTimeout(() => {
          nav('/admin/manage-task');
        }, 2000);
        setProject("")
        setEmployee("")
        setSubcategory("")
        setTitle("")
        setDescription()
        setDeadline("")
        setImageFile("")

        // nav("/")
      })
      .catch((error) => {
        console.error('Error adding task:', error);
        toast.error('Error adding task. Please try again.');
      });
      setload(false);
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Task</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Add Task</li>
            </ol>
          </nav>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
        <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 ofset-lg-1">
              <form className="add-employee-form bg-light rounded p-4 shadow">
                <h3 className="mb-4 mt-2">Add New Task</h3>
                
                <label>Select Project</label>
                <select
                  value={newProject}
                  className='form-control mb-3'
                  onChange={handleProjec}
                >
                  <option disabled={true} selected value="">select Project</option>
                  {allprojects.length > 0 && allprojects.map((project, i) => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
                
                <label>Select Employee</label>
                <select
                  value={newEmployee}
                  className='form-control mb-3'
                  onChange={(e) => setEmployee(e.target.value)}>
                  <option disabled={true} selected value="">Select Employee</option>
                  {
                    allemployees.map((member)=>(
                      <>
                        {Array.isArray(member.employees) && member.employees.length > 0 && (
                          <>
                            {member.employees?.map(employee => (
                              <option key={employee._id} value={employee._id}>{employee.name}</option>
                            ))}
                          </>
                        )}
                      </>
                    ))
                  }
                </select>

                <label>Select Board (Optional)</label>
                <select
                  value={selectedBoard}
                  className='form-control mb-3'
                  onChange={(e) => setSelectedBoard(e.target.value)}>
                  <option value="">No Board (General Tasks)</option>
                  {allboards.map((board) => (
                    <option key={board._id} value={board._id}>{board.name}</option>
                  ))}
                </select>

                <label>Title</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label>Deadline</label>
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="Deadline" min={moment().format("YYYY-MM-DD")}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />

                <label>Select Subcategory</label>
                <select
                  value={subcategory}
                  className='form-control'
                  onChange={(e) => setSubcategory(e.target.value)}>
                  <option>select Subcategory</option>
                  {allsubcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>{subcategory?.categoryId?.name} - {subcategory.name} </option>
                  ))}
                </select>

                <label>Image</label>
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={changeImg}
                />

                <button
                  className="btn btn-primary btn-block rounded w-100 py-2 px-2 mt-2"
                  type='submit'
                  onClick={handleAddEmployee}>
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default AddTask;
