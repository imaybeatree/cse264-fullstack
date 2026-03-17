import { useState } from "react";
import { http } from "../lib/http";
import { setToken } from "../lib/token";
export default function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const res = await http().post("/api/auth/register",body);

    const data = await res.json();
    setToken(data.token)
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

      <button type="submit">Create User</button>
    </form>
  );
}