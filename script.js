var state = {
    color: [ "#0033A0", "#6CACE4", "#6D6E71", "#000000", "#890000", "#620000", "#ff4d4d" ],
    toolbox: {
        show: true,
        feature: {
            dataView: {
                readOnly: false,
            },
            saveAsImage: {},
        },
    },
    textStyle: {
        fontFamily: "Trebuchet MS",
    },
    title: {
        text: "Title here",
        textStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "#3776be",
        },
        left: "10%",
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
      },
    grid: {
        top: 100,
        containLabel: true,
    },
    legend: {
        top: "10%",
        padding: [1, 1, 1, 1],
        textStyle: {
            fontSize: 18,
            fontWeight: "bolder",
        },
        lineStyle: {
            width: 2.5,
            type: "inherit",
        },
    },
    xAxis: {
        data: [],
        axisLine: {
            show: true,
            lineStyle: {
                width: 1.5,
                color: "black",
            },
        },
        axisTick: {
            show: true,
            length: 12,
            lineStyle: {
                width: 1.5,
            },
        },
        axisLabel: {
            color: "black",
            margin: 16,
            fontSize: 18,
            fontWeight: "bolder",
            interval: 83,
            showMaxLabel: true,
        },
        min: 0,
    },
    yAxis: {
        min: 75,
        max: 250,
        interval: 25,
        axisLine: {
            show: true,
            lineStyle: {
                width: 1.5,
                color: "black",
            },
        },
        axisLabel: {
            color: "black",
            margin: 16,
            fontSize: 18,
            fontWeight: "bolder",
        },
        axisTick: {
            show: true,
            length: 12,
            lineStyle: {
                width: 1.5,
            },
        },
        splitLine: {
            show: false,
        },
    },
    series: [ ],
};

const actions = {
    myChart: null,
    width: "600px",
    height: "400px",
    updateState: (key, value) => {
        switch(key) {
            case 'text':
                actions.renderGraph();
                break
            case 'title':
                state.title.text = value
                break;
            case 'title_left':
                state.title.left = `${value}px`
                break;
            case 'width':
                actions.width = `${value}px`;
                actions.renderGraph();
                break;
            case 'height':
                actions.height = `${value}px`;
                actions.renderGraph();
                break;
            case 'grid_top':
                state.grid.top = `${value}px`
                break;
            case 'legend_top':
                state.legend.top = `${value}%`
                break;
            case 'x_axis_min':
                state.xAxis.min = value
                break;
            case 'x_axis_max':
                state.xAxis.max = value
                break;
            case 'x_axis_interval':
                state.xAxis.interval = value
                break;
            case 'y_axis_min':
                state.yAxis.min = value
                break;
            case 'y_axis_max':
                state.yAxis.max = value
                break;
            case 'y_axis_interval':
                state.yAxis.interval = value
                break;
        }

        /* Update graph */
        actions.refresh()
    },
    refresh: () => {
        actions.myChart.setOption(state)
    },
    showDataInput: () => {
        backdrop = document.getElementById("backdrop");
        backdrop.classList.remove("invisible");
        backdrop = document.getElementById("dataInput");
        backdrop.classList.remove("invisible");
    },
    showOptions: () => {
        backdrop = document.getElementById("backdrop");
        backdrop.classList.remove("invisible");
        backdrop = document.getElementById("dataOptions");
        backdrop.classList.remove("invisible");
    },
    hideAll: () => {
        backdrop = document.getElementById("backdrop");
        backdrop.classList.add("invisible");
        backdrop = document.getElementById("dataInput");
        backdrop.classList.add("invisible");
        backdrop = document.getElementById("dataOptions");
        backdrop.classList.add("invisible");
    },
    renderGraph: () => {
        document.getElementById("main").remove()
        const graph = document.getElementById("graph")
        const main = document.createElement("div");
        main.id = "main"
        main.classList.add("mt-10")
        main.classList.add("m-auto")
        main.style.width = actions.width
        main.style.height = actions.height
        graph.appendChild(main)
        actions.myChart = echarts.init(main, null, {renderer: "svg"});
        let text = document.getElementById("inputText").value
        text = text.replace(/^\s*[\r\n]/gm , "").split("\n")
        let length = text[0].split("\t").length
        state.xAxis.data = []
        state.series = []
        for (let i = 0; i < length - 1; i++)
            state.series.push({
                name: "",
                type: "line",
                symbol: "line",
                lineStyle: {
                    width: 2.5,
                    type: "solid",
                },
                data: [ ],
            })
        for (let i = 1; i <= 8; i++) {
            if (i < length)
                document.getElementById(`dashLine${i}`).classList.remove("invisible");
            else
                document.getElementById(`dashLine${i}`).classList.add("invisible");
        }
        text.forEach(function (item) {
            items = item.split("\t")
            for (let i=0; i<items.length; i++)
                if (i==0) {
                    state.xAxis.data.push(items[i])
                } else {
                    state.series[i-1].data.push(items[i])
                }
        });
    }
}

function bind_click(itemId, fn) {
    document.getElementById(itemId).addEventListener("click", fn);
}

function bind_input(itemId, fn) {
    document.getElementById(itemId).addEventListener("input", fn);
}

/* Setup buttons */
bind_click("changeData", actions.showDataInput)
bind_click("changeOptions", actions.showOptions)
bind_click("hideData", actions.hideAll)
bind_click("hideOptions", actions.hideAll)
bind_click("backdrop", actions.hideAll)

/* Setup inputs */
bind_input("inputText", (e) => {actions.updateState("text", e.target.value)})

bind_input("inputTitle", (e) => {actions.updateState("title", e.target.value)})
bind_input("inputLeftTitle", (e) => {actions.updateState("title_left", e.target.value)})
bind_input("inputWidth", (e) => {actions.updateState("width", e.target.value)})
bind_input("inputHeight", (e) => {actions.updateState("height", e.target.value)})
bind_input("inputGridGap", (e) => {actions.updateState("grid_top", e.target.value)})
bind_input("inputLegendTop", (e) => {actions.updateState("legend_top", e.target.value)})

bind_input("xAxisMin", (e) => {actions.updateState("x_axis_min", e.target.value)})
bind_input("xAxisMax", (e) => {actions.updateState("x_axis_max", e.target.value)})
bind_input("xAxisInterval", (e) => {actions.updateState("x_axis_interval", e.target.value)})
bind_input("yAxisMin", (e) => {actions.updateState("y_axis_min", e.target.value)})
bind_input("yAxisMax", (e) => {actions.updateState("y_axis_max", e.target.value)})
bind_input("yAxisInterval", (e) => {actions.updateState("y_axis_internval", e.target.value)})

/* Render example data */
actions.renderGraph();
actions.refresh();
document.getElementsByName("dashed").forEach((el) => {
    el.addEventListener("click", (e) => {
        if (e.target.checked)
            state.series[e.target.value-1].lineStyle.type = "dashed";
        else
            state.series[e.target.value-1].lineStyle.type = "solid";
        actions.refresh();
    })
})
