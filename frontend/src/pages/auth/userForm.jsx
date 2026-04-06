import { useState } from "react";
import { useNavigate } from "react-router";
import { http } from "../../lib/http";
import { setToken } from "../../lib/token";
import "@/css/auth.css"
export default function UserForm({api}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      username,
      password,
    };
    
    const res = await http().post(api, body);

    const data = await res.json();
    setToken(data.token)
    if (res.status == 200 || res.status == 201) {
      navigate("/home")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}