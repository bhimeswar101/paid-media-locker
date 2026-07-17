import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import {
  Button,
  TextInput,
  Title,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { uploadMedia } from "../../services/media.service";
import { getToken } from "../../storage/authStorage";
import { uploadImage } from "../../services/cloudinary.service";


export default function UploadScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  async function pickImage() {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission Required",
      "Please allow access to your photo library."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
}

  async function publishMedia() {
  try {
    if (!title || !price || !image) {
      Alert.alert(
        "Missing Details",
        "Please fill all fields."
      );
      return;
    }
    

    console.log("Before Cloudinary");

const imageUrl = await uploadImage(image!);

console.log("After Cloudinary");
console.log(imageUrl);

await uploadMedia(
  title,
  imageUrl,
  imageUrl,
  Number(price)
);

    Alert.alert(
      "Success",
      "Media uploaded successfully!"
    );

    setTitle("");
    setPrice("");
    setImage(null);

  } catch (error: any) {
  console.log("UPLOAD ERROR");

  Alert.alert(
    "ERROR",
    JSON.stringify(error)
  );
}
}

  return (
    <View style={styles.container}>
      <Title style={styles.heading}>
        Upload Media
      </Title>

      <Button
        mode="contained"
        onPress={pickImage}
      >
        Choose Image
      </Button>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        label="Unlock Price"
        mode="outlined"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={publishMedia}
      >
        Publish
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  heading: {
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    marginTop: 20,
  },

  image: {
    width: "100%",
    height: 220,
    marginTop: 20,
    borderRadius: 15,
  },
});