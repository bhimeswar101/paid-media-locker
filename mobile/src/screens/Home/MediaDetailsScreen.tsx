import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import {
  Button,
  Text,
} from "react-native-paper";

import { purchaseMedia } from "../../services/purchase.service";
import { downloadMedia } from "../../services/download.service";

export default function MediaDetailsScreen({
  route,
  navigation,
}: any) {
  const { item } = route.params;

  const [purchased, setPurchased] = useState(
    route.params.purchased
  );

  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    try {
      setLoading(true);

      const response = await purchaseMedia(item.id);

      Alert.alert("Success", response.message);

      setPurchased(true);
    } catch (err: any) {
      Alert.alert(
        "Purchase Failed",
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload() {
    try {
      const response = await downloadMedia(item.id);

      Alert.alert(
        "Download",
        response.alreadyDownloaded
          ? "You have already downloaded this media."
          : "Media unlocked successfully!"
      );
    } catch (err: any) {
      Alert.alert(
        "Download Failed",
        err?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          variant="headlineMedium"
          style={styles.title}
        >
          {item.title}
        </Text>

        <Text style={styles.price}>
          {item.price} Coins
        </Text>

        <Button
          mode="contained"
          loading={loading}
          onPress={
            purchased
              ? handleDownload
              : handlePurchase
          }
        >
          {purchased
            ? "Download"
            : "Buy Now"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  image: {
    width: "100%",
    height: 320,
  },

  content: {
    padding: 20,
  },

  title: {
    color: "#fff",
    fontWeight: "bold",
  },

  price: {
    color: "#FFD54F",
    marginVertical: 20,
    fontSize: 18,
  },
});