window.addEventListener('load', function () {

    const quxian = echarts.init(document.querySelector('.quxian'));
    axios({
        url: 'https://edu.telking.com/api/', params: {
            type: 'month'
        }
    }).then(result => {
        const dates = result.data.data.xAxis;
        const series_1 = result.data.data.series;
        qucharts = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dates,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: series_1,
                    type: 'line',
                    smooth: true,
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            ]
        };
        quxian.setOption(qucharts)
    })


    let bingcharts = echarts.init(document.querySelector('.bing'));
    axios({
        url: 'https://edu.telking.com/api/', params: {
            type: 'week'
        }
    }).then(result => {
        let mydata = [];
        for (var i = 0; i < result.data.data.xAxis.length; i++) {
            mydata[i] = { value: result.data.data.series[i], name: result.data.data.xAxis[i] };
        }
        var bing = {
            title: {
                text: '饼状图数据展示',
                // subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left'
            // },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: mydata,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        bingcharts.setOption(bing);
    })


    //获取服务端数据
    axios({
        url: ' https://edu.telking.com/api/',
        params: {
            type: 'week'
        }
    }).then(result => {
        let xAxis = result.data.data.xAxis
        let series = result.data.data.series
        var zCharts = echarts.init(document.querySelector('.zhu'));
        var zhu = {
            xAxis: {
                type: 'category',
                data: xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: series,
                    type: 'bar'
                }
            ]
        };
        zCharts.setOption(zhu);
    })



})


