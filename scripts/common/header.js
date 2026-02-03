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
        <ul data-id="a">
            <li>Item 1A</li>
            <li>Item 1B</li>
        </ul>
        <ul data-id="b">
            <li>Item 2A</li>
            <li>Item 2B</li>
        </ul>
        <ul data-id="c">
            <li>Item 3A</li>
            <li>Item 3B</li>
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
			document.querySelector(`#header-dropdown-content [data-id="${el.dataset.id}"]`)?.classList.add("header-dropdown-show");
		}),
	);      

	["mouseout", "blur"].forEach((evt) =>
        el.addEventListener(evt, () => {
            document.querySelector(`#header-dropdown-content [data-id="${el.dataset.id}"]`)?.classList.remove("header-dropdown-show");
        })
    );
});
