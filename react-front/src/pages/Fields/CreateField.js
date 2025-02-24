import { useContext, useState } from "react";
import styles from "./CreateField.module.css"; // Import CSS Module
import instance from "../../axios/callserve";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const CreateField = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [errors, setErrors] = useState({});

  const { token } = useContext(AppContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên không được để trống";
    if (!formData.location.trim())
      newErrors.location = "Địa điểm không được để trống";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await instance.post("/api/fields", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.data.errors) {
          setErrors({ name: "Tên này đã được sử dụng" });
        } else {
          navigate("/");
          setFormData({ name: "", location: "" });
        }
      } catch (error) {
        setErrors(errors);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Field</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
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
          <label className={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            className={styles.input}
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className={styles.error}>{errors.location}</p>}
        </div>

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateField;
