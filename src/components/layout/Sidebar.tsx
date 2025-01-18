import { Layout, Menu } from "antd";
import sideBarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminRoutesPath } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPath } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  let sidebarItems;

  switch (user!.userRole) {
    case userRole.ADMIN:
      sidebarItems = sideBarItemsGenerator(adminRoutesPath, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sideBarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      console.log(userRole.STUDENT);
      sidebarItems = sideBarItemsGenerator(studentPath, userRole.STUDENT);
      break;
    default:
      break;
  }

  // console.log(`from sidebar items: ${sidebarItems}`);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PHU</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
