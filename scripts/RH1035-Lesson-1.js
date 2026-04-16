// Radius & diameter

document.getElementById("radius-input").addEventListener("change", (e) => {
    let rawResult = e.target.value * 2;
    let roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
    document.getElementById("diameter-input").value = roundedResult;
})

document.getElementById("diameter-input").addEventListener("change", (e) => {
    let rawResult = e.target.value / 2;
    let roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
    document.getElementById("radius-input").value = roundedResult;
})

// Circumference

document.getElementById("circumference-diameter-input").addEventListener("change", (e) => {
    let rawResult = e.target.value * Math.PI;
    let roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
    document.getElementById("circumference-output").innerHTML = roundedResult;
})

// Area

document.getElementById("area-radius-input").addEventListener("change", (e) => {
    let rawResult = Math.pow(e.target.value, 2) * Math.PI;
    let roundedResult = Math.round((rawResult + Number.EPSILON) * 100) / 100;
    document.getElementById("area-output").innerHTML = roundedResult;
})