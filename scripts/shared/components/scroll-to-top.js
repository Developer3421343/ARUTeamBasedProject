const sheet = new CSSStyleSheet();

async function loadCSS() {
	const res = await fetch("/stylesheets/shared/components/scroll-to-top.css");
	const css = await res.text();
	sheet.replaceSync(css);
}

await loadCSS();


const host = document.createElement("div");
host.role = "button";
host.classList.add("hidden")
host.title = "Scroll to top"
host.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
})




const shadow = host.attachShadow({ mode: "open" });

shadow.adoptedStyleSheets = [sheet];
shadow.innerHTML = "^";

document.querySelector(".content").appendChild(host);

let hidden = true;

window.addEventListener("scroll", () => {
    if (window.scrollY > 0 && hidden) {
        host.classList.remove("hidden");
        hidden = false;
    } else if (window.scrollY == 0 && !hidden) {
        host.classList.add("hidden");
        hidden = true;
    }
})