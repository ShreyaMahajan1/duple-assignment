import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {

  const token=sessionStorage.getItem("token")
  const nav=useNavigate()
  const sidebarRef = useRef(null);

  const logout=()=>{
    sessionStorage.clear()
    toast.success("Logout successfully")
    setTimeout(() => {
      nav("/");
    }, 1000);
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = sidebarRef.current;
      const toggleButton = document.querySelector('.toggle-sidebar-btn');
      const header = document.querySelector('#header');
      
      // Check if click is outside sidebar and not on toggle button or header
      if (sidebar && !sidebar.contains(event.target) && 
          toggleButton && !toggleButton.contains(event.target) &&
          header && !header.contains(event.target)) {
        // Close sidebar by adding toggle-sidebar class to body
        document.body.classList.add('toggle-sidebar');
      }
    };

    // Add both mouse and touch events for better mobile support
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
   

<>
 
 
 
 {/* ======= Sidebar ======= */}
 <aside id="sidebar" className="sidebar" ref={sidebarRef}>
 <ul className="sidebar-nav" id="sidebar-nav">
   <li className="nav-item">
    
     <Link className="nav-link collapsed" to="home">
       <i className="bi bi-grid" />
       <span>Dashboard</span>
     </Link>
   </li>
   {/* End Dashboard Nav */}
   
       <li className="nav-item">
     <Link
       className="nav-link collapsed" to="add-category"
       data-bs-target="#category-nav"
       data-bs-toggle="collapse"
       
     >
       <i className="bi bi-journal-text" />
       <span>Category</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="category-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="add-category">
           <i className="bi bi-circle" />
           <span>Add Category</span>
          
         </Link>
       </li>
       <li>
         <Link to="manage-category">
           <i className="bi bi-circle" />
           <span>Manage Category</span>
         </Link>
       </li>
       
       
     </ul>
   </li>
   {/* End Category Nav */}


   
   <li className="nav-item">
     <Link
       className="nav-link collapsed"
       data-bs-target="#forms-nav"
       data-bs-toggle="collapse"
       to="subcategory"
     >
       <i className="bi bi-folder" />
       <span>SubCategory</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="forms-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="add-subcategory">
           <i className="bi bi-circle" />
           <span>Add SubCategory</span>
         </Link>
       </li>
       <li>
         <Link to="manage-subcategory">
           <i className="bi bi-circle" />
           <span>Manage SubCategory </span>
         </Link>
       </li>
       
       
     </ul>
   </li>
   {/* End subcategory Nav */}
   <li className="nav-item">
     <Link
       className="nav-link collapsed"
       data-bs-target="#tables-nav"
       data-bs-toggle="collapse"
       to="add-employee"
     >
       <i className="bi bi-person-badge" />
       <span>Employee</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="tables-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="add-employee">
           <i className="bi bi-circle" />
           <span>Add Employee</span>
         </Link>
       </li>
       <li>
         <Link to="manage-employee">
           <i className="bi bi-circle" />
           <span>Manage Employee</span>
         </Link>
       </li>
     </ul>
   </li>
   {/* End employee Nav */}
   <li className="nav-item">
     <Link
       className="nav-link collapsed"
       data-bs-target="#project-nav"
       data-bs-toggle="collapse"
       to="add-project"
     >
       <i className="bi bi-graph-up" />
       <span>Project</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="project-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="add-project">
           <i className="bi bi-circle" />
           <span>Add Project</span>
         </Link>
       </li>
       <li>
         <Link to="manage-project">
           <i className="bi bi-circle" />
           <span>Manage Project</span>
         </Link>
       </li>
      
     </ul>
   </li>
   {/* End employee Nav */}
   <li className="nav-item">
     <Link
       className="nav-link collapsed"
       data-bs-target="#projectteam-nav"
       data-bs-toggle="collapse"
       to="add-project-team"
     >
       <i className="bi bi-person-lines-fill" />
       <span>Project Team</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="projectteam-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="add-project-team">
           <i className="bi bi-circle" />
           <span>Add Project Team</span>
         </Link>
       </li>
       <li>
         <Link to="manage-project-team">
           <i className="bi bi-circle" />
           <span>Manage Project Team</span>
         </Link>
       </li>
     </ul>
   </li>

   
   {/* Board Management - NEW */}
   <li className="nav-item">
     <Link
       className="nav-link collapsed" to="manage-board"
       data-bs-target="#board-nav"
       data-bs-toggle="collapse"
     >
       <i className="bi bi-kanban" />
       <span>Board</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="board-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="manage-board">
           <i className="bi bi-circle" />
           <span>Manage Boards</span>
         </Link>
       </li>
       <li>
         <Link to="kanban-view">
           <i className="bi bi-circle" />
           <span>🎯 Kanban View (NEW!)</span>
         </Link>
       </li>
     </ul>
   </li>
   {/* End Board Nav */}

   <li className="nav-item">
     <Link
       className="nav-link collapsed" to="add-task"
       data-bs-target="#task-nav"
       data-bs-toggle="collapse"
       
     >
       <i className="bi bi-card-checklist" />
       <span>Task</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="task-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       
       <li>
         <Link to="add-task">
           <i className="bi bi-circle" />
           <span>Add Task</span>
         </Link>
       </li> 
       <li>
         <Link to="manage-task">
           <i className="bi bi-circle" />
           <span>Manage Task</span>
         </Link>
       </li>  
     </ul>
   </li>
   <li className="nav-item">
     <Link
       className="nav-link collapsed" to="daily-progress"
       data-bs-target="#Progress-nav"
       data-bs-toggle="collapse"
       
     >
       <i className="bi bi-calendar-check" />
       <span>Daily Progress</span>
       <i className="bi bi-chevron-down ms-auto" />
     </Link>
     <ul
       id="Progress-nav"
       className="nav-content collapse "
       data-bs-parent="#sidebar-nav"
     >
       <li>
         <Link to="daily-progress">
           <i className="bi bi-circle" />
           <span>View Progress</span>
          
         </Link>
       </li>
       </ul>
       </li>
   
   
   <li className="nav-item">
     <Link className="nav-link " to="userprofile">
       <i className="bi bi-person" />
       <span>Profile</span>
     </Link>
   </li>
   
   {/* End Contact Page Nav */}
   <li className="nav-item @@contact__active">
              {!token?
              <Link className="nav-link" to="/admin-login">
                Login
              </Link>  :
                <Link className="nav-link" onClick={logout}>
                Logout
              </Link>
            }
             
            </li>





   
   {/* End Login Page Nav */}
   
 </ul>
</aside>
{/* End Sidebar*/}
</>
  );
}