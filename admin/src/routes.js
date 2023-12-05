
import Dashboard from "./views/Dashboard.js";
import Tags from "./views/Tags.js";
import { FaRegChartBar } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { HiHashtag } from "react-icons/hi";
import TableList from "./views/Tables.js";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaRegChartBar size={19}/>,
    component: <Dashboard />,
    layout: "/admin",
  },
  
  {
    path: "/tables",
    name: "Table List",
    icon: <BsPeople size={19}/>,
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/tag",
    name: "Tag",
    icon: <HiHashtag size={19}/>,
    component: <Tags />,
    layout: "/admin",
  },
];
export default routes;
