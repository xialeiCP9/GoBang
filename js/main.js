$chess = $("#chess");

$start = $("#start");

$give = $("#give");

var isStart = false;
var isGive = false;
var isWin = false;
var allChessman = [];
var board = [];

var isMe = true;

initChess();



//chess增加棋子
function initChess(){
	
	var size = config.size;
	for(var i=0;i<config.size;i++){
		board[i] = [];
		for(var j=0;j<config.size;j++){
			var $chessman = $("<div></div>");
			$chessman.addClass("chessman");
			$chessman.css({
				"top": 10 + j * 35 + "px",
				"left": 10 + i * 35 + "px"
			});
			$chessman.attr("index",j * 15 + i);
			$chessman.on("click",function(event){
				if(isStart && !isGive && isMe && !isWin){
					isMe = false;
					event = event || window.event;
					var index = $(event.target).attr("index");
					console.log("index:"+index);
					var py = parseInt(index / 15);
					var px = index % 15;
					drawChessman([px,py],R.hum);
					if(!isWin){
						var point = miniMax(board,config.depth,R.com);
						console.log("下子的位置:",point);
						drawChessman(point,R.com);
						isMe = true;
					}
				}
			});

			$chess.append($chessman);
			allChessman.push($chessman);
			board[i][j] = R.empty;
		}
	}
}

$start.on("click",function(){
	if(isStart){
		return;
	}
	
	//开始游戏后,播放大字体动画,并添加click监听
	showBigText("START",function(){
		isStart = true;
	});
});

function showBigText(text,callback){
	var $big_text = $(".big_text");
	$big_text.html(text);
	$big_text.css("display","block");
	setTimeout(function(){
		$big_text.removeClass("fade-enter");
	},200);
	setTimeout(function(){
		$big_text.addClass("fade-leave");
	},1500);
	setTimeout(function(){
		$big_text.addClass("fade-enter").removeClass("fade-leave");
		$big_text.css("display","none");
		callback && callback();
	},2000);
}

function drawChessman(p,r){
	var index = p[0] + 15 * p[1] + "";
	var chessman = null;
	$.each(allChessman,function(i,v){
		if(v.attr("index") == index){
			chessman = v;
		}
	})
	
	console.log(chessman);
	board[p[0]][p[1]] = r;
	if(r === R.hum){
		chessman.addClass("baizi").addClass("click");
	} else if (r === R.com){
		chessman.siblings().removeClass("last-step");
		chessman.addClass("heizi").addClass("last-step");
	}
	var win = Win(board,p,r);
	if(win){
		isWin = true;
		winCheck(win,r);
	}
}
function winCheck(arr,r){
	for(p of arr){
		console.log("p:",p);
		var index = p[0] + 15 * p[1] + "";
		$.each(allChessman,function(i,v){
			if(v.attr("index") == index){
				v.addClass("fives");
			}
		})
	}
	var text = r == R.com ? "YOU LOSE" : "YOU WIN";
	showBigText(text);
}
