$(document).ready(function () {
    var pieOptions = {
        legend: {
            display: false
        },
        cutoutPercentage: 75
    };

    var chartPie = new Chart(
        document.getElementById("dashboard-pie-1").getContext("2d"),
        {
            type: "doughnut",
            data: {
                labels: ["Pardavimas", "Pirkimas"],
                datasets: [
                    {
                        label: "Jegainė",
                        data: [100, 33],
                        backgroundColor: ["#50E3C2", "#F5A623"]
                    }
                ]
            },
            options: pieOptions
        }
    );

    var change = document.querySelector('.js-change');

    var counter = 15;
    setInterval(function () {
        change.innerHTML = counter.toFixed(1) + ' kWh';
        chartPie.data.datasets[0].data[0] += 3;
        counter += Math.random() / 20;
        chartPie.update();
    }, 1000);

    var pieChart = document.querySelector(".js-dashboard-pie");
    pieChart.style.height = pieChart.clientWidth - 30 + "px";

    var pieChartIcon = document.querySelector(".js-dashboard-pie-icon");
    var xOffset = pieChart.clientWidth / 2 - pieChartIcon.clientWidth / 2 + "px";
    pieChartIcon.style.top = (pieChart.clientHeight / 2) - (pieChartIcon.clientHeight / 2) + 40 + "px";
    pieChartIcon.style.left = xOffset;

    new Chart(document.getElementById("dashboard-line-chart").getContext("2d"), {
        type: "line",
        data: {
            labels: ['14:00', '15:00', '16:00', '17:00', '18:00'],
            datasets: [
                {
                    data: [15, 17, 26, 20, 16],
                    label: "Pardavimas",
                    borderColor: "#F5A623",
                    fill: false
                },
                {
                    data: [21, 26, 23, 10, 25],
                    label: "Pirkimas",
                    borderColor: "#50E3C2",
                    fill: false
                }
            ]
        },
        options: {
            tooltips: {
                enabled: true,
                mode: 'single',
                callbacks: {
                    label: function(tooltipItems, data) { 
                        return data.datasets[tooltipItems.datasetIndex].label + ': ' + tooltipItems.yLabel + ' kWh';
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value + ' kWh';
                        }
                    }
                }]
            },
            legend: {
                display: false
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        }
    });

    var hammertime = new Hammer(document.querySelector('.swipe-left'));
    hammertime.on('swipeleft swiperight', function (ev) {
        window.location.href = "./dashboard-battery-usage.html";
    });
});
