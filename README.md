# 🎂 Interactive Birthday Website - React

Trang web chúc mừng sinh nhật tương tác cao với hiệu ứng đẹp mắt, thổi nến qua microphone, pháo hoa và thư tình.

## ✨ Tính Năng

### 🔐 Password Gate
- Nhập mật khẩu để mở quà
- Shake animation khi nhập sai
- Smooth transition khi đúng mật khẩu

### 🎂 Cake Scene - Thổi Nến
- 20 cây nến với hiệu ứng lửa flicker
- **Thổi nến qua microphone** using Web Audio API
- Volume indicator realtime
- Smoke effect khi nến tắt

### 🎉 Birthday Celebration
- **Fireworks** với GSAP animations
- **Confetti** rơi tự động
- **Floating hearts** particles
- Pennant banners trang trí
- Avatar tròn với pulse animation

### 💌 Letter Modal
- Bức thư viết tay (Dancing Script font)
- **Typing animation** từng đoạn
- Blur overlay background
- Skip button để bỏ qua hiệu ứng

## 🚀 Cài Đặt & Chạy

### 1. Cài Đặt Dependencies

```bash
cd birthday-app
npm install
```

### 2. Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt: `http://localhost:5173`

### 3. Build cho Production

```bash
npm run build
npm run preview
```

## 🎨 Tùy Chỉnh

### Thay Đổi Mật Khẩu

Mở `src/App.jsx`, tìm dòng:

```javascript
const CORRECT_PASSWORD = 'happybirthday'; // Đổi mật khẩu tại đây
```

### Thay Đổi Ảnh Avatar

1. Thêm ảnh vào `src/assets/images/avatar.jpg`
2. Mở `src/components/BirthdayScene.jsx`
3. Sửa phần avatar:

```jsx
<div className="avatar">
  <img src="/src/assets/images/avatar.jpg" alt="Avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
</div>
```

### Chỉnh Sửa Nội Dung Thư Tình

Mở `src/components/LetterModal.jsx`, tìm `LETTER_CONTENT`:

```javascript
const LETTER_CONTENT = {
  greeting: "Em yêu của anh,",
  paragraphs: [
    "Đoạn văn 1...",
    "Đoạn văn 2...",
    // Thêm hoặc sửa các đoạn
  ],
  signature: "Mãi yêu em,\nAnh của em ❤️"
};
```

### Điều Chỉnh Độ Nhạy Microphone

Mở `src/components/CakeScene.jsx`, tìm:

```javascript
const { isBlowing } = useMicBlowDetector(50); // Số càng nhỏ càng nhạy (30-70)
```

## 📁 Cấu Trúc Project

```
birthday-app/
├── src/
│   ├── components/
│   │   ├── PasswordGate.jsx      # Trang nhập mật khẩu
│   │   ├── CakeScene.jsx          # Trang bánh kem & nến
│   │   ├── Candle.jsx             # Component nến
│   │   ├── BirthdayScene.jsx      # Trang chúc mừng
│   │   ├── LetterModal.jsx        # Popup bức thư
│   │   ├── Fireworks.jsx          # Pháo hoa
│   │   ├── FloatingHearts.jsx     # Trái tim bay
│   │   └── Confetti.jsx           # Confetti rơi
│   ├── hooks/
│   │   └── useMicBlowDetector.js  # Hook microphone
│   ├── styles/
│   │   ├── theme.css              # Theme colors
│   │   └── animations.css         # CSS animations
│   └── App.jsx                    # Main app
└── package.json
```

## 🎯 Luồng Hoạt Động

1. **Password Gate** → User nhập mật khẩu
2. **Cake Scene** → Cho phép mic → Thổi nến
3. **Birthday Scene** → Fireworks + Confetti tự động
4. **Letter Modal** → Click "Mở Thư" → Đọc thư với typing animation

## 🔊 Lưu Ý Microphone

- Browser sẽ yêu cầu quyền truy cập microphone
- Chỉ hoạt động trên **HTTPS** hoặc **localhost**
- Hỗ trợ: Chrome, Firefox, Edge, Safari (iOS)
- Nếu không có mic, có thể bỏ qua bằng cách  tắt hết nến thủ công (sửa code)

## 📱 Responsive

Website responsive hoàn toàn cho:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## ♿ Accessibility

- Hỗ trợ `prefers-reduced-motion`
- ARIA labels cho buttons
- Keyboard accessible
- High contrast colors

## 🚀 Deploy

### Netlify (Recommended)

1. Build project: `npm run build`
2. Upload folder `dist` lên Netlify
3. Hoặc connect GitHub repo

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# Copy dist/ folder to gh-pages branch
```

## 🐛 Troubleshooting

**Microphone không hoạt động?**
- Kiểm tra quyền truy cập mic trong browser
- Chỉ hoạt động trên HTTPS hoặc localhost
- Thử browser khác (Chrome recommended)

**Animations bị lag?**
- Giảm số lượng particles (edit component)
- Tắt reduced-motion trong OS settings
- Đóng các tab khác

**Password không chấp nhận?**
- Mật khẩu mặc định: `happybirthday`
- Case-sensitive
- Kiểm tra `src/App.jsx`

## 📝 License

Project này là mã nguồn mở cho mục đích cá nhân.

## 💖 Credits

Built with:
- React + Vite
- GSAP (animations)
- Web Audio API (microphone)
- Love ❤️

---

**Chúc bạn có một ngày sinh nhật thật đặc biệt! 🎂🎉**
