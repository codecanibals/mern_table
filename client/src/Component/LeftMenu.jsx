import React from "react";
import "./LeftMenu.css";
import { Routes, Route, Link } from "react-router-dom";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import UserTable from "../Table/UserTable";
import TempTable from "./tempTable";
import Deleteusertable from "./Deleteusertable";
import PostsTable from "./Posts/PostsTable";
import CommentsTable from "./Comments/CommentTable";
import AddUser from "./AddUser";
function LeftMenu() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="app" style={{ backgroundColor: "#2096ff",color:"black" }}>
          <Menu>
  
            <MenuItem
              className="menu1"
              component={<Link to="/" className="link" />}
            ></MenuItem>

            {/* <MenuItem
           component={<Link to="/UserTable" className="link" />}
          > GetUsers </MenuItem> */}

            <SubMenu label="Users" style={{fontSize:"17px"}}>
              <MenuItem component={<Link to="/UserTable" className="link" />}>
                Get Users Data
              </MenuItem>
              <MenuItem component={<Link to="/AddUser" className="link" />}>
                 Add User Data
              </MenuItem>
              <MenuItem component={<Link to="/DeletedUsersTable" className="link" />}>
                Deleted Users Data
              </MenuItem>
              {/* <MenuItem >Bubble Chart</MenuItem> */}
            </SubMenu>

            <SubMenu label="Posts" style={{fontSize:"17px"}}>

              <MenuItem component={<Link to="/EmployeesPosts" className="link" />}>
                Get Users Posts
              </MenuItem>

              {/* <MenuItem component={<Link to="/EmployeesComments" className="link" />}>
                Get Users Comments
              </MenuItem> */}
            
            </SubMenu>
            <SubMenu label="Comments" style={{fontSize:"17px"}}>

              {/* <MenuItem component={<Link to="/EmployeesPosts" className="link" />}>
                Get Users Posts
              </MenuItem> */}

              <MenuItem component={<Link to="/EmployeesComments" className="link" />}>
                Get Users Comments
              </MenuItem>
            
            </SubMenu>

          </Menu>
        </Sidebar>
        <section>
          <Routes>
            <Route path="/" element={<TempTable />} />

            {/* <Route path="/" element={<></>} /> */}
            <Route path="/UserTable" element={<UserTable />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/DeletedUsersTable" element={<Deleteusertable/>} />
            <Route path="/EmployeesPosts" element={<PostsTable/>} />
            <Route path="/EmployeesComments" element={<CommentsTable/>} />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default LeftMenu;
