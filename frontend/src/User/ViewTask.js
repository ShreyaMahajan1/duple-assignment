import React, { useState, useEffect } from 'react';
import ApiServices, { BASE_URL } from '../Admin/ApiServices';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
import { ClipLoader } from 'react-spinners';
const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [load,setLoad]=useState(true)
  const empEmail = sessionStorage.getItem('Empemail');
  // console.log(empEmail);
  const obj={
    display:"block",
    margin:"0 auto"
  }
  useEffect(() => {
    ApiServices.gettasks(null, sessionStorage.getItem("Emptoken"))
      .then((res) => {
        // console.log(res.data.data);
        setLoad(false);
        const filteredTasks = res.data.data.filter(task => task.employeeId && task.employeeId.email === empEmail);
        setTasks(filteredTasks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [empEmail]);

  const handleProgress = (_id, selectedProgress) => {
    var data = {
      _id: _id,
      progress: selectedProgress
    }
    ApiServices.updateProgress(data)
      .then((res) => {
        toast.success("Task updated");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
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
        <h1>Manage Task</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Task</a>
            </li>
            <li className="breadcrumb-item active">Manage Task</li>
          </ol>
        </nav>
      </div>
      <div className='container'>
        <div className="task-view">
          <h2>Task View</h2>
          <div>
                <ToastContainer/>
            <div className="table-responsive">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Project</th>
                  <th>Attachment</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Task Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.projectId ? task.projectId.name : 'N/A'}</td>
                    <td>
                      <img src={`${BASE_URL}${task.attachment}`} className='img-fluid' width={"100px"} alt={`Attachment for task ${task.title}`} />
                    </td>
                    <td>{task.description}</td>
                    <td><Moment format="YYYY/MM/DD">{task.deadline}</Moment></td>
                    <td>{task.progress}</td>
                    <td>
                      <div className='row'>
                        { task.progress== "Pending"?
                        <div className='col-md-12'>
                          <button className='btn btn-sm btn-primary' onClick={() => handleProgress(task._id, 'Working')}>Working</button>
                        </div>
                        : task.progress=="Working" ?
                        <div className='col-md-12'>
                          <button className='btn btn-sm btn-success' onClick={() => handleProgress(task._id, 'Complete')}>Complete</button>
                        </div>
                        :
                          <span></span>
                        }
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
    </main>
    </>
  );
};

export default ViewTask;
