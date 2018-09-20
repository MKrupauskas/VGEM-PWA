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
                        data: [300, 100],
                        backgroundColor: ["#50E3C2", "#F5A623"]
                    }
                ]
            },
            options: pieOptions
        }
    );

    setInterval(function () {
        chartPie.data.datasets[0].data[0] += 10;
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
            labels: ['09/12', '09/12', '09/12', '09/12', '09/12'],
            datasets: [
                {
                    data: [150, 170, 260, 200, 160],
                    label: "Pardavimas",
                    borderColor: "#F5A623",
                    fill: false
                },
                {
                    data: [210, 260, 230, 100, 250],
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
    hammertime.on('swipeleft', function (ev) {
        window.location.href = "./dashboard-battery-usage.html";
    });
});
