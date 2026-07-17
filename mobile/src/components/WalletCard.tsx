import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "../theme/colors";

type WalletCardProps = {
  coins: number;
};

export default function WalletCard({
  coins,
}: WalletCardProps) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons
        name="wallet"
        size={40}
        color={COLORS.gold}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Wallet Balance
        </Text>

        <Text style={styles.coins}>
          {coins} Coins
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.card,

    marginHorizontal: 20,
    marginBottom: 25,

    padding: 20,

    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  textContainer: {
    marginLeft: 16,
  },

  title: {
    color: COLORS.grey,
    fontSize: 14,
  },

  coins: {
    color: COLORS.gold,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
});