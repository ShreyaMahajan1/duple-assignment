import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from './ApiServices';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
const AddProject = () => {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [NewClient, setNewClient] = useState('');
  const [newProjectTechnology, setNewProjectTechnology] = useState('');
  const [projectImage, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [load,setload]=useState(false);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  const nav = useNavigate();
  const handleAddProject = () => {
    if (
      newProjectName.trim() === '' ||
      newProjectDescription.trim() === '' ||
      NewClient.trim() === '' ||
      newProjectTechnology.trim() === ''
    ) {
      toast.error('Please fill out all required fields for the project.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', newProjectName);
    formData.append('description', newProjectDescription);
    formData.append('client', NewClient);
    formData.append('technology', newProjectTechnology);
    if (!!projectImage) {
      formData.append('attachment', projectImage);
    }
    var token = sessionStorage.getItem('token');
  
    ApiServices.addProject(formData, { headers: { authorization: token } })
      .then((res) => {
        console.log(res);
        setload(true);
        setTimeout(() => {
          nav("/admin/manage-project");
        }, 2000);
        toast.success('Project added successfully.');
        setNewProjectName("")
        setNewProjectDescription("")
        setNewClient("")
        setNewProjectTechnology("")
        setImage("")
        // Optionally, you can redirect the user to another page upon successful project addition
      })
      .catch((err) => {
        console.error('Error adding project:', err);
        toast.error('Failed to add project. Please try again later.');
      });
      setload(false)
  };
  
  const changeImg = (e) => {
    console.log("Image changed", e.target.files[0]);
    setImage(e.target.files[0]);
  };
  

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Add Project</h1>
      </div>
      <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="add-employee-form bg-light rounded p-4 shadow">
              <h3 className="mb-4 mt-2">Add New Project</h3>
              <label>Project Name</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <label>Project Description</label>
              <textarea
                className="form-control mb-3"
                placeholder="Project Description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
              <label>Image</label>
             <input
                type="file"
                className="form-control mb-3"
                onChange={changeImg}
              />
              <label>Client</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Client"
                value={NewClient}
                onChange={(e) => setNewClient(e.target.value)}
              />
              <label>Technology</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Technology Used"
                value={newProjectTechnology}
                onChange={(e) => setNewProjectTechnology(e.target.value)}
              />
              <button className="btn btn-primary btn-block rounded w-100 py-2 mt-2" onClick={handleAddProject}>
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default AddProject;
