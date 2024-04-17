const temperatureField = document.querySelector(".tempDisplay");
const cityField = document.querySelector(".cityDisplay");
const humidityField = document.querySelector(".humidityDisplay");
// const emojiField = document.querySelector(".weatherEmoji img");
const emojiField = document.querySelector(".weatherEmoji img");

const weatherDescription = document.querySelector(".weatherDes");
const dateInformation = document.querySelector(".dateInformation");


const searchField = document.querySelector(".cityInput");
const form = document.querySelector(".weatherForm");

// Default Location
let targetCity = "New Delhi";

// Function to fetch data from weather API
const fetchData = async (targetCity) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=a7a33463d0134b4d89e45527242702&q=${targetCity}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);


        // Destructuring the "data" object to get the information
        const {
            current: { temp_c, humidity, condition: { text, icon } },
            location: { name, country, localtime },
        } = data;
        

        
        updateDom(temp_c, name, country, humidity, icon, text, localtime);
    
    } catch (error) {
        console.error(error);
        alert("Location not found!!");
        // displayError(error.message); // Pass the error message to the displayError function
    }
}



// Function to update DOM
function updateDom(temperature, city, country, humidity, weatherEmojiCode, weathertext, time) {
    // Translate icon code to image URL
    const weatherEmoji = `https:${weatherEmojiCode}`;

    console.log(time);
    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    const exactDay = new Date(exactDate).getDay();
    const day = getDayFullName(exactDay);
    console.log(day);

    temperatureField.innerHTML = `${temperature} °C`;
    cityField.innerHTML = `${city}, ${country}`;
    humidityField.innerHTML = `Humidity: ${humidity}%`;
    weatherDescription.innerHTML = weathertext;
    // emojiField.src = weatherEmoji;

    // Check if weatherEmojiCode is available
    if (weatherEmojiCode) {
        emojiField.src = weatherEmoji;
        emojiField.style.display = "inline"; // Display the image
    } else {
        emojiField.style.display = "none"; // Hide the image if no weatherEmojiCode
    }

    dateInformation.innerHTML = `${day}: ${exactDate}, Time: ${exactTime}`;
}



form.addEventListener("submit", (e) =>{
    e.preventDefault(); // Prevent it from refreshing the page
    targetCity = searchField.value;
    // console.log(targetCity);
    fetchData(targetCity);
});


function displayError(error){
    card.textContent = `No matching location found, check console for more info.`;
    card.style.display = "flex";
}

function getDayFullName(val){
    switch (val) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return "Check date"
            break;
    }
}