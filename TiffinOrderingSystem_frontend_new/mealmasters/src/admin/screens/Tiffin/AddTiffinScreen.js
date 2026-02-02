import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import AdminScreen from "../../components/AdminScreen";
import { addTiffin } from "../../services/tiffin";

export default function AddTiffinScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("VEG");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const submit = async () => {
  const res = await addTiffin({
    title,
    type,
    description,
    cost,
    image: null,
  });

  console.log(res.data);

  navigation.goBack();
};


  return (
    <AdminScreen title="Add Tiffin">
      <TextInput placeholder="Title" onChangeText={setTitle} />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <TextInput placeholder="Cost" keyboardType="numeric" onChangeText={setCost} />
      <Button title="Submit" onPress={submit} />
    </AdminScreen>
  );
}
