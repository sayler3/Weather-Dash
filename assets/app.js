$(document).ready(function () {
	$("form").on("submit", function (e) {
		e.preventDefault();
		let cityInput = e.target.querySelector("input").value;
		console.log(cityInput);

		function getApi() {
			// event.preventDefault();

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
				});

			let forcast =
				"http://api.openweathermap.org/data/2.5/forecast?q=" +
				cityInput +
				"&units=imperial&lang=en" +
				key;

			fetch(forcast)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);
				});
		}
		getApi();
	});
});
