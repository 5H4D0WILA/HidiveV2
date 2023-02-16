function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

function fancyTimeFormat(duration) {
    // minutes and seconds
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    ret += (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }

setTimeout(async function () {
    const greeting = document.querySelector("#userGreeting > h2");
    if (greeting) {
        greeting.innerHTML = greeting.innerHTML
            .replace(",", ', <br><span class="userGreetingSpan">')
            .replace("!", "</span>");
    }
    var myNav = document.querySelector(".navbar");

    window.onscroll = function () {
        "use strict";
        if (
            document.body.scrollTop >= 280 ||
            document.documentElement.scrollTop >= 280
        ) {
            myNav.classList.add("scroll");
        } else {
            myNav.classList.remove("scroll");
        }
    };
}, 100);

window.onload = function () {
    //alert('TESTING')
    var targetNode = document.getElementById("rmpPlayer");

    var config = {
        attributes: true,
        childList: true,
        subtree: true,
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
};

var modifyDone = false

// Callback function to execute when mutations are observed
var callback = function (mutationsList) {
    if(modifyDone) return
    for (var mutation of mutationsList) {
        if (mutation.type == "childList") {
            console.log("A child node has been added or removed.");
            // .style.setProperty('--blue', 'lightblue');

            const element = document.querySelector('.rmp-video');


            if (element.getAttribute('listener') !== 'true') {
                element.addEventListener('timeupdate', function (e) {
                    const seekBar = document.querySelector('.rmp-seek-bar')
                    seekBar.style.setProperty('--currentTime', `"${fancyTimeFormat(element.currentTime)}"`, "important");
                });
                element.addEventListener('durationchange', function (e) {
                    const seekBar = document.querySelector('.rmp-seek-bar')
                    seekBar.style.setProperty('--duration', `"${fancyTimeFormat(element.duration)}"`, "important");
                    seekBar.style.setProperty('--currentTime', `"00:00"`, "important");
                });
            }

            const seekBar = document.querySelector('.rmp-seek-bar')
            if(seekBar) {
                seekBar.append(createElementFromHTML('<span class="rmp-time-elapsed-text">00:00</span>'))
            }

            //<i class="fa-solid fa-volume"></i>

            const volumeButton = document.querySelector(".rmp-desktop-volume-icon");
            if (volumeButton) {
                volumeButton.innerHTML = createElementFromHTML('<svg class="hoverEffect" width="38" height="38" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white"><path d="M333.1 34.8C344.6 40 352 51.4 352 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L163.8 352H96c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L298.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zm172 72.2c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C507.3 341.3 528 301.1 528 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C466.1 199.1 480 225.9 480 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C425.1 284.4 432 271 432 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>').outerHTML
                volumeButton.appendChild(createElementFromHTML('<input type="range" min="0" max="100" value="50" class="slider" id="myRange">'))
                //playButton.attr('data-before','');
            }

            document.getElementById("myRange").oninput = function() {
                element.volume = this.value / 100
                this.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff '+this.value +'%, #ffffff70 ' + this.value + '%, #ffffff70 100%)'
            };

            const fullscreenButton = document.querySelector(".rmp-fullscreen");
            if (fullscreenButton) {
                fullscreenButton.innerHTML = createElementFromHTML('<svg class="hoverEffect" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>').outerHTML
                //playButton.attr('data-before','');
            }
//
            const playButton = document.querySelector(".rmp-play-pause");
            if (playButton) {
                playButton.innerHTML = createElementFromHTML('<svg class="hoverEffect" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>').outerHTML
                //playButton.attr('data-before','');
            }

            modifyDone = true
        }
    }
};

setTimeout(async function () {
    //alert('PLAYER')
    // video player stuff

    // play button
    //<div class="rmp-control-bar-hint rmp-color-bg" style="margin-left: -21.5px; left: 50%;">Play</div>
    const playButton = document.querySelector("rmpPlayer");

    if (playButton) {
        console.log(playButton);
        //playButton.innerHTML = "HEWWOOOOOOO"
    }
}, 6000);
