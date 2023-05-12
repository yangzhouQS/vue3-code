const data = [
  [
    {
      "id": "111",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 1, // 1,不向右合并，>1向右合并
      "rowSpan": 2, // 1,不向向下合并，>1 向下
      "label": "A1自定义列 自定义列"
    },
    {
      "id": "222",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "A2自定义列"
    },
    {
      "id": "333",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 2,
      "rowSpan": 1,
      "label": "A3自定义列 自定义列"
    },
    {
      "id": "555",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "A4自定义列"
    },
    {
      "id": "666",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 2,
      "label": "A5自定义列"
    },
    {
      "id": "777",
      "align": "center",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "A6自定义列"
    }
  ],
  [
    {
      "id": "1zc91YYQn1LNPhT9Xxf1P",
      "align": "",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "B1自定义列"
    },
    {
      "id": "ajKoOqpybfkvryN4EC_Ap",
      "align": "",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "B2自定义列"
    },
    {
      "id": "a-lYgsC9e6UeofApXmEOu",
      "align": "",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "B3自定义列"
    },
    {
      "id": "q2RAAdZfn9IIBJFJIpnjB",
      "align": "",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "B4自定义列"
    },
    {
      "id": "asFQyBDSMas2Rfc__ZCP1",
      "align": "",
      "width": "",
      "height": "40px",
      "colSpan": 1,
      "rowSpan": 1,
      "label": "B5自定义列"
    }
  ]
]

/*
{
  "id": "111",
  "align": "center",
  "width": "",
  "height": "40px",
  "colSpan": 1, // 1,不向右合并，>1向右合并
  "rowSpan": 2, // 1,不向向下合并，>1 向下
  "label": "自定义列 自定义列"
}
*/
console.log(data[0].length)
console.log(data[1].length)
const newData = data[0].map((row, index) => {
  row.pid = null;

  /*if (row.rowSpan > 1) {
    for (let i = 0; i < row.rowSpan; i++) {
      console.log(i)
      if (i > index) {
        data[i].splice(index, 0, {})
      }
    }
  }*/
  return row
})

// console.log(data[1])

// 每一行
data.forEach((rows, index) => {


  // 每一列
  rows.forEach((item, colIndex) => {
    // 右填充
    if (item.colSpan > 1) {
      for (let i = 0; i < item.colSpan; i++) {
        if (i > 0) {
          item._desc = "插入占位"
          rows.splice(i, 0, item)
        }
      }
    }
    // 下填充
    if (item.rowSpan > 1) {
      for (let i = 0; i < item.rowSpan; i++) {
        console.log(item, i)
        if (i > index) {
          console.log(i, index, colIndex)
          // data[i][colIndex].splice(colIndex, 0, {item._desc = "插入占位"})
        }
        /*if (i > 0) {
          item._desc = "插入占位"
          rows.splice(i, 0, item)
        }*/
      }
    }
  })
})
// console.log(data)






