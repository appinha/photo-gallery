import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";
import { getScreenComponent } from "./screens";

export default function useScreenComponent() {
  const { screen } = useContext(NavigationContext);

  return getScreenComponent(screen);
}
