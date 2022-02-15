const update = document.querySelector("#update-button");
update.addEventListener("click", () => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vader",
      quote: "i am your father",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      //   console.log(response);
      window.location.reload(true);
    });
});
const message = document.querySelector("#message");
const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vader",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      response === "no quote to delete"
        ? (message.textContent = "no vaders quote to delete")
        : window.location.reload(true);
    });
  // .catch(err => console.error(err);
});
