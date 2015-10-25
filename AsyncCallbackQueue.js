<<<<<<< HEAD
    function AsyncQueue(){
        this.queue = [];
    }
    AsyncQueue.prototype.push = function(asyncFunc,arguArr){
        var funcObj = {'func':asyncFunc,'argu':arguArr};
        this.queue.push(funcObj);
    };
    
    
    AsyncQueue.prototype.exec = function(callback){
        if(this.queue.length > 0){
            var funcObj = this.queue[0];
            funcObj.func.apply(this,funcObj.argu);
            this.queue.shift();
        }
        this.finalFunc = callback;
    };
    
    AsyncQueue.prototype.aysncFunRunOver = function (){
        if(this.queue.length === 0){
            if(this.finalFunc){
                this.finalFunc.apply(this);
            }
        }else{
            var funcObj = this.queue[0];
            funcObj.func.apply(this,funcObj.argu);
            this.queue.shift();
        }
    };
    
    function asyncFunctionOne(value){
        setTimeout(print.after(asyncQueue),2000);
        function print(){
            document.writeln(value + " run sync function one<br>");
            console.log(value + " run sync function one");
        }
    }
    
    function asyncFunctionTwo(value){
        setTimeout(print.after(asyncQueue),1000);
        function print(){
            document.writeln(value + " run sync function two<br>");
            console.log(value + " run sync function two");
        }
    }
    
    Function.prototype.after = function(aq){
        var self = this;
        return function(){
            self.apply(this,arguments);
            return aq.aysncFunRunOver.apply(aq, arguments);
        };
    };

    var asyncQueue = new AsyncQueue();
    asyncQueue.push(asyncFunctionOne,[1]);
    asyncQueue.push(asyncFunctionTwo,[2]);
    asyncQueue.exec(function(){
        document.writeln("all finished<br>");
        console.log('all finished');
=======
    function AsyncQueue(){
        this.queue = [];
    }
    AsyncQueue.prototype.push = function(asyncFunc,arguArr){
        var funcObj = {'func':asyncFunc,'argu':arguArr};
        this.queue.push(funcObj);
    };
    
    
    AsyncQueue.prototype.exec = function(callback){
        if(this.queue.length > 0){
            var funcObj = this.queue[0];
            funcObj.func.apply(this,funcObj.argu);
            this.queue.shift();
        }
        this.finalFunc = callback;
    };
    
    AsyncQueue.prototype.aysncFunRunOver = function (){
        if(this.queue.length === 0){
            if(this.finalFunc){
                this.finalFunc.apply(this);
            }
        }else{
            var funcObj = this.queue[0];
            funcObj.func.apply(this,funcObj.argu);
            this.queue.shift();
        }
    };
    
    function asyncFunctionOne(value){
        setTimeout(print.after(asyncQueue),2000);
        function print(){
            document.writeln(value + " run sync function one<br>");
            console.log(value + " run sync function one");
        }
    }
    
    function asyncFunctionTwo(value){
        setTimeout(print.after(asyncQueue),1000);
        function print(){
            document.writeln(value + " run sync function two<br>");
            console.log(value + " run sync function two");
        }
    }
    
    Function.prototype.after = function(aq){
        var self = this;
        return function(){
            self.apply(this,arguments);
            return aq.aysncFunRunOver.apply(aq, arguments);
        };
    };

    var asyncQueue = new AsyncQueue();
    asyncQueue.push(asyncFunctionOne,[1]);
    asyncQueue.push(asyncFunctionTwo,[2]);
    asyncQueue.exec(function(){
        document.writeln("all finished<br>");
        console.log('all finished');
>>>>>>> origin/master
    });