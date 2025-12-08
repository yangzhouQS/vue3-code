
// 引入Fuse
// import Fuse from 'fuse.js';
const Fuse = require('fuse.js');
console.log(Fuse);
// 准备数据
const books = [
  { title: '老人与海', author: '海明威' },
  { title: '百年孤独', author: '马尔克斯' },
  { title: '三体', author: '刘慈欣' },
  { title: '围城', author: '钱钟书' },
  { title: '活着', author: '余华' }
];

// 配置Fuse选项
const options = {
  keys: ['title', 'author'],  // 搜索的属性
  threshold: 0.3              // 匹配阈值，越低越精确
};

// 创建Fuse实例
const fuse = new Fuse(books, options);

// 执行搜索
const result = fuse.search('三');

console.log(result);
// 输出结果中会包含"三体"
