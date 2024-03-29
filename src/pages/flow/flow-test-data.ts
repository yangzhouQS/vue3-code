export const configData = {
  "processData": {
    "type": "start",
    "content": "所有人",
    "properties": {
      "title": "发起人",
      "initiator": "ALL",
      "formOperates": [
        {
          "formId": 2,
          "formOperate": 2
        },
        {
          "formId": 3,
          "formOperate": 2
        },
        {
          "formId": 4,
          "formOperate": 2
        },
        {
          "formId": 5,
          "formOperate": 2
        },
        {
          "formId": 6,
          "formOperate": 2
        },
        {
          "formId": 7,
          "formOperate": 2
        },
        {
          "formId": 8,
          "formOperate": 2
        },
        {
          "formId": 9,
          "formOperate": 2
        }
      ]
    },
    "nodeId": "Gb2",
    "childNode": {
      "type": "approver",
      "content": "发起人自选",
      "properties": {
        "title": "审批人",
        "assigneeType": "optional",
        "formOperates": [
          {
            "formId": 2,
            "formOperate": 1
          },
          {
            "formId": 3,
            "formOperate": 1
          },
          {
            "formId": 4,
            "formOperate": 1
          },
          {
            "formId": 5,
            "formOperate": 1
          },
          {
            "formId": 6,
            "formOperate": 1
          },
          {
            "formId": 7,
            "formOperate": 1
          },
          {
            "formId": 8,
            "formOperate": 1
          },
          {
            "formId": 9,
            "formOperate": 1
          }
        ],
        "counterSign": true,
        "optionalMultiUser": false,
        "optionalRange": "ALL"
      },
      "nodeId": "Nb2",
      "prevId": "Gb2"
    },
    "conditionNodes": [
      {
        "type": "condition",
        "content": "[学历 = 博士生] \n",
        "properties": {
          "title": "条件1",
          "conditions": [
            {
              "formId": 3,
              "conditionValue": "博士生"
            }
          ],
          "initiator": null,
          "priority": 0,
          "isDefault": false
        },
        "nodeId": "Lb2",
        "prevId": "Gb2",
        "childNode": {
          "type": "approver",
          "content": "张三",
          "properties": {
            "title": "审批人",
            "approvers": [
              {
                "nodeId": 20,
                "userId": 20,
                "userName": "张三",
                "deptId": 1
              }
            ],
            "assigneeType": "user",
            "formOperates": [
              {
                "formId": 2,
                "formOperate": 1
              },
              {
                "formId": 3,
                "formOperate": 1
              },
              {
                "formId": 4,
                "formOperate": 1
              },
              {
                "formId": 5,
                "formOperate": 1
              },
              {
                "formId": 6,
                "formOperate": 1
              },
              {
                "formId": 7,
                "formOperate": 1
              },
              {
                "formId": 8,
                "formOperate": 1
              },
              {
                "formId": 9,
                "formOperate": 1
              }
            ],
            "counterSign": true,
            "optionalMultiUser": false,
            "optionalRange": "ALL"
          },
          "nodeId": "Wb2",
          "prevId": "Lb2",
          "childNode": {
            "type": "copy",
            "content": "xxx研发部",
            "properties": {
              "title": "抄送人",
              "menbers": {
                "dep": [
                  {
                    "nodeId": 4,
                    "deptId": 4,
                    "deptName": "xxx研发部",
                    "parentDeptId": 1
                  }
                ]
              },
              "userOptional": true
            },
            "nodeId": "Yb2",
            "prevId": "Wb2"
          }
        }
      },
      {
        "type": "condition",
        "content": "其他情况进入此流程",
        "properties": {
          "title": "条件2",
          "conditions": [],
          "initiator": null,
          "priority": 1,
          "isDefault": true
        },
        "nodeId": "Mb2",
        "prevId": "Gb2",
        "childNode": {
          "type": "approver",
          "content": "王五",
          "properties": {
            "title": "审批人",
            "approvers": [
              {
                "nodeId": 40,
                "userId": 40,
                "userName": "王五",
                "deptId": 1
              }
            ],
            "assigneeType": "user",
            "formOperates": [
              {
                "formId": 2,
                "formOperate": 1
              },
              {
                "formId": 3,
                "formOperate": 1
              },
              {
                "formId": 4,
                "formOperate": 1
              },
              {
                "formId": 5,
                "formOperate": 1
              },
              {
                "formId": 6,
                "formOperate": 1
              },
              {
                "formId": 7,
                "formOperate": 1
              },
              {
                "formId": 8,
                "formOperate": 1
              },
              {
                "formId": 9,
                "formOperate": 1
              }
            ],
            "counterSign": true,
            "optionalMultiUser": false,
            "optionalRange": "ALL"
          },
          "nodeId": "Xb2",
          "prevId": "Mb2"
        }
      }
    ]
  }
}
