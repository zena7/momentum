import { Component} from './component.js';

const defaultOptions = {
  weatherFormId: "weather-form",
  weatherContent: "weather-content",
  defaultCity: "Minsk",
};

export class Weather extends Component {
  constructor(options = defaultOptions) {
    super();
    this._weatherFormId = options.weatherFormId;
    this._defaultCity = options.defaultCity;
    this._weatherContenet = options.weatherContent;
  }

  _hideContent() {
    const weatherContentElem = document.getElementById(this._weatherContenet);
    weatherContentElem.classList.add("hidden");
  }

  _renderErrorMessage(message) {}

  _fetchWeatherByCity(city) {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city || this._defaultCity
      }&lang=en&appid=56787c27f7a08e2c04f00e615413959d&units=metric`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`City "${city}" not found`);
      }
    });
  }

  _initForm() {
    const formElem = document.getElementById(this._weatherFormId);

    const listener = () => {
      this._fetchWeatherByCity(formElem.elements.city.value).catch((error) => {
        this._hideContent();
        formElem.insertAdjacentHTML(
          "afterend",
          `<p class="error-message">${error.message}</p>`
        );
      });
    };

    // formElem.addEventListener("submit", (event) => {
    //   event.preventDefault();
    //   listener();
    // });

    formElem.addEventListener("blur", () => {
      console.log('!!!');
    });
  }

  init() {
    this._initForm();
  }
}

// export async function getWeather({ city = "Minsk" } = {}) {
//   const containerError = document.querySelectorAll(".city-error");
//   const weatherError = document.querySelector(".error-message");

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=56787c27f7a08e2c04f00e615413959d&units=metric`
//     );
//     const data = await response.json();
//     setWeatherData(data);
//   } catch () {
//     const mistakeElem = document.createElement("p");

//     containerError.forEach((item) => (item.style.display = "none"));
//     mistakeElem.textContent = "City not found!";
//     weatherError.prepend(mistakeElem);
//     mistakeElem.classList.add("message-weather-error");
//     mistakeElem.style.position = "absolute";
//     mistakeElem.style.marginTop = "-140px";
//   }
// }

// export function setWeatherData(data) {
//   const weatherIcon = document.querySelector(".weather-icon");
//   const temperature = document.querySelector(".temperature");
//   const weatherDescription = document.querySelector(".weather-description");
//   const windSpeed = document.querySelector(".wind");
//   const humidity = document.querySelector(".humidity");

//   weatherIcon.className = "weather-icon owf";
//   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
//   temperature.textContent = `${Math.round(data.main.temp)}°C`;
//   weatherDescription.textContent = data.weather[0].description;
//   windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
//   humidity.textContent = `Humidity: ${data.main.humidity}%`;
// }

// export function chooseCity() {
//   const cityInput = document.querySelector(".city");
//   const messageError = document.querySelector(".message-weather-error");
//   const containerError = document.querySelectorAll(".weather-err");

//   cityInput.addEventListener("focus", () => {
//     // console.log("focus");

//     if (messageError) {
//       messageError.remove();
//     }
//   });

//   cityInput.addEventListener("change", () => {
//     getWeather({ city: cityInput.value });
//     containerError.forEach((item) => (item.style.display = "block"));
//   });
// }
