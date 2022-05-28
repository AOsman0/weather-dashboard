//targetted globally
const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const currentDataUrl = constructUrl(
  "  https://api.openweathermap.org/data/2.5/weather",
  {
    q: "London",
    appid: "8109f605d79877f7488a194794a29013",
  }
);

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const renderCurrentData = (data) => {
  const currentWeatherCard = `<div class="p-3">
    <div class="text-center">
      <h2 class="my-city">${data.cityName}</h2>
      <h3 class="my-date">${moment
        .unix(data.weatherData.current.dt + data.weatherData.timezone_offset)
        .format("dddd, Do MMM, YYYY HH:mm:ss")}</h3>
      <img
      src="http://openweathermap.org/img/w/${
        data.weatherData.current.weather[0].icon
      }.png"
        class="shadow-sm p-3 mt-3 bg-body rounded border"
      />
    </div>
  </div>
  <!-- </div> -->
  <!-- weather metric div -->
  <div class="mt-4">
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Temperature
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.temp
      }&deg; C</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Humidity
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.humidity
      }&percnt;</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        Wind Speed
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">${
        data.weatherData.current.wind_speed
      } MPH</div>
    </div>
    <div class="row g-0">
      <div class="col-sm-12 col-md-4 p-2 border bg-light fw-bold">
        UV Index
      </div>
      <div class="col-sm-12 col-md-8 p-2 border">
        <span class="bg-success text-white px-3 rounded-2">${
          data.weatherData.current.uvi
        }</span>
      </div>
    </div>
  </div>
</div>`;
  weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = () => {
  const forecastWeatherCards = ` <div>
  <h2 class="mt-3 text-center">5-Day Forecast</h2>
  <hr />
  <div class="d-flex flex-row justify-content-center flex-wrap">
    <!-- card 1 -->
    <div class="card m-2" style="width: 16rem">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/04d.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tue, 10th May</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">16&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">20&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">10 MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="bg-success text-white px-3 rounded-2"
                >1.5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card 1 -->
    <div class="card m-2" style="width: 16rem">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/04d.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tue, 10th May</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">16&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">20&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">10 MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="bg-success text-white px-3 rounded-2"
                >1.5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card 1 -->
    <div class="card m-2" style="width: 16rem">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/04d.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tue, 10th May</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">16&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">20&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">10 MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="bg-success text-white px-3 rounded-2"
                >1.5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card 1 -->
    <div class="card m-2" style="width: 16rem">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/04d.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tue, 10th May</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">16&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">20&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">10 MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="bg-success text-white px-3 rounded-2"
                >1.5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card 1 -->
    <div class="card m-2" style="width: 16rem">
      <div class="d-flex justify-content-center">
        <img
          src="http://openweathermap.org/img/w/04d.png"
          class="shadow-sm p-3 mt-3 bg-body rounded border card-img-top weather-icon"
          alt="weather icon"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">Tue, 10th May</h5>
        <div class="mt-4 text-center">
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Temperature
            </div>
            <div class="col-12 p-2 border">16&deg; C</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Humidity
            </div>
            <div class="col-12 p-2 border">20&percnt;</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              Wind Speed
            </div>
            <div class="col-12 p-2 border">10 MPH</div>
          </div>
          <div class="row g-0">
            <div class="col-12 p-2 border bg-light fw-bold">
              UV Index
            </div>
            <div class="col-12 p-2 border">
              <span class="bg-success text-white px-3 rounded-2"
                >1.5</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
  weatherInfoContainer.append(forecastWeatherCards);
};

const renderRecentSearches = () => {
  //get recent searches from LS
  // if recent searches is not available what to return is an empty array
  const recentSearches = readFromLocalStorage("recentSearches", []);

  if (recentSearches.length) {
    //create callback
    //to accept each e.g. city
    const createRecentCity = (city) => {
      return ` <li
        class="list-group-item border-top-0 border-end-0 border-start-0"
        data-city="${city}"
      >
        ${city}
      </li>`;
    };
    //map through recent searches
    // join it so you can convert it to a string
    const recentCities = recentSearches.map(createRecentCity).join("");
    // if render recent search results
    const ul = `<ul class="list-group rounded-0">
   ${recentCities}
  </ul>`;
    //append to parent
    recentSearchesContainer.append(ul);
  } else {
    // else empty show alert
    // create component
    const alert = ` <div class="alert alert-warning" role="alert">
  You have no recent searches!
  <a href="#" class="alert-link"></a>
</div>`;
    //append to parent
    recentSearchesContainer.append(alert);
  }
};

const fetchWeatherData = async (cityName) => {
  //fetch data from API
  //url
  const currentDataUrl = constructUrl(
    "  https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "8109f605d79877f7488a194794a29013",
    }
  );
  //fetch data
  const currentData = await fetchData(currentDataUrl);

  //get lat lon and city name
  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const displayCityName = currentData?.name;

  console.log(lat, lon, displayCityName);

  // construct forecast data URL
  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "8109f605d79877f7488a194794a29013",
    }
  );
  const forecastData = await fetchData(forecastDataUrl);

  console.log(forecastData);
  // were gonna construct a new object
  return {
    cityName: displayCityName,
    weatherData: forecastData,
  };
};

const handleRecentSearchClick = (event) => {
  //restrict clicks from only li
  // prep function to accept event object
  const target = $(event.target);
  if (target.is("li")) {
    //get data city attribute
    const cityName = target.attr("data-city");
    console.log(cityName);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  //get form input value
  const cityName = $("#search-input").val();

  //validate
  if (cityName) {
    //fetch data for city name
    const weatherData = await fetchWeatherData(cityName);
    //render current data
    renderCurrentData(weatherData);
    //render forecast data
    renderForecastData(weatherData);
    //get recent searches from LS
    const recentSearches = readFromLocalStorage("recentSearches", []);
    //push city name to array
    recentSearches.push(cityName);
    //write recent searches to LS
    writeToLocalStorage("recentSearches", recentSearches);
    //remove previous items
    recentSearchesContainer.children().last().remove();
    //re render recent cities
    renderRecentSearches();
  }
};

const onReady = () => {
  console.log("ready");
  renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);
$(document).ready(onReady);

// we need to render search history on load
