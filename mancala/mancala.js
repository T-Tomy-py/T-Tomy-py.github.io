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

var bord = [4,4,4, 4,4,4, 0, 4,4,4 ,4,4,4, 0];
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
  if (0 <= p && p <= 5 && !player) {return Boolean(bord[p])}
  else if (7 <= p && p <= 12 && player) {return Boolean(bord[p])}
  else {return false}
};

function bord_updater(p) {
/*
'p' must be a Number.
not return or throw error.
*/
  p = Number(p);
  if (is_selectable(p)) {
    var stone_num = bord[p];
    bord[p] = 0;
    p++;
    var o = stone_num + p;
    while (stone_num >= 0) {
      for (let i = p; i < o && i < 14; i++) {
        bord[i]++
      };
      p = 0;
      stone_num -= (14 - p);
      o = stone_num
    };
    player = Number(!player)
  } else {
    throw 'Error'
  }
}

function html_updater() {
/*
argument is nothing.
not return.
*/
  for (let i = 0; i < bord.length; i++) {
    document.getElementById(i).innerHTML = bord[i]
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
    bord_updater(p);
    html_updater();
  } catch {}
}
