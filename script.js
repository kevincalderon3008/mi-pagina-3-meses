// ==========================================
// BOTÓN COMENZAR
// ==========================================

const startButton = document.getElementById("startButton");

if (startButton) {

    startButton.addEventListener("click", () => {

    const historia =
        document.getElementById("historia");

    if (historia) {

        historia.scrollIntoView({
            behavior: "smooth"
        });

    }

    // Comenzar la música automáticamente
    if (audioPlayer) {

        audioPlayer.play()
            .then(() => {

                playButton.textContent = "⏸";

                musicDisc.classList.add("playing");

            })
            .catch((error) => {

                console.log(
                    "El navegador bloqueó la reproducción automática.",
                    error
                );

            });

    }

});

}


// ==========================================
// ANIMACIONES
// ==========================================

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {
        threshold: 0.15
    });


revealElements.forEach((element) => {

    observer.observe(element);

});


// ==========================================
// CORAZONES
// ==========================================

const heartsContainer =
    document.getElementById("hearts-container");


function createHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.textContent = "❤️";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        12 + Math.random() * 20 + "px";

    heart.style.animationDuration =
        5 + Math.random() * 5 + "s";

    heartsContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 10000);

}


setInterval(createHeart, 900);


// ==========================================
// LIGHTBOX DE FOTOS
// ==========================================

const photoCards =
    document.querySelectorAll(".photo-card");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


photoCards.forEach((card) => {

    card.addEventListener("click", () => {

        const image =
            card.querySelector("img");

        if (!image) {
            return;
        }

        lightboxImage.src =
            image.src;

        lightbox.classList.add("show");

    });

});


if (closeLightbox) {

    closeLightbox.addEventListener("click", () => {

        lightbox.classList.remove("show");

    });

}


if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });

}


// ==========================================
// REPRODUCTOR DE MÚSICA
// ==========================================

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const progressBar =
    document.getElementById("progressBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const songNumber =
    document.getElementById("songNumber");

const musicDisc =
    document.getElementById("musicDisc");


// ==========================================
// TUS 6 CANCIONES
// ==========================================

const songs = [

    {
        title:
            "Damiano David - Zombie Lady (Lyrics)",

        file:
            "audio/Damiano David - Zombie Lady (Lyrics).mp3"
    },

    {
        title:
            "Jósean Log - Beso (Lyric Video)",

        file:
            "audio/Jósean Log - Beso (Lyric Video).mp3"
    },

    {
        title:
            "Juno",

        file:
            "audio/Juno.mp3"
    },

    {
        title:
            "Morat - A Dónde Vamos (Video Oficial)",

        file:
            "audio/Morat - A Dónde Vamos (Video Oficial).mp3"
    },

    {
        title:
            "Morat - Aprender A Quererte",

        file:
            "audio/Morat - Aprender A Quererte.mp3"
    },

    {
        title:
            "Para Enamorarte - CNCO (Letra)",

        file:
            "audio/Para Enamorarte - CNCO (Letra).mp3"
    }

];


let currentSong = 0;


// ==========================================
// CARGAR CANCIÓN
// ==========================================

function loadSong(index) {

    const song =
        songs[index];

    audioPlayer.src =
        song.file;

    audioPlayer.load();

    songTitle.textContent =
        song.title;

    songNumber.textContent =
        "Canción " +
        (index + 1) +
        " de " +
        songs.length;

    progressBar.value = 0;

    currentTimeElement.textContent =
        "0:00";

    durationElement.textContent =
        "0:00";

    updatePlaylist();

}


// ==========================================
// PLAYLIST
// ==========================================

function updatePlaylist() {

    const items =
        document.querySelectorAll(
            ".playlist-item"
        );

    items.forEach((item, index) => {

        item.classList.remove("active");

        if (index === currentSong) {

            item.classList.add("active");

        }

    });

}


// ==========================================
// PLAY / PAUSA
// ==========================================

function togglePlay() {

    if (audioPlayer.paused) {

        audioPlayer.play()
            .catch((error) => {

                console.error(
                    "No se pudo reproducir:",
                    error
                );

            });

    } else {

        audioPlayer.pause();

    }

}


// ==========================================
// SIGUIENTE
// ==========================================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audioPlayer.play()
        .catch(() => {});

}


// ==========================================
// ANTERIOR
// ==========================================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    loadSong(currentSong);

    audioPlayer.play()
        .catch(() => {});

}


// ==========================================
// FORMATO DEL TIEMPO
// ==========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}


// ==========================================
// PROGRESO
// ==========================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (audioPlayer.duration) {

            const percentage =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;

            progressBar.value =
                percentage;

        }

        currentTimeElement.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


// ==========================================
// DURACIÓN
// ==========================================

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        durationElement.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


// ==========================================
// MOVER PROGRESO
// ==========================================

progressBar.addEventListener(
    "input",
    () => {

        if (audioPlayer.duration) {

            audioPlayer.currentTime =
                (
                    progressBar.value / 100
                ) *
                audioPlayer.duration;

        }

    }
);


// ==========================================
// ESTADO DEL REPRODUCTOR
// ==========================================

audioPlayer.addEventListener(
    "play",
    () => {

        playButton.textContent =
            "⏸";

        musicDisc.classList.add(
            "playing"
        );

    }
);


audioPlayer.addEventListener(
    "pause",
    () => {

        playButton.textContent =
            "▶";

        musicDisc.classList.remove(
            "playing"
        );

    }
);


// ==========================================
// CUANDO TERMINA LA CANCIÓN
// ==========================================

audioPlayer.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


// ==========================================
// BOTONES
// ==========================================

playButton.addEventListener(
    "click",
    togglePlay
);


nextButton.addEventListener(
    "click",
    nextSong
);


previousButton.addEventListener(
    "click",
    previousSong
);


// ==========================================
// CLIC EN PLAYLIST
// ==========================================

const playlistItems =
    document.querySelectorAll(
        ".playlist-item"
    );


playlistItems.forEach((item) => {

    item.addEventListener("click", () => {

        currentSong =
            Number(
                item.dataset.song
            );

        loadSong(currentSong);

        audioPlayer.play()
            .catch(() => {});

    });

});


// ==========================================
// CONTADOR
// ==========================================

// CAMBIA ESTA FECHA POR LA FECHA REAL
// EN QUE COMENZARON SU RELACIÓN.

const relationshipDate =
    new Date("2026-06-09T20:00:00");


function updateCounter() {

    const now =
        new Date();

    const difference =
        now - relationshipDate;

    if (difference < 0) {
        return;
    }

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    document.getElementById(
        "days"
    ).textContent = days;


    document.getElementById(
        "hours"
    ).textContent = hours;


    document.getElementById(
        "minutes"
    ).textContent = minutes;


    document.getElementById(
        "seconds"
    ).textContent = seconds;

}


updateCounter();

setInterval(
    updateCounter,
    1000
);


// ==========================================
// BOTÓN SORPRESA
// ==========================================

const loveButton =
    document.getElementById("loveButton");

const surpriseMessage =
    document.getElementById(
        "surpriseMessage"
    );


if (loveButton) {

    loveButton.addEventListener(
        "click",
        () => {

            surpriseMessage.classList.remove(
                "hidden"
            );

            loveButton.textContent =
                "❤️ Gracias por estos 3 meses ❤️";


            for (let i = 0; i < 15; i++) {

                setTimeout(() => {

                    createHeart();

                }, i * 100);

            }

        }
    );

}


// ==========================================
// INICIAR
// ==========================================

loadSong(0);