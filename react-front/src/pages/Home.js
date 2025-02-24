import { useContext, useEffect, useState } from "react";
import instance from "../axios/callserve";
import styles from "./Home.module.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);
  const [fields, setFields] = useState([]);
  const [filteredFields, setFilteredFields] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldData, setFieldData] = useState({ name: "", location: "" });
  const [bookingData, setBookingData] = useState({
    timeStart: "",
    timeEnd: "",
  });

  // Lấy danh sách sân bóng
  async function getFields() {
    try {
      const res = await instance.get("/api/fields");
      setFields(res.data);
      setFilteredFields(res.data);

      // Lấy danh sách địa điểm
      const uniqueLocations = [
        ...new Set(res.data.map((field) => field.location)),
      ];

      setLocations(uniqueLocations);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sân:", error);
    }
  }

  useEffect(() => {
    getFields();
  }, []);

  // Xử lý khi chọn địa điểm
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    setFilteredFields(
      location ? fields.filter((field) => field.location === location) : fields
    );
  };

  // Xử lý đặt sân
  const handleBookClick = (field) => {
    if (Object.values(user).length === 0) {
      navigate("/login");
    } else {
      setSelectedField(field);
    }
  };
  const handleInputChange = (e) =>
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });

  const handleSubmitBooking = async () => {
    if (!bookingData.timeStart || !bookingData.timeEnd) {
      alert("Vui lòng chọn thời gian!");
      return;
    }
    try {
      await instance.post(
        "/api/orders",
        {
          user_id: user.id,
          field_id: selectedField.id,
          time_start: bookingData.timeStart,
          time_end: bookingData.timeEnd,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Đặt sân thành công!");
      navigate("/order");
      setSelectedField(null);
    } catch (error) {
      console.error("Lỗi khi đặt sân:", error);
      alert("Đặt sân thất bại, vui lòng thử lại.");
    }
  };

  // Xử lý xóa sân bóng (Chỉ admin)
  const handleDeleteField = async (fieldId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sân này?")) return;
    try {
      await instance.delete(`/api/fields/${fieldId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFields(fields.filter((field) => field.id !== fieldId));
      setFilteredFields(filteredFields.filter((field) => field.id !== fieldId));
      const locations = [
        ...new Set(
          fields
            .filter((field) => field.id !== fieldId)
            .map((field) => field.location)
        ),
      ];
      setLocations(locations);
      alert("Xóa sân thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sân:", error);
      alert("Xóa sân thất bại, vui lòng thử lại.");
    }
  };

  // Mở form chỉnh sửa sân
  const handleEditField = (field) => {
    setEditingField(field);
    setFieldData({ name: field.name, location: field.location });
  };

  // Xử lý cập nhật sân bóng
  const handleUpdateField = async () => {
    try {
      const res = await instance.put(
        `/api/fields/${editingField.id}`,
        fieldData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      // Cập nhật danh sách sân
      setFields(
        fields.map((f) => (f.id === editingField.id ? res.data.field : f))
      );
      setFilteredFields(
        filteredFields.map((f) =>
          f.id === editingField.id ? res.data.field : f
        )
      );
      const uniqueLocations = fields.map((f) =>
        f.id === editingField.id ? res.data.field.location : f.location
      );
      setLocations(uniqueLocations);
      setEditingField(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật sân:", error);
      alert("Cập nhật thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Danh Sách Sân Bóng</h2>

      {/* Bộ lọc theo địa điểm */}
      <div className={styles.filterContainer}>
        <label htmlFor="locationFilter">Lọc theo địa điểm:</label>
        <select
          id="locationFilter"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="">Tất cả</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách sân bóng */}
      <div className={styles.list}>
        {filteredFields.length > 0 ? (
          filteredFields.map((field) => (
            <div key={field.id} className={styles.card}>
              <h3 className={styles.name}>{field.name}</h3>
              <p className={styles.location}>📍 {field.location}</p>

              <div className={styles.actions}>
                {user.role === "admin" && (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditField(field)}
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteField(field.id)}
                    >
                      ❌ Xóa
                    </button>
                  </>
                )}
                {user.role !== "admin" && (
                  <button
                    className={styles.bookButton}
                    onClick={() => handleBookClick(field)}
                  >
                    Đặt sân
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Không có sân nào</p>
        )}
      </div>

      {/* Form đặt sân */}
      {selectedField && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Đặt sân: {selectedField.name}</h3>
            <label>Thời gian bắt đầu:</label>
            <input
              type="datetime-local"
              name="timeStart"
              onChange={handleInputChange}
            />
            <label>Thời gian kết thúc:</label>
            <input
              type="datetime-local"
              name="timeEnd"
              onChange={handleInputChange}
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={handleSubmitBooking}
              >
                Xác nhận
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setSelectedField(null)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form chỉnh sửa sân */}
      {editingField && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Chỉnh sửa sân: {editingField.name}</h3>
            <label>Tên sân:</label>
            <input
              type="text"
              value={fieldData.name}
              onChange={(e) =>
                setFieldData({ ...fieldData, name: e.target.value })
              }
            />
            <label>Địa điểm:</label>
            <input
              type="text"
              value={fieldData.location}
              onChange={(e) =>
                setFieldData({ ...fieldData, location: e.target.value })
              }
            />

            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={handleUpdateField}
              >
                Lưu
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setEditingField(null)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
