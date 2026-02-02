import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminDrawerContent from "./AdminDrawerContent";
import OrdersStack from "./OrdersStack";

// Screens
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import AddTiffinScreen from "../screens/Tiffin/AddTiffinScreen";
import ManageTiffinScreen from "../screens/Tiffin/ManageTiffinScreen";

import InvoiceListScreen from "../screens/Invoices/InvoiceListScreen";
import RegisteredUsersScreen from "../screens/Users/RegisteredUsersScreen";
import SearchOrderScreen from "../screens/Search/SearchOrderScreen";
import SearchInvoiceScreen from "../screens/Search/SearchInvoiceScreen";
import ReportsScreen from "../screens/Reports/ReportsScreen";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="AdminDashboard" component={DashboardScreen} />

      <Drawer.Screen name="AddTiffin" component={AddTiffinScreen} />
      <Drawer.Screen name="ManageTiffin" component={ManageTiffinScreen} />

      {/* ORDERS STACK */}
      <Drawer.Screen name="Orders" component={OrdersStack} />

      <Drawer.Screen name="InvoiceList" component={InvoiceListScreen} />
      <Drawer.Screen name="RegisteredUsers" component={RegisteredUsersScreen} />

      <Drawer.Screen name="SearchOrder" component={SearchOrderScreen} />
      <Drawer.Screen name="SearchInvoice" component={SearchInvoiceScreen} />

      <Drawer.Screen name="Reports" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}
