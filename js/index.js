import playList from './playList.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
const body = document.querySelector('body');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const weatherHumidity = document.querySelector('.humidity');
const weatherCityInput = document.querySelector('.city');
const playButton = document.querySelector('.play');
const playButtonPrev = document.querySelector('.play-prev');
const playButtonNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const audioBar = document.querySelector('.player-controls2');
const songTitle = document.querySelector('.song-title');
const timeAudioProgress = document.querySelector('.time-audio');
const audioDuration = document.querySelector('.audio-duration');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const volumeBar = document.querySelector('.volume-range');
const volumeBarProgress = document.querySelector('.volume-progress');
const muteButton = document.querySelector('.mute');
const volumeIcon = document.querySelector('.volume-icon');
const clouds = document.querySelector('.clouds');
const addTodoButton = document.querySelector('.add-todo');
const todoInput = document.querySelector('.todo-input');
const todoContent = document.querySelector('.todo-content');
const todoButton = document.querySelector('.todo');
const todoList = document.querySelector('.todo-list');
const todoRefresh =document.querySelector('.todo-refresh');
const linksButton = document.querySelector('.links');
const linksMenu = document.querySelector('.links-menu');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const weather = document.querySelector('.weather');
const audioPlayer = document.querySelector('.player');
const settingsButton = document.querySelector('.settings');
const settingsList = document.querySelector('.settings-list');
const audio = new Audio();

let timeWid = document.getElementById('time');
let dateWid = document.getElementById('data');
let greetingWid = document.getElementById('greeting');
let quotesWid = document.getElementById('quotes');
let weatherWid = document.getElementById('weather');
let audioWid = document.getElementById('audio');
let linksWid = document.getElementById('links');
let todoWid = document.getElementById('todo');
const rssApi = document.getElementById('rss-gh');
const uapi = document.getElementById('uapi');
const fapi = document.getElementById('fapi');
const tagsImages = document.getElementById('tags');
let isPlay = false;
let audioNum = 0;
let todoArr = [];
let randomNum;
weatherCityInput.value = 'Minsk'; //default
tagsImages.value = '#nature';
audio.volume = 0.5; //default

// Time and Date

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting()
    setTimeout(showTime, 1000);
}

function showDate() {
    const dateWeek = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    date.textContent = dateWeek.toLocaleDateString('en-En', options);
}

showTime();

// Greeting

