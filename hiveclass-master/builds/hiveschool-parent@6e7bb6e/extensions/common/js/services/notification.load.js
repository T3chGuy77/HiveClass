montageDefine("6e7bb6e","extensions/common/js/services/notification",{dependencies:[],factory:function(){define(["bluebird"],function(e){var n=function(){this.show=function(n){return new e(function(e){chrome.notifications.create(n.id,{type:"basic",iconUrl:chrome.runtime.getManifest().icons[48],title:n.title,message:n.message,priority:2},function(){e()})})},this.hide=function(n){return new e(function(e){chrome.notifications.clear(n,function(){e()})})}};return n})}});