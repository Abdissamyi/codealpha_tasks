const form = document.getElementById("calculator-form");
const display = document.getElementById("display");

if (form && display) {
    form.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof HTMLInputElement) || target.type !== "button") {
            return;
        }

        const value = target.value;

        if (value === "AC") {
            display.value = "";
        } else if (value === "DE") {
            display.value = display.value.toString().slice(0, -1);
        } else if (value === "=") {
            try {
                display.value = Function(`"use strict";return (${display.value})`)();
            } catch {
                display.value = "";
            }
        } else {
            display.value += value;
        }
    });
}
