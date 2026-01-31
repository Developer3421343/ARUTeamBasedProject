const header = document.createElement("header")

header.innerHTML = `<div id="logo-div">
            <div id="header-logo"></div>
            <p>One
And
Done
            </p>
        </div>
        <div id="header-dropdown-div">
            <div id="header-dropdown-content"></div>
            <nav>
            </nav>
        </div>
        <div id="sign-in-div"></div>`

document.body.prepend(header)