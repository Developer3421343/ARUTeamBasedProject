import sheet from "/stylesheets/shared/components/quiz.css" assert { type: "css" };

class QuizElement extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		shadow.adoptedStyleSheets = [sheet];
        shadow.innerHTML = `
            <div class="quiz">
                <button>Submit</button>
            </div>
        `;
	}
}

customElements.define("quiz-element", QuizElement);