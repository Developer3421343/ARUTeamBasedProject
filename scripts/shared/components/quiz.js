const sheet = new CSSStyleSheet();

async function loadCSS() {
	const res = await fetch("/stylesheets/shared/components/quiz.css");
	const css = await res.text();
	sheet.replaceSync(css);
}

await loadCSS();

class QuizElement extends HTMLElement {
	constructor() {
		super();

		class Question {
			constructor(title, answers, correctIdx) {
				this.title = title;
				this.answers = answers;
				this.correctIdx = correctIdx;
			}
		}

		// Parse questions
		let questions = [];
		Array.from(this.children)
			.filter((x) => x.tagName == "UL")
			.forEach((child) => {
				let title = child.getAttribute("data-title") ?? "";
				let answers = Array.from(child.children).map((x) => x.innerHTML);
				let correctIdx = Array.from(child.children).findIndex((el) => el.dataset.correct === "true");
				questions.push(new Question(title, answers, correctIdx));
			});

    // Clear innerHTML
    this.innerHTML = "";

		const shadow = this.attachShadow({ mode: "open" });

    let title = (this.getAttribute("data-title") ?? "");

    title = title != "" ? title : "Quiz";

		shadow.adoptedStyleSheets = [sheet];
		shadow.innerHTML = `
            <b class="quiz-title">${title}</b>
            
            <div id="score-div">
              <p>Current score: 0/30</p>
              <p>Attempts: 0</p>
            </div>`;

		for (let i = 0; i < questions.length; i++) {
			// Get question
			let q = questions[i];

			// Add question title
			shadow.append(
				document.createElement("hr"),
				Object.assign(document.createElement("b"), {
					className: "question-header",
					textContent: `Question ${i + 1}` + (q.title != "" ? ` - ${q.title}` : ""),
				}),
				document.createElement("br"),
			);

			// Populate answers
			for (let aIdx = 0; aIdx < q.answers.length; aIdx++) {
				let a = q.answers[aIdx];
				shadow.append(
					Object.assign(document.createElement("input"), {
						type: "radio",
						id: `radioset-q${i + 1}-a${aIdx + 1}`,
						name: `radioset-q${i + 1}`,
					}),
					Object.assign(document.createElement("label"), {
						htmlFor: `radioset-q${i + 1}-a${aIdx + 1}`,
						innerHTML: a,
					}),
					document.createElement("br"),
				);
			}
		}
	}
}

customElements.define("quiz-element", QuizElement);