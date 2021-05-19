const music = document.querySelector("audio");
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const back = document.getElementById('back');
const next = document.getElementById('for');
let isPlaying = false;
let progress = document.getElementById('progress')
let songTime = document.getElementById('duration')
let tot_current_time = document.getElementById('current')
const progress_div = document.getElementById('progress-div')

const songs = [{
    name: "Re Zero",
    title: "Memento",
    artist: "Nonoc",
    time: "5:04"

},
{
    name: "Blue Bird",
    title: "Blue Bird",
    artist: " Ikimono gakari",
    time: "3:38"
},
{
    name: "Bunny girl",
    title: "Fukashigi No Carte",
    artist: "Asami seto",
    time: "1:54"
},
{
    name: "naruto 14",
    title: "Size Of The Moon",
    artist: " Nogizaka46",
    time: "4:00"
},
{
    name: "Renai Circulation",
    title: "Renai Circulation",
    artist: "Kana Hanazawa",
    time: "4:14"

},

{
    name: 'Racing into nights',
    title: "Racing into nights",
    artist: "Yoasabi"

},
{
    name: "Tower of god",
    title: "Top",
    artist: "Stary Kids"
}



]
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause")
};

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play")
};

play.addEventListener("click", () => {

    isPlaying ? pauseMusic() : playMusic()

});

//cahnge music
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    // songTime.textContent = songs.time;
    music.src = "music/" + songs.name + ".mp3"
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0;


const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;

    loadSong(songs[songIndex]);
    playMusic()
}
const backSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    loadSong(songs[songIndex]);
    playMusic()
}
//progress
music.addEventListener('timeupdate', (event) => {

    const { currentTime, duration } = event.srcElement;

    let progrees_time = (currentTime / duration) * 100;
    progress.style.width = `${progrees_time}%`;
    //duration

    let min_durationTime = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let totatl_duration = `${min_durationTime}:${sec_duration}`;
    if (duration) {
        songTime.textContent = `${totatl_duration}`;

    }





    ///curent time
    let min_currenTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`

    }
    let totatl_current = `${min_currenTime}:${sec_currentTime}`;
    tot_current_time.textContent = `${totatl_current}`;

});
// progress on click
progress_div.addEventListener('click', (evl) => {
    const { duration } = music;
    const mus_duration = music.duration;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * mus_duration

    music.currentTime = move_progress;
})

music.addEventListener('ended', nextSong)
next.addEventListener('click', nextSong);
back.addEventListener('click', backSong);