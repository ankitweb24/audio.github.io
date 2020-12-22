let music = document.getElementById('music');
let play = document.getElementById('play');
let prev = document.getElementById('prev');
let forward = document.getElementById('forward');

let songName = document.getElementById('song_name');
let artistName = document.getElementById('artistName');
let almName = document.getElementById("almName");

let img_id = document.getElementById('img_id');


//get the progress div
let pro_main = document.getElementById('pro_main');
let prg_div = document.getElementById('prg_set');

let crnt = document.getElementById('crnt');
// console.log(crnt);
let durat = document.getElementById('durat');


// console.log(prg_div);

let sp = document.querySelector('.sp');
let sp1 = document.querySelector('.sp1');
let sp2 = document.querySelector('.sp2');
let sp3 = document.querySelector('.sp3');
let sp4 = document.querySelector('.sp4');
let sp5 = document.querySelector('.sp5');
let sp6 = document.querySelector('.sp6');
let sp7 = document.querySelector('.sp7');
let sp8 = document.querySelector('.sp8');

let songsIndex = 0;

//create the array of an object
const songs = [{
        name: "ms (1)",
        title: "Black",
        artist: "guru randhawa",
        album: "no compitions"
    },
    {
        name: "ms (2)",
        title: "Teri gali Aagyi",
        artist: "guru Randhawa",
        album: "Title Song"
    },
    {
        name: "ms (3)",
        title: "baby girl",
        artist: "guru randhawa",
        album: "title song"
    },
    {
        name: "ms (4)",
        title: "Brand",
        artist: "Sumit Goswami",
        album: "title song"
    },
    {
        name: "ms (5)",
        title: "care ni karda",
        artist: "Alfaaz/yo yo honey singh",
        album: "title song"
    },
    {
        name: "ms (6)",
        title: "Dil todne se Pahle",
        artist: "Jass Manak",
        album: "age - 19"
    },
    {
        name: "ms (7)",
        title: "frist kiss",
        artist: "yo yo honey singh",
        album: "title song"
    },
    {
        name: "ms (8)",
        title: "uncha lamba",
        artist: "AISH",
        album: "title song"
    }
];

let played = false;

//define the playMusic function
const playMusic = () => {
    played = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img_id.classList.add("img_round");
    sp.classList.add("anm2");
    sp1.classList.add("anm2");
    sp2.classList.add("anm2");
    sp3.classList.add("anm2");
    sp4.classList.add("anm2");
    sp5.classList.add("anm2");
    sp6.classList.add("anm2");
    sp7.classList.add("anm2");
    sp8.classList.add("anm2");
}

//define the pauseMusic function
const pauseMusic = () => {
    played = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img_id.classList.remove('img_round');
    sp.classList.remove("anm2");
    sp1.classList.remove("anm2");
    sp2.classList.remove("anm2");
    sp3.classList.remove("anm2");
    sp4.classList.remove("anm2");
    sp5.classList.remove("anm2");
    sp6.classList.remove("anm2");
    sp7.classList.remove("anm2");
    sp8.classList.remove("anm2");
}


//click the play button
play.addEventListener('click', () => {
    if (played) {
        pauseMusic();
    } else {
        playMusic();
    }
})

//define the load songs
const loadSongs = (songs) => {
    // console.log(songs);
    songName.textContent = songs.title;
    artistName.textContent = songs.artist;
    almName.textContent = songs.album;
    music.src = "music/" + songs.name + ".mp3";
    img_id.src = "images/" + songs.name + ".jpg";

}



//define the nextMusic and backMusic function
const nextMusic = () => {
    songsIndex = (songsIndex + 1) % songs.length;
    loadSongs(songs[songsIndex]);
    // console.log(loadSongs);
    playMusic();
}

const backMusic = () => {
    songsIndex = (songsIndex - 1 + songs.length) % songs.length;
    // console.log(songsIndex);
    loadSongs(songs[songsIndex]);
    playMusic();

}



// call the prev and next function
forward.addEventListener('click', nextMusic);
prev.addEventListener('click', backMusic);


//add the progress functionalty
music.addEventListener('timeupdate', (task) => {
    // console.log(task);
    let {
        currentTime,
        duration
    } = task.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let timePrg = (currentTime / duration) * 100;
    // console.log(timePrg);
    prg_div.style.width = timePrg + "%";


    //music duration
    let minut_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let totlal_duration =  minut_duration +":" + sec_duration;

    //statment
    if(duration){
        durat.innerText = totlal_duration;
    }


    //current duration
    let minut_currentTime = Math.floor(currentTime / 60);
    // console.log(minut_currentTime);
    let sec_currentTime = Math.floor(currentTime % 60);
    // console.log(sec_currentTime);

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`;
    }
    
    let total_currentTime = minut_currentTime + ":" + sec_currentTime;
    //statment
    if(currentTime){
        crnt.innerText = total_currentTime;
    }


    //if music is the ended so call the next song
    music.addEventListener('ended', nextMusic);

});


//progress clicked functionalty
pro_main.addEventListener('click', (event)=>{
    const {duration} = music;
    // console.log(event);
    let move_prg = (event.offsetX /event.srcElement.clientWidth) * duration;
    // console.log(duration);

    music.currentTime = move_prg;
})