var usersContainer = document.getElementById('users');

var chosenCity = search.value;

//var chosenCity = search.value;

console.log(search.value);

function getDayProperties(current) {
	var currentDate = new Date(current.dt * 1000);
	var currentMonth = currentDate.getMonth() + 1;
	var currentDay = currentDate.getDate();
	var currentTemp = current.temp.day || current.temp;
	var currentWind = current.wind_speed;
	var currentHumidity = current.humidity;
	var currentUVI = current.uvi;

	return `
      
      <div>Date: ${currentMonth}/${currentDay}</div>
      <div>Temp: ${currentTemp}</div>
      <div>Wind: ${currentWind}</div>
      <div>Humidity: ${currentHumidity}</div>
      <div>UVI: ${currentUVI}</div>
      `;
}

function getCity() {
	var searchInput = document.getElementById('search');
	var cityCoorUrl =
		'https://api.openweathermap.org/geo/1.0/direct?q=' +
		searchInput.value +
		'&limit=10&appid=572c065653aeaac21616fb00b72d0121';
	fetch(cityCoorUrl)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			if (data.length > 0) {
				var firstLocation = data[0];
				var lat = firstLocation.lat;
				var lon = firstLocation.lon;
				console.log(lat, lon);
				getWeather(lat, lon);
			}
		});
}

//let coordinatesRequestUrl = cityCoorUrl + chosenCity + "&limit=10&appid=572c065653aeaac21616fb00b72d0121";

// fetch(cityCoorUrl) {
//   .then(function (response) {
//     return response.json();
// })
//   .then(function (data) {

//        //Put second fetch request here
//  });

function getWeather(lat, lon) {
	var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=572c065653aeaac21616fb00b72d0121`;

	fetch(requestUrl)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			var current = data.current;
			var daily = data.daily;

			var todayWeather = document.getElementById('todaysWeather');
			var dayOneWeather = document.getElementById('dayOneWeather');
			var dayTwoWeather = document.getElementById('dayTwoWeather');
			var dayThreeWeather = document.getElementById('dayThreeWeather');
			var dayFourWeather = document.getElementById('dayFourWeather');

			todayWeather.innerHTML = getDayProperties(current);
			dayOneWeather.innerHTML = getDayProperties(daily[1]);
			dayTwoWeather.innerHTML = getDayProperties(daily[2]);
			dayThreeWeather.innerHTML = getDayProperties(daily[3]);
			dayFourWeather.innerHTML = getDayProperties(daily[4]);

			console.log(data);

			//Using console.log to examine the data
		});
}

//==========================================================================================================================
//--------------------------------------------------------------------------------------------------------------------------------
// fetchButton.addEventListener('click', getApi);
// fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=572c065653aeaac21616fb00b72d0121')

//  function inputCoord() {

//  }

// .then(response => response.json())
// .then(data => {
//   console.log(data)
// });

//for (var i = 0; i < data.length; i++) {
//         //Creating a h3 element and a p element
//         var userName = document.createElement('h3');
//         var userUrl = document.createElement('p');

//         //Setting the text of the h3 element and p element.
//         userName.textContent = data[i].login;
//         userUrl.textContent = data[i].url;

//         //Appending the dynamically generated html to the div associated with the id="users"
//         //Append will attach the element as the bottom most child.
//         //usersContainer.append(userName);
//         //usersContainer.append(userUrl);
//         todayWeather.append(weatherResults)
//       }
//     });
