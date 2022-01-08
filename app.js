let textarea = document.getElementById("textarea");
let lineNumbersBtn = document.getElementById("line-numbers-btn");
let preview = document.getElementById("preview");
let setColorBtn = document.getElementById("set-color-btn");
let themeSwichBtn = document.getElementById("theme-switch-btn");
let modeSwichBtn = document.getElementById("mode-switch-btn");
let fontSwitchBtn = document.getElementById("font-switch-btn");
let fontSizeSwitchBtn = document.getElementById("font-size-switch-btn");
let loader = document.querySelector(".loading");
let title = document.getElementById("title");
let openFileBtn = document.getElementById("open-file-btn");
let logo = document.querySelector(".karton-logo");

let editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,
  mode: "javascript",
});
let lineNumbers = true;
editor.setOption("theme", "darcula");
editor.setOption("lineNumbers", lineNumbers);

//Satır numarası gizleme/gösterme
lineNumbersBtn.addEventListener("click", (e) => {
  lineNumbers = !lineNumbers;
  editor.setOption("lineNumbers", lineNumbers);
});

//Arkaplan rengini ayarlama

setColorBtn.addEventListener("input", (e) => {
  preview.style.backgroundColor = e.target.value;
});

//Temayı ayarlar

themeSwichBtn.addEventListener("change", (e) => {
  let themeCss = document.getElementById("theme-css");
  themeCss.parentNode.removeChild(themeCss);
  let link = document.createElement("link");
  link.setAttribute("href", "codemirror/theme/" + e.target.value + ".css");
  link.setAttribute("id", "theme-css");
  link.setAttribute("rel", "stylesheet");
  document.querySelector("head").appendChild(link);
  editor.setOption("theme", e.target.value);
});

//Modu ayarlar

modeSwichBtn.addEventListener("change", (e) => {
  editor.setOption("mode", e.target.value);
});

//Font ayarlama
fontSwitchBtn.addEventListener("change", (e) => {
  document.querySelector(".CodeMirror").style.fontFamily = e.target.value;
});
//Font boyutu ayarlama
fontSizeSwitchBtn.addEventListener("change", (e) => {
  document.querySelector(".CodeMirror").style.fontSize = e.target.value;
});

const exportImage = (size) => {
  preview.style.transform = "scale(" + size + ")";
  loader.style.display = "flex";
  logo.style.display = "flex";
  html2canvas(preview).then((canvas) => {
    loader.style.display = "none";
    logo.style.display = "none";
    preview.style.transform = "scale(1)";
    let a = document.createElement("a");
    a.setAttribute("download", "karton.png");
    a.setAttribute("href", canvas.toDataURL("image/png"));
    a.click();
  });
};

//Dosya açma

openFileBtn.addEventListener("click", async () => {
  [fileHandle] = await window.showOpenFilePicker();
  let file = await fileHandle.getFile();
  let content = await file.text();
  editor.getDoc().setValue(content);
});
