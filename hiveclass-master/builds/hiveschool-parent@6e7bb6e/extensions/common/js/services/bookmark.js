define(["bluebird"],function(e){var n=function(){this.getBookmarks=function(n){var t=this;return new e(function(e){chrome.bookmarks.getSubTree(n,function(n){e(n)})}).then(function(e){return t._formatBookmarks(e[0])})},this.listFolders=function(){var n=this;return new e(function(e){chrome.bookmarks.getTree(function(n){e(n)})}).then(function(e){return n._filterFolders(e[0])})},this.initializeFolder=function(){return new e(function(e){chrome.bookmarks.search({title:"HiveSchool"},function(n){var t=n.filter(function(e){return"HiveSchool"===e.title});t.length>0?e(t[0].id):chrome.bookmarks.create({parentId:"1",title:"HiveSchool",index:0},function(n){e(n.id)})})})},this._filterFolders=function(e){for(var n={id:e.id,title:e.title},t=[],o=e.children.filter(function(e){return!e.url}),r=0;o.length>r;r++)t.push(this._filterFolders(o[r]));return t.length>0&&(n.children=t),n},this._formatBookmarks=function(e){for(var n={id:e.id,title:e.title,parentId:e.parentId,children:[]},t=e.children.filter(function(e){return e.url||e.children.length>0}),o=0;t.length>o;o++){var r=t[o];r.url?n.children.push({id:r.id,title:r.title,url:r.url}):n.children.push(this._formatBookmarks(t[o]))}return n}};return n});