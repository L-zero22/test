// 轮播图



let sum = 0;

let box = document.getElementById('box');

let slider = document.getElementById('slider')

let count = slider.children.length;

let width = slider.parentElement.offsetWidth;

let icon = document.getElementById('icon');

// 节流
let isPass = true;



// 根据轮播图的图片张数添加底部icon并监听点击事件
for (let key = 0; key < count; key++) {
    let li = document.createElement('li')
    li.setAttribute('dataIndex', key)
    li.addEventListener('click', () => {
        if (!isPass) {
            return
        }
        sum = key
        ani();
    })
    icon.append(li)
}

// 获取按钮上一张下一张
let next = document.getElementById('next');
let prev = document.getElementById('prev');
// 轮播图
function ani() {

    isPass = false;
    let left = (sum % count) * width;
    slider.style.transition = 'left .45s'
    slider.style.left = `-${left}px`;
    i_active();
}

slider.addEventListener('transitionend', () => {
    isPass = true;
})
// 轮播图下部icon的激活样式
function i_active() {
    for (let i = 0; i < icon.children.length; i++) {
        icon.children[i].removeAttribute('class')
    }
    icon.children[sum % count].setAttribute('class', 'i_active')
}

next.addEventListener('click', () => {
    if (!isPass) {
        return
    }
    sum++;
    ani();
})
prev.addEventListener('click', () => {
    if (!isPass) {
        return
    }
    sum--;
    if (sum < 0) {
        sum = count - 1;
    }
    ani();
})

// 轮播图自动轮播
let times = window.setInterval(() => {
    next.click()
}, 1500)

// 事件监听鼠标进入跟退出
box.addEventListener('mouseenter', () => {
    next.style.opacity = '1';
    prev.style.opacity = '1';
    window.clearInterval(times)
})

box.addEventListener('mouseleave', () => {
    next.style.opacity = '0';
    prev.style.opacity = '0';
    window.clearInterval(times)
    times = window.setInterval(() => {
        next.click()
    }, 1500)
})


// 导航nav
let nav = document.getElementById('nav')
for (let i = 0; i < nav.children.length; i++) {
    nav.children[i].addEventListener('click', () => {
        for (let k = 0; k < nav.children.length; k++) {
            nav.children[k].removeAttribute('class')
        }
        nav.children[i].setAttribute('class', 'active')
    })
}


// 数据可视化
// Ajax请求月数据
let myChart = echarts.init(document.getElementById('data_show'));
ajax({
    method: 'get',
    url: "https://edu.telking.com/api/?type=month"
}).then(respone => {

    let option = {
        // 标题
        title: {
            left: 'center',
            text: '曲线数据展示',
        },
        xAxis: {
            type: 'category',
            data: respone.data.xAxis,
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        // 
        grid: {
            left: '3%',
            right:'3%',
            containLabel: true
        },
        // 数据
        series: [{
            data: respone.data.series,
            // 类型
            type: 'line',
            // 曲线
            smooth: true,
            // 小标签
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    color: "rgb(69,134,239)"
                }
            },
            // 填充
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(69,134,239,.1)'
                }, {
                    offset: 1,
                    color: 'rgba(69,134,239,.1)'
                }])
            }
        }]
    };

    myChart.setOption(option);

}).catch(err => {
    // 输出错误
    console.log(err)
})

// 周数据 饼状
let my_pie = echarts.init(document.getElementById('pie'));
ajax({
    method: 'get',
    url: 'https://edu.telking.com/api/?type=week'
}).then(response => {
    let data = []
    // 处理参数
    for (let key in response.data.series) {
        data.push({
            value: response.data.series[key],
            name: response.data.xAxis[key]
        })
    }
    let option = {
        backgroundColor: 'white',
        title: {
            text: '饼状图数据展示',
            top: '50px',
            left: 'center'
        },
        series: [{

            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]

    }
    my_pie.setOption(option);
}).catch(err => {
    // 输出错误
    console.log(err)
})

// 柱状
let my_bar = echarts.init(document.getElementById('bar'));
ajax({
    method: 'get',
    url: 'https://edu.telking.com/api/?type=week'
}).then(response => {
    console.log('bar ==>', response.data)
    let option = {
        backgroundColor: 'white',
        color: ['#3398DB'],
        title: {
            text: '柱状图数据展示',
            left: 'center',
            top: '20px'
        },
        grid: {
            top: '40%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: response.data.xAxis,
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            type: 'bar',
            barWidth: '60%',
            data: response.data.series
        }]
    };
    my_bar.setOption(option);
}).catch(err => {
    // 输出错误
    console.log(err)
})


// 底部标签
let tag_icon = document.querySelectorAll('#tag_icon')
console.log(tag_icon)
for(let key = 0 ; key <tag_icon.length;key++){
    tag_icon[key].addEventListener('click',()=>{
        for(let i = 0 ; i <tag_icon.length;i++){
            tag_icon[i].removeAttribute('class')
        }
        tag_icon[key].setAttribute('class','tag_icon_active')
    })
}