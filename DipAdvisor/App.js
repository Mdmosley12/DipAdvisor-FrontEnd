import { LocationsProvider } from "./app/contexts/LocationsContext";
import Navigation from "./app/navigation";

export default function App() {
  return (
    <LocationsProvider>
      <Navigation />
    </LocationsProvider>
  );
}
