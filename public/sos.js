// SOS form — localStorage client — HTK 0396241674 — Cập nhật: 09/11/2026
(function () {
  'use strict';
  var KEY = 'binhdinh_sos_requests_2026';
  var form = document.getElementById('sos-form');
  var list = document.getElementById('sos-list');
  var msg = document.getElementById('form-msg');
  var btnClear = document.getElementById('btn-clear');
  var btnGps = document.getElementById('btn-gps');
  var gpsStatus = document.getElementById('gps-status');

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = String(s == null ? '' : s);
    return d.innerHTML;
  }
  function levelClass(mucdo) {
    if (mucdo.indexOf('Nguy cấp') === 0) return ['lv-0', 'badge-red'];
    if (mucdo.indexOf('Khẩn cấp') === 0) return ['lv-1', 'badge-amber'];
    return ['lv-2', 'badge-yellow'];
  }

  function render() {
    var items = load();
    if (!items.length) {
      list.innerHTML = '<p class="muted">Chưa có yêu cầu nào.</p>';
      btnClear.hidden = true;
      return;
    }
    btnClear.hidden = false;
    list.innerHTML = items.map(function (it, idx) {
      var cls = levelClass(it.mucdo);
      return '<article class="sos-item ' + cls[0] + '">' +
        '<div class="sos-head"><strong>#' + (items.length - idx) + ' · ' + esc(it.hoten) + '</strong>' +
        '<span class="badge ' + cls[1] + '">' + esc(it.mucdo) + '</span></div>' +
        '<p>📱 SĐT: <a href="tel:' + esc(it.sdt) + '">' + esc(it.sdt) + '</a></p>' +
        '<p>📍 Vị trí: ' + esc(it.vitri) + '</p>' +
        '<p>📝 ' + esc(it.mota) + '</p>' +
        '<p class="muted">🕒 Đã lưu lúc: ' + esc(it.thoigian) + ' (trên máy bạn)</p>' +
        '<p><a href="tel:112">🚨 Gọi 112 cứu hộ</a> · <a href="tel:0396241674">📞 HTK 0396241674</a></p>' +
        '</article>';
    }).join('');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.className = '';
    var hoten = form.hoten.value.trim();
    var sdt = form.sdt.value.trim();
    var vitri = form.vitri.value.trim();
    var mucdo = form.mucdo.value;
    var mota = form.mota.value.trim();
    if (!hoten || !sdt || !vitri || !mucdo || !mota) {
      msg.textContent = '⚠️ Vui lòng điền đầy đủ các trường bắt buộc (*).';
      msg.className = 'err';
      return;
    }
    if (!/^0\d{9}$/.test(sdt)) {
      msg.textContent = '⚠️ Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0.';
      msg.className = 'err';
      return;
    }
    var items = load();
    items.unshift({
      hoten: hoten, sdt: sdt, vitri: vitri, mucdo: mucdo, mota: mota,
      thoigian: new Date().toLocaleString('vi-VN')
    });
    save(items);
    form.reset();
    gpsStatus.textContent = '';
    render();
    msg.textContent = '✅ Đã lưu yêu cầu SOS trên máy bạn. Nguy cấp tính mạng hãy gọi ngay 112 hoặc HTK 0396241674!';
    msg.className = 'ok';
  });

  btnClear.addEventListener('click', function () {
    if (confirm('Xoá tất cả yêu cầu SOS đã lưu trên máy này?')) {
      save([]);
      render();
    }
  });

  btnGps.addEventListener('click', function () {
    if (!navigator.geolocation) {
      gpsStatus.textContent = 'Trình duyệt không hỗ trợ GPS.';
      return;
    }
    gpsStatus.textContent = 'Đang lấy toạ độ...';
    navigator.geolocation.getCurrentPosition(function (pos) {
      var lat = pos.coords.latitude.toFixed(6);
      var lng = pos.coords.longitude.toFixed(6);
      var cur = form.vitri.value.trim();
      form.vitri.value = (cur ? cur + ' — ' : '') + 'GPS: ' + lat + ', ' + lng;
      gpsStatus.textContent = '✅ Đã thêm toạ độ.';
    }, function () {
      gpsStatus.textContent = '⚠️ Không lấy được GPS, hãy nhập địa chỉ thủ công.';
    }, { timeout: 10000 });
  });

  render();
})();