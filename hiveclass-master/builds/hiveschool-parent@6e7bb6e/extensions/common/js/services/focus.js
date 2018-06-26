var FULLSCREEN="fullscreen",STATE_FULLSCREEN={state:FULLSCREEN},STATE_MAXIMIZED={state:"maximized"},FOCUSED={focused:!0},POPULATE={populate:!0},NO_POPULATE={populate:!1};define(["bluebird"],function(e){var n=function(){this._resourceUrl=null,this._window=null,this._started=!1,this._locked=!1,this._resizeInterval=null;var n=this;this._lockRemoval=function(e){n._window&&n._window.id==e&&n._unlockEverything().then(function(){n._openResource(!0)})},this._ensureTabWithIdExists=function(n){return new e(function(e,t){chrome.tabs.query({},function(o){var r=o.filter(function(e){return e.id===n});1==r.length?e(r[0]):t()})})},this._ensureFocusWindowExists=function(){return new e(function(e,t){n._window?chrome.windows.getAll(NO_POPULATE,function(o){var r=o.filter(function(e){return e.id===n._window.id});1==r.length?e(r[0]):t()}):t()})},this._lockFocus=function(e){setTimeout(function(){n._window&&n._window.id!=e&&n._ensureFocusWindowExists().then(function(e){chrome.windows.update(e.id,FOCUSED)},function(){})},0)},this._lockUpdate=function(e,t){t.url&&t.url.split("#")[0]!=n._resourceUrl.split("#")[0]?chrome.tabs.update(e,{url:n._resourceUrl}):t.url&&(n._resourceUrl=t.url)},this._lockNewTab=function(e){n._ensureTabWithIdExists(e.id).then(function(e){chrome.tabs.remove(e.id)},function(){})},this._lockNewWindow=function(e){chrome.windows.remove(e.id)},this._lockResize=function(){n._unlockResize(),n._resizeInterval=setInterval(function(){n._ensureFocusWindowExists().then(function(e){n._locked&&e.state!=FULLSCREEN&&chrome.windows.update(e.id,STATE_FULLSCREEN)},function(){})},100)},this._unlockResize=function(){n._resizeInterval&&(clearInterval(n._resizeInterval),n._resizeInterval=null)},this._ensureEventHasListener=function(e,n){e.hasListener(n)||e.addListener(n)},this._ensureEventHasNotListener=function(e,n){e.hasListener(n)&&e.removeListener(n)},this._lockEverything=function(){return new e(function(e){n._ensureEventHasListener(chrome.windows.onFocusChanged,n._lockFocus),n._ensureEventHasListener(chrome.windows.onRemoved,n._lockRemoval),n._ensureEventHasListener(chrome.windows.onCreated,n._lockNewWindow),n._ensureEventHasListener(chrome.tabs.onUpdated,n._lockUpdate),n._ensureEventHasListener(chrome.tabs.onCreated,n._lockNewTab),n._lockResize(),n._locked=!0,e()})},this._unlockEverything=function(){return new e(function(e){n._ensureEventHasNotListener(chrome.windows.onFocusChanged,n._lockFocus),n._ensureEventHasNotListener(chrome.windows.onRemoved,n._lockRemoval),n._ensureEventHasNotListener(chrome.windows.onCreated,n._lockNewWindow),n._ensureEventHasNotListener(chrome.tabs.onUpdated,n._lockUpdate),n._ensureEventHasNotListener(chrome.tabs.onCreated,n._lockNewTab),n._unlockResize(),n._locked=!1,e()})},this._openInExistingWindow=function(){return new e(function(e){chrome.windows.get(n._window.id,POPULATE,function(t){t?n._unlockEverything().then(function(){chrome.tabs.update(t.tabs[0].id,{url:n._resourceUrl},function(){n._lockEverything(t).then(function(){e()})})}):n._openResource().then(function(){e()})})})},this._openInNewWindow=function(){return new e(function(e){chrome.windows.create({url:n._resourceUrl,focused:!0},function(t){chrome.windows.update(t.id,STATE_FULLSCREEN,function(t){n._window=t,n._lockEverything(t).then(function(){e()})})})})},this._openResource=function(e){return!e&&n._window?this._openInExistingWindow():this._openInNewWindow()},this.start=function(){this._openResource().then(function(){n._started=!0})},this.stop=function(){this._unlockEverything().then(function(){n._started=!1,chrome.windows.update(n._window.id,STATE_MAXIMIZED),n._window=null})},this.isStarted=function(){return this._started},this.setResource=function(e){this._resourceUrl=e,this._started&&this._openResource()}};return n});