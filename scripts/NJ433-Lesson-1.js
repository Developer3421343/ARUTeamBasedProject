document.getElementById("is-it-a-prime-btn").addEventListener("click", () => {

    let input = document.getElementById("is-it-a-prime-input").value;
    let prime = true;

    input = parseInt(input);
    
    if (typeof input !== "number" || isNaN(input)) {
        return;
    }

    for(let i = 2, s = Math.sqrt(input); i <= s; i++) {
        if(input % i === 0) prime = false;
    }
    if ([0, 1].includes(input)) prime = false;


    document.getElementById("is-it-a-prime-output").textContent = prime ? input + " is a prime number!" : input + " is not a prime number!";
});