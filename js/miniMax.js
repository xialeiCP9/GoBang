/**
* 极大极小值算法 
*/

(function(){
	const MIN = -Infinity;
	const MAX = Infinity;

	const alphaMultiple = 0.1;
	const betaMultiple = 10;

	var pointCounter = 0;

	var miniMax = window.miniMax = function(board,depth,role){
		var alpha = MIN,beta = MAX;

		var best = MIN;
		var points = gen(board,role);
		var bestPoints = [];

		for(var i=0;i<points.length;i++){
			board[points[i][0]][points[i][1]] = role;
			var value = min(board,depth-1,alpha,beta,R.reverse(role),points[i]);
			pointCounter ++;
			if(value = best){
				bestPoints.push(points[i]);
			}
			if(value > best){
				best = value;
				bestPoints = [];
				bestPoints.push(points[i]);
			}
			board[points[i][0]][points[i][1]] = R.empty;
		}
		console.log("搜索节点数:" + pointCounter);
		var index = parseInt(Math.random() * bestPoints.length);
		return bestPoints[index];
	};

	var max = function(board,depth,alpha,beta,role,p){
		if(depth <= 0 || Win(board,p,role)){
			return evaluate(board);
		}
		var points = gen(board,role);
		var best = MIN;

		for(var i=0;i<points.length;i++){
			board[points[i][0]][points[i][1]] = role;
			var value = min(board,depth-1,alpha,best > beta * betaMultiple ? best : beta,R.reverse(role),points[i]);
			board[points[i][0]][points[i][1]] = R.empty;
			if(value > best){
				best = value;
			}
			if(value > alpha){
				break;
			}
		}
		return best;
	};

	var min = function(board,depth,alpha,beta,role,p){
		if(depth <= 0 || Win(board,p,role)){
			return evaluate(board);
		}
		var points = gen(board,role);
		var best = MAX;

		for(var i=0;i<points.length;i++){
			board[points[i][0]][points[i][1]] = role;
			var value = max(board,depth-1,best < alphaMultiple * alpha ? best : alpha,beta,R.reverse(role),points[i]);
			board[points[i][0]][points[i][1]] = R.empty;
			if(value < best){
				best = value;
			}
			if(value < beta){
				break;
			}
		}
		return best;
	}
})();