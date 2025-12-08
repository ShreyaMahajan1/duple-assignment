import axios from "axios";
// export const BASE_URL="https://kizaapi.ksesystem.com/"
import * as qs from "qs";
export const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/"
class ApiServices{
    getToken(){
        let obj={
            authorization:sessionStorage.getItem("token")
        }
        return obj
    }
    getEmpToken(){
        let obj={
            authorization:sessionStorage.getItem("Emptoken")
        }
        return obj
    }
   getSingleTask(data){
    return axios.post(BASE_URL+"admin/task/single",data,{headers:this.getToken()})
   }
    getProjects(){
        return axios.post(BASE_URL+"employee/project/all",null,{headers:this.getEmpToken()})
    }
    getAlllTasks(){
        return axios.post(BASE_URL+"admin/task/all",null,{headers:this.getToken()})
    }
    getLogin(data){
        return axios.post(BASE_URL+"admin/login",data)
    }
    gettasks(){
        return axios.post(BASE_URL+"employee/task/all",null,{headers:this.getEmpToken()})
    }
    getAdmintasks(){
        return axios.post(BASE_URL+"employee/task/all",null,{headers:this.getToken()})
    }
    getAllprojects(){
        return axios.post(BASE_URL+"admin/project/all",null,{headers:this.getToken()})
    }
    getAllTasks(){
        return axios.post(BASE_URL+"admin/project/all",null,{headers:this.getToken()})
    }
    getSingleEmp(data){
        return axios.post(BASE_URL+"employee/single",data,{headers:this.getEmpToken()})
    }
    UpdateProfileEmp(data){
        return axios.post(BASE_URL+"employee/profile/update",data,{headers:this.getEmpToken()})
    }
    getEmplogin(data){
        return axios.post(BASE_URL+"employee/login",data)
    }
    changepassword(data){
        return axios.post(BASE_URL+"employee/changepassword",data,{headers:this.getEmpToken()})
    }
    changepasswordadmin(data){
        return axios.post(BASE_URL+"admin/changepassword",data,{headers:this.getToken()})
    }
     
    addProject(data){
        return axios.post(BASE_URL+"admin/project/add",data,{headers:this.getToken()})
    }
    getCategory(){
        return axios.post(BASE_URL+"admin/category/all")
    }
    getSingleSubCategory(data){
        return axios.post(BASE_URL+"admin/subcategory/single",data)
    }
    getSingleCategory(data){
        return axios.post(BASE_URL+"admin/category/single",data)
    }
    updateCategory(data){
        return axios.post(BASE_URL+"admin/category/update",data,{headers:this.getToken()})
    }
    deleteCategory(data){
        return axios.post(BASE_URL+"admin/category/delete",data,{headers:this.getToken()})
    }
    Addsubcategory(data){
        return axios.post(BASE_URL+"admin/subcategory/add",data,{headers:this.getToken()})
    }
    AddEmployee(data){
        return axios.post(BASE_URL+"admin/employee/register",data,{headers:this.getToken()})
    }
    ManageEmployee(data){
        return axios.post(BASE_URL+"admin/employee/update",data,{headers:this.getToken()})
    }
    EmployeeDelete(data){
        return axios.post(BASE_URL+"admin/employee/status",qs.stringify(data),{headers:this.getToken()})
    }
    getEmployee(){
        return axios.post(BASE_URL+"admin/employee/all",null,{headers:this.getToken()})
    }
    deleteSubcategory(data){
        return axios.post(BASE_URL+"admin/subcategory/delete",data,{headers:this.getToken()})
    }
    coins(data){
        return axios.post(BASE_URL+"admin/coin/add",data,{headers:this.getToken()})
    }
    getsingleEmployee(data){
        return axios.post(BASE_URL+"admin/employee/single",data,{headers:this.getToken()})
    }
    AddProduct(data){
        return axios.post(BASE_URL+"api/product/add",data,{headers:this.getToken()})
    }
    getSubCategory(data){
        return axios.post(BASE_URL+"admin/subcategory/all",data)
    }
    singleSubCategory(data){
        return axios.post(BASE_URL+"api/subcategory/single",data)
    }
    updateProgress(data){
        return axios.post(BASE_URL+"employee/task/progress",data,{headers:this.getEmpToken()})
    }
    AllCoins(data){
        return axios.post(BASE_URL+"employee/coins/all",data,{headers:this.getEmpToken()})
    }
    updateSubCategory(data){
        return axios.post(BASE_URL+"admin/subcategory/update",data,{headers:this.getToken()})
    }   
    getsingleproject(data){
        return axios.post(BASE_URL+"admin/project/single",data,{headers:this.getToken()})
    }
    UpdateProject(data){
        return axios.post(BASE_URL+"admin/project/update",data,{headers:this.getToken()})
    }
    DeleteProject(data){
        return axios.post(BASE_URL+"admin/project/delete",data,{headers:this.getToken()})
    }
    addCategory(data){
      return axios.post(BASE_URL+"admin/category/add",data,{headers:this.getToken()})
    }
    addTask(data){
      return axios.post(BASE_URL+"admin/task/add",data,{headers:this.getToken()})
    }
    UpdateTaskk(data){
        return axios.post(BASE_URL+"admin/task/update",data,{headers:this.getToken()})
    }
    DeleteTaskk(data){
        return axios.post(BASE_URL+"admin/task/delete",data,{headers:this.getToken()})
    }
    AddProjectTeam(data){
        return axios.post(BASE_URL+"admin/projectteam/add",data,{headers:this.getToken()})
    }
    GetProjectTeam(){
        return axios.post(BASE_URL+"admin/projectteam/all",null,{headers:this.getToken()})
    }
    GetProjectTeamSingle(data){
        return axios.post(BASE_URL+"admin/projectteam/single",data,{headers:this.getToken()})
    }
    GetProjectTeamforEmp(){
        return axios.post(BASE_URL+"admin/projectteam/all",null,{headers:this.getEmpToken()})
    }
    UpdateProjectTeam(data){
        return axios.post(BASE_URL+"admin/projectteam/update",data,{headers:this.getToken()})
    }
    DeleteProjectTeam(data){
        return axios.post(BASE_URL+"admin/projectteam/delete",data,{headers:this.getToken()})
    }
    Dashboard(){
        return axios.post(BASE_URL+"admin/dashboard",null,{headers:this.getToken()})
    }
    EmpDashboard(data){
        return axios.post(BASE_URL+"employee/dashboard",data,{headers:this.getEmpToken()})
    }
}
export default new ApiServices