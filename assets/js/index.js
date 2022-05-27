//target parent
const recentSearchesContainer = $("#recent-searches-container");

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

const onReady = () => {
  console.log("ready");
  renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
$(document).ready(onReady);

// we need to render search history on load
