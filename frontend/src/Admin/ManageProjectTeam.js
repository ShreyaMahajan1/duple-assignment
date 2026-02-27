import React, { useEffect, useState } from 'react';
import ApiServices, { BASE_URL } from './ApiServices';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ManageProjectTeam = () => {
  const [initialProjectTeam, setInitialProjectTeam] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false)
  const [editingId, setEditingId] = useState(null);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [allEmployees,setAllEmployees]=useState([])
  const [selectedMember, setSelectedMember] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    var token = sessionStorage.getItem("token")
    ApiServices.getEmployee(null, { headers: { authorization: token } })
      .then(res => {
        // console.log(res.data.data);
        // setAvailableEmployees(res.data.data);
        setAllEmployees(res.data.data)
      })
      .catch(error => {
        console.error('Error fetching available employees:', error);
        // toast.error('Error fetching available employees. Please try again.');
      });
  }, []);
  useEffect(() => {
    ApiServices.GetProjectTeam(null, { headers: { authorization: sessionStorage.getItem("token") } })
      .then((res) => {
        setInitialProjectTeam(res.data.data);
        console.log(res.data.data);
        setLoading(false);
        if(!!editingId){
          ApiServices.GetProjectTeamSingle({_id:editingId}, { headers: { authorization: sessionStorage.getItem("token") } })
          .then((result)=>{
            let allSelectedEmployees=result.data.data.employees
            const availableEmp = allEmployees.filter(employee => !allSelectedEmployees.includes(employee._id));
            console.log(availableEmp);
            setAvailableEmployees(availableEmp)
          })
          .catch((error) => {
            console.error('Error fetching project team:', error);
            // Handle error and display a message
          });
          
        }
       
      })
      .catch((error) => {
        console.error('Error fetching project team:', error);
        setLoading(false);
        // Handle error and display a message
      });
  }, [isUpdate]);
  const [newTeam, setNewTeam] = useState([]);
  useEffect(() => {
    if (!!editingId) {
      let data = {
        _id: editingId
      }
      ApiServices.GetProjectTeamSingle(data).then((res) => {
        if (res.data.success) {
          setNewTeam(res.data.data.employees)
          setIsUpdate(true)
        }
        else {
          toast.error(res.data.data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    setIsUpdate(false)
  }, [editingId])
  const handleEdit = (id, newTeam1) => {
    setEditingId(id);
  };
  const handleAddTeamMember = (e) => {
    e.preventDefault()
    setNewTeam([...newTeam, selectedMember]);
    let array=availableEmployees.filter((el)=>{
      if(el._id!=selectedMember){
        return el
      }
    })
    setAvailableEmployees(array)
    // Clear the selected member
    setSelectedMember('');
  };
  const getMemberName = (id) => {
    let member = allEmployees.filter((x) => {
      if( x._id == id){
        console.log(x);
        return x
      }
     })
    return member[0]?.name
  }
 
  const handleRemoveTeamMember = (index) => {
    const updatedMembers = [...newTeam];
    let data=updatedMembers.splice(index, 1);
    // console.log(data[0]);
    // console.log(availableEmployees);
    let employeeData=allEmployees.filter((el,index)=>{
      if(el._id==data[0]){
        return el
      }
    })
    console.log(employeeData);
    setAvailableEmployees([...availableEmployees, ...employeeData])
    
    setNewTeam(updatedMembers);
  };
  const handleSave = (_id) => {
    const data = {
      _id: editingId,
      employees: newTeam
    };
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    else {
      ApiServices.UpdateProjectTeam(data, { headers: { authorization: token } })
        .then((res) => {
          console.log(res.data);
          if(res.data.success == true){
            toast.success(res.data.message)
            window.location.reload();
          }
          else{
            toast.warning(res.data.message);
          }
        })
        .catch((err) => {
          console.error('Error updating category:', err);
        });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };
  const handleDelete = (_id) => {
    let confirmation = window.confirm("Are You Sure to Delete a project Team?")
    if (confirmation) {
      let data = {
        _id: _id
      }
      // console.log("data del team", data);
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      else {
        ApiServices.DeleteProjectTeam(data, { headers: { authorization: token } })
          .then((res) => {
            // console.log(res.data.message);
            // console.log("after deleted", res.data.data);
            toast.success(res.data.message);
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          })
          .catch((err) => {
            toast.warning("Something went wrong");
            console.error('Error deleting category:', err);
          });
      }
    }
  };
  return (
    <>
      {loading && (
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
          <ClipLoader loading={loading} size={100} color="#0891b2" />
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
      <div className="container">
        <h1> Project Team</h1>
        <div className="card mt-2">
          <div className="card-body mt-4">
            <div className='row'>
            {initialProjectTeam?.map(member => (
              <div className='col-md-6'>
              <div key={member.id} className="form-check">
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
                        {Array.isArray(member?.employees) && member.employees?.length > 0 && (
                          <ul>
                            {member.employees?.map(employee => (
                            <li key={employee.id}>{employee.name}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className='col-md-6 '>
                        <img className='w-50 border-1' style=
                        {{height:"100px"}} src={BASE_URL + member.projectId.attachment} /> <br />
                        <span className='fw-bold ps-1 mt-3'>Description:{member?.projectId?.description}</span> <br />
                        <button className='btn btn-sm btn-success ms-4 mt-1' onClick={() =>
                          handleEdit(member._id, member.employees)}>Edit Team</button>
                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(member._id)}>Delete Team</button>
                      </div>
                    </div>
                  </div>
                {/* </label> */}
              </div>
              </div>
            ))}
          </div>
          </div>
        </div>
        {/* <button type="button" className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button> */}
      </div>

      {editingId !== null && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Team</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancel}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddTeamMember}>
                <div className="form-group">
                  {/* <h1>{editingId}</h1> */}
                  <select
                  required
                    className="form-select my-2"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    <option value="" disabled selected>Select a member</option>
                    {availableEmployees?.map((employee, index) => (
                      <option key={index} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary mb-3 w-100" >
                  Edit Team Member
                </button>
                </form>
                <h5>Team Members</h5>

                <ul className="list-group">
                  {newTeam?.map((member, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {getMemberName(member)}
                      <button className="btn btn-primary btn-sm w-50" onClick={() => handleRemoveTeamMember(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            </div>
            
          </div>
        </div>
      )}
    </main >
    </>
  );
};

export default ManageProjectTeam;
