# About "miscellaneous"
This repository hosts code snippets that may have no place anywhere else. Some of the snippets are intended to illustrate coding concepts, while others are simply there whimsically. Feel free to poke your head around although be forewarned that this is primarily for personal use.

## Synopsis
* child one
* child two

## Todo
* Write a script that scrapes the top-most block-comment from each file and pairs it with the file's name in a map. Use the generated map to update this README.md's "Synopsis" section.

```javascript
// rough sketch of Markdown API

const synopsisMarkdownObject = Markdown.querySelect('## Synopsis')

let synopsisList = [
  {filename: 'file_1', fileDescription: '...'},
  {filename: 'file_2', fileDescription: '...'},
  ...
  {filename: 'file_n', fileDescription: '...'}
]

synopsisMarkdownObject.innerText = syopsisList
  .map(obj => obj.fileDescription)
  .map(description => `* ${description}`)
  .join('\n')
```

## The Road Ahead
In the future, this repository may serve as an exhibition of my coding interests and coding acumen. For now, however, it is entirely in an infancy stage and hosts code spanning 1+ years of development.
