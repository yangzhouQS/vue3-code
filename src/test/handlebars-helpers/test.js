import Handlebars from 'handlebars'
import * as Helpers from './index.js'

for (const helperKey in Helpers) {
  Handlebars.registerHelper(helperKey, Helpers[helperKey]);
}
const str = `{{#each list}}{{this}}{{/each}}
{{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
-------
{{#forEach accounts}}
  <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
    {{ name }}
  </a>{{#unless isLast}}, {{/unless}}
{{/forEach}}
`
const template = Handlebars.compile(str)
const code = template({
  list: [1, 2, 3],
  array: ['a', 'b', 'c', 'foo'],
  accounts:[
    {'name': 'John', 'email': 'john@example.com'},
    {'name': 'Malcolm', 'email': 'malcolm@example.com'},
    {'name': 'David', 'email': 'david@example.com'}
  ]
})
console.log(code);
