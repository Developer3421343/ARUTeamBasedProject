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
    let questions = []
    Array.from(element.children).filter((x) => x.tagName == "UL").forEach(child => {
      let title = child.getAttribute("data-title") ?? "";
      let answers = Array.from(child.children).map((x) => x.innerHTML)
      let correctIdx = Array.from(child.children) .findIndex(el => el.dataset.correct === "true");
      questions.push(new Question(title, answers, correctIdx));
    });

		const shadow = this.attachShadow({ mode: "open" });

		shadow.adoptedStyleSheets = [sheet];
        shadow.innerHTML = `
            <b class="quiz-title">Quiz</b>
            
            <div id="score-div">
            <p>Current score: 0/30</p>
            <p>Attempts: 0</p>
            </div>

            <hr>

            <b class="question-header">Question 1</b><br>
            <input type="radio" id="html" name="fav_language" value="HTML">
            <label for="html">HTML</label><br>
            <input type="radio" id="css" name="fav_language" value="CSS">
            <label for="css">CSS</label><br>
            <input type="radio" id="javascript" name="fav_language" value="JavaScript">
            <label for="javascript">JavaScript</label>

            <hr>
            
            <b class="question-header">Question 1</b><br>
            <input type="radio" id="html" name="fav_language" value="HTML">
            <label for="html">HTML</label><br>
            <input type="radio" id="css" name="fav_language" value="CSS">
            <label for="css">CSS</label><br>
            <input type="radio" id="javascript" name="fav_language" value="JavaScript">
            <label for="javascript">JavaScript</label>
        `;    
	}
}

customElements.define("quiz-element", QuizElement);