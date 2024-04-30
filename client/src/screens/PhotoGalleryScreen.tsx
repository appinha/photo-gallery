import Logo from '../components/Logo'
import GalleryPhoto from '../components/GalleryPhoto';
import './PhotoGalleryScreen.css'

type Photo = {
  id: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  thumbnail: string;
  avgColor: string;
  isStarred: boolean | undefined;
}

export default function GalleryScreen() {
  const mockedData: Photo[] = [
    {
      id: "21751820",
      photographer: "Felix",
      photographerUrl: "https://www.pexels.com/@felix-57767809",
      thumbnail: "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      avgColor: "#333831",
      alt: "A small island surrounded by trees in the middle of a lake",
      isStarred: true,
    },
    {
      id: "21405575",
      photographer: "Centre for Ageing Better",
      photographerUrl: "https://www.pexels.com/@centre-for-ageing-better-55954677",
      thumbnail: "https://images.pexels.com/photos/21405575/pexels-photo-21405575.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
      avgColor: "#6D755E",
      alt: "Two older people cycling",
      isStarred: false,
    }
  ];

  const onStar = (id: string, method: "POST" | "DELETE") => {
    const action = method === "POST" ? "starred" : "unstarred";
    console.log(`Photo of id ${id} was ${action}`);
  }

  const getContent = () => {
    return mockedData.map((photo) => <GalleryPhoto key={photo.id} {...photo} onStar={onStar} />)
  }

  return (
    <div id="photoGalleryScreen">
      <Logo />
      <h1>All photos</h1>
      {getContent()}
    </div>
  )
}
