import { FaUser, FaLock } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert("Échec de la connexion !");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/image/Coca-bg.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 uppercase tracking-wide">
          Gestion Matériel Informatique
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F40009]"
              placeholder="Entrez votre identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F40009]"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="w-full bg-[#F40009] text-white py-2 rounded-lg hover:bg-[#D40000] transition-all transform hover:scale-105 shadow-lg">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
