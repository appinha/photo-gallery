import "./App.css";
import { Navigator, useScreenComponent } from "./navigator";

export default function App() {
  return (
    <Navigator>
      <CurrentScreen />
    </Navigator>
  );
}

function CurrentScreen() {
  const ScreenComponent = useScreenComponent();

  return <ScreenComponent />;
}