function getTimeOfDay() {
    const dateHours = new Date();
    const hours = dateHours.getHours();
    const greetArr = ['Night', 'Morning', 'Afternoon', 'Evening'];
    let numIndex = Math.floor((hours / 6));
    return greetArr[numIndex];
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay},`;
}

function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('city', weatherCityInput.value);
    localStorage.setItem('tags-img', tagsImages.value);
    localStorage.setItem('todo', JSON.stringify(todoArr));
    localStorage.setItem('uapi', JSON.stringify(uapi.checked));
    localStorage.setItem('fapi', JSON.stringify(fapi.checked));
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        weatherCityInput.value = localStorage.getItem('city');
    }
    if(localStorage.getItem('todo')) {
        todoArr = JSON.parse(localStorage.getItem('todo'));
        showTodo();
    }
    if(localStorage.getItem('tags-img')) {
        tagsImages.value = localStorage.getItem('tags-img');
    }

    //Settings localStorage
    //time
    if(localStorage.getItem('time')) {
        timeWid.checked = JSON.parse(localStorage.getItem('time'));
    }
    if(localStorage.getItem('timeHidden') && localStorage.getItem('timeHidden') != 'true') {
        time.classList.add('widget-hidden');
    }

    //date
    if(localStorage.getItem('date')) {
        dateWid.checked = JSON.parse(localStorage.getItem('date'));
    }
    if(localStorage.getItem('dateHidden') && localStorage.getItem('dateHidden') != 'true') {
        date.classList.add('widget-hidden');
    }

    //greeting
    if(localStorage.getItem('greeting')) {
        greetingWid.checked = JSON.parse(localStorage.getItem('greeting'));
    }
    if(localStorage.getItem('greetingHidden') && localStorage.getItem('greetingHidden') != 'true') {
        greeting.classList.add('widget-hidden');
        nameInput.classList.add('widget-hidden');
    }

    //quotes
    if(localStorage.getItem('quotes')) {
        quotesWid.checked = JSON.parse(localStorage.getItem('quotes'));
    }
    if(localStorage.getItem('quotesHidden') && localStorage.getItem('quotesHidden') != 'true') {
        quote.classList.add('widget-hidden');
        author.classList.add('widget-hidden');
        changeQuote.classList.add('widget-hidden');
    }

    //weather
    if(localStorage.getItem('weather')) {
        weatherWid.checked = JSON.parse(localStorage.getItem('weather'));
    }
    if(localStorage.getItem('weatherHidden') && localStorage.getItem('weatherHidden') != 'true') {
        weather.classList.add('widget-hidden');
    }

    //audio
    if(localStorage.getItem('audio')) {
        audioWid.checked = JSON.parse(localStorage.getItem('audio'));
    }
    if(localStorage.getItem('audioHidden') && localStorage.getItem('audioHidden') != 'true') {
        audioPlayer.classList.add('widget-hidden');
    }

    //todo
    if(localStorage.getItem('todoCheckbox')) {
        todoWid.checked = JSON.parse(localStorage.getItem('todoCheckbox'));
    }
    if(localStorage.getItem('todoHidden') && localStorage.getItem('todoHidden') != 'true') {
        todoButton.classList.add('widget-hidden');
    }

    //links
    if(localStorage.getItem('links')) {
        linksWid.checked = JSON.parse(localStorage.getItem('links'));
    }
    if(localStorage.getItem('linksHidden') && localStorage.getItem('linksHidden') != 'true') {
        linksButton.classList.add('widget-hidden');
    }

    //API
    if(localStorage.getItem('uapi') && localStorage.getItem('uapi') == 'true') {
        uapi.checked = JSON.parse(localStorage.getItem('uapi'));
        changeApi();
    }
    if(localStorage.getItem('fapi') && localStorage.getItem('fapi') == 'true') {
        fapi.checked = JSON.parse(localStorage.getItem('fapi'));
        changeApi();
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
showGreeting();

// Slider images

function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

function getSlideNext() {
    randomNum += 1;
    if(randomNum > 20) {
        randomNum = 1;
    }
    setBg();
}

function getSlidePrev() {
    randomNum -= 1;
    if(randomNum < 1) {
        randomNum = 20;
    }
    setBg();
}

function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay().toLowerCase();
    const bgNum = `${randomNum}`.padStart(2, 0);
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }
}
nextSlide.addEventListener('click', getSlideNext);
prevSlide.addEventListener('click', getSlidePrev);
getRandomNum();
setBg();

// Weather 

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCityInput.value}&lang=en&appid=57d9f7e035f22cf396079e2f23c7b394&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        const cloudsUp = `${data.weather[0].description}`;
        
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        clouds.textContent = cloudsUp[0].toUpperCase() + cloudsUp.slice(1);
        windSpeed.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
        weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    } catch(err) {
        weatherIcon.className = '';
        temperature.textContent = 'Error';
        clouds.textContent = 'invalid value';
        weatherHumidity.textContent = '';
        windSpeed.textContent = ''
    }
}

weatherCityInput.addEventListener('change', getWeather);
window.addEventListener('load', getWeather);
getWeather();

// Quotes

async function getQuotes() {
    const quotes = 'js/quotes.json';
    const response = await fetch(quotes);
    const data = await response.json();
    const randomQuote = Math.floor(Math.random() * data.length);
    quote.textContent = '"' + data[`${randomQuote}`].text + '"';
    author.textContent = data[`${randomQuote}`].author;
}

getQuotes();
changeQuote.addEventListener('click', getQuotes);

// AudioPlayer 

function playAudioNext() {
    audioNum++;
    if(audioNum > playList.length - 1) {
        audioNum = 0;
    }
    isPlay = false;
    playAudio();
}

function playAudioPrev() {
    audioNum--;
    if(audioNum < 0) {
        audioNum = playList.length - 1;
    }
    isPlay = false;
    playAudio();
}

function playAudio() {
    if(!isPlay) {
        audio.src = playList[audioNum].src;
        audio.currentTime = 0;
        audio.play();
        playButton.classList.add('pause');
        isPlay = true
        audioBar.classList.add('show');
        songTitle.textContent = playList[audioNum].title;
    } else if(isPlay) {
        audio.pause();
        playButton.classList.remove('pause');
        isPlay = false; 
        audioBar.classList.remove('show');
    }
}

playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    playListContainer.append(li);
})

playButton.addEventListener('click', playAudio);
audio.addEventListener('ended', playAudioNext);

playButtonPrev.addEventListener('click', () => {
    const activeAudio = playListContainer.childNodes[audioNum];
    activeAudio.classList.remove('item-active');
    playAudioPrev();
});

playButtonNext.addEventListener('click', () => {
    const activeAudio = playListContainer.childNodes[audioNum];
    activeAudio.classList.remove('item-active');
    playAudioNext();
});

audio.addEventListener('playing', () => {
    const activeAudio = playListContainer.childNodes[audioNum];
    activeAudio.classList.add('item-active');
})

audio.addEventListener('pause', () => {
    const activeAudio = playListContainer.childNodes[audioNum];
    activeAudio.classList.remove('item-active'); 
})

// Advanced AudioPlayer

//Progress Bar
function timeAudioUpdate(el) {
    const {duration, currentTime} = el.srcElement;
    const progressPrecent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPrecent}%`;
    TimeAudio(duration, currentTime);
}
audio.addEventListener('timeupdate', timeAudioUpdate);

