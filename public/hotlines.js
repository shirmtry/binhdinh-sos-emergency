// Bộ lọc danh bạ cứu hộ — HTK 0396241674 — Cập nhật: 09/11/2026
(function () {
  'use strict';
  var selNhom = document.getElementById('filter-nhom');
  var txt = document.getElementById('filter-text');
  var rows = Array.prototype.slice.call(document.querySelectorAll('#hotline-table tbody tr'));
  var count = document.getElementById('filter-count');

  function apply() {
    var nhom = selNhom.value;
    var q = txt.value.toLowerCase().trim();
    var shown = 0;
    rows.forEach(function (tr) {
      var okNhom = !nhom || tr.getAttribute('data-nhom') === nhom;
      var okText = !q || tr.textContent.toLowerCase().indexOf(q) !== -1;
      var show = okNhom && okText;
      tr.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    count.textContent = 'Hiển thị ' + shown + '/' + rows.length + ' đầu số. Dữ liệu mô phỏng – cập nhật 09/11/2026.';
  }
  selNhom.addEventListener('change', apply);
  txt.addEventListener('input', apply);
  apply();
})();