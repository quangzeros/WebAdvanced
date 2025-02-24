import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css"; // Import CSS module
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import instance from "../axios/callserve";

function Layout() {
  const { user, token, setUser, setToken } = useContext(AppContext);
  async function handleLogout() {
    try {
      const res = await instance.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({});
      setToken(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
        </nav>

        {user.email ? (
          <div className={styles.navbar}>
            <div className={styles.services}>
              {user.role === "admin" ? (
                <div className={styles.authLinks}>
                  <Link to="/create">Create</Link>
                </div>
              ) : (
                <div className={styles.authLinks}>
                  <Link to="/order">Order</Link>
                </div>
              )}
            </div>
            <div className={styles.logoutDiv}>
              <div className={styles.user}>{user.name}</div>
              <div className={styles.logout} onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
