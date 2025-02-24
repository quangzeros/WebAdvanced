import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AuthRoutes from "./Routes/AuthRoutes";
import GuestRoutes from "./Routes/GuestRoutes";
import CreateField from "./pages/Fields/CreateField";
import Orders from "./pages/Fields/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<AuthRoutes />}>
            <Route path="create" element={<CreateField />} />
            <Route path="order" element={<Orders />} />
          </Route>

          <Route element={<GuestRoutes />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
