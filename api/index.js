// binhdinh-sos-emergency — SOS cứu hộ khẩn cấp Bình Định 2026
// Tác giả: HTK — Hotline/Zalo: 0396241674 — Email: htk.contact@gmail.com
// Cập nhật: 09/11/2026
const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Vercel rewrite "/(.*)" -> "/api/index/$1" keeps the prefix in req.url.
// Strip it before routing so Express routes match the original path.
app.use((req, res, next) => {
  if (req.url === '/api/index' || req.url.startsWith('/api/index/')) {
    req.url = req.url.slice('/api/index'.length) || '/';
  } else if (req.url.startsWith('/api/index?')) {
    req.url = req.url.slice('/api/index'.length);
  }
  next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 30 đầu số cứu hộ — Dữ liệu mô phỏng – cập nhật 09/11/2026
// Lưu ý: các số 0256.xxx.xxxx là số MÔ PHỎNG theo cấu trúc số Bình Định,
// không phải số liên lạc chính thức. Chỉ 112/113/114/115 là đầu số khẩn cấp quốc gia.
const HOTLINES = [
  { ten: 'Cứu hộ cứu nạn quốc gia', so: '112', nhom: 'Khẩn cấp quốc gia', ghichu: 'Gọi khi nguy cấp tính mạng trên biển, lũ, sạt lở', real: true },
  { ten: 'Công an — Cảnh sát 113', so: '113', nhom: 'Khẩn cấp quốc gia', ghichu: 'An ninh trật tự, tai nạn, tội phạm', real: true },
  { ten: 'Cảnh sát PCCC & Cứu nạn cứu hộ', so: '114', nhom: 'Khẩn cấp quốc gia', ghichu: 'Cháy nổ, mắc kẹt trong nhà ngập, sập đổ', real: true },
  { ten: 'Cấp cứu y tế 115', so: '115', nhom: 'Khẩn cấp quốc gia', ghichu: 'Cấp cứu người bị thương, đột quỵ, đuối nước', real: true },
  { ten: 'Hotline hỗ trợ HTK', so: '0396241674', nhom: 'Hỗ trợ cộng đồng', ghichu: 'HTK — hỗ trợ thông tin cứu hộ, Zalo 24/7', real: true },
  { ten: 'Ban Chỉ huy PCTT & TKCN tỉnh Bình Định', so: '0256.3822.101', nhom: 'Chỉ huy cứu hộ', ghichu: 'Điều phối cứu hộ bão số 9, 10/2026', real: false },
  { ten: 'Văn phòng thường trực Ban chỉ đạo tỉnh', so: '0256.3822.102', nhom: 'Chỉ huy cứu hộ', ghichu: 'Tiếp nhận tin báo thiên tai 24/24', real: false },
  { ten: 'Bộ Chỉ huy Quân sự tỉnh Bình Định', so: '0256.3822.201', nhom: 'Chỉ huy cứu hộ', ghichu: 'Lực lượng cứu hộ sạt lở An Lão, Vĩnh Thạnh', real: false },
  { ten: 'Phòng Cảnh sát PCCC tỉnh Bình Định', so: '0256.3822.114', nhom: 'Chỉ huy cứu hộ', ghichu: 'Cứu nạn nhà ngập sâu khu vực Quy Nhơn', real: false },
  { ten: 'Tìm kiếm cứu nạn hàng hải khu vực II', so: '0256.3822.112', nhom: 'Chỉ huy cứu hộ', ghichu: 'Tàu cá gặp nạn biển động cấp 7–8', real: false },
  { ten: 'Công an tỉnh Bình Định (trực ban)', so: '0256.3822.301', nhom: 'Công an', ghichu: 'Trực ban chỉ huy công an toàn tỉnh', real: false },
  { ten: 'Công an TP Quy Nhơn', so: '0256.3822.302', nhom: 'Công an', ghichu: 'Hộ trợ ngập úng đô thị Quy Nhơn', real: false },
  { ten: 'Công an TX An Nhơn', so: '0256.3822.303', nhom: 'Công an', ghichu: 'Khu vực lũ sông Kôn dâng cao', real: false },
  { ten: 'Công an huyện Tuy Phước', so: '0256.3822.304', nhom: 'Công an', ghichu: 'Di dời dân vùng lũ hạ lưu sông Kôn', real: false },
  { ten: 'Công an huyện Phù Cát', so: '0256.3822.305', nhom: 'Công an', ghichu: 'Vùng bão đổ bộ, xói lở Cát Tiến', real: false },
  { ten: 'Công an TX Hoài Nhơn', so: '0256.3822.306', nhom: 'Công an', ghichu: 'Cứu hộ tàu cá, sạt lở ven sông Lại Giang', real: false },
  { ten: 'Công an huyện An Lão', so: '0256.3822.307', nhom: 'Công an', ghichu: 'Sạt lở vùng núi, cô lập thôn bản', real: false },
  { ten: 'Công an huyện Vĩnh Thạnh', so: '0256.3822.308', nhom: 'Công an', ghichu: 'Sạt lở, cứu trợ vùng đồng bào dân tộc', real: false },
  { ten: 'Công an huyện Tây Sơn', so: '0256.3822.309', nhom: 'Công an', ghichu: 'Sạt lở, lũ thượng nguồn sông Kôn', real: false },
  { ten: 'Công an huyện Phù Mỹ', so: '0256.3822.310', nhom: 'Công an', ghichu: 'Xói lở bờ biển Mỹ Thành', real: false },
  { ten: 'Công an xã Nhơn Lý (TP Quy Nhơn)', so: '0256.3822.311', nhom: 'Công an', ghichu: 'Xói lở bờ biển Nhơn Lý sau bão 2026', real: false },
  { ten: 'Bệnh viện Đa khoa tỉnh Bình Định', so: '0256.3822.401', nhom: 'Y tế', ghichu: 'Cấp cứu tuyến tỉnh, tiếp nhận nạn nhân bão', real: false },
  { ten: 'Trung tâm Y tế TP Quy Nhơn', so: '0256.3822.402', nhom: 'Y tế', ghichu: 'Cấp cứu nội thành, trạm y tế lưu động', real: false },
  { ten: 'Trung tâm Y tế huyện Tuy Phước', so: '0256.3822.403', nhom: 'Y tế', ghichu: 'Cấp cứu vùng lũ, phòng dịch sau lũ', real: false },
  { ten: 'Hội Chữ thập đỏ tỉnh Bình Định', so: '0256.3822.404', nhom: 'Y tế', ghichu: 'Sơ cấp cứu, cứu trợ khẩn cấp', real: false },
  { ten: 'Điện lực Bình Định — xử lý sự cố', so: '0256.3822.501', nhom: 'Điện lực', ghichu: 'Mất điện diện rộng 3–7 ngày sau bão', real: false },
  { ten: 'Điện lực Quy Nhơn — trực sự cố', so: '0256.3822.502', nhom: 'Điện lực', ghichu: 'Báo dây điện đứt, trạm ngập nước', real: false },
  { ten: 'Công ty Cấp nước Bình Định', so: '0256.3822.503', nhom: 'Điện lực', ghichu: 'Nước sạch sau lũ, vỡ ống do sạt lở', real: false },
  { ten: 'Cảng vụ Hàng hải Quy Nhơn', so: '0256.3822.601', nhom: 'Hàng hải', ghichu: 'Tàu thuyền neo trú, cứu nạn trên biển', real: false },
  { ten: 'Đội cứu hộ thiện nguyện Nhơn Hải', so: '0256.3822.602', nhom: 'Hàng hải', ghichu: 'Xuồng cao su cứu dân vùng ngập, mô phỏng', real: false }
];

app.locals.mockLabel = 'Dữ liệu mô phỏng – cập nhật 09/11/2026';

app.get('/', (req, res) => {
  res.render('index', { title: 'Trang chủ', hotlines: HOTLINES.slice(0, 6) });
});

app.get('/sos', (req, res) => {
  res.render('sos', { title: 'Gửi yêu cầu SOS' });
});

app.get('/hotlines', (req, res) => {
  const nhoms = [...new Set(HOTLINES.map((h) => h.nhom))];
  res.render('hotlines', { title: 'Danh bạ cứu hộ', hotlines: HOTLINES, nhoms, total: HOTLINES.length });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Giới thiệu' });
});

// 404 — must be last
app.use((req, res) => {
  res.status(404).render('404', { title: 'Không tìm thấy trang', url: req.originalUrl });
});

module.exports = app;

// Chạy local: node api/index.js
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`SOS Binh Dinh chay tai http://localhost:${port} — HTK 0396241674`));
}