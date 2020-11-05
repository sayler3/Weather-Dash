// console.log("hello");

// function getApi() {
	let requestUrl =
		"http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=imperial&lang=en&appid=a1e39e520ce0eb06a39ade64faa243cd";

	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
        });
        
// }
