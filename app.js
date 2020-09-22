const init = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  // time duration
  const timeSelect = document.querySelectorAll(".time-select button");
  // Time display
  const timeDisplay = document.querySelector(".time-display");
  // Get the Length of the outline
  const outlineLength = outline.getTotalLength();
  //Duration
  let currDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // select time duration
  timeSelect.forEach((Option) => {
    Option.addEventListener("click", function () {
      currDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(currDuration / 60)}: ${Math.floor(
        currDuration % 60
      )}`;
    });
  });
  //select sound
  sounds.forEach((sound)=>{
      sound.addEventListener('click', function(){
        song.src= this.getAttribute('data-sound');
        video.src=this.getAttribute('data-video');
        checkPlaying(song);
      })
  })
  //control the sound playing and the icon
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = currDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // console.log( 'seconds' , seconds);
    // console.log('minutes' + minutes);

    let progress = outlineLength - (currentTime / currDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // time text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= currDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

init();
