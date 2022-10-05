const side = document.getElementById("side");
const items = side.querySelectorAll(".item");
const theme = document.getElementById("theme");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    theme.querySelector(".icon").innerHTML = "&#9789;";
}

side.addEventListener("click", (e) => {
    if (e.target.classList.contains("icon") || e.target.classList.contains("item")) {
        let clicked = (e.target.classList.contains("item")) ? e.target.id: e.target.parentElement.id;
        for ( let item of items ) {
            if (item.id === clicked) {
                if (item.classList.contains("hideChild")) item.classList.remove("hideChild");
            } else {
                if (!item.classList.contains("hideChild")) item.classList.add("hideChild");
            }
        }
        if (clicked === "theme") {
            if (document.body.classList.contains("dark")) {
                document.body.classList.remove("dark");
                localStorage.setItem("theme", "light");
                theme.querySelector(".icon").innerHTML = "&#127774;";
            } else {
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark");
                theme.querySelector(".icon").innerHTML = "&#9789;";
            }
        }
    }
});

const solve = document.getElementById("solve");
const input = document.querySelector("input");
const output = document.getElementById("output");
const error = document.getElementById("error");
const resetZoom = document.getElementById("resetZoom");
let myChart = null;

const solveX = () => {
    if (myChart) myChart.destroy();
    myChart = null;
    if (!input.value || parseInt(input.value) != input.value || input.value <= 0) {
        if (error.classList.contains("hidden")) error.classList.remove("hidden");
        if (!resetZoom.classList.contains("hidden")) resetZoom.classList.add("hidden");
    } else {
        if (!error.classList.contains("hidden")) error.classList.add("hidden");
        if (resetZoom.classList.contains("hidden")) resetZoom.classList.remove("hidden");
        let scaleX = [];
        let scaleY = [];
        let val = input.value;
        let start = 0;
        while ( val != 1 ) {
            scaleY.push(start); start++;
            scaleX.push(val);
            if ( val % 2 ) { // odd
                val = (val * 3) + 1;
            } else { // even
                val = val / 2;
            }
        }
        scaleY.push(start); scaleX.push(1);
        myChart = new Chart(
            document.getElementById("myChart"),
            {
                type: "line",
                data: {
                    labels: scaleY,
                    datasets: [{
                        label: "Collatz Conjecture graph",
                        backgroundColor: "#434fe6",
                        borderColor: "#434fe6",
                        data: scaleX
                    }]
                },
                options: {
                    scales: {
                        y: {
                            grid: {
                                color: "grey",
                                borderColor: "grey"
                            },
                            ticks: {
                                color: "grey"
                            }
                        },
                        x: {
                            grid: {
                                color: "grey",
                                borderColor: "grey"
                            },
                            ticks: {
                                color: "grey"
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            onClick: false
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: "x"
                            },
                            zoom: {
                                wheel: {
                                    enabled: true
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: "x"
                            }
                        }
                    }
                }
            }
        );
        resetZoom.setAttribute("onclick", "if (myChart) myChart.resetZoom()");
    }
};

solve.addEventListener("click", () => { solveX() });
input.addEventListener("keypress", (e) => { if (e.key === "Enter") solveX() });
