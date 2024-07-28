const Handlebars = require("handlebars")
const helpers = require("handlebars-helpers")()
Handlebars.registerHelper(helpers)
const tmpStr = `
{{#filter  1}}
1223
{{else}}
不存在的
{{/filter}}
`
const template = Handlebars.compile(tmpStr)

const code = template({
  users: [1, 2, 3, 4]
})
console.log(code);
