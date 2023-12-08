import {
  onMounted, ref,
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  renderSlot,
  getCurrentInstance,
  resolveComponent
} from 'vue'
import * as SpaceItem from 'element-plus/es/components/space/src/item'

export const SpaceContainer = defineComponent({
  name: 'SpaceContainer',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    onMounted(() => {

    })
    const treeData = ref([
      {
        "parentId": null,
        "id": 0,
        "name": "root",
        "description": "root",
        "type": null,
        "children": [
          {
            "parentId": 0,
            "id": "views_lp66ho0l",
            "name": "views",
            "description": "",
            "type": "baseNode",
            "children": [
              {
                "parentId": "views_lp66ho0l",
                "id": "plane_lp66ho0m",
                "name": "plane",
                "description": "",
                "type": "baseNode",
                "children": [
                  {
                    "parentId": "plane_lp66ho0m",
                    "id": "navigationBar_lp66ho0n",
                    "name": "navigationBar",
                    "description": "",
                    "type": "baseNode"
                  },
                  {
                    "parentId": "plane_lp66ho0m",
                    "id": "flexBox_lp66ho0t",
                    "name": "flexBox",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "flexBox_lp66ho0t",
                        "id": "containerRender_lpqnem6r",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpqnem6r",
                            "id": "toolbar_lpqnem6s",
                            "name": "toolbar",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "flexLine_lpqnem6t",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode"
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem6u",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem6u",
                                    "id": "elementRender_lpqnem6v",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem6v",
                                        "id": "filterItem_lpqnem6w",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode",
                                        "children": [
                                          {
                                            "parentId": "filterItem_lpqnem6w",
                                            "id": "elementRender_lpqnem7f",
                                            "name": "elementRender",
                                            "description": "",
                                            "type": "renderNode",
                                            "children": [
                                              {
                                                "parentId": "elementRender_lpqnem7f",
                                                "id": "listElement_lpqnem7g",
                                                "name": "listElement",
                                                "description": "",
                                                "type": "baseNode",
                                                "children": [
                                                  {
                                                    "parentId": "listElement_lpqnem7g",
                                                    "id": "elementRender_lpqnem7h",
                                                    "name": "elementRender",
                                                    "description": "",
                                                    "type": "renderNode",
                                                    "children": [
                                                      {
                                                        "parentId": "elementRender_lpqnem7h",
                                                        "id": "image_lpqnem7i",
                                                        "name": "image",
                                                        "description": "",
                                                        "type": "baseNode"
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "parentId": "listElement_lpqnem7g",
                                                    "id": "elementRender_lpqnem7j",
                                                    "name": "elementRender",
                                                    "description": "",
                                                    "type": "renderNode",
                                                    "children": [
                                                      {
                                                        "parentId": "elementRender_lpqnem7j",
                                                        "id": "button_lpqnem7k",
                                                        "name": "button",
                                                        "description": "按钮",
                                                        "type": "baseNode"
                                                      }
                                                    ]
                                                  },
                                                  {
                                                    "parentId": "listElement_lpqnem7g",
                                                    "id": "elementRender_lpqnem7l",
                                                    "name": "elementRender",
                                                    "description": "",
                                                    "type": "renderNode",
                                                    "children": [
                                                      {
                                                        "parentId": "elementRender_lpqnem7l",
                                                        "id": "button_lpqnem7m",
                                                        "name": "button",
                                                        "description": "按钮",
                                                        "type": "baseNode"
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem6x",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem6x",
                                    "id": "elementRender_lpqnem6y",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem6y",
                                        "id": "filterItem_lpqnem6z",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem70",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem70",
                                    "id": "elementRender_lpqnem71",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem71",
                                        "id": "filterItem_lpqnem72",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem73",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem73",
                                    "id": "elementRender_lpqnem74",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem74",
                                        "id": "filterItem_lpqnem75",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem76",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem76",
                                    "id": "elementRender_lpqnem77",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem77",
                                        "id": "filterItem_lpqnem78",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem79",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem79",
                                    "id": "elementRender_lpqnem7a",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem7a",
                                        "id": "filterItem_lpqnem7b",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "toolbar_lpqnem6s",
                                "id": "gridItem_lpqnem7c",
                                "name": "gridItem",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "gridItem_lpqnem7c",
                                    "id": "elementRender_lpqnem7d",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpqnem7d",
                                        "id": "filterItem_lpqnem7e",
                                        "name": "filterItem",
                                        "description": "label名称",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "parentId": "flexBox_lp66ho0t",
                        "id": "containerRender_lp66ho0u",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lp66ho0u",
                            "id": "box_lpqmysj9",
                            "name": "box",
                            "description": "",
                            "type": "baseNode"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "parentId": "views_lp66ho0l",
                "id": "dialog_lpdw0904",
                "name": "dialog",
                "description": "关联配比",
                "type": "baseNode",
                "children": [
                  {
                    "parentId": "dialog_lpdw0904",
                    "id": "flexBox_lpdw0905",
                    "name": "flexBox",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "flexBox_lpdw0905",
                        "id": "containerRender_lpdw0906",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpdw0906",
                            "id": "toolbar_lpdw08fy",
                            "name": "toolbar",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "toolbar_lpdw08fy",
                                "id": "flexLine_lpdw08fz",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "flexLine_lpdw08fz",
                                    "id": "elementRender_lpdw08j9",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdw08j9",
                                        "id": "datePicker_lpdw08ja",
                                        "name": "datePicker",
                                        "description": "请选择日期",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdw08fz",
                                    "id": "elementRender_lpdw08kd",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdw08kd",
                                        "id": "button_lpdw08ke",
                                        "name": "button",
                                        "description": "按钮",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdw08fz",
                                    "id": "elementRender_lpdw08lh",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdw08lh",
                                        "id": "button_lpdw08li",
                                        "name": "button",
                                        "description": "按钮",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "parentId": "flexBox_lpdw0905",
                        "id": "containerRender_lpdw08bp",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpdw08bp",
                            "id": "box_lpdw08h2",
                            "name": "box",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "box_lpdw08h2",
                                "id": "elementRender_lpdw08h3",
                                "name": "elementRender",
                                "description": "",
                                "type": "renderNode",
                                "children": [
                                  {
                                    "parentId": "elementRender_lpdw08h3",
                                    "id": "tableAsync_lpdw08rv",
                                    "name": "tableAsync",
                                    "description": "",
                                    "type": "baseNode"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "parentId": 0,
            "id": "views_lp66ho1v",
            "name": "views",
            "description": "",
            "type": "baseNode",
            "children": [
              {
                "parentId": "views_lp66ho1v",
                "id": "plane_lp66ho1w",
                "name": "plane",
                "description": "",
                "type": "baseNode",
                "children": [
                  {
                    "parentId": "plane_lp66ho1w",
                    "id": "navigationBar_lp66ho1x",
                    "name": "navigationBar",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "navigationBar_lp66ho1x",
                        "id": "elementRender_lp66ho1y",
                        "name": "elementRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "elementRender_lp66ho1y",
                            "id": "button_lp66ho1z",
                            "name": "button",
                            "description": "关闭",
                            "type": "baseNode"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "parentId": "plane_lp66ho1w",
                    "id": "flexBox_lp66ho25",
                    "name": "flexBox",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "flexBox_lp66ho25",
                        "id": "containerRender_lp66ho26",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lp66ho26",
                            "id": "box_lp66ho28",
                            "name": "box",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "box_lp66ho28",
                                "id": "flexLine_lp66ho2a",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "flexLine_lp66ho2a",
                                    "id": "elementRender_lp66z6hw",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lp66z6hw",
                                        "id": "searchSelect_lp66z6hx",
                                        "name": "searchSelect",
                                        "description": "请选择",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lp66ho2a",
                                    "id": "elementRender_lp66z6hy",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lp66z6hy",
                                        "id": "button_lp66z6hz",
                                        "name": "button",
                                        "description": "选材",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lp66ho2a",
                                    "id": "elementRender_lp66z6i0",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lp66z6i0",
                                        "id": "button_lp66z6i1",
                                        "name": "button",
                                        "description": "保存",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "parentId": "flexBox_lp66ho25",
                        "id": "containerRender_lp66ho27",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lp66ho27",
                            "id": "panel_lp66z6i2",
                            "name": "panel",
                            "description": "自定义标题",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "panel_lp66z6i2",
                                "id": "elementRender_lp66z6i3",
                                "name": "elementRender",
                                "description": "",
                                "type": "renderNode",
                                "children": [
                                  {
                                    "parentId": "elementRender_lp66z6i3",
                                    "id": "tableEdit_lp66z6i5",
                                    "name": "tableEdit",
                                    "description": "",
                                    "type": "baseNode"
                                  }
                                ]
                              },
                              {
                                "parentId": "panel_lp66z6i2",
                                "id": "flexLine_lp66z6i4",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "parentId": 0,
            "id": "views_lpdq1s31",
            "name": "views",
            "description": "",
            "type": "baseNode",
            "children": [
              {
                "parentId": "views_lpdq1s31",
                "id": "plane_lpdq1s32",
                "name": "plane",
                "description": "",
                "type": "baseNode",
                "children": [
                  {
                    "parentId": "plane_lpdq1s32",
                    "id": "navigationBar_lpdq1s33",
                    "name": "navigationBar",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "navigationBar_lpdq1s33",
                        "id": "elementRender_lpdq1s34",
                        "name": "elementRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "elementRender_lpdq1s34",
                            "id": "button_lpdq1s35",
                            "name": "button",
                            "description": "关闭",
                            "type": "baseNode"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "parentId": "plane_lpdq1s32",
                    "id": "flexBox_lpdq1s42",
                    "name": "flexBox",
                    "description": "",
                    "type": "baseNode",
                    "children": [
                      {
                        "parentId": "flexBox_lpdq1s42",
                        "id": "containerRender_lpdq1s43",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpdq1s43",
                            "id": "box_lpdq1tch",
                            "name": "box",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "box_lpdq1tch",
                                "id": "flexLine_lpdq1u65",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "flexLine_lpdq1u65",
                                    "id": "elementRender_lpdq1vei",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq1vei",
                                        "id": "searchSelect_lpdq1vej",
                                        "name": "searchSelect",
                                        "description": "请选择",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1u65",
                                    "id": "elementRender_lpdq1vtc",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq1vtc",
                                        "id": "button_lpdq1vtd",
                                        "name": "button",
                                        "description": "选材",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1u65",
                                    "id": "elementRender_lpdq1w86",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq1w86",
                                        "id": "button_lpdq1w87",
                                        "name": "button",
                                        "description": "保存",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "parentId": "flexBox_lpdq1s42",
                        "id": "containerRender_lpdq1s44",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpdq1s44",
                            "id": "panel_lpdq1ya5",
                            "name": "panel",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "panel_lpdq1ya5",
                                "id": "elementRender_lpdq1ya6",
                                "name": "elementRender",
                                "description": "",
                                "type": "renderNode",
                                "children": [
                                  {
                                    "parentId": "elementRender_lpdq1ya6",
                                    "id": "tableEdit_lpdq2iex",
                                    "name": "tableEdit",
                                    "description": "",
                                    "type": "baseNode",
                                    "children": [
                                      {
                                        "parentId": "tableEdit_lpdq2iex",
                                        "id": "lineElementRender_lpdq2toz",
                                        "name": "lineElementRender",
                                        "description": "",
                                        "type": "renderNode",
                                        "children": [
                                          {
                                            "parentId": "lineElementRender_lpdq2toz",
                                            "id": "inputNumber_lpdq2toy",
                                            "name": "inputNumber",
                                            "description": "占位符",
                                            "type": "baseNode"
                                          }
                                        ]
                                      },
                                      {
                                        "parentId": "tableEdit_lpdq2iex",
                                        "id": "lineElementRender_lpdq2u42",
                                        "name": "lineElementRender",
                                        "description": "",
                                        "type": "renderNode",
                                        "children": [
                                          {
                                            "parentId": "lineElementRender_lpdq2u42",
                                            "id": "inputNumber_lpdq2u41",
                                            "name": "inputNumber",
                                            "description": "占位符",
                                            "type": "baseNode"
                                          }
                                        ]
                                      },
                                      {
                                        "parentId": "tableEdit_lpdq2iex",
                                        "id": "lineElementRender_lpdq2uj5",
                                        "name": "lineElementRender",
                                        "description": "",
                                        "type": "renderNode",
                                        "children": [
                                          {
                                            "parentId": "lineElementRender_lpdq2uj5",
                                            "id": "inputNumber_lpdq2uj4",
                                            "name": "inputNumber",
                                            "description": "占位符",
                                            "type": "baseNode"
                                          }
                                        ]
                                      },
                                      {
                                        "parentId": "tableEdit_lpdq2iex",
                                        "id": "lineElementRender_lpdq2wmr",
                                        "name": "lineElementRender",
                                        "description": "",
                                        "type": "renderNode",
                                        "children": [
                                          {
                                            "parentId": "lineElementRender_lpdq2wmr",
                                            "id": "button_lpdq2wmq",
                                            "name": "button",
                                            "description": "删除",
                                            "type": "baseNode"
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              {
                                "parentId": "panel_lpdq1ya5",
                                "id": "flexLine_lpdq1ya7",
                                "name": "flexLine",
                                "description": "",
                                "type": "baseNode",
                                "children": [
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq259n",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq259n",
                                        "id": "button_lpdq259o",
                                        "name": "button",
                                        "description": " 更新到理论配合比",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq25oh",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq25oh",
                                        "id": "button_lpdq25oi",
                                        "name": "button",
                                        "description": "标记为\"水\"",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq263b",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq263b",
                                        "id": "button_lpdq263c",
                                        "name": "button",
                                        "description": "保留两位小数",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq27qh",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq27qh",
                                        "id": "button_lpdq27qi",
                                        "name": "button",
                                        "description": "取消两位小数",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq28k3",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq28k3",
                                        "id": "button_lpdq28k4",
                                        "name": "button",
                                        "description": "",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq2fjd",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq2fjd",
                                        "id": "label_lpdq2fje",
                                        "name": "label",
                                        "description": "容重：11",
                                        "type": "baseNode"
                                      }
                                    ]
                                  },
                                  {
                                    "parentId": "flexLine_lpdq1ya7",
                                    "id": "elementRender_lpdq2grr",
                                    "name": "elementRender",
                                    "description": "",
                                    "type": "renderNode",
                                    "children": [
                                      {
                                        "parentId": "elementRender_lpdq2grr",
                                        "id": "label_lpdq2grs",
                                        "name": "label",
                                        "description": "容重：11",
                                        "type": "baseNode"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "parentId": "flexBox_lpdq1s42",
                        "id": "containerRender_lpdq1xgk",
                        "name": "containerRender",
                        "description": "",
                        "type": "renderNode",
                        "children": [
                          {
                            "parentId": "containerRender_lpdq1xgk",
                            "id": "box_lpdq1yp0",
                            "name": "box",
                            "description": "",
                            "type": "baseNode",
                            "children": [
                              {
                                "parentId": "box_lpdq1yp0",
                                "id": "elementRender_lpdq1yp1",
                                "name": "elementRender",
                                "description": "",
                                "type": "renderNode",
                                "children": [
                                  {
                                    "parentId": "elementRender_lpdq1yp1",
                                    "id": "formItem_lpdq1z3u",
                                    "name": "formItem",
                                    "description": "label名称",
                                    "type": "baseNode",
                                    "children": [
                                      {
                                        "parentId": "formItem_lpdq1z3u",
                                        "id": "elementRender_lpdq20c9",
                                        "name": "elementRender",
                                        "description": "",
                                        "type": "renderNode",
                                        "children": [
                                          {
                                            "parentId": "elementRender_lpdq20c9",
                                            "id": "input_lpdq20ca",
                                            "name": "input",
                                            "description": "请输入",
                                            "type": "baseNode"
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "parentId": "views_lpdq1s31",
                "id": "dialog_lpdq1603",
                "name": "dialog",
                "description": "配比选材",
                "type": "baseNode"
              }
            ]
          }
        ]
      }
    ])
    const filterNode = (value: string, data: any) => {
      if (!value) {
        return true;
      }
      return `${String(data.name)}${String(data.id)}${String(
        data.description || ''
      )}`.includes(value);
    };
    const treeExpandedKeys = ref<string[]>([]);
    const handleNodeClick = () => {
      
    }
    return () => {
      return <div>
        <el-tree
          default-expanded-keys={treeExpandedKeys.value}
          data={treeData.value}
          props={{
            children: 'children',
            label: 'name'
          }}
          filter-node-method={filterNode}
          node-key={'id'}
          onNodeClick={handleNodeClick}
        ></el-tree>
      </div>
      /*return <el-space>
        hello
        hello
        hello
        <SpaceItem class={'xxxx'}>xsxs</SpaceItem>
      </el-space>*/
    }
  }
})
