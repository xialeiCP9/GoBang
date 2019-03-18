(function(){
	var Win = window.Win = function(board,p,role){
		var count = 1;
		var len = board.length;
		var winPoints = [p];
		function reset(){
			winPoints = [p];
			count = 1;
		}
		//横向
		reset();
		for(var i=1;true;i++){
			var x = p[0] + i,y = p[1];
			if(x >= len)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		for(var i=1;true;i++){
			var x = p[0] - i,y = p[1];
			if(x < 0)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}

		if(count >= 5){
			return winPoints;
		}

		//纵向
		reset();
		for(var i=1;true;i++){
			var x = p[0],y = p[1] + i;
			if(y >= len)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		for(var i=1;true;i++){
			var x = p[0],y = p[1] - i;
			if(y < 0)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		if(count >= 5){
			return winPoints;
		}
		//左上
		reset();
		for(var i=1;true;i++){
			var x = p[0] + i,y = p[1] + i;
			if(x >= len || y >= len)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		for(var i=1;true;i++){
			var x = p[0] - i,y = p[1] - i;
			if(x < 0 || y < 0)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		if(count >= 5){
			return winPoints;
		}
		//右上
		reset();
		for(var i=1;true;i++){
			var x = p[0] + i,y = p[1] - i;
			if(x >= len || y < 0)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		for(var i=1;true;i++){
			var x = p[0] - i,y = p[1] + i;
			if(x < 0 || y >= len)
				break;
			if(board[x][y] == role){
				winPoints.push([x,y]);
				count ++;
			}
			if(board[x][y] == R.reverse(role) || board[x][y] == R.empty)
				break;
		}
		if(count >= 5){
			return winPoints;
		}
		return false;
	}
})();