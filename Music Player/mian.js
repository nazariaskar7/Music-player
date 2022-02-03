const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song title
const songs = ['Adele Easy On Me','Rana Mansour  Hemaaghat','Cheez Badi Udit Neha Kakkar', 'Turkish', 'Post Malone  Motley Crew', 'Satin - Toonesti Eshgham', 'Faouzia Minefields', 'Ragheb Naro'];

// keep track of the songs
let songIndext = 0;

// Initially load the songs
loadSong(songs[songIndext]);

// Update the song details 
function loadSong(song) {
    title.innerText = song;
    audio.src = `songs/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');   
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');
    audio.play();

}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndext--;
    
    if(songIndext < 0){
        songIndext = songs.length - 1;
    }
        loadSong(songs[songIndext]);
        playSong();
    
}

function nextSong() {
    songIndext++;
    
    if(songIndext > songs.length - 1){
        songIndext = 0;
    }
        loadSong(songs[songIndext]);
        playSong();
    
}


function updateProgress(e) {

    const { duration, currentTime } = e.srcElement;
    const progressPrecent = (currentTime / duration ) * 100;
    progress.style.width = `${progressPrecent}%`;
}

function setProgress(e) {
const width = this.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;

audio.currentTime = (clickX / width) * duration;
}

// Event listeners 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    
    if(isPlaying){
        pauseSong();
    }else {
        playSong();
        
        
    }
})

prevBtn.addEventListener('click', () => {
    prevSong();
})

nextBtn.addEventListener('click', () => {
    nextSong();
})

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);