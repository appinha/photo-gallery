import LoginScreen from "../screens/LoginScreen";
import PhotoGalleryScreen from "../screens/PhotoGalleryScreen";
import isUserSignedIn from "../utils/isUserSignedIn";

export enum Screen {
  Login,
  Gallery,
}

export const getInitScreen = () => (isUserSignedIn() ? Screen.Gallery : Screen.Login);

export const getScreenComponent = (screen: Screen) =>
  screen === Screen.Login ? LoginScreen : PhotoGalleryScreen;
