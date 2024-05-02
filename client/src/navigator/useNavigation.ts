import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";

export default function useNavigation() {
  const { setScreen } = useContext(NavigationContext);

  return { navigate: setScreen };
}
