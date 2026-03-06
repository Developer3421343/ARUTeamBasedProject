const sheet = new CSSStyleSheet();

async function loadCSS() {
	const res = await fetch("/stylesheets/shared/components/scroll-to-top.css");
	const css = await res.text();
	sheet.replaceSync(css);
}

await loadCSS();


const host = document.createElement("div");
host.id = "scroll-to-top"
host.role = "button";
const shadow = host.attachShadow({ mode: "open" });

shadow.adoptedStyleSheets = [sheet];
shadow.innerHTML = "^";

document.querySelector(".content").appendChild(host);