import { AuthProvider } from "./Context/authContext";
import Rotas from "./Routes/routes";

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}

export default App;