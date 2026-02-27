import React, { useState, useEffect } from 'react';
import ApiServices, { BASE_URL } from './ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CombinedComponent = () => {
  const [loading, setLoading] = useState(true);
  const [coinCount, setCoinCount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [warnings, setWarnings] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    ApiServices.getAdmintasks(null, token)
      .then((res) => {
        console.log(res);
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleProgress = (task) => {
    const data = {
      taskId: task._id,
      employeeId:task.employeeId._id,
      coinCount: coinCount,
      type: type,
      message: message,
    };
    var token = sessionStorage.getItem('token');
    ApiServices.coins(data, { headers: { authorization: token } })
    
      .then((res) => {

        console.log(res);
        toast.success(res.data.message);
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
      <div>
        <div className="pagetitle">
          <h1>Daily Progress Report</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Daily Progress</li>
            </ol>
          </nav>
        </div>
        <div>
          <ToastContainer/>
          <h2 className="mt-4 mb-3">Daily Progress</h2>
          {tasks && tasks.length > 0 ? (
            <div className="table-responsive">
            <table className='table table-bordered '>
              <thead className='table-dark'>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Project</th>
                  <th>Employee</th>
                  <th>Attachment</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Task Status</th>
                  <th>Give Reward or Warning</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.projectId ? task.projectId.name : 'N/A'}</td>
                    <td>{task.employeeId ? task.employeeId.name : 'N/A'}</td>
                    <td>
                      <img src={`${BASE_URL}${task.attachment}`} className='img-fluid' width={'100px'} alt={`Attachment for task ${task.title}`} />
                    </td>
                    <td>{task.description}</td>
                    {/* const originalDate = res.data.data.deadline;
          const formattedDate = ;
          console.log("date is ",formattedDate); 
          setdeadline(formattedDate); */}
                    <td>{new Date(task.deadline ).toISOString().split('T')[0]}</td>
                    <td>{task.progress}</td>
                    {/* <td>{userId}</td> */}
                    <td>
                      <div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleProgress(task);
                          }}
                        >
                          <div className='mb-2'>
                            <label className='form-label'>Coins to add/deduct:</label>
                            <input 
                              type='number' 
                              className='form-control' 
                              min={0} 
                              minLength={2} 
                              maxLength={2} 
                              onChange={(e) => setCoinCount(e.target.value)} 
                              required
                            />
                          </div>
                          <div className='mb-2'>
                            <label className='form-label'>Type:</label>
                            <select 
                              required 
                              onChange={(e) => setType(e.target.value)} 
                              className='form-select'
                            >
                              <option value='' disabled selected>Select type</option>
                              <option value='warning'>Warning</option>
                              <option value='add'>Reward</option>
                            </select>
                          </div>
                          <div className='mb-2'>
                            <label className='form-label'>Message:</label>
                            <textarea 
                              className='form-control' 
                              rows='2'
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            ></textarea>
                          </div>
                          <button className='btn btn-primary btn-sm w-100' type='submit'>
                            Send
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <p>No tasks available</p>
          )}
        </div>
        {/* Reward system */}
        <div></div>
      </div>
    </main>
    </>
  );
};

export default CombinedComponent;
