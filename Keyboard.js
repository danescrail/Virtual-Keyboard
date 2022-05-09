const keyLayoutEng = [
    "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "Backspace1",
    "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "Delete",
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter1",
    "Shift", "Z", "X", "C", "V", "B", "N", "M", ".", ",", "/", "↑", "Shift1",
    "Ctrl1", "Win", "Alt", "space", "Alt1", "Ctrl", "←", "↓", "→"
];

const keyLayoutRus = [
    "Ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "Backspace1",
    "Tab", 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', "Delete",
    "CapsLock", 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', "Enter1",
    "Shift", 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', "/", "↑", "Shift1",
    "Ctrl1", "Win", "Alt", "space", "Alt1", "Ctrl", "←", "↓", "→"
];

let body = document.querySelector("body");

let btn_switch = document.createElement("div");
btn_switch.classList.add("btn-switch");
body.appendChild(btn_switch);

let switcher;
let count_switch = 1;

switcher = keyLayoutEng;
btn_switch.innerHTML = "Run virtual keyboard";

hide = document.querySelector(".hide");


let textarea = document.createElement("textarea");
textarea.classList.add("text");
textarea.classList.add("hide");

body.appendChild(textarea);

let ul = document.createElement("ul");
ul.classList.add("hide");
body.appendChild(ul);


