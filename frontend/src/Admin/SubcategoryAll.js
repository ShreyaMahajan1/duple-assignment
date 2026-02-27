import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SubCategory() {
  const [data, setData] = useState([]);

  useEffect(() => {   
    axios
      .post("https://kizaapi.ksesystem.com/api/subcategory/all")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  }, []);

  const handleEdit = (index) => {
    // Handle edit action here
    console.log("Editing subcategory at index:", index);
  };

  return (
    <><main id="main" className="main">
      {/* Breadcrumb section */}
      <section className="w3l-breadcrumb">
        {/* Breadcrumb content */}
      </section>
      {/* Subcategory table */}
      <div className="container">
        <h1>Subcategories</h1>
        <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Category id</th>
              <th scope="col">Category Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((subcategory, index) => (
              <tr key={index} className="cursor-pointer" onClick={() => handleEdit(index)}>
                <th scope="row">{index + 1}</th>
                <td>{subcategory.name}</td>
                <td>
                  <img
                    src={"https://kizaapi.ksesystem.com/" + subcategory.image}
                    style={{ height: "100px", width: "100px" }}
                    alt={subcategory.name}
                  />
                </td>
                <td>
                            {subcategory._id}
                        </td>
                <td>{subcategory.categoryId?.name}</td>
                <td>
                <Link to={"/admin/update-subcategory/"+subcategory._id}className="btn btn-success">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div></main>
    </>
  );
}
