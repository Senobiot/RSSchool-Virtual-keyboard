let display = document.querySelector('.display'),
    curPos = display.selectionStart,
    buttons,
    language = "eng",
    langKeys,
    casheLayout = [],
    casheLang,
    keycodes = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69,
    82, 84, 89, 85, 73, 79, 80, 219, 221, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222,
    220, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 555, 777, 32, 999, 37, 40, 39]

display.addEventListener('click', function(){
  document.querySelector('.keyboard').classList.remove("inactive")
})

const VirtialKbd = {
  elements: {
    keyboard: null,
    btnWrapper: null,
    buttons: []
  },

  properties: {
    capsLock: false,
    shift: false
  },

  init(lang) {
    //adds containers
    this.elements.keyboard = document.createElement("div");
    this.elements.btnWrapper = document.createElement("div");
    //add classes
    this.elements.keyboard.classList.add("keyboard", "inactive"); // тут добавить inactive
    this.elements.btnWrapper.classList.add("btnWrapper");
    //create buttons
    this.elements.btnWrapper.appendChild(this.createKeys(lang));
    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
    //add buttons container 
    this.elements.keyboard.appendChild(this.elements.btnWrapper);
    document.body.appendChild(this.elements.keyboard);
    buttons = Array.from(this.elements.buttons);
  },

  createKeys(lang) {
    let layouts;
    const fragment = document.createDocumentFragment();
    const buttonsEng = [
      "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up",
      "speech", "lang", "space", "done", "left", "down", "right",
    ];

    const buttonsRu = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "up", 
      "speech", "lang", "space", "done", "left", "down", "right", 
    ];

      const shiftEng = [
      "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
      "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
      "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "enter",
      "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "up", 
      "speech", "lang", "space", "done", "left", "down", "right", 
    ];
      const shiftRu = [
      "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
      "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
      "caps", "Ф", "Ы", "В", "Ф", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "enter",
      "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "up",  
      "speech", "lang", "space", "done", "left", "down", "right", 
    ];

    if (lang === "eng") {layouts = buttonsEng}
      else if (lang === "ru") {layouts = buttonsRu}
      else if (lang === "shiftEng") {layouts = shiftEng}
      else if (lang === "shiftRu") {layouts = shiftRu}

    layouts.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "ъ", "up", "Ъ", "}"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("button");

      switch (key) {
        case "backspace":
          keyElement.classList.add("button_wide");
          keyElement.innerHTML = "backspace";

          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos === 0) {}
            else if (curPos === display.value.length && curPos !==0) {
              display.value = display.value.substring(0, display.value.length - 1)
              setCaretToPos(display, curPos - 1)
            }
            else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos).substring(0, display.value.slice(0, curPos).length - 1) + cache;
              setCaretToPos(display, curPos - 1)
          }           
            display.focus()
          });

          break;

        case "caps":
          if (this.properties.capsLock) {
            keyElement.classList.add("button_wide", "button_switch")
          } else {keyElement.classList.add("button_wide")}
          keyElement.innerHTML = "Caps Lock";
          keyElement.addEventListener("click", () => {
            this.toggleCapsLock()
            keyElement.classList.toggle("button_switch", this.properties.capsLock);
            display.focus()
          });

          break;

          case "tab":
            keyElement.classList.add("button_wide")
            keyElement.innerHTML = "Tab";
            keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + "\t";
            } else { 
              let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + "\t" + cache;}
                  setCaretToPos(display, curPos + 1)
            display.focus()
          });

          break;

        case "enter":
          keyElement.classList.add("button_wide");
          keyElement.innerHTML = "ENTER";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + "\n";
            } else { 
              let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + "\n" + cache;}
                  setCaretToPos(display, curPos + 1)
            display.focus()
          });

          break;

        case "space":
          keyElement.classList.add("button_widest");
          keyElement.innerHTML = "SPACEBAR";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos === display.value.length) {
              display.value = display.value + " ";
            } else { 
                 let cache = display.value.slice(curPos)
                display.value = display.value.slice(0, curPos) + " " + cache;}
             setCaretToPos(display, curPos + 1)
            display.focus()
          });

          break;

        case "shift":
        if (this.properties.shift) {
          keyElement.classList.add("button_wide", "shift", "button_switch")
        }
          else {keyElement.classList.add("button_wide", "shift")
        }
          keyElement.addEventListener("click", () => {
              if (!this.properties.shift) {
                this.properties.shift = !this.properties.shift;
                this.elements.btnWrapper.innerHTML = "";
                if (language === "eng") {
                    this.elements.btnWrapper.appendChild(this.createKeys("shiftEng"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  } else {
                    this.elements.btnWrapper.appendChild(this.createKeys("shiftRu"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  }
                } else {
                  this.properties.shift = !this.properties.shift;
                  if (language === "eng") {
                    this.elements.btnWrapper.innerHTML = "";
                    this.elements.btnWrapper.appendChild(this.createKeys("eng"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  } else {
                     this.elements.btnWrapper.innerHTML = "";
                    this.elements.btnWrapper.appendChild(this.createKeys("ru"));
                    this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                  }
                }
                display.focus()
          });

          break;

        case "done":
          keyElement.classList.add("button_wide", "button_accept");
          keyElement.innerHTML = "DONE";
          keyElement.addEventListener("click", () => {
            this.elements.keyboard.classList.add("inactive");
            display.blur()
          });

          break;

        case "speech":
          keyElement.innerHTML = "SPEECH";
          keyElement.classList.add("button_wide", "button_speech");
          break;

        case "left":
          keyElement.innerHTML = "◄";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos !== 0) {
            setCaretToPos(display, curPos - 1)
            display.focus()
            } else {display.focus()}
        });
          break;

        case "right":
          keyElement.innerHTML = "►";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (curPos !== display.value.length) {
            setCaretToPos(display, curPos + 1)
            display.focus()
            } else {display.focus()}
        });
          break;

        case "up":
          keyElement.innerHTML = "▲";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (!display.value.slice(0, curPos).includes("\n")) {
            setCaretToPos(display, 0)
            display.focus()
            } else {
                let cache = display.value.slice(0, curPos).replace(/^.*\n/g, "").length;
                let cache_2 = display.value.slice(curPos).indexOf("\n");
                console.log(cache)
                console.log(cache_2)
                console.log(cache_2 + cache + display.value.slice(curPos).length)
                setCaretToPos(display, display.value.slice(0, curPos).length + 1 - cache)
              display.focus()
            }
        });
          break;

        case "down":
          keyElement.innerHTML = "▼";
          keyElement.addEventListener("click", () => {
            curPos = display.selectionStart;
            if (!display.value.slice(curPos).includes("\n")) {
            setCaretToPos(display, display.value.length)
            display.focus()
            } else {
                let cache = display.value.slice(0, curPos).replace(/^.*\n/g, "").length;
                let cache_2 = display.value.slice(curPos).indexOf("\n");
                console.log(cache)
                console.log(cache_2)
                console.log(cache_2 + cache + display.value.slice(curPos).length)
                setCaretToPos(display, cache_2 + cache + display.value.slice(0, curPos).length + 1)
              display.focus()
            }
        });
          break;

        case "lang":
          keyElement.classList.add("button", "button_lang", "button_wide");
          keyElement.innerHTML = "LANG";
          keyElement.addEventListener("click", () => {
              this.elements.btnWrapper.innerHTML = "";
              if (language === "eng") {
                this.elements.btnWrapper.appendChild(this.createKeys("ru"));
                this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");

                language = "ru";
              } else {
                this.elements.btnWrapper.appendChild(this.createKeys("eng"));
                 this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
                language = "eng";
              }
              //buttons = Array.from(this.elements.buttons)
          });

          break;

        default:
          keyElement.textContent = this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase();
          keyElement.addEventListener("click", () => {
          curPos = display.selectionStart;
          if (curPos === display.value.length) {
              display.value += (this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase());}
          else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos) + (this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase()) + cache;
          }
          setCaretToPos(display, curPos + 1)
          display.focus()
          });

          break;
      }

      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.buttons) {
        key.textContent = this.properties.capsLock || this.properties.shift ?
        key.textContent.toUpperCase(): key.textContent.toLowerCase();
    }
  },

};


window.addEventListener("DOMContentLoaded", function () {
  VirtialKbd.init("eng");
});


function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
   setSelectionRange(input, pos, pos);
}


document.addEventListener('keydown', function(event) {
  VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)].style.cssText = "transform: translate(2px, 2px); background-color: white;"
});

document.addEventListener('keyup', function(event) {
  VirtialKbd.elements.buttons[keycodes.indexOf(event.keyCode)].style.cssText = "transform: translate(0px, 0px);"
});
