$(document).ready(function () {
  $('#tableData').DataTable({
    paging: false,
    language: {
      info: '_TOTAL_ items',
    },
    order: [[2, 'asc']],
    columnDefs: [
      {
        targets: [0, 1, 5],
        orderable: false,
      },
    ],
  });
});

var inputs = document.querySelectorAll('.uploadFile');

Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener('change', function (e) {
    var fileName = '';
    if (this.files && this.files.length > 1)
      fileName = (this.getAttribute('data-multiple-caption') || '').replace(
        '{count}',
        this.files.length
      );
    else {
      fileName = e.target.value.split('\\').pop();
    }

    if (fileName) label.querySelector('span').innerHTML = fileName;
    else label.innerHTML = labelVal;
  });
});

var checkboxes = document.querySelectorAll('.downloadBulkCheckbox');

Array.prototype.forEach.call(checkboxes, function (cb) {
  cb.addEventListener('change', function () {
    checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked')
      .length;
    if (checkedBoxes >= 1) {
      document.getElementById('downloadBulkButton').style.display = 'block';
    } else {
      document.getElementById('downloadBulkButton').style.display = 'none';
    }
  });
});

function selectAll() {
  Array.prototype.forEach.call(checkboxes, function (cb) {
    cb.checked = true;
  });
  document.getElementById('downloadBulkButton').style.display = 'block';
}

function selectNone() {
  Array.prototype.forEach.call(checkboxes, function (cb) {
    cb.checked = false;
  });
  document.getElementById('downloadBulkButton').style.display = 'none';
}

var wsURL =
  'ws://' +
  window.location.host +
  '/14644be038ea0118a1aadfacca2a7d1517d7b209c4b9674ee893b1944d1c2d54/ws';
var connection = new WebSocket(wsURL);

connection.onopen = function () {
  console.log('Connected via WebSockets');
};

connection.onclose = function () {
  console.log('Connection has been closed by WebSocket Server');
};

connection.onerror = function (e) {
  console.log('Websocket error: ', e);
};

connection.onmessage = function (m) {
  try {
    var message = JSON.parse(m.data);
    console.log(message);
  } catch (e) {
    console.log('Error reading message: ', e);
  }
};
