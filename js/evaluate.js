/**
* 评价函数
*/
(function(){
	//评价单个棋子
	var scorePoint = window.scorePoint = function(board,p,role){
		var strList = pointDirection(board,p);
		var regList = regExpConstructor(role);

		return pointCounter(strList,regList);
	}
	//评价整个棋盘
	var evaluate = window.evaluate = function(board){
		var len = board.length;
		var comScore = 0,humScore = 0;
		for(var i=0;i<len;i++){
			for(var j=0;j<len;j++){
				if(board[i][j] == R.com){
					comScore += scorePoint(board,[i,j],R.com);
				} else if(board[i][j] == R.hum){
					humScore += scorePoint(board,[i,j],R.hum);
				} else {
					continue;
				}
			}
		}
		return (comScore - humScore);
	}
	//所有棋型正则表达式
	var regExpConstructor = function(role){
		var opposite = R.reverse(role);

		var regex = new Array(31);

		// 连五 11111
		regex[0] = new RegExp(role+""+role+""+role+""+role+""+role,"g");
		// 活四 011110
		regex[1] = new RegExp(R.empty+""+role+""+role+""+role+""+role+""+R.empty,"g");
		// 眠四 211110 11101 11011
		regex[2] = new RegExp("(b|"+opposite+")"+""+role+""+role+""+role+""+role+""+R.empty,"g");
		regex[3] = new RegExp(R.empty+""+role+""+role+""+role+""+role+"(b|"+opposite+")","g");
		regex[4] = new RegExp(role+""+role+""+role+""+R.empty+""+role,"g");
		regex[5] = new RegExp(role+""+R.empty+""+role+""+role+""+role,"g");
		regex[6] = new RegExp(role+""+role+""+R.empty+""+role+""+role,"g");
		//活三 0011100 2011100 010110
		regex[7] = new RegExp(R.empty+""+R.empty+""+role+""+role+""+role+""+R.empty+""+R.empty,"g");
		regex[8] = new RegExp("(b|"+opposite+")"+R.empty+""+role+""+role+""+role+""+R.empty+""+R.empty,"g");
		regex[9] = new RegExp(R.empty+""+R.empty+""+role+""+role+""+role+""+R.empty+"(b|"+opposite+")","g");
		regex[10] = new RegExp(R.empty+""+role+""+R.empty+""+role+""+role+""+R.empty,"g");
		regex[11] = new RegExp(R.empty+""+role+""+role+""+R.empty+""+role+""+R.empty,"g");
		//眠三 2011102 211100 010112 011012
		regex[12] = new RegExp("(b|"+opposite+")"+R.empty+""+role+""+role+""+role+""+R.empty+"(b|"+opposite+")","g");
		regex[13] = new RegExp("(b|"+opposite+")"+role+""+role+""+role+""+R.empty+""+R.empty,"g");
		regex[14] = new RegExp(R.empty+""+R.empty+""+role+""+role+""+role+"(b|"+opposite+")","g");
		regex[15] = new RegExp(R.empty+""+role+""+role+""+R.empty+""+role+"(b|"+opposite+")","g");
		regex[16] = new RegExp("(b|"+opposite+")"+role+""+R.empty+""+role+""+role+""+R.empty,"g");
		regex[17] = new RegExp(R.empty+""+role+""+R.empty+""+role+""+role+"(b|"+opposite+")","g");
		regex[18] = new RegExp("(b|"+opposite+")"+role+""+role+""+R.empty+""+role+""+R.empty,"g");
		//活二 001100 01010 010010
		regex[19] = new RegExp(R.empty+""+R.empty+""+role+""+role+""+R.empty+""+R.empty,"g");
		regex[20] = new RegExp(R.empty+""+role+""+R.empty+""+role+""+R.empty,"g");
		regex[21] = new RegExp(R.empty+""+role+""+R.empty+""+R.empty+""+role+""+R.empty,"g");
		//眠二 211000 210100 210010
		regex[22] = new RegExp("(b|"+opposite+")"+role+""+role+""+R.empty+""+R.empty+""+R.empty,"g");
		regex[23] = new RegExp(R.empty+""+R.empty+""+R.empty+""+role+""+role+"(b|"+opposite+")","g");
		regex[24] = new RegExp("(b|"+opposite+")"+role+""+R.empty+""+role+""+R.empty+""+R.empty,"g");
		regex[25] = new RegExp(R.empty+""+R.empty+""+role+""+R.empty+""+role+"(b|"+opposite+")","g");
		regex[26] = new RegExp("(b|"+opposite+")"+role+""+R.empty+""+R.empty+""+role+""+R.empty,"g");
		regex[27] = new RegExp(R.empty+""+role+""+R.empty+""+R.empty+""+role+"(b|"+opposite+")","g");
		//活一 010
		regex[28] = new RegExp(R.empty+""+role+""+R.empty,"g");
		//眠一 210
		regex[29] = new RegExp("(b|"+opposite+")"+role+""+R.empty,"g");
		regex[30] = new RegExp(R.empty+""+role+"(b|"+opposite+")","g");
		return regex;
	}

	//获取落子点四个方向的所有棋子
	var pointDirection = function(board,p){
		var len = board.length;


		//横向
		var horizon = [];
		for(var i=0;i<len;i++){
			horizon[i] = board[i][p[1]];
		}

		//纵向
		var vertical = [];
		for(var i=0;i<len;i++){
			vertical[i] = board[p[0]][i];
		}

		//左上
		var leftTop = [];
		var a = p[0],b = p[1];
		while(a>0 && b>0){
			a--;
			b--;
		}
		for(var i=a;a<len && b<len;i++){
			leftTop[i] = board[a++][b++];
		}

		//右上
		var rightTop = [];
		a = p[0],b = p[1];
		while(a > 0 && b < len-1){
			a--;
			b++;
		}
		for(var i=0;a < len && b >= 0;i++){
			rightTop[i] = board[a++][b--];
		}
		//添加边界
		var horizonCheck = "b" + horizon.join("") + "b";
		var verticalCheck = "b" + vertical.join("") + "b";
		var leftTopCheck = "b" + leftTop.join("") + "b";
		var rightTopCheck = "b" + rightTop.join("") + "b";

		return [horizonCheck,verticalCheck,leftTopCheck,rightTopCheck];
	}

	//根据棋型判断分数 , strList 四个方向的棋子 , regList 棋型
	var pointCounter = function(strList,regList){
		var count = 0 ,size =0;

		for(var i=0;i<strList.length;i++){
			for(var j=0;j<regList.length;j++){
				var result = strList[i].match(regList[j]);
				size = result == null ? 0 : result.length;

				if(j == 0){
                    count += (size) * score.FIVE;
                }
                else if(j == 1){
                    count += (size) * score.FOUR;
                }
                else if(j >= 2 && j <= 6){
                    count += (size) * score.BLOCK_FOUR;
                    if( j >= 4)
                        count += (size) * score.FOUR / 5;
                }
                else if(j >= 7 && j <= 11){
                    count += (size) * score.THREE;
                }
                else if(j >= 12 && j <= 18){
                    count += (size) * score.BLOCK_THREE;
                }
                else if(j >= 19 && j <= 21){
                    count += (size) * score.TWO;
                }
                else if(j >= 22 && j <= 27){
                    count += (size) * score.BLOCK_TWO;
                }
                else if(j == 28){
                    count += (size) * score.ONE;
                }
                else{
                    count += (size) * score.BLOCK_ONE;
                }
                strList[i].replace(regList[j], "-");
			}
		}
		return count;
	}
})();