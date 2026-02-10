import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiUsers,
} from "react-icons/fi";

import StateCard from "../components/Dashboard/StateCard";
import Order from "../components/Dashboard/Order";
import useAuthContext from "../hooks/useAuthContext";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [productsRes, ordersRes] = await Promise.all([
          apiClient.get("/products/"),
          authApiClient.get("/orders/")
        ]);

        let userCount = 0;
        if (user?.is_staff) {
          try {
            const usersRes = await authApiClient.get("/auth/users/");
            userCount = usersRes.data.length || usersRes.data.count || 0;
          } catch (err) {
            console.log("User fetch failed", err);
          }
        }

        setStats({
          products: productsRes.data.count || 0,
          orders: ordersRes.data.length || 0,
          users: userCount,
          rating: 4.8, // Static as it requires complex backend aggregation
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container-professional">
          <h1 className="heading-1">
            Welcome back, {user?.first_name || "User"}!
          </h1>
          <p className="text-muted mt-2">
            Here's an overview of your store today
          </p>
        </div>
      </div>

      <div className="container-professional py-8">
        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StateCard icon={FiPackage} title="Total Products" value={stats.products} />
          <StateCard icon={FiShoppingCart} title="Total Orders" value={stats.orders} />
          <StateCard icon={FiUsers} title="Total User" value={stats.users || "N/A"} />
          <StateCard icon={FiStar} title="Average Rating" value={stats.rating} />
        </div>

        {/* Orders Section */}
        <Order />
      </div>
    </div>
  );
}
