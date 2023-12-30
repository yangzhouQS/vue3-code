import {defineComponent, ref, onMounted, reactive, PropType} from 'vue';
import {Area} from '@antv/g2plot';
import {pick} from 'lodash';

const ChartInner = defineComponent({
  name: 'ChartInner',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    g2plotName: {
      type: String,
      required: true,
    },
    data: {
      type: Object as PropType<Object[]>,
      default: function () {
        return [];
      },
    },
    width: {
      // 图形在 x 方向对应的数据字段名
      type: String,
      required: false,
      default: '100%',
    },
    height: {
      // 图形在 y 方向对应的数据字段名
      type: String,
      required: false,
      default: '100%',
    },
  },
  setup(props, {expose}) {
    // data
    const elementOption = reactive(Object.assign({}, props));
    const container = ref(null);
    let plot = null;
    // methods
    const methods = {
      initChart: () => {
        elementOption.options.width = '100%';
        elementOption.options.height = '100%';
        elementOption.options.data = elementOption.options.data || [];
        plot = new Area(container.value, elementOption.options);
        plot.render();
      },
      setData: (data) => {
        plot.changeData(data)
      }
    };
    onMounted(() => {
      methods.initChart();
    })

    expose({
      loadData: methods.setData
    })
    return () => {
      return <div class={'full-container pa-8'} ref={container}>
      </div>;
    };
  }
});


export const ChartPage = defineComponent({
  name: 'ChartPage',
  setup(props) {
    // data
    const chartRef = ref();
    const options = {
      "xField": "date",
      "yField": "value",
      "seriesField": "type",
      "color": [
        "#6093f9",
        "#65dbac",
        "#627696"
      ],
      "areaStyle": {
        "fill": "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff"
      },
      "maxColumnWidth": 40,
      "minColumnWidth": 40,
      "tooltip": {
        "trigger": "axis",
        "axisPointer": {
          "type": "shadow"
        },
        "textStyle": {
          "color": "#000"
        },
        "backgroundColor": "rgba(255,255,255,0.7)",
        "extraCssText": "box-shadow: 0 0 7px rgba(0,0,0,0.3);"
      },
      "meta": {
        "materialModel": {
          "alias": "类别"
        },
        "deviation": {
          "alias": "偏差量"
        }
      },
      "scrollbar": {
        "scrollbar": "horizontal"
      },
      "legend": {
        "layout": "horizontal",
        "position": "bottom"
      },
      "xAxis": {
        "triggerEvent": true,
        "boundaryGap": true,
        "axisLabel": {
          "interval": true
        }
      },
      "grid": {
        "left": "40px",
        "top": "20px",
        "right": "20px",
        "bottom": "60px",
        "width": "auto",
        "height": "auto"
      },
      "dataZoom": [
        {
          "type": "slider",
          "show": true,
          "height": 10,
          "xAxisIndex": [
            0
          ],
          "start": 0,
          "end": 40
        }
      ],
      "yAxis": [
        {
          "axisLine": {
            "show": false
          },
          "axisTick": {
            "show": false
          },
          "splitLine": {
            "lineStyle": {
              "type": "dashed",
              "color": "#eee"
            }
          }
        }
      ]
    };
    const loading = ref(false);

    const getUtilsAttr = function () {
      return true
    }

    // methods
    const methods = {
      setData: () => {
        let chartArr = []
        const data = {
          data: [
            {
              "exitTime": "2023-12-01",
              "countWeight": 0,
              "countApp": 4,
              "countPc": 0
            },
            {
              "exitTime": "2023-12-02",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 1
            },
            {
              "exitTime": "2023-12-04",
              "countWeight": 0,
              "countApp": 1,
              "countPc": 0
            },
            {
              "exitTime": "2023-12-06",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 2
            },
            {
              "exitTime": "2023-12-07",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 2
            },
            {
              "exitTime": "2023-12-12",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 5
            },
            {
              "exitTime": "2023-12-13",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 4
            },
            {
              "exitTime": "2023-12-14",
              "countWeight": 1,
              "countApp": 0,
              "countPc": 1
            },
            {
              "exitTime": "2023-12-19",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 5
            },
            {
              "exitTime": "2023-12-20",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 5
            },
            {
              "exitTime": "2023-12-21",
              "countWeight": 2,
              "countApp": 0,
              "countPc": 9
            },
            {
              "exitTime": "2023-12-22",
              "countWeight": 0,
              "countApp": 0,
              "countPc": 3
            }
          ]
        };

        data.data.forEach(item => {
          chartArr.push(
            {
              value: item.countWeight || 0,
              type: '过磅验收',
              date: item.exitTime
            },
            {
              value: item.countApp || 0,
              type: `APP入库`,
              date: item.exitTime
            },
            {
              value: item.countPc || 0,
              type: `APP入库`,
              date: item.exitTime
            }
          )
        });

        chartRef.value?.loadData(chartArr);
      }
    };
    onMounted(() => {

    })
    return () => {
      return <>
        {getUtilsAttr() && (<div class={'full-container pa-8'}>
          antv <el-button
          type="primary"
          onClick={methods.setData}
        >
          设置数据
        </el-button>
          {
            loading.value && (<div class={'full-container'}> loading</div>)
          }
          <ChartInner v-show={!loading.value} ref={chartRef} options={options} g2plotName={'Area'}/>
        </div>)}
      </>;
    };
  }
});
