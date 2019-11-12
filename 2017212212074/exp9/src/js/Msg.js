
function Msg(txt, what, timeout = 3000) {
  let msgDiv = document.createElement('DIV');
  let content = document.createTextNode(txt);
  msgDiv.classList.add('alert');
  msgDiv.classList.add('m-msg');
  if (what == 0) {
    msgDiv.classList.add('alert-success');
  }
  else if (what == 1) {
    msgDiv.classList.add('alert-warning');
  }
  else if (what == 2) {
    msgDiv.classList.add('alert-danger');
  }
  msgDiv.appendChild(content);
  msgDiv.style.animationDuration = timeout / 1000 + 's';
  document.body.appendChild(msgDiv);
  setTimeout(function () {
    document.body.removeChild(msgDiv);
  }, timeout);
}