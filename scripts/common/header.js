const header = document.createElement("header");

header.innerHTML = `
<div id="logo-div">
    <img src="images/common/logo.png" id="header-logo" alt="Company logo" />
    <p>One
And
Done
    </p>
</div>
<nav id="header-dropdown-div">
    <div id="header-dropdown-menu">
        <button aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-a" data-id="a" >Menu 1</button>
        <button aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-b" data-id="b" >Menu 2</button>
        <button aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-c" data-id="c" >Menu 3</button>
    </div>

    <div id="header-dropdown-content">
        <ul id="dropdown-a" data-id="a" class="has-header" role="menu" aria-label="Dropdown A">
            <li><strong>Header</strong></li>
            <li><a href="#" role="menuitem" tabindex="0">Item 1A</a></li>
            <li><a href="#" role="menuitem" tabindex="0">Item 1B</a></li>
            <li><a href="#" role="menuitem" tabindex="0">Item 1C</a></li>
            <li><a href="#" role="menuitem" tabindex="0">Item 1D</a></li>
        </ul>
        <div id="dropdown-b" data-id="b" role="menu" aria-label="Dropdown B"> 
            <ul class="has-header" role="menu" aria-label="Submenu 1">
                <li><strong>Header</strong></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 3A</a></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 3B</a></li>
            </ul>
            <ul class="has-header" role="menu" aria-label="Submenu 2">
                <li><strong>Header</strong></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 4A</a></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 4B</a></li>
            </ul>
            <ul class="has-header" role="menu" aria-label="Submenu 3">
                <li><strong>Header</strong></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 4A</a></li>
                <li><a href="#" role="menuitem" tabindex="0">Item 4B</a></li>
            </ul>
        </div>
        <div id="dropdown-c" data-id="c" role="menu" aria-label="Dropdown C"> 
            <ul class="has-header" role="menu" aria-label="Submenu 1">
                <li><strong>Header</strong></li>
                <li><a href="# role="menuitem" tabindex="0"">Item 3A</a></li>
                <li><a href="# role="menuitem" tabindex="0"">Item 3B</a></li>
            </ul>
            <ul class="has-header" role="menu" aria-label="Submenu 2">
                <li><strong>Header</strong></li>
                <li><a href="# role="menuitem" tabindex="0">Item 4A</a></li>
                <li><a href="# role="menuitem" tabindex="0">Item 4B</a></li>
            </ul>
        </div>
    </div>
</nav>
<div id="sign-in-div">
    <label for="sign-in-button">Sign in</label>
    <img src="images/common/sign-in.png" id="sign-in-image" alt="" />
</div>`;

document.body.prepend(header);

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
