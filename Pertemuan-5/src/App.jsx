import React, { useState } from "react";
import Login from "./Pages/Auth/Login/Login";
import Mahasiswa from "./Pages/Admin/Mahasiswa/Mahasiswa";

const App = () => {
  // State untuk mengontrol halaman mana yang tampil
  const [page, setPage] = useState("login");

  // Jika state 'dashboard', tampilkan Halaman Mahasiswa
  if (page === "dashboard") {
    return <Mahasiswa />;
  }

  // Secara default tampilkan Halaman Login
  return <Login onLoginSuccess={() => setPage("dashboard")} />;
};

export default App;