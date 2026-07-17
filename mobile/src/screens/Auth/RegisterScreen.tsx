import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { register } from "../../services/auth.service";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await register(name, email, password);

      Alert.alert("Success", "Account created!");

      navigation.goBack();
    } catch (err: any) {
  console.log("========== REGISTER ERROR ==========");
  console.log("Message:", err?.message);
  console.log("Code:", err?.code);
  console.log("Response:", err?.response?.data);
  console.log("Full Error:", err);

  Alert.alert(
    "Error",
    JSON.stringify({
      message: err?.message,
      code: err?.code,
      response: err?.response?.data,
    })
  );
}
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create Account</Title>

      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 28,
  },

  input: {
    marginBottom: 15,
  },
});