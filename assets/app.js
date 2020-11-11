$(document).ready(function () {
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
	for (i = 0; i < startUp.length; i++) {
		$(`#recent_city_${i}`).html(startUp[i]);
	}
	// if (window.localStorage.length === 0) {

	// }

	// on submit function with prevent default for form user input
	$("form").on("submit", function (e) {
		e.preventDefault();
		let cityInput = $("input").val();
		console.log(cityInput);
		getApi(cityInput);
		// getForecast(cityLat, cityLong)
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
				console.log(cityLat, cityLong);
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
				let iconCode = data.current.weather[0].icon;
				let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                $("#cwicon").attr("src", iconUrl);
			});
	}
    // function for displaying current weather data to page
	const dispayWeather = function (data) {
		$("#cTemperature").text(data.current.temp + " F");
		$("#cHumidity").text(data.current.humidity + " %");
		$("#wind").text(data.current.wind_speed + " MPH");
        $("#index").text(data.current.uvi);
        if(data.current.uvi >= 6) {
            $('#index').css('background-color', 'red');
            $('#index').css('color', 'white');
        } else if(data.current.uvi >= 3) {
            $('#index').css('background-color', 'orange');
            $('#index').css('color', 'white');
        } else {
            $('#index').css('background-color', 'light-green');
            $('#index').css('color', 'white');
        }
	};

	// let getCoord = function (data) {
	//     let cityLat = data.coord.lat;
	//     let cityLong = data.coord.lon;
	//     let iconCode = data.weather[0].icon;
	//     let iconUrl= "http://openweathermap.org/img/w/" + iconCode + ".png";
	//     $('#cwicon').attr("scr", iconUrl);

	// }
});
