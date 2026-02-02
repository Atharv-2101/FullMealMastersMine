import React from "react";
import { View } from "react-native";
import AdminScreen from "../../components/AdminScreen";
import AdminTable from "../../components/AdminTable";

export default function RegisteredUsersScreen({ navigation }) {
  const columns = ["S.NO", "Name", "Mobile", "Email", "Reg Date", "Action"];

  const rows = [
    [
      "1",
      "Rahul Farke",
      "9876543210",
      "rahul@gmail.com",
      "2026-01-12",
      {
        type: "button",
        label: "View",
        variant: "success",
        onPress: () => navigation.navigate("UserDetails", { userId: "U001" }),
      },
    ],
    [
      "2",
      "Amit Patil",
      "9123456780",
      "amit@gmail.com",
      "2026-01-15",
      {
        type: "button",
        label: "View",
        variant: "success",
        onPress: () => navigation.navigate("UserDetails", { userId: "U002" }),
      },
    ],
  ];

  return (
    <AdminScreen title="Registered Users">
      <View style={{ flex: 1 }}>
        <AdminTable columns={columns} rows={rows} />
      </View>
    </AdminScreen>
  );
}
