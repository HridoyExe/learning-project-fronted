
import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
  FiMenu,
  FiX,
} from "react-icons/fi";

import StateCard from "../components/Dashboard/StateCard";
import Order from "../components/Dashboard/Order";

export default function Dashboard() {
  

  return (

      <div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <StateCard icon={FiPackage} title="Total Products"  value={245}></StateCard>
            <StateCard icon={FiShoppingCart} title="Total Orders" value={128} ></StateCard>
            <StateCard icon={FiUsers} title="Total User" ></StateCard>
            <StateCard icon={FiStar} title="Average Rating" value={4.8}></StateCard>

            
            
          </div>

        <Order></Order>
        </div>
        
  );
}