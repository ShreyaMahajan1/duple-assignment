import './App.css';
import './styles/responsive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import Master from './layout/Master';
import UserMaster from './layout/UserMaster';

// Landing Page
import LandingPage from './pages/LandingPage';

// Admin Components
import Login from './Admin/Login';
import Home from './Admin/Home';
import Userprofile from './Admin/Userprofile';
import AddCategory from './Admin/AddCategory';
import ManageCategory from './Admin/ManageCategory';
import AddSubcategory from './Admin/AddSubcategory';
import ManageSubcategory from './Admin/ManageSubCategory';
import AddEmployee from './Admin/AddEmployee';
import ManageEmployee from './Admin/ManageEmployee';
import AddProject from './Admin/AddProject';
import ManageProject from './Admin/ManageProject';
import ProjectView from './Admin/ProjectView';
import AddProjectTeam from './Admin/AddProjectTeam';
import ManageProjectTeam from './Admin/ManageProjectTeam';
import AddTask from './Admin/AddTask';
import ManageTask from './Admin/ManageTask';
import TaskView from './Admin/TaskView';
import SubCategory from './Admin/SubcategoryAll';
import UpdateSubCategory from './Admin/UpdateSubcategory';
import CombinedComponent from './Admin/DailyProgress';
import SignOut from './Admin/Signout';
import ManageBoard from './Admin/ManageBoard';
import KanbanView from './Admin/KanbanView';

// User Components
import UserLogin from './User/Userlogin';
import UserHome from './User/UserHome';
import Div from './User/Div';
import Profile from './User/Profile';
import Faq from './User/Faq';
import Contact from './User/Contact';
import ViewProject from './User/Viewproject';
import ViewTask from './User/ViewTask';
import ViewProjectTeam from './User/TeamView';
import TaskUpload from './User/UploadTask';
import UserCoinDisplay from './User/UserCoinDisplay';

// Error
import Error from './Admin/Error';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page - First page users see */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Login Pages */}
            <Route path="/admin-login" element={<Login />} />
            <Route path="/user-login" element={<UserLogin />} />
            
            <Route path="/*" element={<Error />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Master />}>
              <Route path="home" element={<Home />} />
              <Route path="userprofile" element={<Userprofile />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-subcategory" element={<AddSubcategory />} />
              <Route path="manage-subcategory" element={<ManageSubcategory />} />
              <Route path="manage-category" element={<ManageCategory />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route path="manage-employee" element={<ManageEmployee />} />
              <Route path="add-project" element={<AddProject />} />
              <Route path="manage-project" element={<ManageProject />} />
              <Route path="view-project" element={<ProjectView />} />
              <Route path="add-project-team" element={<AddProjectTeam />} />
              <Route path="manage-project-team" element={<ManageProjectTeam />} />
              <Route path="add-task" element={<AddTask />} />
              <Route path="manage-task" element={<ManageTask />} />
              <Route path="task-view" element={<TaskView />} />
              <Route path="subcategory" element={<SubCategory />} />
              <Route path="update-subcategory/:id" element={<UpdateSubCategory />} />
              <Route path="daily-progress" element={<CombinedComponent />} />
              <Route path="manage-board" element={<ManageBoard />} />
              <Route path="kanban-view" element={<KanbanView />} />
              <Route path="signout" element={<SignOut />} />
            </Route>

            {/* User Routes */}
            <Route path="/user" element={<UserMaster />}>
              <Route path="div" element={<Div />} />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<UserHome />} />
              <Route path="faq" element={<Faq />} />
              <Route path="contact" element={<Contact />} />
              <Route path="view-project" element={<ViewProject />} />
              <Route path="view-task" element={<ViewTask />} />
              <Route path="view-project-team" element={<ViewProjectTeam />} />
              <Route path="signout" element={<SignOut />} />
              <Route path="upload-task" element={<TaskUpload />} />
              <Route path="reward-system" element={<UserCoinDisplay />} />
              <Route path="kanban-view" element={<KanbanView />} />
            </Route>
          </Routes>
        </BrowserRouter>
        
        <ToastContainer
          position="bottom-right"
          autoClose={1998}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
