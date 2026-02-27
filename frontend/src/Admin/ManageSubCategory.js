import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ManageCategory.css';
import ApiServices from './ApiServices';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
const ManageSubcategory = () => {
  const [load,setload]=useState(true);
  let obj = {
    margin:"0 auto",
    display:"block"
  }
  useEffect(() => {
    ApiServices.getSubCategory()
      .then((res) => {
        setload(false)
        console.log("all category data", res.data.data);
        setSubcategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const [subcategories, setSubcategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isUpdate,setIsUpdate]=useState(false)
  const nav = useNavigate();

  useEffect(() => {
    ApiServices.getCategory()
      .then((res) => {
        console.log("category is",res.data.data);
        setCategories(res.data.data); // Set categories state with all categories from the category model
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, [isUpdate]);

  useEffect(() => {
    if(!!editingId){
      let data = { _id: editingId };
      ApiServices.getSingleSubCategory(data)
        .then((res) => {
          console.log("vc",res);
          setNewName(res.data.data.name);
          setSelectedCategory(res.data.categoryId._id); // Set the default selected category to the one associated with the subcategory being edited
          setIsUpdate(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdate(false);
  }, [editingId]);

  const handleEdit = (id, name, category) => {
    setEditingId(id);
    setNewName(name);
    setSelectedCategory(category);
  };

  const handleSave = () => {
    // setCategoryName(selectedCategory);
    const data = {
      _id: editingId,
      name: newName,
      categoryId: selectedCategory // Use the new category if selected, else use the existing category
    };
    var token = sessionStorage.getItem("token");
    console.log(token);
    ApiServices.updateSubCategory(data,{headers:{authorization:sessionStorage.getItem("token")}})
      .then((res) => {
        // console.log("after updation", res);
        // setload(true);
        toast.success("Subcategory Updated");
        setTimeout(()=> {
          nav('/admin/manage-subcategory');
          window.location.reload();
          setIsUpdate(true);
        }, 2000);
        // Update subcategories state to reflect changes
        // setSubcategories((prevSubcategories) =>
        //   prevSubcategories.map((subcategory) =>
        //     subcategory._id === editingId ? { ...subcategory, name: newName, category: newCategory || selectedCategory } : subcategory
        //   )
        // );
        setEditingId(null);
      })
      .catch((err) => {
        console.error('Error updating subcategory:', err);
      });
      setload(false);
    };
    
  const handleDelete = (id) => {
    let token = sessionStorage.getItem("token");
    let data = {
      _id:id
    }
    let confirmation = window.confirm("Are you sure to delete?")
    if (confirmation) {
      ApiServices.deleteSubcategory(data,{headers:{authorization:token}})
        .then((res) => {
          // Remove deleted subcategory from subcategories state
          toast.success(res.data.message);
          setload(true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          console.log('Subcategory deleted',res);
        })
        .catch((err) => {
          console.error('Error deleting subcategory:', err);
          toast.warning("Something went wrong");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    }
      setload(false);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewName('');
    setCategoryName('');
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Manage Subcategory</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Subcategory</a>
            </li>
            <li className="breadcrumb-item active">Manage Subcategory</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <ToastContainer/>
      <ClipLoader loading={load}  size={100} cssOverride={obj}/>
      <div className={load && "display-screen"}>
        <div className="row justify-content-center">
          <div className="col-lg-12 mt-5">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Sr. No</th>
                    <th>Category </th>
                    <th>Subcategory</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories?.map((subcategory, index) => (
                    <tr key={subcategory._id}>
                      <td>{index + 1}</td>
                      <td>{subcategory.categoryId ? subcategory.categoryId.name : 'Unknown Category'}</td>  {/* Render the category name instead of the object */}
                      <td>
                        {editingId === subcategory._id ? (
                          <input
                            type="text"
                            value={newName}
                            onChange={handleNameChange}
                            className="form-control"
                          />
                        ) : (
                          subcategory.name
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(subcategory._id,)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(subcategory._id,subcategory.name,subcategory.categoryId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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
      </div>
      {editingId !== null && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Subcategory</h5>
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
                  <label htmlFor="subcategoryName" className="mb-1">Category Name:{selectedCategory}</label>
                  <select
                    value={selectedCategory} // Set the value to the selected category or the old category if no changes were made
                    onChange={(e) => setSelectedCategory(e.target.value)} // Handle change event to update selected category
                    className="form-control"
                  >
                    {/* Render default selected category */}
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}


                    {/* Render other categories as options */}
                    {/* {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))} */}
                  </select>
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="subcategoryName" className="mb-1">Subcategory Name:</label>
                  <input
                    type="text"
                    id="subcategoryName"
                    value={newName}
                    onChange={handleNameChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSave(editingId)}
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

export default ManageSubcategory;
