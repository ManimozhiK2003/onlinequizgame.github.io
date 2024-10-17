// User Login Logic
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      localStorage.setItem("loggedInUser", username);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("login-message").innerText = "Invalid credentials!";
    }
  }
  
  // Logout
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }
  
  // Start Quiz
  let currentQuestion = 0;
  let score = 0;
  let timer;
  
  function startQuiz() {
    window.location.href = "quiz.html";
  }
  
  function loadQuestion() {
    if (currentQuestion >= questions.length) {
      clearInterval(timer);
      alert(`Quiz Completed! Your score is ${score}/${questions.length}`);
      window.location.href = "dashboard.html";
      return;
    }
  
    const questionObj = questions[currentQuestion];
    const questionContainer = document.getElementById("question-container");
  
    questionContainer.innerHTML = `
      <h2>${questionObj.question}</h2>
      ${questionObj.options.map((opt, i) =>
        `<button onclick="checkAnswer('${opt}')">${opt}</button>`
      ).join('')}
    `;
  }
  
  function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) score++;
  
    currentQuestion++;
    loadQuestion();
  }
  
  // Timer Logic
  function startTimer() {
    let timeLeft = 120;
    document.getElementById("time-left").innerText = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").innerText = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        window.location.href = "dashboard.html";
      }
    }, 1000);
  }
  
  // Initialize Quiz Page
  window.onload = function () {
    if (window.location.pathname.includes("quiz.html")) {
      loadQuestion();
      startTimer();
    }
  
    if (window.location.pathname.includes("dashboard.html")) {
      const user = localStorage.getItem("loggedInUser");
      document.getElementById("user-name").innerText = user;
    }
  };
  
  
  