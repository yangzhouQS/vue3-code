import Handlebars from 'handlebars'
Handlebars.logger.level = 'info'
// 普通变量的渲染输出
const template = Handlebars.compile("firstName = {{firstName}} \r\nlastName = {{lastName}}")

console.log(template({
  firstName: 'Alan',
  lastName: 'Johnson'
}))

Handlebars.registerHelper("link", function (text, url) {
  url = Handlebars.escapeExpression(url)
  text = Handlebars.escapeExpression(text)

  return new Handlebars.SafeString("<a href='" + url + "'>" + text + "</a>");
});

Handlebars.registerHelper('progress', function (name, percent, stalled) {
  var barWidth = percent / 5
  var bar = "********************".slice(0,barWidth)
  return bar + " " + percent + "% " + name + " " +  (stalled ? "stalled" : "")
})

Handlebars.registerHelper('isdefined', function (value) {
  return value !== undefined;
});

const template2 = Handlebars.compile(`
--------with ----------------
  {{#with person}}
    {{firstname}} {{lastname}}
  {{/with}}
---------each ----------------
{{#each people}}
  {{this}}&gt;&lt;
{{!我是注释哦  不会渲染的 }}
{{/each}}
------------------ persons 数组对象遍历渲染 ----------------
{{#each persons}}
  {{name}} {{age}}
{{/each}}

------ 对象属性获取 ----- 
{{person.firstname}}
{{person.lastname}}

------ link ----- 
{{link "百度地址" url}}
####
{{link people2.text people2.url}}


### 
{{progress "Search" 10 false}}
{{progress "Upload" 90 true}}
{{progress "Finish" 100 false}}


#### if判断
{{#if author}}
author = {{author}}, <h1>{{firstName}} {{lastName}}</h1>
{{else}}
<h1>author = {{author}} Unknown Author</h1> 
{{/if}}


#### unless判断

{{log "debug logging" level="debug"}}
{{log "info logging" level="info"}}
{{log "info logging is the default"}}
{{log "logging a warning" level="warn"}}
{{log "logging an error" level="error"}}
`)

console.log(template2({
  author: false,
  firstName: "Yehuda",
  lastName: "Katz",
  person: {
    firstname: 'Alan',
    lastname: 'Johnson'
  },
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley",
  ],
  people2: {
    firstname: "Yehuda",
    lastname: "Katz",
    url: "https://yehudakatz.com/",
    text: "See Website",
  },
  persons: [
    {name: "Nils", age: 20},
    {name: "Teddy", age: 10},
    {name: "Nelson", age: 40},
  ],
  url: "https://www.baidu.com"
}))
