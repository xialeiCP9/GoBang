/*
** 获取可能下子的点
*/

(function(){

	//判断棋子是否为空
	var isEmpty = function(board,p){
		if(board[p[0]][p[1]] === R.empty){
			return true;
		}
		return false;
	}
	//判断是否有相邻棋子
	var hasNeighbor = function(board,p,distance){
		var len = board.length;
		var startX = p[0] - distance,startY = p[1] -distance,
			endX = p[0] + distance, endY = p[1] + distance;
		var p1,p2,p3,p4,p5,p6,p7,p8;
		p1 = startX > 0 && startY > 0 ? board[startX][startY] : false;
		p2 = startY > 0 ? board[p[0]][startY] : false;
		p3 = endX < len && startY > 0 ? board[endX][startY] : false;
		p4 = startX > 0 ? board[startX][p[1]] : false;
		p5 = endX < len ? board[endX][p[1]] : false;
		p6 = startX > 0 && endY < len ? board[startX][endY] : false;
		p7 = endY < len ? board[p[0]][endY] : false;
		p8 = endX < len && endY < len ? board[endX][endY] : false;

		return p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8;
		
	}

	//初步获得可选点
	var gen = window.gen = function(board,role){
		var len = board.length;
		var oneNeighbors = [] , twoNeighbors = [];
		for(var i=0;i<len;i++){
			for(var j=0;j<len;j++){
				if(isEmpty(board,[i,j])){
					if(hasNeighbor(board,[i,j],1)){
						oneNeighbors.push([i,j]);
					} else if(hasNeighbor(board,[i,j],2)){
						twoNeighbors.push([i,j]);
					}
				}
			}
		}
		var originalList = [...oneNeighbors,...twoNeighbors];
		
		var points = pointsFilter(board,role,originalList);
		return points;
	}

	//启发式搜索,尝试下一个子,然后进行评分,根据评分大小进行排序
	var pointsFilter = function(board,role,originalList){
		var fives = [];
		var fours = [];
		var twoThrees = [];
		var threes = [];
		var twos = [];
		var others = [];
		var opposite = R.reverse(role);
		//尝试下一个子
		for(var i=0;i<originalList.length;i++){
			var now_point = originalList[i];
			
			board[originalList[i][0]][originalList[i][1]] = role;
			var comValue = scorePoint(board,originalList[i],role);
			board[originalList[i][0]][originalList[i][1]] = opposite;
			var humValue = scorePoint(board,originalList[i],opposite);

			if(comValue >= score.FIVE){//电脑是否可以连5
				return [originalList[i]];
			} else if(humValue >= score.FIVE){
				fives.push(originalList[i]);
			} else if(comValue >= score.FOUR){
				fours.unshift(originalList[i]);
			} else if(humValue >= score.FOUR){
				fours.push(originalList[i]);
			} else if(comValue >= 2 * score.THREE){
				twoThrees.unshift(originalList[i]);
			} else if(humValue >= 2 * score.THREE){
				twoThrees.push(originalList[i]);
			} else if(comValue >= score.THREE){
				threes.unshift(originalList[i]);
			} else if(humValue >= score.THREE){
				threes.push(originalList[i]);
			} else if(comValue >= score.TWO){
				twos.unshift(originalList[i]);
			} else if(humValue >= score.TWO){
				twos.push(originalList[i]);
			} else {
				others.push(originalList[i]);
			}
			board[originalList[i][0]][originalList[i][1]] = R.empty;
		}
		//成五,必杀其,直接返回
		if(fives.length)
			return [fives[0]];
		if(fours.length){
			return fours;
		}
		if(twoThrees.length){
			return twoThrees;
		}

		return [...threes,...twos,...others];
	}
})();