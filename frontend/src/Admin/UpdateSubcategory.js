import React, { useEffect, useState } from "react";
import ApiServices, { BASE_URL } from "./ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateSubCategory() {
  const param = useParams();
  const id = param.id;
  
  const [name, setName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [previousImage, setPreviousImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    let data = {
      _id: id
    };
    ApiServices.singleSubCategory(data)
      .then((res) => {
        console.log(res);
        setName(res.data.data.name);
        setPreviousImage(res.data.data.image);
        setCategoryId(res.data.data.categoryId._id); // Set categoryId from the API response
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const changeImage = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("_id", id);
    data.append("name", name);
    data.append("subcategory_image", image);
    data.append("categoryId", categoryId);
    ApiServices.updateSubCategory(data)
      .then((res) => {
        toast.success(res.data.message);
        nav("/admin/subcategory");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update subcategory.");
      });
  };

  return (
    <>
      <main id="main" className="main">
        <div className="container">
          <h1>Update Subcategory</h1>
          <img
            src={BASE_URL + previousImage}
            alt="Previous Subcategory Image"
            style={{ height: "100px", width: "100px" }}
          />
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" value={imageName} onChange={changeImage} />
            </div>
            <div className="form-group">
              <label>Category ID</label>
              <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </main>
    </>
  );
}
