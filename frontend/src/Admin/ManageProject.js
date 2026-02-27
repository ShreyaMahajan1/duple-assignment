import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ApiServices, { BASE_URL } from './ApiServices';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import { ToastContainer, toast } from 'react-toastify';
const ManageProject = () => {
  const [load,setload]=useState(true);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  // const initialProjects = [
  //   { id: 1, name: 'Project 1', description: 'Description 1', duration: '2 months', startDate: '2022-01-01', technology: 'React', team: ['John Doe', 'Jane Smith'] },
  //   { id: 2, name: 'Project 2', description: 'Description 2', duration: '3 months', startDate: '2022-02-01', technology: 'Node.js', team: ['Bob Johnson', 'Alice Brown'] },
  //   { id: 3, name: 'Project 3', description: 'Description 3', duration: '1 month', startDate: '2022-03-01', technology: 'Python', team: ['Eve Green', 'Charlie Black'] }
  // ];
  useEffect(()=>{
    var token = sessionStorage.getItem('token');
    // console.log(token);
    ApiServices.getAllprojects(null,{headers:{authorization:token}})
    .then(res =>{
      console.log(res);
      setProjects(res.data.data);
      setload(false);
    })
  },[])

  const [projects, setProjects] = useState([]);
  const [isUpdate,setIsUpdate]=useState(false) 
  const [editingProject, setEditingProject] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [selectedProjectTeam, setSelectedProjectTeam] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [NewClient, setNewClient] = useState('');
  const [newProjectTechnology, setNewProjectTechnology] = useState('');
  const [projectImage, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleEdit = (project) => {
    setEditingProject(project);
    // console.log(project);
   
  };
  useEffect(()=>{
    if (!!editingProject) {
      // console.log("editing emploee",editingEmployee);
      let data = {
        _id:editingProject, // Use 'userId' property here
      };
      let token = sessionStorage.getItem("token");
      ApiServices.getsingleproject(data, { headers: { authorization: token } })
        .then((res) => {
        
          console.log("single user", res);
          setNewClient(res.data.data.client);
          setNewProjectTechnology(res.data.data.technology);
          setNewProjectName(res.data.data.name);
          setNewProjectDescription(res.data.data.description);
          setIsUpdate(true);
          setload(false);
          setImage(res.data.data.attachment);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdate(false)
  },[editingProject])
  const changeImg = (e) => {
    console.log("Image changed", e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleSave = () => {
    const formData = new FormData();
    formData.append('_id',editingProject);
    formData.append('name', newProjectName);
    formData.append('description', newProjectDescription);
    formData.append('client', NewClient);
    formData.append('technology', newProjectTechnology);
    if (!!projectImage) {
      formData.append('attachment', projectImage);
    }
    var token = sessionStorage.getItem('token');
    ApiServices.UpdateProject(formData, { headers: { authorization: token } })
    .then((res) => {
      console.log("updated ",res);
      toast.success('Project Updated');
      setload(true)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // Optionally, you can redirect the user to another page upon successful project addition
    })
    .catch((err) => {
      console.error('Error adding project:', err);
      toast.error('Failed to add project. Please try again later.');
    });
    setEditingProject(null);
    clearFormData();
    setload(false);
  };

  const handleCancel = () => {
    setEditingProject(null);
    clearFormData();
  };

  const clearFormData = () => {
    setNewName('');
    setNewDescription('');
    setNewDuration('');
    setNewStartDate('');
    setNewTechnology('');
  };

  const handleDelete = (id) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    else{
      let confirmation = window.confirm("Are you sure to delete?")
      if (confirmation) {
        let data = {
        _id:id,
      }
        ApiServices.deleteCategory(data,{headers:{authorization:token}})
        ApiServices.DeleteProject(data,{headers:{authorization:token}})
      .then((res)=>{
        toast.success(res.data.message);
        console.log(res.data.message);
        setload(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        console.log(res);
      })
      .catch(err =>{
        toast.error("Something went wrong");
      })
      setload(false);
    }
  }
  };

  const handleViewTeam = (team) => {
    setSelectedProjectTeam(team);
    setTeamModalVisible(true);
  };

  const handleCloseTeamModal = () => {
    setTeamModalVisible(false);
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manage Project</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Project</a>
            </li>
      <ToastContainer/>
            <li className="breadcrumb-item active">Manage project</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 mt-5">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Attachment</th>
                  <th>Client</th>
                  <th>Technology</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects?.map((project,index) => (
                  <tr key={project.id}>
                    <td>{index+1}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td><img src={BASE_URL+project.attachment} className='img-fluid ' style={{width:'100px'}}></img></td>
                    <td>{project.client}</td>
                    <td>{project.technology}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEdit(project._id)}><FontAwesomeIcon icon={faEdit} /></button>
                      <button className="btn btn-primary" onClick={() => handleDelete(project._id)}><FontAwesomeIcon icon={faTrash} /></button>
                      {/* <button className="btn btn-primary" onClick={() => handleViewTeam(project.team)}><FontAwesomeIcon icon={faEye} /></button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      {editingProject && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Project</h5>
                <button type="button" className="close" onClick={handleCancel}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
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
              <label>Technologhy</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Technology Used"
                value={newProjectTechnology}
                onChange={(e) => setNewProjectTechnology(e.target.value)}
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
      {teamModalVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', padding: 5}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Project Team</h5>
                <button type="button" className="close" onClick={handleCloseTeamModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  {selectedProjectTeam.map((teamMember, index) => (
                    <li key={index}>{teamMember}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseTeamModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageProject;
