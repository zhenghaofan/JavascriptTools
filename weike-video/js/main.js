var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player = videojs('myplayer');

var t1, times, vectors, paints;
var results = [];

ctx.strokeStyle = 'white';
ctx.lineCap = 'round';
ctx.lineWidth = 3;

function init() {
    t1 = null;
    times = [];
    vectors = [];
    paints = [];
}

init();

$('.pen').click(function() {
    player.pause();
    $('.drawing').toggle();
    $('#myplayer').addClass('player-drawing');
    if (!$('.drawing').is(':visible')) {
        $('#myplayer').removeClass('player-drawing');
        player.play();
        return;
    }
    canvas.addEventListener('mousedown', function(e) {
        e.preventDefault();
        var x1 = e.pageX - canvas.offsetLeft;
        var y1 = e.pageY - canvas.offsetTop;
        vectors.push({
            x: x1,
            y: y1
        });
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        if (t1) {
            var t = Date.now() - t1;
            times.push(t);
        }
        canvas.addEventListener('mousemove', mousemoveHandler);
        canvas.addEventListener('mouseup', mouseupHandler)
    })

    function mousemoveHandler(ev) {
        var x2 = ev.pageX - canvas.offsetLeft;
        var y2 = ev.pageY - canvas.offsetTop;
        vectors.push({
            x: x2,
            y: y2
        });
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x2, y2);
    }

    function mouseupHandler(ev) {
        if (vectors.length > 0) {
            paints.push(vectors);
            vectors = [];
        }
        t1 = Date.now();
        canvas.removeEventListener('mousemove', mousemoveHandler);
        canvas.removeEventListener('mouseup', mouseupHandler);
    }
})

function draw(arr) {
    var timer, t = 1;
    timer = setInterval(function() {
        if (t < arr.length - 1) {
            ctx.beginPath();
            ctx.moveTo(arr[t - 1].x, arr[t - 1].y);
            ctx.lineTo(arr[t].x, arr[t].y);
            ctx.stroke();
            t++;
        } else {
            clearInterval(timer);
        }
    }, 1)
}

$('.draw-play').click(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(times);
    if (paints.length > 0) {
        draw(paints[0]);

        function drawArr(arr, intervalArr) {
            var i = 1,
                length = arr.length;

            function drawSingle(j) {
                // var temp = j;
                setTimeout(function() {
                    if (i < length) {
                        draw(arr[i]);
                        i++;
                    } else {
                        return;
                    }
                    drawSingle(i);
                }, intervalArr[j - 1]);
            }
            drawSingle(i);
        }
        drawArr(paints, times);
    }
})

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    init();
}

$('.save').click(function() {
    var _playTime = player.currentTime();
    var obj = {
        playTime: _playTime,
        paints: paints,
        intervals: times
    }
    if(obj.paints.length > 0) {
        results.push(obj);
    }
    console.log(results);
    $('.drawing').hide();
    player.play();
});

$('.redraw').click(function() {
    redraw();
})

player.on('play', function() {
    $('.drawing').hide();
    $('#myplayer').removeClass('player-drawing');
    redraw();
})
