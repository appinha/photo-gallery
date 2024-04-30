import { PropsWithChildren, useState } from "react";
import { NavigationContext } from "./NavigationContext";
import { Screen, initScreen } from "./screens";

export default function Navigator({ children }: PropsWithChildren) {
  const [screen, setScreen] = useState<Screen>(initScreen);

  return (
    <NavigationContext.Provider value={{ screen, setScreen }}>
      {children}
    </NavigationContext.Provider>
  );
}