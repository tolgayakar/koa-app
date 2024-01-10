async function getUserData(event) {
  event.preventDefault();
  const id = event.target.id.value;

  const response = await fetch(`/api/users/${id}`);
  if (response.status !== 200) {
    changeDivText("Not found", "🤞");
    return false;
  }

  const data = await response.json();
  changeDivText(data.title, data.subtitle);
  return false;
}

function changeDivText(title, subtitle) {
  const titleEl = document.querySelector("#response-title");
  const subtitleEl = document.querySelector("#response-subtitle");
  titleEl.innerHTML = title;
  subtitleEl.innerHTML = subtitle;
}
