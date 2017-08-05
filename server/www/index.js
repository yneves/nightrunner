function post(content, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4) {
      try {
        let data = JSON.parse(xmlhttp.responseText);
        callback(null, data);
      } catch (e) {
        callback(e);
      }
    }
  };
  xmlhttp.open('POST', '/api/test', true);
  xmlhttp.setRequestHeader('Content-type', 'application/json');
  xmlhttp.send(JSON.stringify(content));
}

post({a: 1, b: 2, c: 3}, function(error, data) {
  let div = document.createElement('div');
  div.id = 'http';
  div.textContent = JSON.stringify(data);
  document.body.appendChild(div);
});
