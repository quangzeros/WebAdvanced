import { useContext, useState } from "react";
import styles from "./Register.module.css";

import { useNavigate } from "react-router-dom";

import instance from "../../axios/callserve";
import { AppContext } from "../../context/AppContext";

function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Tên không được để trống";
    if (!formData.email) newErrors.email = "Email không được để trống";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password !== formData.password_confirmation) {
      console.log("hello");
      newErrors.password_confirmation = "Mật khẩu không giống nhau";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        console.log(formData);
        const res = await instance.post("/api/register", formData);

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
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Tên</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

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

        <div className={styles.formGroup}>
          <label className={styles.label}>Nhập lại mật khẩu</label>
          <input
            type="password"
            name="password_confirmation"
            className={styles.input}
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && (
            <p className={styles.error}>{errors.password_confirmation}</p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Đăng Ký
        </button>
      </form>
    </div>
  );
}

export default Register;