function TimeAudio(dur, crT) {
    //Duration audio
    if(dur >= 0) {
        let seconds = parseInt(dur);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        audioDuration.textContent = `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;
    }

    //Progress time audio
    let secondsUp = parseInt(crT);
    let minutesUp = parseInt(secondsUp / 60);
    secondsUp -= minutesUp * 60;
    timeAudioProgress.textContent = `${String(minutesUp).padStart(2, 0)}:${String(secondsUp).padStart(2, 0)}`;
}

//Skip audio with click on the bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickProgress = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickProgress / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

function volumeMean() {
    const volume = audio.volume;
    const volumeProcents = volume * 100;
    volumeBarProgress.style.width = `${volumeProcents}%`;
}
audio.addEventListener('timeupdate', volumeMean);

function setVolumeMean(event) {
    const width = this.clientWidth;
    const clickDot = event.offsetX;
    audio.volume = clickDot / width;
}
volumeBar.addEventListener('click', setVolumeMean);

muteButton.addEventListener('click', () => {
    if(audio.volume === 0) {
        audio.volume = 0.5;
        volumeIcon.classList.remove('mute-icon');
    } else {
        audio.volume = 0;
        volumeIcon.classList.add('mute-icon');
    }
})

const overlay = document.querySelector('.overlay');

// Links 

linksButton.addEventListener('click', () => {
    linksMenu.classList.toggle('links-menu-show');
    overlay.classList.toggle('overlay-show');
})

// Todo list

todoButton.addEventListener('click', () => {
    settingsList.classList.remove('settings-list-show');
    todoList.classList.toggle('todo-list-show');
    overlay.classList.toggle('overlay-show');
})

function todoListRefresh() {
    todoArr = [];
    localStorage.removeItem('todo');
    todoContent.innerHTML = '';
}
todoRefresh.addEventListener('click', todoListRefresh);

function remeberCheckbox() {
    const checkBoxes = document.getElementsByClassName('check');
    
    for(let i = 0; i < checkBoxes.length; i++) {
        if(checkBoxes[i].checked) {
            todoArr[i].checkbox = true;
        } else {
            todoArr[i].checkbox = false;
        }
    }
}

todoContent.addEventListener('click', (event) => {
    if(event.target.className == 'check') {
        remeberCheckbox();
    }
})

function addTodo() {
    if(todoInput.value === '') {
        return null;
    }

    const todoCouple = {};

    todoCouple.todo = todoInput.value;
    todoCouple.checkbox = false;
    todoArr.push(todoCouple);
    showTodo();
    todoInput.value = '';
}

function showTodo() {
    let showList = '';
    
    todoArr.forEach(item => {
        if(item.checkbox === true) {
            showList += '<div>' + '<input type="checkbox" class="check" checked>' + '<div>' + item.todo + '</div>' + '</div>';
        } else {
            showList += '<div>' + '<input type="checkbox" class="check">' + '<div>' + item.todo + '</div>' + '</div>';
        }
    })
    
    todoContent.innerHTML = showList;
}

addTodoButton.addEventListener('click', addTodo);

// Settings 

function showWidget() {
    timeWid.onchange = () => {
        if(timeWid.checked == false) {
            time.classList.add('widget-hidden');
            localStorage.setItem('timeHidden', false);
        } else {
            time.classList.remove('widget-hidden');
            localStorage.setItem('timeHidden', true);
        }
        localStorage.setItem('time', JSON.stringify(timeWid.checked));
    }

    dateWid.onchange = () => {
        if(dateWid.checked == false) {
            date.classList.add('widget-hidden');
            localStorage.setItem('dateHidden', false);
        } else {
            date.classList.remove('widget-hidden');
            localStorage.setItem('dateHidden', true);
        }
        localStorage.setItem('date', JSON.stringify(dateWid.checked));
    }

    greetingWid.onchange = () => {
        if(greetingWid.checked == false) {
            greeting.classList.add('widget-hidden');
            nameInput.classList.add('widget-hidden');
            localStorage.setItem('greetingHidden', false);
        } else {
            greeting.classList.remove('widget-hidden');
            nameInput.classList.remove('widget-hidden');
            localStorage.setItem('greetingHidden', true);
        }
        localStorage.setItem('greeting', JSON.stringify(greetingWid.checked));
    }

    quotesWid.onchange = () => {
        if(quotesWid.checked == false) {
            quote.classList.add('widget-hidden');
            author.classList.add('widget-hidden');
            changeQuote.classList.add('widget-hidden');
            localStorage.setItem('quotesHidden', false);
        } else {
            quote.classList.remove('widget-hidden');
            author.classList.remove('widget-hidden');
            changeQuote.classList.remove('widget-hidden');
            localStorage.setItem('quotesHidden', true);
        }
        localStorage.setItem('quotes', JSON.stringify(quotesWid.checked));
    }

    weatherWid.onchange = () => {
        if(weatherWid.checked == false) {
            weather.classList.add('widget-hidden');
            localStorage.setItem('weatherHidden', false);
        } else {
            weather.classList.remove('widget-hidden');
            localStorage.setItem('weatherHidden', true);
        }
        localStorage.setItem('weather', JSON.stringify(weatherWid.checked));
    }

    audioWid.onchange = () => {
        if(audioWid.checked == false) {
            audioPlayer.classList.add('widget-hidden');
            localStorage.setItem('audioHidden', false);
        } else {
            audioPlayer.classList.remove('widget-hidden');
            localStorage.setItem('audioHidden', true);
        }
        localStorage.setItem('audio', JSON.stringify(audioWid.checked));
    }

    todoWid.onchange = () => {
        if(todoWid.checked == false) {
            todoButton.classList.add('widget-hidden');
            localStorage.setItem('todoHidden', false);
        } else {
            todoButton.classList.remove('widget-hidden');
            localStorage.setItem('todoHidden', true);
        }
        localStorage.setItem('todoCheckbox', JSON.stringify(todoWid.checked));
    }

    linksWid.onchange = () => {
        if(linksWid.checked == false) {
            linksButton.classList.add('widget-hidden');
            localStorage.setItem('linksHidden', false);
        } else {
            linksButton.classList.remove('widget-hidden');
            localStorage.setItem('linksHidden', true);
        }
        localStorage.setItem('links', JSON.stringify(linksWid.checked));
    }
}

settingsButton.addEventListener('click', () => {
    todoList.classList.remove('todo-list-show');
    settingsList.classList.toggle('settings-list-show');
    overlay.classList.toggle('overlay-show');
    showWidget();
})

overlay.addEventListener('click', () => {
    todoList.classList.remove('todo-list-show');
    settingsList.classList.remove('settings-list-show');
    linksMenu.classList.remove('links-menu-show');
    overlay.classList.remove('overlay-show');
})

// API images

function changeApi() {
    if(rssApi.checked === true) {
        setBg();
        prevSlide.removeEventListener('click', getLinkToImage);
        nextSlide.removeEventListener('click', getLinkToImage);
        nextSlide.removeEventListener('click', getLinkToImage2);
        prevSlide.removeEventListener('click', getLinkToImage2);
        tagsImages.removeEventListener('change', getLinkToImage);
        tagsImages.removeEventListener('change', getLinkToImage2);
        nextSlide.addEventListener('click', getSlideNext);
        prevSlide.addEventListener('click', getSlidePrev);
    } else if(uapi.checked === true) {
        getLinkToImage()
        nextSlide.removeEventListener('click', getSlideNext);
        prevSlide.removeEventListener('click', getSlidePrev);
        nextSlide.removeEventListener('click', getLinkToImage2);
        prevSlide.removeEventListener('click', getLinkToImage2);
        tagsImages.removeEventListener('change', getLinkToImage2);
        nextSlide.addEventListener('click', getLinkToImage);
        prevSlide.addEventListener('click', getLinkToImage);
        tagsImages.addEventListener('change', getLinkToImage);
    } else if(fapi.checked === true) {
        getLinkToImage2();
        nextSlide.removeEventListener('click', getSlideNext);
        prevSlide.removeEventListener('click', getSlidePrev);
        nextSlide.removeEventListener('click', getLinkToImage);
        prevSlide.removeEventListener('click', getLinkToImage);
        tagsImages.removeEventListener('change', getLinkToImage);
        nextSlide.addEventListener('click', getLinkToImage2);
        prevSlide.addEventListener('click', getLinkToImage2);
        tagsImages.addEventListener('change', getLinkToImage2);
    }
    
}

async function getLinkToImage() {
    const tag = tagsImages.value.toLowerCase().replace(/[#]/g, '');
    const img = new Image();
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=kPbDcbZShnEddmGnS94rkU3XqCu1GewhGfWYOiZp1Eo`;
    const response = await fetch(url);
    const data = await response.json();
    try {
        img.src = data.urls.regular;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`;
        }
    } catch(err) {
        console.log('Error', err)
    }
}

async function getLinkToImage2() {
    const tag = tagsImages.value.toLowerCase().replace(/[#]/g, '');
    const randomInt = Math.floor(Math.random() * (90 - 0 + 1)) + 0;
    const img = new Image();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d980b4841be2f6810b9aeb96bb6f8d4a&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const response = await fetch(url);
    const data = await response.json();
    try {
        img.src = data.photos.photo[randomInt].url_l;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`;
        }
    } catch(err) {
        console.log('Error', err);
    }
}

rssApi.addEventListener('click', changeApi);
uapi.addEventListener('click', changeApi);
fapi.addEventListener('click', changeApi);