const footer = document.createElement("footer")

fetch('/templates/footer.html')
      .then(response => response.text())
      .then(data => {
        footer.innerHTML = data;
        document.body.append(footer);
});