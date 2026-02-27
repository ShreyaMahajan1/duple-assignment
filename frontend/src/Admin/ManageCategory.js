import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ApiServices from './ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isUpdate,setIsUpdate]=useState(false)
  const [load,setload]=useState(true);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  // const [isdeleted,setIsDeleted]=useState(false)
    useEffect(() => {
      ApiServices.getCategory()
        .then((res) => {
          console.log("all data",res);
          setCategories(res.data.data);
          setload(false);
        })
        .catch((err) => {
          console.error('Error fetching categories:', err);
        });
    }, [isUpdate]);
    const [newName, setNewName] = useState('');
    
    useEffect(()=>{
      if(!!editingId){
        let data={
          _id:editingId
        }
        ApiServices.getSingleCategory(data).then((res)=>{
            setNewName(res.data.data.name)
            setload(false);
            setIsUpdate(true)
        }).catch((err)=>{
          console.log(err);
        })
      }
      setIsUpdate(false)
    },[editingId])
    
    const handleEdit = (id, name) => {
      setEditingId(id);
      setNewName(name);
    };
  
    const handleSave = (_id) => {
      const data = {
        _id:editingId,
        name: newName 
      };
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
    else{      
      ApiServices.updateCategory(data,{headers:{authorization: token}})
        .then((res)=>{
          console.log(res.data);
          toast(res.data.message)
          setload(true);
          setEditingId(null);
          setNewName('');
        })
        .catch((err) => {
          console.error('Error updating category:', err);
        });
      }
      setload(false);
    };
  
    const handleCancel = () => {
      setEditingId(null);
      setNewName('');

    };
  
    const handleDelete = (_id) => {
      let data = {
        _id:_id
      } 
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
    else{   
      let confirmation = window.confirm("Are you sure to delete?")
      if (confirmation) {
      ApiServices.deleteCategory(data,{headers:{authorization:token}})
        .then((res)=> {
          console.log(res.data.message);
          console.log("after deleted",res.data.data);
          toast.success(res.data.message);
          setload(true);
          setTimeout(()=>{
            window.location.reload()
          },2000)
        })
        .catch((err) => {
          toast.warning("Something went wrong");
          console.error('Error deleting category:', err);
        });
      }
      setload(false);
    };
  
  }
    const handleNameChange = (event) => {
      setNewName(event.target.value);
    };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manage Category</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Category</a>
            </li>
            <li className="breadcrumb-item active">Manage Category</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 mt-5">
            <div>
            <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {editingId === category.id ? (
                          <input
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                            className="form-control"
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td>
                        {editingId === category._id ? (
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleSave(category.id)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="btn-group">
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleEdit(category._id)
                              }
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={()=> handleDelete(category._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {editingId !== null && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancel}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="form-group">
                {/* <h1>{editingId}</h1> */}
                
                  <label htmlFor="subcategoryName" className="mb-1">Category Name:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  className="form-control"
                />
                </div>
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
    </main>
  );
};

export default ManageCategory;
