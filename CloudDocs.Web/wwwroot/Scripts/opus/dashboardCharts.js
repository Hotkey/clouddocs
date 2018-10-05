

// ------------------------------
$(window).on("load", function () {
    // Toplam Elektrik Tüketimi (kWh) > Column stacked chart
    LoadElectricTotalKwh();
    // Toplam enerji gideri (TL)
    LoadTotalEnergyChart();

    LoadAllEnergyTypesLineChart();
});


function LoadTotalEnergyChart() {
    var n = c3.generate({
        bindto: "#total-energy-amount",
        size: {
            height: 400
        },
        color: {
            pattern: ["#673AB7",
                "#E91E63"]
        },
        data: {
            columns: [["TL",
                0,
                850059,
                820021,
                762000,
                692039,
                853000,
                783992
                ]]
        },
        grid: {
            x: {
                lines: [{
                    value: 1,
                    text: "Ocak"
                },
                {
                    value: 2,
                    text: "Şubat"
                },
                {
                    value: 3,
                    text: "Mart"
                },
                {
                    value: 4,
                    text: "Nisan"
                },
                {
                    value: 5,
                    text: "Mayıs"
                },
                {
                    value: 6,
                    text: "Haziran"
                }]
            }
        }
    });
    $(".menu-toggle").on("click",
        function () {
            n.resize()
        });
}

function LoadElectricTotalKwh() {
    // Get the context of the Chart canvas element we want to select
    var ctx = $("#total-electric-kwh");
    // Chart Options
    var chartOptions = {
        title: {
            display: false,
            text: "Toplam Elektrik Tüketimi (kWh)"
        },
        tooltips: {
            mode: 'label'
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        scales: {
            xAxes: [{
                stacked: true,
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                stacked: true,
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        }
    };

    // Chart Data
    var chartData = {
        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
        datasets: [{
            label: "Elektrik Şebeke Tüketimi (kWh)",
            data: [65, 59, 80, 81, 56, 93],
            backgroundColor: "#5175E0",
            hoverBackgroundColor: "rgba(81,117,224,.8)",
            borderColor: "transparent"
        }, {
            label: "Elektrik Kojen Üretimi (Kwh)",
            data: [28, 48, 40, 19, 86, 45],
            backgroundColor: "#28D094",
            hoverBackgroundColor: "rgba(22,211,154,.8)",
            borderColor: "transparent"
        }]
    };

    var config = {
        type: 'bar',
        // Chart Options
        options: chartOptions,
        data: chartData
    };

    // Create the chart
    var lineChart = new Chart(ctx, config);
}

function LoadAllEnergyTypesLineChart() {
    var t = c3.generate({
        bindto: "#energy-types-line",
        size: {
            height: 400
        },
        point: {
            r: 4
        },
        color: {
            pattern: ["#673AB7", "#E91E63", "#E1E6E4"]
        },
        data: {
            columns: [["Elektrik Gideri (TL)",
                30,
                200,
                100,
                400,
                150,
                250],
            ["Doğalgaz Gideri (TL)",
                50,
                20,
                10,
                40,
                15,
                25],
            ["Su Gideri (TL)",
                    10,
                    12,
                    9,
                    13,
                    10,
                    11]]
        },
        grid: {
            y: {
                show: !0,
                stroke: "#ff0"
            }
        }
    });

    //setTimeout(function () {
    //    t.load({
    //        columns: [["Elektrik",
    //            230,
    //            190,
    //            300,
    //            500,
    //            300,
    //            400]]
    //    })
    //}, 1e3);

    //setTimeout(function () {
    //    t.load({
    //        columns: [["Doğalgaz",
    //            130,
    //            150,
    //            200,
    //            300,
    //            200,
    //            100]]
    //    })
    //}, 1500);

    //setTimeout(function () {
    //    t.unload({
    //        ids: "Elektrik"
    //    })
    //}, 2e3);

        $(".menu-toggle").on("click",
            function () {
                t.resize()
            });
}


!function (a, e, r) {
    "use strict";
    for (var t = [
        [],
        [],
        [],
        []
    ], i = new Rickshaw.Fixtures.RandomData(150), n = 0; n < 150; n++) i.addData(t);
    var o = r("#live-graphs"),
        s = new Rickshaw.Graph({
            element: o.get(0),
            width: o.width(),
            height: 400,
            renderer: "area",
            stroke: !0,
            series: [{
                color: "#99B898",
                data: t[0],
                name: "Acıbadem Üni."
            }, {
                color: "#FECEA8",
                data: t[1],
                    name: "Altunizade Has."
            }, {
                color: "#FF847C",
                data: t[2],
                    name: "Maslak Has."
            }, {
                color: "#6C5B7B",
                data: t[3],
                    name: "International Has."
            }]
        });
    s.render(), setInterval(function () {
        i.removeData(t), i.addData(t), s.update()
    }, 2e3);
    new Rickshaw.Graph.HoverDetail({
        graph: s
    }), new Rickshaw.Graph.Behavior.Series.Toggle({
        graph: s
    });
    r(a).on("resize", function () {
        s.configure({
            width: o.width()
        }), s.render()
    });
    var d = r("#live-visits-doughnut");
    new Chart(d, {
        type: "doughnut",
        options: {
            responsive: !0,
            maintainAspectRatio: !1,
            responsiveAnimationDuration: 500
        },
        data: {
            labels: ["Acıbadem Üni.", "Altunizade Has.", "Maslak Has.", "International Has."],
            datasets: [{
                label: "Giderler",
                data: [154684, 145300, 142130, 134500],
                backgroundColor: ["#99B898", "#FECEA8", "#FF847C", "#6C5B7B"]
            }]
        }
    })
}(window, document, jQuery);