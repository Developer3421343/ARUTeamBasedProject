let carouselIdxs = new Map();
let carouselBusy = new Map();


document.querySelectorAll(".carousel").forEach((e) => {
	carouselIdxs.set(e, 0);
	carouselBusy.set(e, false);
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

		let newIdx = oldIdx + navAmount;

		if (newIdx > maxIdx) {
			newIdx = 0;
		}

		// Clamp index in range
		newIdx = Math.max(Math.min(newIdx, maxIdx), 0);
		console.log(newIdx);
		// Navigate to image
		navigateCarouselToIndex(e.parentElement, newIdx);

		
	});
});

function navigateCarouselToIndex(carousel, index) {
	if (!carouselBusy.get(carousel)){
		carouselBusy.set(carousel, true);
		let oldElement = carousel.querySelectorAll(".carousel-img-div")[carouselIdxs.get(carousel)];
		carouselIdxs.set(carousel, index);
		// Change image
		let newElement = carousel.querySelectorAll(".carousel-img-div")[index];
		newElement.classList.add("visible");
		oldElement.classList.add("leaving");
		carousel.querySelectorAll(".carousel-img-div").forEach((e) => {
			if (e != newElement) {
				e.classList.remove("visible");
			}
		});

		setTimeout(() => {
		oldElement.classList.remove("leaving");
		carouselBusy.set(carousel, false);
		}, 950); 

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
}

document.querySelectorAll(".carousel-dot").forEach((e) => {
	e.addEventListener("click", (event) => {
		try {
			console.log(e.parentElement.parentElement);
			console.log(e.getAttribute("data-slide"));
			navigateCarouselToIndex(e.parentElement.parentElement, e.getAttribute("data-slide"));
		} catch (error) {
			
		}
	})
});

// TODO: ~7 sec autoscroll

const interval = setInterval(function() {
	document.querySelectorAll(".carousel").forEach((e) => {
		// Get current idx
		let currentIdx = carouselIdxs.get(e);

		// Max slide index
		let maxIdx = e.parentElement.querySelectorAll(".carousel-img-div").length - 1;

		let newIdx = currentIdx + 1;

		if (newIdx > maxIdx) {
			newIdx = 0;
		}


		// Increment and clamp index in range
		newIdx = Math.max(Math.min(newIdx, maxIdx), 0);

		// Navigate to new slide
		navigateCarouselToIndex(e, newIdx);

		
		
	});
	
 }, 7000);