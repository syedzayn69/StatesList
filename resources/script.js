const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let cities = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    let regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  // this.value REFERING TO THE ELEM EVENT LISTENER IS CALLED ON
  let matchArr = findMatches(this.value, cities);

  const html = matchArr
    .map((place) => {
      let regex = new RegExp(this.value, "gi");
      let cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      let stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
      <li>
        <span class="name">${cityName},${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
      `;
    })
    .join("");

  suggestions.innerHTML = html;
}
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", displayMatches);
