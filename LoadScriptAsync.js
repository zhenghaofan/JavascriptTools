//使用递归的方式实现回调嵌套，实现JS按顺序加载
var urls = [
	"aa.js",
	"bb.js"
];
function createScript(url){
	 var script = document.createElement("script");
     script.type = "text/javascript";
     script.src = url;
     return script; 
}

function loadScript(urls,callback){
	var url = urls[0];
	if(url){
		var script = createScript(url);
		script.onload = funciton(){
			urls.shift();
			if(urls[0]){
				loadScript(urls,callback);
			}else{
				if(callback){
					callback();
				}
			}
		};
		document.body.appendChild(script);
	}

}
loadScript(urls);

//正常情况下：

var loadScript = function(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" || script.readyState == "complete") { 
        script.onreadystatechange = null;
        callback(); 
      }
    };
  } else {
    script.onload = function() { callback(); }; 
  }
  document.body.appendChild(script);
};

