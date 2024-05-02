import { createContext } from "react";
import { Screen } from "./screens";

type NavigationContextType = {
  screen: Screen;
  setScreen: (s: Screen) => void;
};

export const NavigationContext = createContext<NavigationContextType>({
  screen: Screen.Login,
  setScreen: () => {},
});
