import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";

import {
  Card,
  Button,
  Text,
  Chip,
} from "react-native-paper";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { COLORS } from "../theme/colors";
import { BlurView } from "expo-blur";

type Media = {
  id: string;
  title: string;
  image: string;
  preview: string;
  price: number;
};

type MediaCardProps = {
  item: Media;
  purchased: boolean;
  onBuy: () => void;
  onDownload: () => void;
  onPress: () => void;
};

export default function MediaCard({
  item,
  purchased,
  onBuy,
  onDownload,
  onPress,
}: MediaCardProps) {
  return (
    <Pressable onPress={onPress}>
  <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
  source={{
    uri: item.image,
  }}
  style={styles.image}
/>

{!purchased && (
  <>
    <BlurView
      intensity={90}
      tint="dark"
      style={StyleSheet.absoluteFill}
    />

    <View style={styles.overlay}>
      <View style={styles.glass}>
        <MaterialCommunityIcons
          name="diamond-stone"
          size={54}
          color="#FFD700"
        />

        <Text style={styles.lockTitle}>
          Premium Content
        </Text>

        <Text style={styles.lockText}>
          Purchase to Unlock
        </Text>
      </View>
    </View>
  </>
)}
      </View>

      <Card.Content style={styles.content}>
        <View style={styles.topRow}>
          <Text
            variant="titleLarge"
            style={styles.title}
          >
            {item.title}
          </Text>

          <Chip
            compact
            style={styles.badge}
            textStyle={{
              color: COLORS.white,
            }}
          >
            Premium
          </Chip>
        </View>

        <View style={styles.priceRow}>
          <MaterialCommunityIcons
            name="cash"
            size={20}
            color={COLORS.gold}
          />

          <Text style={styles.price}>
            {item.price} Coins
          </Text>
        </View>

        <Button
          mode="contained"
          style={[
            styles.button,
            {
              backgroundColor: purchased
                ? COLORS.success
                : COLORS.primary,
            },
          ]}
          onPress={
            purchased
              ? onDownload
              : onBuy
          }
          icon={
            purchased
              ? "download"
              : "cart"
          }
        >
          {purchased
            ? "Download"
            : "Buy Now"}
        </Button>
      </Card.Content>
      </Card>
</Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 20,
    marginBottom: 22,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 8,
  },

  imageContainer: {
    position: "relative",
    overflow: "hidden",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  image: {
    width: "100%",
    height: 220,
  },

  overlay: {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "center",
  alignItems: "center",
},

  glass: {
  width: 220,
  paddingVertical: 22,
  borderRadius: 24,
  alignItems: "center",

  backgroundColor: "rgba(255,255,255,0.12)",

  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.25)",
},

  lockTitle: {
  color: "#fff",
  fontSize: 24,
  fontWeight: "800",
  marginTop: 10,
},

lockText: {
  color: "#E5E7EB",
  fontSize: 15,
  marginTop: 6,
},
  content: {
    paddingTop: 14,
    paddingBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: COLORS.white,
    flex: 1,
    marginRight: 10,
    fontWeight: "700",
  },

  badge: {
    backgroundColor: COLORS.primary,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  price: {
    color: COLORS.gold,
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 16,
  },

  button: {
    marginTop: 18,
    borderRadius: 14,
  },
});