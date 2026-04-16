const header = document.createElement("header")

fetch('/templates/header.html')
    .then(response => response.text())
    .then(data => {
        header.innerHTML = data;
        document.body.prepend(header);
        postHeaderLoad();
    });

document.querySelectorAll("#header-dropdown-menu [data-id]").forEach((el) => {
    ["mouseover", "focus"].forEach((evt) =>
        el.addEventListener(evt, () => {
            document.querySelectorAll(`#header-dropdown-content .header-dropdown-show`).forEach((e) => {
                e.classList.remove("header-dropdown-show");
            })
            document.querySelector(`#header-dropdown-content [data-id="${el.dataset.id}"]`)?.classList.add("header-dropdown-show");
            el.setAttribute("aria-expanded", "true");
        }),
    );

    ["mouseout", "blur"].forEach((evt) =>
        el.addEventListener(evt, () => {
            document.querySelector(`#header-dropdown-div`)?.classList.remove("header-dropdown-show");
            el.setAttribute("aria-expanded", "false");
        })
    );
});

///// Keyboard navigability for header dropdown
// Map creation
const headerNavElements = new Map();

function postHeaderLoad() {
    Array.from(document.getElementById("header-dropdown-menu").children).forEach((menuHeader) => {
        
        let target = document.getElementById(menuHeader.getAttribute('aria-controls'));

        switch (target.tagName) {
            case "DIV":
                let submenus = [];

                Array.from(target.children).forEach((ul) => {
                    submenus.push(Array.from(ul.querySelectorAll("a")));
                });

                headerNavElements.set(menuHeader, submenus);
                break;

            case "UL":
                headerNavElements.set(menuHeader, [target.querySelectorAll("a")]);
                break;

            default:
                break;
        }

    });
    // Navigation handling
    document.getElementById("header-dropdown-div").addEventListener("keydown", (e) => {
        let x = 0;
        let y = 0;

        switch (e.key) {
            case "ArrowUp":
                y = 1;
                break;
            case "ArrowDown":
                y = -1;
                break;
            case "ArrowLeft":
                x = -1;
                break;
            case "ArrowRight":
                x = 1;
                break;
            default:
                break;
        }

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            const topMenuElements = Array.from(headerNavElements.keys());
            let newSubMenuIdx;
            let newSubMenuItemIdx;


            // If target is in top menu handle naviagtion appropriatley
            if (topMenuElements.includes(e.target)) {
                // Get current top menu index
                let currTopMenuIdx = 0;
                for (let i = 0; i < topMenuElements.length; i++) {
                    if (topMenuElements[i].getAttribute("aria-expanded") == "true") {
                        currTopMenuIdx = i;
                        break;
                    }
                }

                // Focus new element
                topMenuElements[clamp(currTopMenuIdx + x, 0, topMenuElements.length - 1)].focus();
            } else { // Else target is in dropdown content handle naviagtion appropriatley
                //
            }
        }
    });
}


function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}