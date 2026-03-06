const sheet = new CSSStyleSheet();

async function loadCSS() {
	const res = await fetch("/stylesheets/shared/components/scroll-to-top.css");
	const css = await res.text();
	sheet.replaceSync(css);
}

await loadCSS();


const host = document.createElement("div");
host.role = "button";
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

