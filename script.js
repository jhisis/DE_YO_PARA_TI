document.getElementById("openLetterBtn").addEventListener("click", () => {
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("letter").classList.remove("hidden");

  document.getElementById("letterContent").innerHTML = `
    <p>Gracias por ser como eres.</p>
    <p>Gracias por acompañarme incluso en la distancia.</p>
    <p>Este regalo es pequeño, pero lo hice con todo mi amor 💙</p>
  `;
});
``
