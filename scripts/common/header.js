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
        <button data-id="a" >Menu 1</button>
        <button data-id="b" >Menu 2</button>
        <button data-id="c" >Menu 3</button>
    </div>

    <div id="header-dropdown-content">
        <ul data-id="a" class="has-header">
            <li><strong>Header</strong></li>
            <li><a href="#">Item 1A</a></li>
            <li><a href="#">Item 1B</a></li>
        </ul>
        <ul data-id="b">
            <li><a href="#">Item 2A</a></li>
            <li><a href="#">Item 2B</a></li>
        </ul>
        <ul data-id="c" class="has-header">
            <li><strong>Header</strong></li>
            <li><a href="#">Item 3A</a></li>
            <li><a href="#">Item 3B</a></li>
        </ul>
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
		}),
	);      

	["mouseout", "blur"].forEach((evt) =>
        el.addEventListener(evt, () => {
            document.querySelector(`#header-dropdown-div`)?.classList.remove("header-dropdown-show");
        })
    );
});
