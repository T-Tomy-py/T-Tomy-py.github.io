/*
MIT License

Copyright (c) 2021 T-Tomy-py

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict';

var board = [4,4,4, 4,4,4, 0, 4,4,4 ,4,4,4, 0];
/*
0~5 is player 0 stor, 6 is player 0 goal
7~12 is player 1 stor, 13 is player 1 goal
*/
var player = 0;
//0 or 1

function is_selectable(p) {
/*
'p' must be a Number.
return Boolean (euqale True or False).
*/
  p = Number(p);
  if (0 <= p && p <= 5 && !player) {return Boolean(board[p])}
  else if (7 <= p && p <= 12 && player) {return Boolean(board[p])}
  else {return false}
};

function board_updater(p) {
/*
'p' must be a Number.
return how many stone in bord or throw error.
*/
  p = Number(p);
  if (is_selectable(p)) {
    var stone_num = board[p];
    bord[p] = 0;
    p++;
    var o = stone_num + p;
    while (o >= 0) {
      for (let i = p; i < o && i < 14; i++) {
        board[i]++
      };
      p = 0;
      o -= 14
    };
    return stone_num
  } else {
    throw 'Error'
  }
}

const position_map = new Map([
  [0, 12],
  [1, 11],
  [2, 10],
  [3, 9],
  [4, 8],
  [5, 7]
])

function extend_board_updater(p, stone_num) {
/*
'p' and 'stone_num' must be Number.
not return
*/
  /* pattern 1 */
  var i = p + 1 + stone_num % 14
  if (position_map.has(i) && board[i] === 1) {
    let j = position_map.get(i);
    let l = board[i] + board[j];
    board[i] = 0;
    board[j] = 0;
    if (!player) {board[6] = l}
    else {board[13] = l};
  }
  /* pattern 2 */
  if (!player && i === 6) {}
  else if (player && i === 13) {}
  else {
    player = Number(!player);
  }
}

function is_game_end() {
/*
arguments are nothing.
return flag (Number).
*/
  /* pattern 1 */
  if (board[6] >24 ) {return 0}
  else if (board[13] > 24) {return 1}
  /* pattern 2 */
  var sum0 = 0;
  var sum1 = 0;
  position_map.forEach(
    function (key, value) {
      sum0 += board[key];
      sum1 += board[value]
    }
  );
  if (!sum0) {return 0}
  else if (!sum1) {return 1}
  /* pattern 3 (game is not end.) */
  else {return -1}
}

function html_updater(flag) {
/*
'flag' must be a Number.
not return.
*/
  for (let i = 0; i < board.length; i++) {
    document.getElementById(i).innerHTML = board[i]
  }
  if (!player) {}
  else {}
}

function game_controller(p) {
/*
'p' must be a Number.
not return.
*/
  try {
    var stone_num = board_updater(p);
    extend_board_updater(p, stone_num);
    var end_flag = is_game_end()
    html_updater(end_flag)
  } catch {}
}
