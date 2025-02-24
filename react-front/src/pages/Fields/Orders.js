import { useContext, useEffect, useState } from "react";
import styles from "./Orders.module.css";
import instance from "../../axios/callserve";
import { AppContext } from "../../context/AppContext";

function Orders() {
  const { user, token } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    try {
      const res = await instance.get("/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đặt sân:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(orderId) {
    if (!window.confirm("Bạn có chắc muốn hủy đơn đặt sân này không?")) {
      return;
    }

    try {
      await instance.delete(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Lỗi khi hủy đơn đặt sân:", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Danh Sách Đặt Sân</h2>

      {loading ? (
        <p className={styles.loading}>Đang tải dữ liệu...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Người Đặt</th>
              <th>Sân Bóng</th>
              <th>Địa Điểm</th>
              <th>Thời Gian Bắt Đầu</th>
              <th>Thời Gian Kết Thúc</th>
              <th>Hủy lịch</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.user.name}</td>
                  <td>{order.field?.name || "Đang tải..."}</td>
                  <td>{order.field?.location || "Đang tải..."}</td>
                  <td>{new Date(order.time_start).toLocaleString()}</td>
                  <td>{new Date(order.time_end).toLocaleString()}</td>
                  <td>
                    <button
                      className={styles.cancelButton}
                      onClick={() => handleCancel(order.id)}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.empty}>
                  Không có đơn đặt sân nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
