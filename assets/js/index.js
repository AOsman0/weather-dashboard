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

const onReady = () => {
  console.log("ready");
  //target parent
  const recentSearchesContainer = $("#recent-searches-container");

  //get recent searches from LS
  // if recent searches is not available what to return is an empty array
  const recentSearches = readFromLocalStorage("recentSearches", []);
  console.log(recentSearches);

  if (recentSearches.length) {
    // if render recent search results
  } else {
    // else empty show alert
  }
  const alert = ` <div class="alert alert-warning" role="alert">
  You have no recent searches!
  <a href="#" class="alert-link"></a>
</div>`;
};

$(document).ready(onReady);

// we need to render search history on load
