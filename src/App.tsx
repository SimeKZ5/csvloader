import { Route, BrowserRouter, Routes } from "react-router-dom";
import CSVLoader from "./Components/CSVLoader/CSVLoader";
import LoginAdmin from "./Components/Login/Login";
import AuthorizationComponent from "./Components/AuthorizationPath/AuthorizationComponent";
import LicenceCheck from "./Components/LicenceCheck/LicenceCheck";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CSVLoader />
            </ProtectedRoute>
          }
        />
        ;
        <Route path="/loginAdmin" element={<LoginAdmin />} />;
        <Route path="/authorization" element={<AuthorizationComponent />} />;
        <Route path="/licenceCheck" element={<LicenceCheck />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
