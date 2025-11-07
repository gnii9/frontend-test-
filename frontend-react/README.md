# Silent Speak - Nền Tảng Học Ngôn Ngữ Ký Hiệu

## 📖 Giới thiệu

**Silent Speak** là nền tảng học ngôn ngữ ký hiệu đầu tiên tại Việt Nam, được thiết kế dành riêng cho cộng đồng người khiếm thính. Ứng dụng web này giúp người dùng học ngôn ngữ ký hiệu một cách dễ dàng, hiệu quả thông qua flashcard tương tác, AI nhận diện ký hiệu, và chatbot thông minh.

## 🎯 Mục đích dự án

Dự án này nhằm:
- Cung cấp nền tảng học ngôn ngữ ký hiệu miễn phí cho mọi người
- Hỗ trợ cộng đồng người khiếm thính tại Việt Nam
- Sử dụng công nghệ AI để nhận diện và đánh giá ký hiệu
- Tạo môi trường học tập tương tác và thú vị

## 🚀 Công nghệ sử dụng

- **React 18** - Framework JavaScript cho giao diện người dùng
- **React Router** - Điều hướng giữa các trang
- **Tailwind CSS** - Framework CSS utility-first
- **Recharts** - Thư viện vẽ biểu đồ
- **Google OAuth** - Đăng nhập bằng Google
- **LocalStorage** - Lưu trữ dữ liệu cục bộ

## 📁 Cấu trúc dự án

```
frontend-react/
├── src/
│   ├── pages/           # Các trang chính của ứng dụng
│   │   ├── Home.jsx     # Trang chủ
│   │   ├── FlashcardPage.jsx  # Trang học flashcard
│   │   ├── LearningChatPage.jsx  # Trang luyện tập với AI
│   │   ├── ProgressPage.jsx  # Trang theo dõi tiến độ
│   │   ├── ProfilePage.jsx  # Trang cá nhân
│   │   ├── StatisticsPage.jsx  # Trang thống kê
│   │   ├── NotificationPage.jsx  # Trang thông báo
│   │   ├── SettingPage.jsx  # Trang cài đặt
│   │   └── pages.css     # CSS chung cho các trang
│   │
│   ├── components/       # Các component tái sử dụng
│   │   ├── common/       # Component chung (Header, ThemeToggle)
│   │   ├── home/         # Component cho trang chủ
│   │   ├── practice/     # Component cho luyện tập
│   │   └── components.css  # CSS chung cho components
│   │
│   ├── auth/            # Component đăng nhập/đăng ký
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── GoogleLoginButton.jsx
│   │   └── auth.css     # CSS cho phần đăng nhập
│   │
│   ├── context/         # React Context (quản lý state)
│   │   └── AuthContext.jsx  # Context quản lý người dùng
│   │
│   ├── App.jsx          # Component chính
│   ├── main.jsx         # Entry point
│   └── index.css        # CSS toàn cục
│
├── package.json         # Dependencies
└── README.md           # File này
```

## 📄 Các trang và chức năng

### 1. **Trang Chủ (Home.jsx)**
**Đường dẫn:** `/`

**Chức năng:**
- Giới thiệu về ngôn ngữ ký hiệu và ứng dụng
- Hiển thị các tính năng chính
- Blog/Tips học tập: Mẹo học nhanh, mẹo luyện ký hiệu
- Câu hỏi thường gặp (FAQ): Giúp người dùng mới dễ làm quen
- Thông báo sự kiện: Cập nhật mới, bài học mới, tính năng mới

**Các phần chính:**
- Hero section: Giới thiệu ngắn gọn về ứng dụng
- Giới thiệu về ngôn ngữ ký hiệu: Giải thích ngôn ngữ ký hiệu là gì
- Giới thiệu Silent Speak: Tính năng của ứng dụng
- Tips học tập: 3 loại tips (học nhanh, luyện ký hiệu, ghi nhớ)
- FAQ: 5 câu hỏi thường gặp với khả năng mở rộng/thu gọn
- Thông báo sự kiện: Danh sách các cập nhật mới nhất

---

### 2. **Trang Flashcard (FlashcardPage.jsx)**
**Đường dẫn:** `/flashcard`

**Chức năng:**
- Học từ vựng qua flashcard tương tác (giống Quizlet)
- Lưu flashcard yêu thích
- Ghi chú trực tiếp vào flashcard
- Quiz củng cố kiến thức sau mỗi chủ đề

**Các tính năng:**
- **Flashcard 3D:** Click để lật thẻ, hiệu ứng 3D mượt mà
- **Điều hướng:** Nút Trước/Sau để chuyển giữa các flashcard
- **Yêu thích:** Nút tim để lưu flashcard vào danh sách yêu thích
- **Ghi chú:** Textarea để viết ghi chú cho mỗi flashcard
- **Quiz:** Sau khi học xong chủ đề, làm quiz với 4 đáp án
- **Lưu câu sai:** Hệ thống tự động lưu các câu trả lời sai để nhắc nhở học lại

