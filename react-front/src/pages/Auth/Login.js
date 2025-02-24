import { useContext, useState } from "react";
import styles from "./Login.module.css";

import { useNavigate } from "react-router-dom";

import instance from "../../axios/callserve";
import { AppContext } from "../../context/AppContext";

function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email không được để trống";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setMessage("");
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        const res = await instance.post("/api/login", formData);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          const token = res.data.token;
          localStorage.setItem("token", token);
          setToken(token);
          navigate("/");
        }
      } else {
        setErrors(validationErrors);
      }
    } catch (error) {
      setErrors({ email: error.response.data.message });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Đăng Nhập</h2>
      {message && (
        <p style={{ color: "green", textAlign: "center" }}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Mật khẩu</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button type="submit" className={styles.button}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
