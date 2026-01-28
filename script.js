const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumePercentage = document.getElementById('volumePercentage');
const decreaseVolumeBtn = document.getElementById('decreaseVolumeBtn');
const increaseVolumeBtn = document.getElementById('increaseVolumeBtn');
const progressBarContainer = document.querySelector('.progress-bar-container');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const songTitleEl = document.getElementById('songTitle');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const songCounterEl = document.getElementById('songCounter');

// Массив с плейлистом
const playlist = [
  {
    title: "KISS ME AGAIN ! .mp3",
    src: "music/1.mp3"
  },
  {
    title: "Mada-Самая-_Official-Lyrics-Video_.mp3",
    src: "music/2.mp3"
  },
  {
    title: "My Demons - RADIO TAPOK.mp3",
    src: "music/3.mp3"
  },
  {
    title: "We-Fell-Apart-ANGUISH_-AmbVsh-and-ily.mp3",
    src: "music/4.mp3"
  },
  {
    title: "А_мы_не_ангелы__парень_Братство_Атома_and_Алексей_Понамарёв.mp3",
    src: "music/5.mp3"
  },
  {
    title: "ангел-хранитель-я-про-рок.mp3",
    src: "music/6.mp3"
  },
  {
    title: "вредина-алёна-швец.mp3",
    src: "music/7.mp3"
  },
  {
    title: "Игра! Feat @TRISH-A Genshin Impact Песня про Арлекино.mp3",
    src: "music/8.mp3"
  },
  {
    title: "машина-для-убийств-алёна-швец.mp3",
    src: "music/9.mp3"
  }
];

let currentTrackIndex = 0;

function loadTrack(index) {
  audio.src = playlist[index].src;
  songTitleEl.textContent = playlist[index].title;
  audio.load();
  audio.play();
  playPauseBtn.textContent = 'Стоп';
  songCounterEl.textContent = `${index + 1}/${playlist.length}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) {
    currentTrackIndex = 0;
  }
  loadTrack(currentTrackIndex);
});

prevBtn.addEventListener('click', () => {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = playlist.length - 1;
  }
  loadTrack(currentTrackIndex);
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

audio.volume = volumeSlider.value;
volumePercentage.textContent = Math.round(audio.volume * 100) + '%';

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBarContainer.addEventListener('click', (e) => {
  const width = progressBarContainer.clientWidth;
  const clickX = e.offsetX;
  const newTime = (clickX / width) * audio.duration;
  audio.currentTime = newTime;
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'Стоп';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'Пуск';
  }
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  volumePercentage.textContent = Math.round(audio.volume * 100) + '%';
});

decreaseVolumeBtn.addEventListener('click', () => {
  if (audio.volume > 0.01) {
    audio.volume = Math.max(0, audio.volume - 0.01);
    volumeSlider.value = audio.volume;
    volumePercentage.textContent = Math.round(audio.volume * 100) + '%';
  }
});

increaseVolumeBtn.addEventListener('click', () => {
  if (audio.volume < 1) {
    audio.volume = Math.min(1, audio.volume + 0.01);
    volumeSlider.value = audio.volume;
    volumePercentage.textContent = Math.round(audio.volume * 100) + '%';
  }
});

audio.addEventListener('play', () => {
  playPauseBtn.textContent = 'Стоп';
});

audio.addEventListener('pause', () => {
  playPauseBtn.textContent = 'Пуск';
});