**Cách sử dụng:**
1. Chọn chủ đề muốn học (ví dụ: "Chào hỏi", "Gia đình")
2. Click vào flashcard để lật và xem nghĩa
3. Viết ghi chú nếu cần
4. Click nút tim để lưu yêu thích
5. Sau khi học xong, click "Củng cố kiến thức" để làm quiz

---

### 3. **Trang Luyện Tập (LearningChatPage.jsx)**
**Đường dẫn:** `/practice`

**Chức năng:**
- Luyện tập ký hiệu với AI qua camera
- Upload video để AI phân tích
- Chatbot hướng dẫn và phản hồi chi tiết

**Các bước sử dụng:**
1. **Chọn chế độ luyện tập:**
   - **Luyện theo kịch bản:** Thực hiện các ký hiệu theo thứ tự đã định
   - **Luyện tự do:** Thực hiện bất kỳ ký hiệu nào, AI nhận diện liên tục

2. **Chọn chủ đề:** Chọn chủ đề muốn luyện tập (Chào hỏi, Gia đình, v.v.)

3. **Bắt đầu luyện tập:**
   - Camera tự động bật
   - Thực hiện ký hiệu trước camera
   - AI sẽ nhận diện và đưa ra phản hồi

**Tính năng:**
- **Nhận diện qua camera:** AI theo dõi động tác tay liên tục
- **Phản hồi chi tiết:** Nếu nhận diện sai, AI giải thích lý do
- **Upload video:** Tải video lên để AI phân tích
- **Chatbot:** Gợi ý bài tập dựa trên lỗi của người học
- **Thanh cuộn:** Chatbot có thanh cuộn để dễ xem lịch sử

---

### 4. **Trang Tiến Độ (ProgressPage.jsx)**
**Đường dẫn:** `/progress`

**Chức năng:**
- Theo dõi tiến độ học tập
- Nhắc nhở ôn tập tự động
- Biểu đồ thống kê tuần/tháng

**Các phần:**
- **Nhắc nhở ôn tập:** Tự động phát hiện các chủ đề cần ôn tập (sai nhiều lần)
- **Thống kê tuần:** Biểu đồ cột hiển thị số flashcard và bài test mỗi ngày
- **Tiến bộ theo tháng:** Biểu đồ đường hiển thị điểm trung bình và số flashcard
- **Tóm tắt:** 4 card hiển thị số flashcard đã học, chủ đề hoàn thành, điểm trung bình, streak

**Tính năng tự động:**
- Hệ thống tự động gửi thông báo khi phát hiện chủ đề cần ôn tập
- Dựa vào kết quả quiz, lưu các câu sai và nhắc nhở học lại

---

### 5. **Trang Cá Nhân (ProfilePage.jsx)**
**Đường dẫn:** `/profile`

**Chức năng:**
- Quản lý thông tin cá nhân
- Đổi mật khẩu qua OTP Gmail
- Quản lý mục tiêu học tập
- Quản lý yêu thích
- Điểm danh hàng ngày

**Các tab:**
1. **Thông tin cá nhân:**
   - Xem và cập nhật tên, email, giới tính, ngày sinh
   - Đăng xuất

2. **Đổi mật khẩu:**
   - Nhập mật khẩu cũ và mật khẩu mới
   - Gửi OTP qua email để xác thực
   - Xác nhận OTP và đổi mật khẩu

3. **Mục tiêu:**
   - Đặt số flashcard học mỗi ngày (1-50)
   - Đặt số bài test làm mỗi ngày (1-10)
   - Lưu mục tiêu

4. **Yêu thích:**
   - Xem danh sách flashcard yêu thích
   - Xem danh sách video yêu thích
   - Xem danh sách từ vựng yêu thích
   - Xóa khỏi yêu thích

5. **Điểm danh:**
   - Điểm danh hàng ngày
   - Xem streak (số ngày liên tiếp)
   - Xem lịch sử điểm danh 30 ngày gần nhất

---

### 6. **Trang Thống Kê (StatisticsPage.jsx)**
**Đường dẫn:** `/statistics`

**Chức năng:**
- Xem thống kê chi tiết về quá trình học tập

**Các phần:**
- **Tóm tắt:** 4 card hiển thị:
  - Số flashcard đã học
  - Số chủ đề đã hoàn thành
  - Điểm trung bình các bài test
  - Số ngày liên tiếp (streak)

- **Biểu đồ điểm test:** Biểu đồ cột hiển thị điểm của từng bài test

- **Tiến độ tuần:** Biểu đồ đường hiển thị số flashcard và bài test mỗi ngày

- **Từ vựng cần ôn tập:** Danh sách các từ vựng đã sai nhiều lần, sắp xếp theo số lần sai

- **Mục tiêu hôm nay:** Progress bar hiển thị tiến độ hoàn thành mục tiêu

---

### 7. **Trang Thông Báo (NotificationPage.jsx)**
**Đường dẫn:** `/notifications`

**Chức năng:**
- Xem tất cả thông báo từ hệ thống
- Đánh dấu đã đọc/chưa đọc
- Xóa thông báo

