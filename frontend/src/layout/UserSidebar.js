import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {

  const token=sessionStorage.getItem("token")
  const Emptoken=sessionStorage.getItem("Emptoken")
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
    
     <Link className="nav-link collapsed" to="dashboard">
       <i className="bi bi-grid" />
       <span>Dashboard</span>
     </Link>
   </li>
   {/* End Dashboard Nav */}
   
      
   <li className="nav-item">
     <Link
       className="nav-link collapsed"
       data-bs-target="#project-nav"
       data-bs-toggle="collapse"
       to="view-project"
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
         <Link to="view-project">
           <i className="bi bi-circle" />
           <span>View Project</span>
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
       to="view-project-team"
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
         <Link to="view-project-team">
           <i className="bi bi-circle" />
           <span>View Project Team</span>
         </Link>
       </li>
     </ul>
   </li>

   
   <li className="nav-item">
     <Link
       className="nav-link collapsed" to="view-task"
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
         <Link to="view-task">
           <i className="bi bi-circle" />
           <span>View Task</span>
         </Link>
       </li> 
       <li>
         <Link to="kanban-view">
           <i className="bi bi-circle" />
           <span>🎯 Kanban Board (NEW!)</span>
         </Link>
       </li>
     </ul>
   </li>
   
   <li className="nav-item">
     <Link
       className="nav-link collapsed" to="reward-system"
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
         <Link to="reward-system">
           <i className="bi bi-circle" />
           <span>View Progress</span>
          
         </Link>
       </li>
       </ul>
       </li>
   
   
   <li className="nav-item">
     <Link className="nav-link " to="profile">
       <i className="bi bi-person" />
       <span>Profile</span>
     </Link>
   </li>
   {/* End Profile Page Nav */}
   {/* <li className="nav-item">
     <Link className="nav-link collapsed" to="/User/Faq">
       <i className="bi bi-question-circle" />
       <span>F.A.Q</span>
     </Link>
   </li> */}
   {/* End F.A.Q Page Nav */}
   {/* <li className="nav-item">
     <Link className="nav-link collapsed" to="/User/Contact">
       <i className="bi bi-envelope" />
       <span>Contact</span>
     </Link>
   </li> */}
   {/* End Contact Page Nav */}
   <li className="nav-item @@contact__active">
              {!token && !Emptoken?
              <Link className="nav-link" to="/">
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