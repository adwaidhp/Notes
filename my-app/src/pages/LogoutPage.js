import { useEffect } from "react";
import authStore from "../stores/authStore";

export default function LogoutForm() {
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);
  return <h1>You are now logged out</h1>;
}
 