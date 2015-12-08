//使用setTimeout实现JS动画：
for ( i=0; i<200; i++){
    setTimeout ( function(){
        var left = el.style.left ? el.style.left : 0;
        left = parseInt( left ) +1;
        el.style.left = left+ "px";
    } , i );
}

//使用setInterval