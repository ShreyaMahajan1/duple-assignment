import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from './ApiServices';
import { ClipLoader } from 'react-spinners';
const AddSubcategory = () => {
  const [load,setload]=useState(false);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  useEffect(()=>{
    ApiServices.getCategory()
    .then(res=>{
      console.log(res);
      setCategories(res.data.data)
    })
  },[])
  const [categories,setCategories]=useState([]);
  const[catId,setcatid]=useState([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  // const [redirectToManageSubcategory, setRedirectToManageSubcategory] = useState(false);
  
  const nav = useNavigate();
  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (newSubcategoryName.trim() === '') {
      toast.error('Please enter a valid subcategory name.');
      return;
    }
    let data ={ categoryId:catId,name: newSubcategoryName }
    var token = sessionStorage.getItem("token")
    console.log("token is ",token);

    ApiServices.Addsubcategory(data,{headers:{authorization:token}})
      .then((res) => {
        console.log(res);
        if (res.data.success === true){
          toast.success(res.data.message);
          setload(true)
          setTimeout(() => {
            nav('/admin/manage-subcategory');
          }, 2000);
          setNewSubcategoryName("")
          setcatid("")
        }
      })
      .catch((err) => {
        console.error("Error adding category:", err);
        toast.error("Failed to add category. Please try again later.");
      });
        setload(false)
    // Logic to add the subcategory
    console.log('Adding subcategory:', newSubcategoryName);
    // You can add your own logic here to add the subcategory to the backend or perform any other necessary operations

    // Set the flag to redirect to Manage Subcategory page
    // setRedirectToManageSubcategory(true);
  };


  return (
    
      <main id="main" className="main">
          <div className="pagetitle">
            <h1>Add Subcategory</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item active">Add Subcategory</li>
              </ol>
            </nav>
          </div>
          <div className='container mt-5'>
          <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
          <div className="row justify-content-center">
            <div className="col-lg-10 offset-lg-1 ">
              <form className="add-Subcategory-form rounded p-4 bg-lightgrey shadow border" style={{  marginTop: '100px', marginleft: '100px' }}>
              <h3 className=" mb-3 mt-2">Select Category</h3>
                <div className="mb-4">
                  <select className='form-control' value={catId} onChange={(e)=> setcatid(e.target.value)}>
                    <option >Select Category</option>
                    {
                      categories.map((el)=>(
                        <option value={el._id}>{el.name}</option>
                      ))
                    }
                  </select>
                </div>
                <h3 className=" mb-3 mt-2">Add New Subcategory</h3>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control w-100 py-3 px-3 mb-3 border rounded"
                    placeholder="Subcategory Name"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary btn-block rounded w-100 py-3 px-3 mt-2" onClick={handleAddSubcategory}>
                  Add Subcategory
                </button>
                {/* <h1>{catId}</h1> */}
              </form></div>
            </div>
            </div>
          </div>
        
      </main>
    );
  };
  
  export default AddSubcategory;
  