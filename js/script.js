var songNum = 52;
var noFileNotFoundError = true;
$(document).ready(function () {

    //binding 隨機播放checkbox
    $('#randomPlay').change(() => onRandomPlayCheckChanged());

        //generate mp3 player
        for (var i = 1; i <= songNum; i++) {

            var myAudio = document.createElement("audio");
            myAudio.controls = "controls";
            myAudio.id = "fromJS" + i;
            myAudio.textContent = "hi";
    
            var mySrc = document.createElement("source")
            mySrc.src = "musics/music" + i + ".mp3";
            mySrc.type = "audio/mpeg";
            myAudio.appendChild(mySrc);
    
            document.body.appendChild(myAudio);
    
        }




    //自動輪播
    for (var i = 1; i <= songNum; i++) {
        let nextSongID = 1;
        let player = document.getElementById("fromJS" + i);
        if (i >= songNum) {
            nextSongID = 1;
        } else {
            nextSongID = i + 1;
        }
        player.onended = () => {
            document.getElementById("fromJS" + nextSongID).play();
        };
    }
});


//勾選隨機播放checkBox
function onRandomPlayCheckChanged() {

    if ($('#randomPlay').is(":checked")) {

        for (var i = 1; i <= songNum; i++) {

            let player = document.getElementById("fromJS" + i);

            player.onended = () => {
                let id = player.id;
                let currNumber = id.match(/\d+/)[0];
                let rndNumber = parseInt(Math.random() * songNum + 1);
                while (currNumber == rndNumber) {
                    rndNumber = parseInt(Math.random() * songNum + 1);
                }
                document.getElementById("fromJS" + rndNumber).play();
            };
        }

    } else {

        for (var i = 1; i <= songNum; i++) {

            let nextSongID = 1;
            let player = document.getElementById("fromJS" + i);
            if (i >= songNum) {
                nextSongID = 1;
            } else {
                nextSongID = i + 1;
            }

            player.onended = () => {
                document.getElementById("fromJS" + nextSongID).play();
            };
        }
    }
}


//播放下一首歌
function playNextSong() {

    var num = 1;

    while (document.getElementById("fromJS" + num)) {
        let player = document.getElementById("fromJS" + num);
        if (!player.paused) {
            player.currentTime = player.duration;
        }
        num++;
    }
}

//一次調整所有歌曲音量
function volumeAdjust() {
    var slideBar = document.getElementById("volumeControl");
    var volume = slideBar.value;
    var audios = document.querySelectorAll("audio");
    audios.forEach(x => { x.volume = volume / 100; });
    document.getElementById("volumeText").textContent = `音量：${volume}%`;

}