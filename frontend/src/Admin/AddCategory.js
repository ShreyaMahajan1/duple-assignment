import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from './ApiServices';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';

        
const AddCategory = () => {
  const [load,setload]=useState(false);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  const [newCategoryName, setNewCategoryName] = useState('');
  const [redirectToManageCategory, setRedirectToManageCategory] = useState(false);
  // const [token,settoken]=useState('');
  const nav = useNavigate();
  const handleAddCategory = (e) => {
    e.preventDefault()
    if (newCategoryName === '') {
      toast.error('Please enter a valid category name.');
      return;
    }
    var token = sessionStorage.getItem("token");
    console.log(token);
    let data ={ name: newCategoryName }
    ApiServices.addCategory(data,{headers: { authorization:token}})
      .then((res) => {
        console.log(res);
        if (res.data.success === true){
          toast.success("Category added successfully");
          setload(true);
          setTimeout(() => {
            
            nav("/admin/manage-category");
          }, 3000);
        } else{
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.error("Error adding category:", err);
        toast.error("Failed to add category. Please try again later.");
      });
      setload(false);
  };

 

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Add Category</h1>
        
      
        
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Category</a>
            </li>
            <li className="breadcrumb-item active">Add Category</li>
          </ol>
        </nav>
      </div>
      <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
      <div className='container mt-5'>
        <div className="row justify-content-center">
          <div className="col-lg-10 offset-lg-1 ">
            <form className="add-category-form rounded p-4 bg-lightgrey shadow border" style={{ marginTop: '100px', marginLeft: '100px' }}>
              <h3 className=" mb-3 mt-2">Add New Category</h3>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control w-100 py-3 px-3 mb-3 border rounded"
                  placeholder="Category Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-block rounded w-100 py-3 px-3 mt-2" onClick={handleAddCategory}>
                Add Category
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
};

export default AddCategory;
