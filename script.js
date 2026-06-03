const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip Forward / Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update Volume & Playback Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Seek Video by Clicking Progress Bar
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});

ranges.forEach(range => {
  range.addEventListener('input', handleRangeUpdate);
  range.addEventListener('change', handleRangeUpdate);
});

progress.addEventListener('click', scrub);

// Optional: Handle video load errors without popup
video.addEventListener('error', () => {
  console.log('Video failed to load');
});