btn_switch.addEventListener("click", function () {

    if (count_switch % 2 === 0) {
        ul.innerHTML = "";
        ul.classList.remove("hide");
        textarea.classList.remove("hide");
        btn_switch.innerHTML = "ENG";

        for (let key of keyLayoutEng) {
            if (key === "Ctrl") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                button.classList.add("CtrlRight");
                ul.appendChild(button);
                continue;
            }

            if (key === "Ctrl1") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.style.marginLeft = "25px";
                button.innerHTML = key;
                button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                button.classList.add("CtrlLeft");
                ul.appendChild(button);
                continue;
            }

            if (key !== "Backspace1" && key !== "Delete1" && key !== "Enter1" && key !== "Shift1" && key !== "space" && key !== "Alt1") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                ul.appendChild(button);
                if (key === "Shift") {
                    button.classList.add("ShiftLeft");
                }
                if (key === "Alt") {
                    button.classList.add("AltLeft");
                }
            } else if (key !== "space") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                ul.appendChild(button);
                if (key === "Shift1") {
                    button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                    button.classList.add("ShiftRight");
                } else {
                    button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                }
                if (key === "Alt1") {
                    button.classList.add("AtlRight");
                }

            } else if (key === "space") {
                let button = document.createElement("button");
                button.id = "space";
                button.classList.add("btn_space");
                ul.appendChild(button);
            }
        }

        count_switch++;
        let keys = document.querySelectorAll("button");
        let space = document.querySelector(".btn_space");
        let count_CL = 1;

        for (let button of keys) {
            button.addEventListener("click", function () {
                var posCursor = this.selectionEnd;

                if (this.innerHTML !== "Tab" && this.innerHTML !== "CapsLock" && this.innerHTML !== "Shift" &&
                    this.innerHTML !== "Ctrl" && this.innerHTML !== "Alt" && this.innerHTML !== "Enter" &&
                    this.innerHTML !== "Backspace" && this.innerHTML !== "Win" && this.innerHTML !== "Delete" && this !== space) {
                    if (count_CL % 2) {
                        textarea.value += this.innerHTML.toLowerCase();
                    } else {
                        textarea.value += this.innerHTML.toUpperCase();
                    }
                } else if (this.innerHTML === "Backspace") {
                    if (textarea.selectionStart > 0) {
                        textarea.value = textarea.value.slice(0, textarea.selectionStart - 1) + textarea.value.slice(textarea.selectionStart, textarea.value.length);
                    } else {
                        textarea.value = textarea.value.slice(0, textarea.value.length - 1);
                        console.log(textarea.selectionStart);
                    }
                } else if (this.innerHTML === "Enter") {
                    textarea.value = textarea.value + "\n";
                } else if (this.innerHTML.length === 0) {
                    textarea.value = textarea.value + " ";
                } else if (this === space) {
                    textarea.value = textarea.value.slice(0, posCursor) + " " + textarea.value;
                } else if (this.innerHTML === "Tab") {
                    textarea.value = textarea.value + " " + " " + " " + " ";
                } else if (this.innerHTML === "Delete") {
                    textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);
                } else if (this.innerHTML === "CapsLock") {
                    count_CL++;
                }
            });
        }

        textarea.addEventListener("keydown", function (event) {
            let str = event.key;
            let Ctrl = event.code;

            if (str !== "Tab" && str !== "Control" && str !== "CapsLock" &&
                str !== "Shift" && str !== "Enter" && str !== "Backspace" &&
                str !== "Win" && str !== "Delete" && str !== "Alt" &&
                str !== "ArrowRight" && str !== "ArrowLeft" &&
                str !== "ArrowUp" && str !== "ArrowDown" && str !== "Meta") {
                str = str.slice(str.length - 1);
            } else {
                str = event.key;
            }

            for (let elem of keys) {
                if (elem.classList.contains("AltRight") && Ctrl === "AltRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("AltLeft") && Ctrl === "AltLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("ShiftLeft") && Ctrl === "ShiftLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("ShiftRight") && Ctrl === "ShiftRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.innerHTML.toUpperCase() === str.toUpperCase() && elem.innerHTML !== "Shift" && elem.innerHTML !== "Alt") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("CtrlLeft") && Ctrl === "ControlLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("CtrlRight") && Ctrl === "ControlRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");

                }

                if (str === "ArrowRight" && elem.innerHTML === "→") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowLeft" && elem.innerHTML === "←") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowDown" && elem.innerHTML === "↓") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowUp" && elem.innerHTML === "↑") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "Meta" && elem.innerHTML === "Win") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("btn_space") && str === " ") {
                    elem.classList.remove("btn_space");
                    elem.classList.add("btn_space_active");
                }

                if (str === "Tab" && elem.innerHTML === "Tab") {
                    textarea.value = textarea.value + " " + " " + " " + " ";
                }
            }
        });

        textarea.addEventListener("keyup", function (event) {
            let str = event.key;

            for (let elem of keys) {
                if (elem.classList.contains("btn_keyboard_active") &&
                    str.toUpperCase() === elem.innerHTML.toUpperCase()) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }
                if (str === "ArrowRight" && elem.innerHTML === "→" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowLeft" && elem.innerHTML === "←" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowDown" && elem.innerHTML === "↓" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowUp" && elem.innerHTML === "↑" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.innerHTML === "Ctrl" && str === "Control") {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.innerHTML === "Tab" && str === "Tab") {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.classList.contains("btn_space_active")) {
                    elem.classList.remove("btn_space_active");
                    elem.classList.add("btn_space");
                }

                if (str === "Tab") {
                    event.preventDefault()
                }
            }
        });
    } else {
        ul.classList.remove("hide");
        textarea.classList.remove("hide");
        ul.innerHTML = "";
        btn_switch.innerHTML = "RUS";
        
        for (let key of keyLayoutRus) {
            if (key === "Ctrl") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                button.classList.add("CtrlRight");
                ul.appendChild(button);
                continue;
            }

            if (key === "Ctrl1") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.style.marginLeft = "43px";
                button.innerHTML = key;
                button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                button.classList.add("CtrlLeft");
                ul.appendChild(button);
                continue;
            }

            if (key !== "Backspace1" && key !== "Delete1" && key !== "Enter1" && key !== "Shift1" && key !== "space" && key !== "Alt1") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                ul.appendChild(button);
                if (key === "Shift") {
                    button.classList.add("ShiftLeft");
                }
                if (key === "Alt") {
                    button.classList.add("AltLeft");
                }
            } else if (key !== "space") {
                let button = document.createElement("button");
                button.classList.add("btn_keyboard");
                button.innerHTML = key;
                ul.appendChild(button);
                if (key === "Shift1") {
                    button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                    button.classList.add("ShiftRight");
                } else {
                    button.innerHTML = button.innerHTML.slice(0, button.innerHTML.length - 1);
                }
                if (key === "Alt1") {
                    button.classList.add("AtlRight");
                }

            } else if (key === "space") {
                let button = document.createElement("button");
                button.id = "space";
                button.classList.add("btn_space");
                ul.appendChild(button);
            }
        }
        count_switch++;
        let space_btn = document.querySelector(".btn_space");
        space_btn.style.width = "219px";

        let keys = document.querySelectorAll("button");
        let space = document.querySelector(".btn_space");
        let count_CL = 1;

        for (let button of keys) {
            button.addEventListener("click", function () {
                var posCursor = this.selectionEnd;

                if (this.innerHTML !== "Tab" && this.innerHTML !== "CapsLock" && this.innerHTML !== "Shift" &&
                    this.innerHTML !== "Ctrl" && this.innerHTML !== "Alt" && this.innerHTML !== "Enter" &&
                    this.innerHTML !== "Backspace" && this.innerHTML !== "Win" && this.innerHTML !== "Delete" && this !== space) {
                    if (count_CL % 2) {
                        textarea.value += this.innerHTML.toLowerCase();
                    } else {
                        textarea.value += this.innerHTML.toUpperCase();
                    }
                } else if (this.innerHTML === "Backspace") {
                    if (textarea.selectionStart > 0) {
                        textarea.value = textarea.value.slice(0, textarea.selectionStart - 1) + textarea.value.slice(textarea.selectionStart, textarea.value.length);
                    } else {
                        textarea.value = textarea.value.slice(0, textarea.value.length - 1);
                        console.log(textarea.selectionStart);
                    }
                } else if (this.innerHTML === "Enter") {
                    textarea.value = textarea.value + "\n";
                } else if (this.innerHTML.length === 0) {
                    textarea.value = textarea.value + " ";
                } else if (this === space) {
                    textarea.value = textarea.value.slice(0, posCursor) + " " + textarea.value;
                } else if (this.innerHTML === "Tab") {
                    textarea.value = textarea.value + " " + " " + " " + " ";
                } else if (this.innerHTML === "Delete") {
                    textarea.value = textarea.value.slice(0, textarea.selectionStart) + textarea.value.slice(textarea.selectionStart + 1, textarea.value.length);
                } else if (this.innerHTML === "CapsLock") {
                    count_CL++;
                }
            });
        }

        textarea.addEventListener("keydown", function (event) {
            let str = event.key;
            let Ctrl = event.code;

            if (str !== "Tab" && str !== "Control" && str !== "CapsLock" &&
                str !== "Shift" && str !== "Enter" && str !== "Backspace" &&
                str !== "Win" && str !== "Delete" && str !== "Alt" &&
                str !== "ArrowRight" && str !== "ArrowLeft" &&
                str !== "ArrowUp" && str !== "ArrowDown" && str !== "Meta") {
                str = str.slice(str.length - 1);
            } else {
                str = event.key;
            }

            for (let elem of keys) {
                if (elem.classList.contains("AltRight") && Ctrl === "AltRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("AltLeft") && Ctrl === "AltLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("ShiftLeft") && Ctrl === "ShiftLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("ShiftRight") && Ctrl === "ShiftRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.innerHTML.toUpperCase() === str.toUpperCase() && elem.innerHTML !== "Shift" && elem.innerHTML !== "Alt") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("CtrlLeft") && Ctrl === "ControlLeft") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("CtrlRight") && Ctrl === "ControlRight") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");

                }

                if (str === "ArrowRight" && elem.innerHTML === "→") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowLeft" && elem.innerHTML === "←") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowDown" && elem.innerHTML === "↓") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "ArrowUp" && elem.innerHTML === "↑") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (str === "Meta" && elem.innerHTML === "Win") {
                    elem.classList.remove("btn_keyboard_inactive");
                    elem.classList.add("btn_keyboard_active");
                }

                if (elem.classList.contains("btn_space") && str === " ") {
                    elem.classList.remove("btn_space");
                    elem.classList.add("btn_space_active");
                }

                if (str === "Tab" && elem.innerHTML === "Tab") {
                    textarea.value = textarea.value + " " + " " + " " + " ";
                }
            }
        });

        textarea.addEventListener("keyup", function (event) {
            let str = event.key;

            for (let elem of keys) {
                if (elem.classList.contains("btn_keyboard_active") &&
                    str.toUpperCase() === elem.innerHTML.toUpperCase()) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }
                if (str === "ArrowRight" && elem.innerHTML === "→" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowLeft" && elem.innerHTML === "←" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowDown" && elem.innerHTML === "↓" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (str === "ArrowUp" && elem.innerHTML === "↑" && elem.classList.contains("btn_keyboard_active")) {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.innerHTML === "Ctrl" && str === "Control") {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.innerHTML === "Tab" && str === "Tab") {
                    elem.classList.remove("btn_keyboard_active");
                    elem.classList.add("btn_keyboard_inactive");
                }

                if (elem.classList.contains("btn_space_active")) {
                    elem.classList.remove("btn_space_active");
                    elem.classList.add("btn_space");
                }

                if (str === "Tab") {
                    event.preventDefault()
                }
            }
        });
    }

});
