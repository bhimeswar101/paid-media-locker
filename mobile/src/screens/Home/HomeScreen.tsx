import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";

import {
  ActivityIndicator,
  Title,
  Button,
} from "react-native-paper";

import { getAllMedia } from "../../services/media.service";
import { getProfile } from "../../services/user.service";

import {
  purchaseMedia,
  getMyPurchases,
} from "../../services/purchase.service";

import { downloadMedia } from "../../services/download.service";

import { removeToken } from "../../storage/authStorage";
import Header from "../../components/Header";
import WalletCard from "../../components/WalletCard";
import MediaCard from "../../components/MediaCard";
export default function HomeScreen({
  navigation,
}: any) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  useEffect(() => {
  const unsubscribe = navigation.addListener("focus", () => {
    loadData();
  });

  return unsubscribe;
}, [navigation]);
    async function loadData() {
  try {
    setLoading(true);

    const [
      mediaResponse,
      userResponse,
      purchasesResponse,
    ] = await Promise.all([
      getAllMedia(),
      getProfile(),
      getMyPurchases(),
    ]);

    console.log(
      "MEDIA RESPONSE:\n",
      JSON.stringify(mediaResponse, null, 2)
    );

    setMedia(mediaResponse);
    setUser(userResponse);

    const ids = purchasesResponse.map(
      (purchase: any) => purchase.mediaId
    );

    setPurchasedIds(ids);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
const onRefresh = useCallback(async () => {
  setRefreshing(true);

  try {
    await loadData();
  } finally {
    setRefreshing(false);
  }
}, []);
  async function handlePurchase(mediaId: string) {
    try {
      const response = await purchaseMedia(mediaId);

      Alert.alert(
        "Success",
        response.message
      );

      await loadData();
    } catch (err: any) {
      Alert.alert(
        "Purchase Failed",
        err?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }

  async function handleDownload(mediaId: string) {
    try {
      const response = await downloadMedia(mediaId);

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

  async function handleLogout() {
    await removeToken();
    navigation.replace("Login");
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
    return (
    <View style={styles.container}>
      {/* Header */}
      <Header
  name={user?.name ?? "User"}
  onLogout={handleLogout}
/>

<WalletCard coins={user?.coins ?? 0} />

<View
  style={{
    paddingHorizontal: 20,
    marginBottom: 20,
  }}
>
  <Button
    mode="contained"
    onPress={() =>
      navigation.navigate("Upload")
    }
  >
    Upload New Media
  </Button>
</View>

      <Title style={styles.sectionTitle}>
        Available Media
      </Title>

      <FlatList
  data={media}
  keyExtractor={(item) => item.id}
  contentContainerStyle={{
    paddingBottom: 30,
  }}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#ffffff"
      colors={["#3B82F6"]}
    />
  }
  renderItem={({ item }) => {
    const purchased = purchasedIds.includes(item.id);

    return (
      <MediaCard
        item={item}
        purchased={purchased}
        onBuy={() => handlePurchase(item.id)}
        onDownload={() => handleDownload(item.id)}
        onPress={() =>
          navigation.navigate("MediaDetails", {
            item,
            purchased,
          })
        }
      />
    );
  }}
/>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  loader: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  
});

