let display = document.querySelector('.display'),
    curPos = display.selectionStart,
    buttons,
    language = "eng",
    langKeys;

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
    capsLock: false
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
      "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
      "shift_r", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift_l", 
      "ctrl_r", "lang", "alt_l", "space", "alt_l", "win",  "done", "ctrl_l",  
    ];

    const buttonsRu = [
      "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
      "shift_r", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", "shift_l", 
      "ctrl_r", "lang", "alt_l", "space", "alt_l", "win",  "done", "ctrl_l",  
    ];

    if (lang === "eng") {layouts = buttonsEng}
      else {layouts = buttonsRu}
    layouts.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "?", "ъ"].indexOf(key) !== -1;

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
          });

          break;

        case "enter":
          keyElement.classList.add("button_wide");
          keyElement.innerHTML = "enter";

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
          keyElement.innerHTML = "spacebar";
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

        case "ctrl_r":
          keyElement.addEventListener("click", () => {
            if (language === "eng") {
              language = "ru"
              Keyboard._createKeys("ru")
            } else {
              language = "eng";
              Keyboard._createKeys("eng")
            }
           ;
          });

          break;

        case "done":
          keyElement.classList.add("button_wide", "button_accept");
          keyElement.innerHTML = "done";
          keyElement.addEventListener("click", () => {
            this.elements.keyboard.classList.add("inactive");
            display.blur()
          });

          break;

        case "lang":
          keyElement.classList.add("button", "button_lang");
          keyElement.innerHTML = "lang";
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
              
          });

          break;

        default:
          keyElement.textContent = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
          keyElement.addEventListener("click", () => {
          curPos = display.selectionStart;
          if (curPos === display.value.length) {
              display.value += (this.properties.capsLock ? key.toUpperCase() : key.toLowerCase());}
          else {
              let cache = display.value.slice(curPos)
              display.value = display.value.slice(0, curPos) + (this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()) + cache;
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
      // if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      // }
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

console.log(event.code.slice(-1))
buttons.find(el => el.textContent.toLowerCase() === event.code.slice(-1).toLowerCase()).style.color = "red"

});