const sheet = new CSSStyleSheet();

async function loadCSS() {
	const res = await fetch("/stylesheets/shared/components/quiz.css");
	const css = await res.text();
	sheet.replaceSync(css);
}

await loadCSS();

class QuizElement extends HTMLElement {
	score = 0;
	
	constructor() {
		super();

		class Question {
			constructor(title, answers, correctIdx) {
				this.title = title;
				this.answers = answers;
				this.correctIdx = correctIdx;
			}
		}

		class Answer {
			constructor(title, correct) {
				this.title = title;
				this.correct = correct;
			}
			labelElem;
			radioElem;
		}

		// Parse questions
		this.questions = [];
		Array.from(this.children)
			.filter((x) => x.tagName == "UL")
			.forEach((child) => {
				let title = child.getAttribute("data-title") ?? "";
				let answers = Array.from(child.children).map((x) => new Answer(x.innerHTML, (x.getAttribute("data-correct") ?? "").toLowerCase() == "true"));
				let correctIdx = Array.from(child.children).findIndex((el) => el.dataset.correct === "true");
				this.questions.push(new Question(title, answers, correctIdx));
			});

		// Clear innerHTML
		this.innerHTML = "";

		const shadow = this.attachShadow({ mode: "open" });

		let title = (this.getAttribute("data-title") ?? "");
		title = title != "" ? title : "Quiz";

		let answerVerif = (this.getAttribute("data-answer-verification") ?? "");
		answerVerif = ["end", "each"].includes(answerVerif.toLowerCase()) ? answerVerif : "end";

		shadow.adoptedStyleSheets = [sheet];
		shadow.innerHTML = `
            <b class="quiz-title">${title}</b>
            
            <div id="score-div">
<<<<<<< HEAD
              <p>Current score: 0/10</p>
              <p>Attempts: 0</p>
=======
              <p>Current score: 0/${this.questions.length}</p>
>>>>>>> origin/main
            </div>`;

		for (let i = 0; i < this.questions.length; i++) {
			// Get question
			let q = this.questions[i];

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

				let radioElem = Object.assign(document.createElement("input"), {
					type: "radio",
					id: `radioset-q${i + 1}-a${aIdx + 1}`,
					name: `radioset-q${i + 1}`,
					className: "answer-radio",
				});

				let labelElem = Object.assign(document.createElement("label"), {
					htmlFor: `radioset-q${i + 1}-a${aIdx + 1}`,
					innerHTML: a.title,
				});

				shadow.append(
					radioElem,
					labelElem,
					document.createElement("br"),
				);

				this.questions[i]["answers"][aIdx]["radioElem"] = radioElem;
				this.questions[i]["answers"][aIdx]["labelElem"] = labelElem;
			}

			if (answerVerif == "each") {
				let answerButton = Object.assign(document.createElement("button"), {
					className: "answer-button",
					textContent: "Check answer",
				});

				answerButton.addEventListener("click", () => markAnswers([q], this, shadow));

				// Add answer check button
				shadow.append(answerButton);
			}
		}

		if (answerVerif == "end") {
			// Create answer button
			let answerButton = Object.assign(document.createElement("button"), {
				className: "answer-button",
				textContent: "Check answers",
			});

			answerButton.addEventListener("click", () => markAnswers(this.questions, this, shadow));

			// Add answer check button
			shadow.append(
				document.createElement("hr"),
				answerButton
			);
		}
	}
}

customElements.define("quiz-element", QuizElement);

function markAnswers(questions, QuizElement, shadow) {
	// Iterate through all answers
	questions.flatMap((x) => x.answers).forEach(answer => {
		console.log(answer);
		// Disable radio buttons
		answer.radioElem.setAttribute("disabled", "true");

		// Check answer
		if (answer.correct) {
			// Show as correct
			answer.labelElem.classList.add("correct");
			if (answer.correct && answer.radioElem.checked) {
				QuizElement.score++;
			}
		} else if (!answer.correct && answer.radioElem.checked) {
			// Show as incorrect
			answer.labelElem.classList.add("false");
		}

	});
	
	shadow.getElementById("score-div").children[0].innerHTML = `Current score: ${QuizElement.score}/${QuizElement.questions.length}`;
}