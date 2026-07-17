import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { login } from "../../services/auth.service";
import { saveToken } from "../../storage/authStorage";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await login(email, password);

      await saveToken(response.token);

      navigation.replace("Home");
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Paid Media Locker</Title>

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

      <Button
        mode="contained"
        loading={loading}
        onPress={handleLogin}
      >
        Login
      </Button>

      <Button
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 10 }}
      >
        Create Account
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