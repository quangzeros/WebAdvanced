# Web Đặt Sân Bóng ⚽

## 🚀 Giới thiệu
Dự án **Web Đặt Sân Bóng** là một ứng dụng giúp người dùng dễ dàng tìm kiếm và đặt sân bóng trực tuyến. Hệ thống hỗ trợ quản lý sân bóng, đặt lịch, và theo dõi thông tin người dùng. Dự án bao gồm **Backend** sử dụng **Laravel** và **Frontend** phát triển bằng **React.js**.
Detailed project documentation is [here](https://example.com)


## 🌟 Tính năng chính
✅ **Người dùng**
- Đăng ký, đăng nhập, xác thực bằng token (JWT)
- Xem danh sách sân bóng theo địa điểm
- Đặt sân với thời gian bắt đầu và kết thúc
- Hủy đặt sân nếu chưa đến giờ bắt đầu

✅ **Quản trị viên (Admin)**
- Quản lý danh sách sân bóng (thêm, sửa, xóa)
- Xem danh sách đơn đặt sân của người dùng
- Quản lý tài khoản người dùng

## 🏗️ Công nghệ sử dụng
### Backend (Laravel)
- Laravel 11.x
- MySQL (Cơ sở dữ liệu)
- Laravel Passport (Xác thực API)
- Laravel Policy (Phân quyền)

### Frontend (React.js)
- React 18
- React Router DOM (Quản lý điều hướng)
- Axios (Gọi API)
- Context API (Quản lý trạng thái ứng dụng)
- CSS Module (Thiết kế giao diện)

## 📦 Cài đặt và chạy dự án
### **1️⃣ Backend - Laravel**
```bash
cd backend  # Di chuyển vào thư mục backend
composer install  # Cài đặt package PHP
cp .env.example .env  # Tạo file cấu hình môi trường
php artisan key:generate  # Tạo APP_KEY
php artisan migrate --seed  # Tạo bảng và seed dữ liệu mẫu
php artisan serve  # Chạy server Laravel
```

### **2️⃣ Frontend - React**
```bash
cd frontend  # Di chuyển vào thư mục frontend
npm install  # Cài đặt package React
npm start  # Chạy ứng dụng React
```

## 🔗 API Backend
| API | Method | Mô tả |
|------|--------|------------------|
| `/api/login` | POST | Đăng nhập |
| `/api/register` | POST | Đăng ký |
| `/api/logout` | POST | Đăng xuất |
| `/api/fields` | GET | Lấy danh sách sân bóng |
| `/api/orders` | POST | Đặt sân |
| `/api/orders/{id}` | DELETE | Hủy đặt sân |

## Hình ảnh website

![image](https://github.com/user-attachments/assets/4d93aea0-b707-45f4-8e4d-f85b8a6db1ba)
![image](https://github.com/user-attachments/assets/021adfe0-3454-4513-8cc9-710b628a575a)
![image](https://github.com/user-attachments/assets/3001081b-3005-420b-81e6-3343cdf55e41)
![image](https://github.com/user-attachments/assets/57c81a05-c7a3-4277-b600-29f06720be3b)







## 🛠️ Đóng góp
Nếu bạn muốn đóng góp vào dự án, vui lòng tạo **Pull Request** hoặc mở **Issue** trên GitHub.

## 📜 Giấy phép
Dự án được phát triển với mục đích học tập và sử dụng giấy phép **MIT License**.

---
🚀 Chúc bạn sử dụng ứng dụng vui vẻ! ⚽

