// ------------------------------
// Quiz Data
// ------------------------------
const quizData = [
  {
    question: "1. What do you enjoy the most?",
    answers: [
      { text: "Writing fanfiction", value: "tina" },
      { text: "Causing chaos", value: "louise" },
      { text: "Making music", value: "gene" },
      { text: "Cooking", value: "bob" },
      { text: "Spending time with family", value: "linda" }
    ]
  },
  {
    question: "2. How do you usually spend your free time?",
    answers: [
      { text: "Daydreaming about boys", value: "tina" },
      { text: "Plotting or strategizing", value: "louise" },
      { text: "Coming up with rad rhythms", value: "gene" },
      { text: "Trying a new recipe", value: "bob" },
      { text: "Singing or crafting", value: "linda" }
    ]
  },
  {
    question: "3. What describes your sense of humor?",
    answers: [
      { text: "Awkward and honest", value: "tina" },
      { text: "Dark and mischievous", value: "louise" },
      { text: "Silly and absurd", value: "gene" },
      { text: "Dry and sarcastic", value: "bob" },
      { text: "Dramatic and theatrical", value: "linda" }
    ]
  },
  {
    question: "4. What motivates you most?",
    answers: [
      { text: "Romance or crushes", value: "tina" },
      { text: "Power and money", value: "louise" },
      { text: "Fun and excitement", value: "gene" },
      { text: "Doing something well", value: "bob" },
      { text: "Love and connection", value: "linda" }
    ]
  },
  {
    question: "5. How would people describe you?",
    answers: [
      { text: "Thoughtful", value: "tina" },
      { text: "Fearless", value: "louise" },
      { text: "Outgoing", value: "gene" },
      { text: "Reliable", value: "bob" },
      { text: "Expressive", value: "linda" }
    ]
  },
  {
    question: "6. How do you react when plans go wrong?",
    answers: [
      { text: "Freeze awkwardly", value: "tina" },
      { text: "Take advantage of the chaos", value: "louise" },
      { text: "Laugh it off", value: "gene" },
      { text: "Stay calm and keep working", value: "bob" },
      { text: "Panic loudly", value: "linda" }
    ]
  },
  {
    question: "7. Pick a favorite school subject:",
    answers: [
      { text: "English", value: "tina" },
      { text: "None, school is for the birds", value: "louise" },
      { text: "Music", value: "gene" },
      { text: "Home Ec", value: "bob" },
      { text: "Drama", value: "linda" }
    ]
  },
  {
    question: "8. What’s your biggest strength?",
    answers: [
      { text: "Loyalty", value: "tina" },
      { text: "Strategy", value: "louise" },
      { text: "Creativity", value: "gene" },
      { text: "Hardworking", value: "bob" },
      { text: "Supportive", value: "linda" }
    ]
  },
  {
    question: "9. What’s your biggest flaw?",
    answers: [
      { text: "Social anxiety", value: "tina" },
      { text: "Manipulative tendencies", value: "louise" },
      { text: "Being too chaotic", value: "gene" },
      { text: "Stressed easily", value: "bob" },
      { text: "Overreacting", value: "linda" }
    ]
  },
  {
    question: "10. What is your perfect birthday present?",
    answers: [
      { text: "A romantic book", value: "tina" },
      { text: "Something sharp", value: "louise" },
      { text: "A sound machine", value: "gene" },
      { text: "High-quality tools", value: "bob" },
      { text: "Something handmade", value: "linda" }
    ]
  }
];

// ------------------------------
// Variables
// ------------------------------
const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const resultSection = document.getElementById("result");
const characterName = document.getElementById("character-name");
const characterImg = document.getElementById("character-img");
const characterDescription = document.getElementById("character-description");
const restartBtn = document.getElementById("restart");

// ------------------------------
// Shuffle Helper
// ------------------------------
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ------------------------------
// Render Quiz
// ------------------------------
function renderQuiz() {
  const shuffledQuestions = shuffle([...quizData]);
  quizContainer.innerHTML = "";

  shuffledQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const p = document.createElement("p");
    p.textContent = q.question;
    questionDiv.appendChild(p);

    const shuffledAnswers = shuffle([...q.answers]);
    shuffledAnswers.forEach(a => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index+1}`;
      input.value = a.value;
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + a.text));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(questionDiv);
  });

  // Add submit button at the end
  quizContainer.appendChild(submitBtn);
}

// ------------------------------
// Calculate Result
// ------------------------------
function calculateResult() {
  const scores = {
    bob: 0,
    linda: 0,
    tina: 0,
    gene: 0,
    louise: 0
  };

  const answers = quizContainer.querySelectorAll("input[type='radio']:checked");
  answers.forEach(ans => {
    scores[ans.value]++;
  });

  // Find highest scoring character
  let max = 0;
  let winner = "";
  for (const char in scores) {
    if (scores[char] > max) {
      max = scores[char];
      winner = char;
    }
  }

  return winner;
}

// ------------------------------
// Show Result
// ------------------------------
function showResult(character) {
  const descriptions = {
    bob: "Bob Belcher: The hardworking and dry-witted dad, passionate about his burgers.",
    linda: "Linda Belcher: Cheerful, supportive, and loves to sing and craft.",
    tina: "Tina Belcher: Awkward, honest, and obsessed with romance.",
    gene: "Gene Belcher: Silly, creative, and loves music and fun.",
    louise: "Louise Belcher: Mischievous, fearless, and always plotting something."
  };

  const images = {
    bob: "images/bob.png",
    linda: "images/linda.png",
    tina: "images/tina.png",
    gene: "images/gene.png",
    louise: "images/louise.png"
  };

  characterName.textContent = character.toUpperCase();
  characterDescription.textContent = descriptions[character];
  characterImg.src = images[character];
  characterImg.alt = character;

  quizContainer.classList.add("hidden");
  resultSection.classList.remove("hidden");
}

// ------------------------------
// Event Listeners
// ------------------------------
submitBtn.addEventListener("click", () => {
  const selected = quizContainer.querySelectorAll("input[type='radio']:checked");
  if (selected.length < quizData.length) {
    alert("Please answer all questions!");
    return;
  }
  const winner = calculateResult();
  showResult(winner);
});

restartBtn.addEventListener("click", () => {
  resultSection.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  renderQuiz();
});

// ------------------------------
// Initialize Quiz
// ------------------------------
renderQuiz();
