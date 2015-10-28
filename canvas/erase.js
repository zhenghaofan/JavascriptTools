//通过修改globalCompositeOperation来达到擦除的效果
function tapClip(){
    var hastouch = "ontouchstart" in window?true:false,
        tapstart = hastouch?"touchstart":"mousedown",
        tapmove = hastouch?"touchmove":"mousemove",
        tapend = hastouch?"touchend":"mouseup";
     
    canvas.addEventListener(tapstart , function(e){
　　　　 clearTimeout(timeout)
        e.preventDefault();
         
        x1 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
        y1 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
         
        ctx.lineCap = "round";　　//设置线条两端为圆弧
        ctx.lineJoin = "round";　　//设置线条转折为圆弧
        ctx.lineWidth = a*2;　　
        ctx.globalCompositeOperation = "destination-out";
         
        ctx.save();
        ctx.beginPath()
        ctx.arc(x1,y1,1,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
         
        canvas.addEventListener(tapmove , tapmoveHandler);
        canvas.addEventListener(tapend , function(){
            canvas.removeEventListener(tapmove , tapmoveHandler);
             
　　　　　　　timeout = setTimeout(function(){
            var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
            var dd = 0;
            for(var x=0;x<imgData.width;x+=30){
                for(var y=0;y 0){
                        dd++
                    }
                }
            }
            if(dd/(imgData.width*imgData.height/900)<0.4){
                canvas.className = "noOp";
            }
　　　　　　　},100)
        });
        function tapmoveHandler(e){
            e.preventDefault()
            x2 = hastouch?e.targetTouches[0].pageX:e.clientX-canvas.offsetLeft;
            y2 = hastouch?e.targetTouches[0].pageY:e.clientY-canvas.offsetTop;
             
            ctx.save();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.restore()
             
            x1 = x2;
            y1 = y2;
        }
    })
}