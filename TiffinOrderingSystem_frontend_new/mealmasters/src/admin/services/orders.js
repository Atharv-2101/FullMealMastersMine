import api from "./api";

// orders by status
export const getOrdersByStatus = (status) => {
  return api.get(`/admin/ordersByStatus/${status}`);
};

// all orders
export const getAllOrders = () => {
  return api.get("/admin/allOrders");
};
