export async function uploadImage(imageUri: string) {
  const data = new FormData();

  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any);

  data.append("upload_preset", "medialocker");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/muhlqmoy/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.log(result);
    throw new Error("Cloudinary upload failed");
  }

  return result.secure_url;
}