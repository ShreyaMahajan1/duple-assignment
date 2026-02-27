import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from './ApiServices';
import { ClipLoader } from 'react-spinners';

const AddEmployee = () => {
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeePassword, setNewEmployeePassword] = useState('');
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState('');
  const [newEmployeeContact, setNewEmployeeContact] = useState('');
  const [newEmployeeExperience, setNewEmployeeExperience] = useState('');
  const [newEmployeeJoindate, setNewEmployeeJoinDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [load,setload]=useState(false);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  const nav = useNavigate();
  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    if (
      newEmployeeName.trim() === '' ||
      newEmployeeEmail.trim() === '' ||
      newEmployeePassword.trim() === '' ||
      newEmployeeDesignation.trim() === '' ||
      newEmployeeContact.trim() === '' ||
      newEmployeeJoindate.trim() === ''   
    ) {
      toast.error('Please fill out all required fields for the employee.');
      return;
    }
    const formData = new FormData();
    formData.append('name', newEmployeeName);
    formData.append('email', newEmployeeEmail);
    formData.append('password', newEmployeePassword);
    formData.append('contact', newEmployeeContact);
    formData.append('experience', newEmployeeExperience);
    formData.append('jobtitle', newEmployeeDesignation);
    formData.append('joiningdate', newEmployeeJoindate);
    if (imageFile) {
      formData.append('picture', imageFile);
    }
    var token = sessionStorage.getItem("token")
    // console.log("token is",token)
    ApiServices.AddEmployee(formData,{headers:{authorization:token}})
      .then((res) => {
        console.log(res);
        if(res.data.success ==true){
          toast.success(res.data.message);
          setload(true);
          setTimeout(() => {
            nav("/admin/manage-employee");
          }, 2000);
          setNewEmployeeContact('')
          setNewEmployeeEmail('')
          setNewEmployeeName('')
          setNewEmployeeDesignation('')
          setNewEmployeeExperience('')
          setNewEmployeePassword('')
          setNewEmployeeJoinDate('')
        }
        else{
          toast.error(res.data.message);
        }
        
        // nav("/")
        
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        toast.error('Error adding employee. Please try again.');
      });
      setload(false);
  };
 
  const changeImg = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageName(file.name);
  };
  function emailvali(){
    console.log("onblur event called");
    // var email = value;
    // console.log(email);
    var spanerr =document.getElementById("errmsg");
    var email = newEmployeeEmail;
    // console.log(email);
    var patt =/^[A-Za-z0-9\-\_]+\@+[A-Za-z0-9]+\.+[A-Za-z]{2,3}$/;
    if(!patt.test(email)){
        console.log("invalid email");
        // spanerr.innerHTML ="Invalid Email";
        toast.error("Invalid Email Pattern");
        return false;
        // document.getElementById("btns").disabled = true;
    }
    else{
        console.log("valid");
        return true;
        // document.getElementById("errmsg").innerHTML ="";
        // spanerr.innerHTML ="";
        // document.getElementById("btns").disabled = false;
    }
}
function contactvalidate(){
  var contact = newEmployeeContact;
  var patt =/^[6-9]{1}[0-9]{9}$/;
  if(!patt.test(contact)){
      toast.error("Invalid Contact");
      return false;
  }
  else{
   return true;
  }
}
  return (
    <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Employee</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Employee</a>
              </li>
              <li className="breadcrumb-item active">Add Employee</li>
            </ol>
          </nav>
        </div>
        <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 ofset-lg-1">
            <form className="add-employee-form bg-light rounded p-4 shadow">
              <h3 className="mb-4 mt-2">Add New Employee</h3>
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
                onBlur={emailvali}
                value={newEmployeeEmail}
                onChange={(e) => setNewEmployeeEmail(e.target.value)}
              />
              {/* <span id="errmsg" className='m-5'></span> */}
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Employee Password"
                value={newEmployeePassword}
                onChange={(e) => setNewEmployeePassword(e.target.value)}
              />
              <label>Contact</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Employee Contact"
                onBlur={contactvalidate}
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

              <button className="btn btn-primary btn-block rounded w-100 py-2 px-2 mt-2" type='submit' onClick={handleAddEmployee}>
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
};

export default AddEmployee;
