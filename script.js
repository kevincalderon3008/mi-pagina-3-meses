/* =========================================
   PÁGINA 3 MESES CONTIGO ❤️
========================================= */


/* =========================================
   BOTÓN COMENZAR
========================================= */

const startButton = document.getElementById("startButton");

if (startButton) {

    startButton.addEventListener("click", () => {

        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });

    });

}


/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================
   CORAZONES FLOTANTES
========================================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.textContent = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    heart.style.opacity = "0.7";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "999";

    document.body.appendChild(heart);

    const duration = Math.random() * 3000 + 4000;

    heart.animate(
        [
            {
                transform: "translateY(0)",
                opacity: 0
            },
            {
                transform: "translateY(-30vh)",
                opacity: 0.7
            },
            {
                transform: "translateY(-110vh)",
                opacity: 0
            }
        ],
        {
            duration: duration,
            easing: "linear"
        }
    );

    setTimeout(() => {

        heart.remove();

    }, duration);

}


setInterval(createHeart, 1800);


/* =========================================
   LIGHTBOX DE FOTOS
========================================= */

const galleryImages = document.querySelectorAll(".photo-card img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");


galleryImages.forEach((image) => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("show");

    });

});


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});


/* =========================================
   REPRODUCTOR DE MÚSICA
========================================= */

const songs = [

    {
        title: "Zombie Lady",
        artist: "Damiano David",
        file: "audio/Damiano David - Zombie Lady (Lyrics).mp3"
    },

    {
        title: "Beso",
        artist: "Jósean Log",
        file: "audio/Jósean Log - Beso (Lyric Video).mp3"
    },

    {
        title: "Juno",
        artist: "Juno",
        file: "audio/Juno.mp3"
    },

    {
        title: "A Dónde Vamos",
        artist: "Morat",
        file: "audio/Morat - A Dónde Vamos (Video Oficial).mp3"
    },

    {
        title: "Aprender A Quererte",
        artist: "Morat",
        file: "audio/Morat - Aprender A Quererte.mp3"
    },

    {
        title: "Para Enamorarte",
        artist: "CNCO",
        file: "audio/Para Enamorarte - CNCO (Letra).mp3"
    }

];


const audioPlayer = document.getElementById("audioPlayer");

const songTitle = document.getElementById("songTitle");

const songArtist = document.getElementById("songArtist");

const playButton = document.getElementById("playButton");

const prevButton = document.getElementById("prevButton");

const nextButton = document.getElementById("nextButton");

const progressBar = document.getElementById("progressBar");

const currentTimeElement = document.getElementById("currentTime");

const durationElement = document.getElementById("duration");

const playlist = document.getElementById("playlist");


let currentSong = 0;


/* =========================================
   CARGAR CANCIÓN
========================================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audioPlayer.src = song.file;

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    updatePlaylist();

}


/* =========================================
   PLAY / PAUSE
========================================= */

function playSong() {

    audioPlayer.play();

    playButton.textContent = "⏸";

}


function pauseSong() {

    audioPlayer.pause();

    playButton.textContent = "▶";

}


playButton.addEventListener("click", () => {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


/* =========================================
   CANCIÓN ANTERIOR
========================================= */

prevButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


/* =========================================
   SIGUIENTE CANCIÓN
========================================= */

nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


/* =========================================
   SIGUIENTE AUTOMÁTICAMENTE
========================================= */

audioPlayer.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


/* =========================================
   BARRA DE PROGRESO
========================================= */

audioPlayer.addEventListener("timeupdate", () => {

    if (!audioPlayer.duration) {
        return;
    }

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress;

    currentTimeElement.textContent =
        formatTime(audioPlayer.currentTime);

});


audioPlayer.addEventListener("loadedmetadata", () => {

    durationElement.textContent =
        formatTime(audioPlayer.duration);

});


progressBar.addEventListener("input", () => {

    if (!audioPlayer.duration) {
        return;
    }

    audioPlayer.currentTime =
        (progressBar.value / 100) * audioPlayer.duration;

});


/* =========================================
   FORMATO DEL TIEMPO
========================================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


/* =========================================
   LISTA DE CANCIONES
========================================= */

function updatePlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const item = document.createElement("div");

        item.className = "song-item";

        if (index === currentSong) {

            item.classList.add("active");

        }

        item.textContent =
            `${index + 1}. ${song.title} — ${song.artist}`;

        item.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });

        playlist.appendChild(item);

    });

}


/* =========================================
   CONTADOR
========================================= */

/*
   CAMBIA ESTA FECHA POR LA FECHA REAL
   EN QUE COMENZARON SU RELACIÓN.

   FORMATO:
   AÑO-MES-DÍA T:MINUTOS

   Ejemplo:
   "2026-06-09T20:00:00"
*/

const relationshipDate =
    new Date("2026-06-09T20:00:00");


function updateCounter() {

    const now = new Date();

    const difference =
        now - relationshipDate;


    if (difference < 0) {

        return;

    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const days =
        Math.floor(totalSeconds / 86400);


    const hours =
        Math.floor((totalSeconds % 86400) / 3600);


    const minutes =
        Math.floor((totalSeconds % 3600) / 60);


    const seconds =
        totalSeconds % 60;


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        hours;

    document.getElementById("minutes").textContent =
        minutes;

    document.getElementById("seconds").textContent =
        seconds;

}


setInterval(updateCounter, 1000);

updateCounter();


/* =========================================
   BOTÓN SORPRESA
========================================= */

const surpriseButton =
    document.getElementById("surpriseButton");

const surpriseMessage =
    document.getElementById("surpriseMessage");


surpriseButton.addEventListener("click", () => {

    surpriseMessage.classList.toggle("show");

    if (surpriseMessage.classList.contains("show")) {

        surpriseButton.textContent =
            "Cerrar sorpresa 💕";

    } else {

        surpriseButton.textContent =
            "Abrir sorpresa 💖";

    }

});


/* =========================================
   CARGAR PRIMERA CANCIÓN
========================================= */

loadSong(0);
