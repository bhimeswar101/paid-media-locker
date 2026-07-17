import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme/colors";
import { Pressable } from "react-native";

type HeaderProps = {
  name: string;
  onLogout: () => void;
};

export default function Header({
  name,
  onLogout,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>
          Welcome Back 👋
        </Text>

        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.member}>
          Premium Member
        </Text>
      </View>

      <Pressable onPress={onLogout}>
  <MaterialCommunityIcons
    name="logout"
    size={28}
    color={COLORS.primary}
  />
</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: COLORS.grey,
    fontSize: 16,
  },

  name: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 5,
  },

  member: {
    color: COLORS.gold,
    marginTop: 4,
    fontSize: 14,
  },
});