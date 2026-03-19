document.getElementById("calc-power-btn").addEventListener("click", () =>{
    const base = Number(document.getElementById("base-input").value);
    const exp = Number(document.getElementById("exponent-input").value);

    if (base < 1 || base > 10 || exp < 1 || exp > 10){
        document.getElementById("power-output").textContent = "enter an number between 1 and 10";
        return;
    }

    const result = Math.pow(base, exp);
    document.getElementById("power-output").innerHTML = `${base}<sup>${exp}</sup> = ${result}`

});