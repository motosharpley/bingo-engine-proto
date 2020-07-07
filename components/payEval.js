// Symbol	            Type	5	    4	    3	    2
// *1* FrankenCash 2	Wild	5000    100	    25	    10
// *2* Frank	        Line	300	    50	    10	
// *3* Bride	        Line	300	    50	    10	
// *4* Doctor	        Line	300     50	    10	
// *5* Igor	            Line	300	    50	    10	
// *6* Chest	        Line	150	    30	    5	
// *7* Tower	        Line	100	    20	    5	
// *8* Brain	        Line	100	    15	    5	


const lineEval = require('./lineEval');
const fs = require('fs');
const reelStop = require('./reelStop');
const { spinResults } = require('./lineEval');

const payEval = {};

payEval.creditsPerLine = function() {
    lineEval.checkLineWins();
    let linePay = 0;
    let winTotal = 0;
    
    for (i = 2; i < lineEval.spinResults.length; i++) {
        linePay = 0;
        let symbol = lineEval.spinResults[i][1];
        let hitcount = lineEval.spinResults[i][4];

        switch (symbol) {
            case 1:
                if (hitcount == 2) linePay = 10;
                else if (hitcount == 3) linePay = 25;
                else if (hitcount == 4) linePay = 100;
                else if (hitcount == 5) linePay = 5000;
                break;
            case 2:
                if (hitcount == 3) linePay = 10;
                else if (hitcount == 4) linePay = 50;
                else if (hitcount == 5) linePay = 300;
                break;
            case 3:
                if (hitcount == 3) linePay = 10;
                else if (hitcount == 4) linePay = 50;
                else if (hitcount == 5) linePay = 300;
                break;
            case 4:
                if (hitcount == 3) linePay = 10;
                else if (hitcount == 4) linePay = 50;
                else if (hitcount == 5) linePay = 300;
                break;
            case 5:
                if (hitcount == 3) linePay = 10;
                else if (hitcount == 4) linePay = 50;
                else if (hitcount == 5) linePay = 300;
                break;
            case 6:
                if (hitcount == 3) linePay = 5;
                else if (hitcount == 4) linePay = 30;
                else if (hitcount == 5) linePay = 150;
                break;
            case 7:
                if (hitcount == 3) linePay = 5;
                else if (hitcount == 4) linePay = 20;
                else if (hitcount == 5) linePay = 100;
                break;
            case 8:
                if (hitcount == 3) linePay = 5;
                else if (hitcount == 4) linePay = 15;
                else if (hitcount == 5) linePay = 100;
                break;
        }
        lineEval.spinResults[i].push("line_pay", linePay);
        winTotal += linePay;
    }
    lineEval.spinResults.push(["win_total", winTotal]);
    
    // ******* Write Sample files for bingo *******
    console.log(lineEval.spinResults[lineEval.spinResults.length-3]);
    console.log(lineEval.spinResults[lineEval.spinResults.length-2]);
    if (lineEval.spinResults[lineEval.spinResults.length-3][2] && lineEval.spinResults[lineEval.spinResults.length-2][2] < 3){
        let reelstopfile = lineEval.spinResults[0];
        let reelSTR = reelstopfile.join(' ');
        
        let fileResults = `2*SPIN|${winTotal}$${reelSTR}\n`
        fs.writeFileSync(`./sampleFiles/${winTotal}.txt`,fileResults,{flag: "a+"}, (err) => {
            if (err) throw err; 
        })
    }
    // ******* end write sample files *******
}

module.exports = payEval;