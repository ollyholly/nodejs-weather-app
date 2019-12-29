console.log("frontend script loaded");

const weatherCall = location => {
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch("/weather?address=" + location)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = data.error;
      } else {
        console.log(data.destination);
        console.log(data.weatherForecast);
        message1.textContent = data.destination;
        message2.textContent = data.weatherForecast;
      }
    })
    .catch(e => {
      console.log(e);
      message1.textContent = e;
    });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  weatherCall(location);
});
