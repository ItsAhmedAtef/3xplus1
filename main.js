/***** ***** Global variables ***** *****/
var submit = document.getElementById("submit");
var input = document.getElementById("input");
var output = document.getElementById("output");
var quote = document.getElementById("quote");
var hint = document.getElementById("hint");
var title = document.getElementById("title");
var tooltips = document.querySelectorAll('.show');
var mode = document.getElementById("mode"); // id
var MODE = localStorage.getItem('mode'); // browser storage value
var chartparent = document.getElementById("chartparent");
var all = [];
var labelsall = [];
/***** ***** !Global variables ***** *****/

function showlogs() {
    var logsdiv = output.querySelector("#logs");
    var logsbutton = output.querySelector("#showlogs");    
    if (logsdiv) {
        if (logsdiv.style.display == "none") {
            logsdiv.style.display = "block";
            logsbutton.innerHTML = "Hide Logs";
        } else {
            logsdiv.style.display = "none";
            logsbutton.innerHTML = "Show Logs";
        }
    }
}

function myoutput(nums) {
    labelsall = [];
    output.innerHTML = '<button onclick="showlogs()" id="showlogs" class="blue">Show Logs</button><div style="display:none;" id="logs"></div>';
    for (let i = 0; i < nums.length; i++) {
        labelsall.push(i);
    }
    chartparent.innerHTML = '<canvas id="myChart"></canvas>';
    var myChart = new Chart(
        document.getElementById('myChart'),
        {
            type: 'line',
            data: {
                labels: labelsall,
                datasets: [{
                    label: 'Collatz Conjecture graph',
                    backgroundColor: '#434fe6',
                    borderColor: '#434fe6',
                    data: nums
                }]
            },
            options: {
                scales: {
                    y: {
                        grid: {
                            color: 'grey',
                            borderColor: 'grey'
                        },
                        ticks: {
                            color: 'grey'
                        }
                    },
                    x: {
                        grid: {
                            color: 'grey',
                            borderColor: 'grey'
                        },
                        ticks: {
                            color: 'grey'
                        }
                    }
                }
            }
        }
    );
    if(!nums.includes(4)) {
        nums = [4,2,1];
    }
    var logs = document.querySelector("#logs");
    nums.forEach( num => {
        if ( num % 2 ) {
            var hold = (3*num)+1;
            logs.innerHTML += '<p>' + num + ' is Odd (3 x '+ num + ') + 1 = <span style="color:red;">' + hold + '</span></p>';
        } else {
            var hold = num / 2;
            if (num != 2) {
                logs.innerHTML += '<p>' + num + ' is Even ' + num + ' / 2 = <span style="color:blue;">' + hold + '</span></p>';
            } else {
                logs.innerHTML += '<p><b style="color:blue;">&#10532;</b>&nbsp;&nbsp;&nbsp; ' + num + ' is Even ' + num + ' / 2 = <span style="color:blue;">' + hold + '</span> &nbsp;&nbsp;&nbsp;<b style="color:red;">&#10534;</b></p>';
            }
        }
    });
}

function solve( x ) {
    if (!isNaN(x) && parseInt(x) && x > 0) {
        if (!all.length) {
            all.push(x);
        }
        var x_is = 'even';
        if ( x % 2 ) {
            x_is = 'odd';
        }
        if (x_is == 'even') {
            all.push(x/2);
            solve(x/2);
        } else {
            if (x!=1) {
                all.push((3*x)+1);
                solve((3*x)+1);
            } else {
                myoutput(all);
            }
        }
    } else {
        output.innerHTML = 'x is not a number';
        document.getElementById("chartparent").innerHTML = '<canvas id="myChart"></canvas>';
    }
}

function display(tooltip) {
    if (tooltip.id == "hint") {
        quote.querySelector(".show").style.display = "none";
    } else {
        hint.querySelector(".show").style.display = "none";
    }
    let text = tooltip.querySelector(".show");
    if ( text.style.display == "block" ) {
        text.style.display = "none";
    } else {
        text.style.display = "block";
    }
}

submit.addEventListener("click", function() {
    all = [];
    solve(input.value);
});

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        all = [];
        solve(input.value);
    }
});

quote.addEventListener("click", function() {
    display(quote);
});

hint.addEventListener("click", function() {
    display(hint);
});

window.onload = function () {
    if (MODE != 'light') {
        document.body.style.backgroundColor = '#202124';
        title.style.color = '#fff';
        mode.innerHTML = '<p class="click">&#9789;</p>';
        form.querySelector("div").style.backgroundColor = '#fff';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.backgroundColor = '#fff';
            tooltips[i].style.color = '#000';
            tooltips[0].querySelector("span").style.color = 'red';
            document.styleSheets[0].cssRules[0].style.cssText = "color:#fff;";
        }
    }
};

document.getElementById("mode").addEventListener('click', function() {
    quote.querySelector(".show").style.display = "none";
    hint.querySelector(".show").style.display = "none";
    if (MODE == 'light') {
        document.body.style.backgroundColor = '#202124';
        title.style.color = '#fff';
        mode.innerHTML = '<p class="click">&#9789;</p>';
        form.querySelector("div").style.backgroundColor = '#fff';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.backgroundColor = '#fff';
            document.styleSheets[0].cssRules[0].style.cssText = "color:#fff;";
            tooltips[i].style.color = '#000';
            tooltips[0].querySelector("span").style.color = 'red';
        }
        localStorage.setItem('mode', 'dark');
        MODE = 'dark';
    } else {
        document.body.style.backgroundColor = '#fff';
        title.style.color = '#000';
        mode.innerHTML = '<p class="click">&#127774;</p>';
        form.querySelector("div").style.backgroundColor = 'grey';
        document.styleSheets[0].cssRules[0].style.cssText = "color:#000;";
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.backgroundColor = '#000';
            tooltips[i].style.color = '#fff';
            tooltips[0].querySelector("span").style.color = 'yellow';
        }
        localStorage.setItem('mode', 'light');
        MODE = 'light';
    }
});
