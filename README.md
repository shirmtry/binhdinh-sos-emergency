# 🆘 binhdinh-sos-emergency — SOS Cứu hộ khẩn cấp Bình Định 2026

> Tác giả: **HTK** · Hotline/Zalo: **0396241674** · Email: htk.contact@gmail.com · Cập nhật: **09/11/2026**

## 🌊 Vấn đề (mùa mưa lũ 2026)

Tháng 11/2026, bão số 9 và số 10 đổ bộ Quy Nhơn – Phù Cát – Hoài Nhơn; lũ sông Kôn dâng cao tại Tuy Phước, An Nhơn; sạt lở An Lão, Vĩnh Thạnh, Tây Sơn; ngập úng đô thị Quy Nhơn; xói lở bờ biển Nhơn Lý – Cát Tiến – Mỹ Thành; mất điện diện rộng 3–7 ngày; tàu cá gặp nạn khi biển động cấp 7–8. Người dân bị cô lập cần **cầu cứu nhanh, đúng đầu số**.

## ✨ Tính năng

- **Form SOS** (họ tên, SĐT, vị trí + GPS, mức độ khẩn cấp, mô tả) — lưu **localStorage** phía client, hiển thị danh sách yêu cầu đã gửi, hoạt động khi chập chờn mạng.
- **30 đầu số cứu hộ**: cứu hộ cứu nạn **112**, cấp cứu **115**, công an 113, PCCC 114, công an xã/huyện, điện lực, y tế, hàng hải Bình Định — bộ lọc theo nhóm + tìm kiếm.
- **Hotline HTK 0396241674** nổi bật trên navbar, banner, footer mọi trang.
- Trang chủ mô tả bối cảnh Bình Định 2026, trang Giới thiệu, trang 404 có hotline.
- Responsive 375px → 1440px, UI tiếng Việt.

> ⚠️ **Dữ liệu mô phỏng – cập nhật 09/11/2026**: các số `0256.xxx.xxx` là số mô phỏng theo cấu trúc đầu số Bình Định, KHÔNG phải số chính thức. Chỉ 112/113/114/115 và hotline HTK 0396241674 là đầu số hoạt động. Form SOS không kết nối trực tiếp tới lực lượng cứu hộ.

## 🛠️ Công nghệ

- **Node.js + Express + EJS** (server-side rendering)
- HTML/CSS/JS thuần phía client, localStorage
- Deploy: **Vercel** (`@vercel/node`, rewrite + includeFiles cho views/public)

## 🚀 Cách chạy local

```bash
npm install
npm start
# Mở http://localhost:3000
```

## 📁 Cấu trúc

```
api/index.js        # Express app (export cho Vercel), 30 đầu số mock
views/              # index, sos, hotlines, about, 404 + partials (header/footer)
public/             # style.css, sos.js (localStorage), hotlines.js (filter)
vercel.json         # rewrites + includeFiles {views,public}/**
```

## 🔗 Deploy

- Vercel: xem `deploy_url.txt` (cập nhật sau khi deploy production)

## 📞 Liên hệ HTK – 0396241674 – 09/11/2026

- **Hotline/Zalo**: [0396241674](tel:0396241674) — Zalo: https://zalo.me/0396241674
- **Email**: [htk.contact@gmail.com](mailto:htk.contact@gmail.com)
- **Tác giả**: HTK — hỗ trợ cộng đồng mùa mưa lũ 2026

© 2026 HTK · Hotline/Zalo: 0396241674 · Email: htk.contact@gmail.com · Cập nhật: 09/11/2026