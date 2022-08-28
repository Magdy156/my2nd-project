/* Global Variables */
// stored the API key in constant with &units=imperial
const apikey = ",&appid=1a590e6ad2d314556f076482838f8905&units=imperial";

// stored the the link that i got from openWeather website in  constant
const link = "https://api.openweathermap.org/data/2.5/weather?zip=";

//stored My local server in constant to be able to use an absolute URL later
const server = "http://127.0.0.1:4000";

// Create a new date instance dynamically with JS

// here stored the Date in variable
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// this function will get the weather information from the API
async function getWeatherData(zip) {
  try {
    // fetch gets the parameter that i got from openWeather website
    let res = await fetch(link + zip + apikey);
    let data = await res.json(); // transform the data into json
    //   console.log(data); // i used this to make sure the data are fetched
    return data;
  } catch (e) {
    console.log(e);
  }
}
//*********************************

// this function will send the data to the server-side
async function postData(url = "", projectData = {}) {
  // fetch sends the object that has the weather data to the server
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  // making sure that the data saved
  try {
    const myData = await req.json();
    console.log("You have just saved", myData);
    return myData;
  } catch (e) {
    console.log(e);
  }
}
//***************************************

// this function will get the data from the server and show it in the UI (server -> clinet)
const showData = async () => {
  // fetch get the data
  const res = await fetch(server + "/getData");
  try {
    // stored the data in constant
    const savedData = await res.json();

    // then started to show the data
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("temp").innerHTML = savedData.temp;
    document.getElementById("city").innerHTML = savedData.cityName;
    document.getElementById("discription").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (e) {
    console.log(e);
  }
};
//******************************

// this is the main function that uses all the previos functions
const getData = () => {
  // stord the zip code that provided by the user in constant
  let zipCode = document.getElementById("zip").value;

  //stord the feeling that provided by the user in variable
  let feelings = document.getElementById("feelings").value;

  // call getWeatherDate function and used .then() for chain and to use the returned promise
  getWeatherData(zipCode).then((data) => {
    // here i used condition to make sure that the object not empty
    if (data != {}) {
      // destructuring to extract the needed data
      let {
        main: { temp },
        name: cityName,
        weather: [{ description }],
      } = data;

      // this project collects the needed data
      let projectData = {
        cityName,
        temp: Math.round(temp),
        description,
        feelings,
        newDate,
      };
      // making sure from my object
      console.log(projectData);
      //  call the postData function (client -> server)
      postData(server + "/saveData", projectData);

      // call the showData() function (server -> client)
      showData();
    }
  });
};
// this line to activate the main function once the generate button clicked
document.getElementById("generate").addEventListener("click", getData);