**Các loại thông báo:**
- Nhắc nhở học hàng ngày
- Nhắc ôn tập từ vựng sai
- Thông báo điểm danh thành công
- Thông báo cập nhật mới

**Tính năng:**
- Badge hiển thị số thông báo chưa đọc trong menu
- Đánh dấu tất cả đã đọc
- Xóa từng thông báo

---

### 8. **Trang Cài Đặt (SettingPage.jsx)**
**Đường dẫn:** `/settings`

**Chức năng:**
- Cài đặt giao diện (Dark mode)
- Chế độ offline
- Truy cập Admin dashboard (nếu là admin)

**Các phần:**
1. **Giao diện:**
   - Chọn chế độ màu: Sáng / Tối / Tự động
   - Áp dụng ngay lập tức

2. **Chế độ Offline:**
   - Bật/tắt chế độ offline
   - Tải flashcard về để học offline
   - Tải video về để học offline
   - Xem danh sách nội dung đã tải
   - Xóa dữ liệu offline

3. **Quản trị (chỉ admin):**
   - Link đến Admin Dashboard
   - Quản lý người dùng, bài học, flashcard, thống kê

---

### 9. **Trang Đăng Nhập (LoginPage.jsx)**
**Đường dẫn:** `/login`

**Chức năng:**
- Đăng nhập bằng email và mật khẩu
- Đăng nhập bằng Google OAuth
- Link đến trang quên mật khẩu
- Link đến trang đăng ký

**Sau khi đăng nhập:**
- Tự động chuyển đến trang cá nhân (`/profile`)
- Lưu thông tin người dùng vào localStorage

---

### 10. **Trang Đăng Ký (RegisterPage.jsx)**
**Đường dẫn:** `/register`

**Chức năng:**
- Đăng ký tài khoản mới
- Xác thực bằng OTP qua email
- Đăng ký bằng Google OAuth

**Quy trình:**
1. Nhập thông tin: Tên, email, giới tính, ngày sinh, mật khẩu
2. Gửi OTP qua email
3. Nhập OTP để xác thực
4. Hoàn tất đăng ký

---

## 🎨 Hệ thống CSS

Dự án sử dụng hệ thống CSS có tổ chức:

### Cấu trúc CSS:
- **`pages/pages.css`**: CSS chung cho tất cả các trang
- **`components/components.css`**: CSS chung cho tất cả components
- **`auth/auth.css`**: CSS cho phần đăng nhập/đăng ký
- **`components/home/home.css`**: CSS cho component trang chủ
- **`components/common/common.css`**: CSS cho component chung

### Cách sử dụng:
Mỗi component trong folder sẽ import CSS của folder đó:

```jsx
// Trong pages/Home.jsx
import './pages.css';

// Trong components/common/Header.jsx
import '../components.css';
```

### Lợi ích:
- Code dễ đọc và bảo trì hơn
- Tái sử dụng CSS classes
- Dễ dàng thay đổi style toàn cục
- Tổ chức code rõ ràng

---

## 🔐 Xác thực người dùng

### Đăng nhập:
- **Email/Password:** Đăng nhập bằng email và mật khẩu
- **Google OAuth:** Đăng nhập bằng tài khoản Google (cần Google Client ID)

### Đăng ký:
- Nhập thông tin cá nhân
- Xác thực bằng OTP qua email
- Hoặc đăng ký bằng Google

### Quản lý phiên:
- Thông tin người dùng được lưu trong localStorage
- Tự động đăng nhập lại khi refresh trang
- Đăng xuất xóa toàn bộ dữ liệu

---

## 📊 Quản lý dữ liệu

### LocalStorage:
- Thông tin người dùng
- Thông báo
- Ghi chú flashcard
- Dữ liệu offline
- Theme (sáng/tối)

### State Management:
- **AuthContext:** Quản lý state người dùng, thông báo, favorites
- Tất cả dữ liệu được lưu tự động vào localStorage

---

## 🚀 Cài đặt và chạy dự án

### Yêu cầu:
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt:
```bash
cd frontend-react
npm install
```

### Chạy dự án:
```bash
npm run dev
```

### Build production:
```bash
npm run build
```

### Cấu hình Google OAuth:
1. Tạo Google OAuth Client ID tại [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Tạo file `.env` trong thư mục `frontend-react`:
```
VITE_GOOGLE_CLIENT_ID=your_client_id_here
```

---

## 📝 Lưu ý quan trọng

### Backend API:
Hiện tại dự án đang sử dụng mock data và localStorage. Để triển khai thực tế, cần:
- Tích hợp backend API cho đăng nhập/đăng ký
- Tích hợp backend API cho flashcard, quiz
- Tích hợp backend API cho AI nhận diện ký hiệu
- Tích hợp email service để gửi OTP thật

### Google OAuth:
- Cần Google Client ID thật để đăng nhập Google hoạt động
- Hiện tại đã tích hợp sẵn, chỉ cần thêm Client ID

### OTP Email:
- Hiện tại OTP được mock (lưu trong localStorage)
- Để gửi OTP thật, cần ợp:
  - EmailJS, hoặc
  - Backend API gửi email

---

