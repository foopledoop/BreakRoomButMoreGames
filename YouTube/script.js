const dataURI = 'data:text/html,<meta name="viewport" content="width=device-width, initial-scale=1" /><title>budget youtube</title><body style="margin:0"><iframe frameborder="0" allowfullscreen="1" style="width:100vw;height:100vh;display:none"></iframe><textarea rows="4" cols="42" placeholder="paste your link here" onkeydown="if(event.key!=\'Enter\'&&event.keyCode!=13)return;event.preventDefault();document.querySelector(\'button\').click()"></textarea><br><button onclick="const m=document.querySelector(%27textarea%27).value.match(/.*(?:youtu\\.be\\/|v\\/|u\\/\\w\\/|embed\\/|shorts\\/|watch\\?v=)([^%23\\&\\?]*).*/);const%20v=((m&&m[1].length==11)?m[1]:0);if(v){const%20f=document.querySelector(%27iframe%27);f.src=%27https://www.youtube-nocookie.com/embed/%27+v+%27?modestbranding=1%27;f.style.display=%27block%27}%22%3ERun%20Video',
    tbox = document.querySelector("textarea"),
    water = document.getElementById("water"),
    stor = storageSupported();
var dark;
if (stor && window.localStorage.getItem("dark")) {
  dark = window.localStorage.getItem("dark") != "true";
  theme();
}
else dark = "unset";

if (location.hash) runVideo();
else tbox.focus();

window.onhashchange = runVideo;

document.querySelector("textarea").addEventListener("keydown", function(e) {
  if (e.key == "Enter" || e.keyCode == 13) {
    e.preventDefault();
    const v = getID();
    if (v) location.hash = '#' + v;
  }
});

document.querySelectorAll("button").forEach(_=>_.addEventListener("click", function() {
  this.style.background='#6c3';
  setTimeout(_=>this.style.background = '', 217);
}));

function runVideo() {
  const pre = getID(), hash = location.hash.substring(1);
  if (pre != hash) tbox.value = 'https://youtu.be/' + hash;
  const iframe = document.querySelector('iframe');
  iframe.src='https://www.youtube-nocookie.com/embed/' + hash + '?modestbranding=1';
  iframe.style.display='block';
}

function getID() {
  // modified from https://stackoverflow.com/questions/3452546#comment11747164_8260383
  const match = tbox.value.match(/.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#\&\?]*).*/);
  return (match && match[1].length == 11) ? match[1] : false;
}

function theme() {
  if (dark == "unset") {
    if (getComputedStyle(document.body).backgroundColor == 'rgb(32, 43, 56)') dark = false;
    else dark = true;
  } else dark = !dark;
  if (dark) water.href = "https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css";
  else water.href = "https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css";
  if (stor) window.localStorage.setItem("dark", dark);
}

function storageSupported() { // modified from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  var _stg;
  try {
    _stg = window.localStorage;
    var x = '__test__';
    _stg.setItem(x, x);
    _stg.removeItem(x);
    return true;
  } catch(e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      (_stg && _stg.length !== 0);
  }
}


// modified from https://stackoverflow.com/a/30810322

function copy(text) {
  if (!navigator.clipboard) {
    fallbackCopy(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log(`Async: Copied "${text}" to clipboard`);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
    fallbackCopy(text);
  });
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log(`Fallback: Copying "${text}" to clipboard was ` + msg);
  } catch (err) {
    console.error('Fallback: Could not copy text: ', err)
  }

  document.body.removeChild(textArea);
}
