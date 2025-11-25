import useLocalStorage from "./useLocalStorage";


//   Mock auth hook.
//   signup(email, password, name) stores user in "users" localStorage
//   login(email, password) checks users and sets current "user"
//   logout() clears current user

export default function useAuth() {
  const [user, setUser] = useLocalStorage("cp_user", null);
  const [users, setUsers] = useLocalStorage("cp_users", []);

  const signup = ({ name, email, password }) => {
    // basic validation
    if (!email || !password) return { success: false, message: "Email & password required" };

    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = { id: Date.now().toString(), name, email, password };
    const next = [...users, newUser];
    setUsers(next);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { success: true };
  };

  const login = ({ email, password }) => {
    if (!email || !password) return { success: false, message: "Email & password required" };

    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, message: "Invalid credentials" };

    setUser({ id: found.id, name: found.name, email: found.email });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return { user, signup, login, logout, users };
}
