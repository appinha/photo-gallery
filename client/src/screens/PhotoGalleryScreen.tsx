import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import getUserToken from "../utils/getUserToken";
import { Screen, useNavigation } from "../navigator";
import { Photo, RemotePhoto, photosAdapter } from "../utils/adapters";
import Logo from "../components/Logo";
import GalleryPhoto from "../components/GalleryPhoto";
import "./PhotoGalleryScreen.css";

export default function PhotoGalleryScreen() {
  const { navigate } = useNavigation();
  const [data, setData] = useState<Photo[]>();
  const [error, setError] = useState<Error>();

  const token = getUserToken();

  useEffect(() => {
    if (!token) return navigate(Screen.Login);

    fetch(`${API_URL}/photos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        if (res.status === 401) return navigate(Screen.Login);
        throw new Error("Server error");
      })
      .then((res) => {
        if (!res || !res.photos) return;
        setData(photosAdapter(res.photos as RemotePhoto[]));
      })
      .catch((error) => {
        setError(error);
      });
  }, [navigate, token]);

  const onStar = (id: string, method: "POST" | "DELETE") => {
    if (!token) return navigate(Screen.Login);

    fetch(`${API_URL}/photos/star`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
      body: JSON.stringify({ id }),
    });
  };

  const getContent = () => {
    if (error) return "An error has occurred, please try again";

    if (!data) return "Loading...";

    return data.map((item) => <GalleryPhoto key={item.id} {...item} onStar={onStar} />);
  };

  return (
    <div id="photoGalleryScreen">
      <Logo />
      <h1>All photos</h1>
      {getContent()}
    </div>
  );
}
