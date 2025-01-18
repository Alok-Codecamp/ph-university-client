import { NavLink } from "react-router-dom";
import { TLink, TUserPath } from "../types/sidebar";

const sideBarItemsGenerator = (item: TUserPath[], role: string) => {
  const navLinks = item.reduce((acc: TLink[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.path,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return navLinks;
};

export default sideBarItemsGenerator;
