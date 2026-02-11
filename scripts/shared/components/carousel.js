let carouselIdxs = new Map();

document.querySelectorAll(".carousel").forEach((e) => {
	carouselIdxs.set(e, 0);
});

document.querySelectorAll(".carousel-nav-button").forEach((e) => {
	e.addEventListener("click", (event) => {
		let navAmount = 0;
		if (e.classList.contains("left")) {
			navAmount = -1;
		} else if (e.classList.contains("right")) {
			navAmount = 1;
		}

		let maxIdx = e.parentElement.querySelectorAll(".carousel-img-div").length - 1;

		let oldIdx = carouselIdxs.get(e.parentElement);

		// Clamp index in range
		let newIdx = Math.max(Math.min(oldIdx + navAmount, maxIdx), 0);

		// Set new value
		carouselIdxs.set(e.parentElement, newIdx);

		// Navigate to image
		navigateCarouselToIndex(e.parentElement, newIdx);
	});
});

function navigateCarouselToIndex(carousel, index) {
    // Change image
	let newElement = carousel.querySelectorAll(".carousel-img-div")[index];
	newElement.classList.add("visible");
	carousel.querySelectorAll(".carousel-img-div").forEach((e) => {
		if (e != newElement) {
			e.classList.remove("visible");
		}
	});

    // Change dot
    let dotDiv = carousel.querySelectorAll(".carousel-dot-div")[0];
    let newDot = dotDiv.querySelectorAll(".carousel-dot")[index];
	newDot.classList.add("selected");
	dotDiv.querySelectorAll(".carousel-dot").forEach((e) => {
		if (e != newDot) {
			e.classList.remove("selected");
		}
	});
}
