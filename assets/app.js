$(document).ready(function () {
	let recentCity = document.querySelector(".list-group-1");
	let startCity = document.querySelector(".list-group-2");

	let date = moment().format("MM/DD/YYYY");

	let startUp = [
		"San Francisco",
		"Oakland",
		"Atlanta",
		"Chicago",
		"New York",
		"Seattle",
		"Denver",
		"Stockholm",
	];
	// function to intialize startUp screen
	window.onload = function startUpDash() {
		$("input").val("Stockholm");
		let cityInput = $("input").val();
		getApi(cityInput);

		for (var i = 0; i < startUp.length; i++) {
			newCityButton(startUp[i], startCity);
		}
	};

	for (i = 0; i < startUp.length; i++) {
		$(`#recent_city_${i}`).html(startUp[i]);
		console.log(`#recent_city_${i}`);
		// $(`#recent_city_${i}`).on("click", function(){
		// 	console.log(cityInput);
		// 	getApi(cityInput);
		// })
	}
	// if (window.localStorage.length === 0) {

	// }

	// on submit function with prevent default for form user input
	$("form").on("submit", function (e) {
		e.preventDefault();
		let cityInput = $("input").val();
		console.log(cityInput);
		window.localStorage.setItem("uCity", cityInput);
		getApi(cityInput);
	});

	function getApi(cityInput) {
		// Storing api key in a constant varible
		const key = "&appid=a1e39e520ce0eb06a39ade64faa243cd";

		let requestUrl =
			"http://api.openweathermap.org/data/2.5/weather?q=" +
			cityInput +
			"&units=imperial&lang=en" +
			key;
		// fetch request for api data
		fetch(requestUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				let cityLat = data.coord.lat;
				let cityLong = data.coord.lon;
				getForecast(cityLat, cityLong);
				$("#city_name").text(data.name + " (" + date + ")");
			});
	}

	function getForecast(cityLat, cityLong) {
		const key = "&appid=a1e39e520ce0eb06a39ade64faa243cd";

		let forcast =
			"https://api.openweathermap.org/data/2.5/onecall?lat=" +
			cityLat +
			"&lon=" +
			cityLong +
			"&units=imperial&lang=en" +
			key;

		fetch(forcast)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				dispayWeather(data);
				displayForcast(data);
				let iconCode = data.current.weather[0].icon;
				let iconUrl =
					"http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
				$("#cwicon").attr("src", iconUrl);
			});
	}
	// function for displaying current weather data to page
	function dispayWeather(data) {
		$("#cTemperature").text(data.current.temp + " F");
		$("#cHumidity").text(data.current.humidity + " %");
		$("#wind").text(data.current.wind_speed + " MPH");
		$("#index").text(data.current.uvi);
		if (data.current.uvi >= 6) {
			$("#index").css("background-color", "red");
			$("#index").css("color", "white");
		} else if (data.current.uvi >= 3) {
			$("#index").css("background-color", "orange");
			$("#index").css("color", "white");
		} else {
			$("#index").css("background-color", "light-green");
			$("#index").css("color", "white");
		}
	}
	// function for displaying forecasted weather 5 days
	function displayForcast(data) {
		for (i = 0; i < 5; i++) {
			let iconCode = data.daily[i].weather[0].icon;
			let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
			let addDay = i + 1;
			let fDay = moment(date, "MM/DD/YYYY")
				.add(addDay, "d")
				.format("MM/DD/YYYY");
			$(`#forecast_${i}_title`).text(fDay);
			$(`#forecast_${i}_img`).attr("src", iconUrl);
			$(`#forecast_${i}_temp`).text(data.daily[i].temp.max + " F");
			$(`#forecast_${i}_hum`).text(data.daily[i].humidity + " %");
		}
	}

	function newCityButton(cityName, location) {
		let cityEl = document.createElement("button");
		$(cityEl).attr("type", "button");
		$(cityEl).addClass("list-group-item text-left btn btn-outline-secondary list-group-item-action");
		$(cityEl).text(cityName);
		$(cityEl).attr("value", cityName);
		location.prepend(cityEl);
		$(cityEl).on("click", function () {
			let allCity = document.querySelectorAll(".list-group-item");
			for (var i = 0; i < allCity.length; i++) {
				allCity[i].classList.remove("active");
			}
			getApi(cityEl.value);
		});
	}
});
