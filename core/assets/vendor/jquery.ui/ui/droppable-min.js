/*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */(function(e){typeof define=="function"&&define.amd?define(["jquery","./core","./widget","./mouse","./draggable"],e):e(jQuery)})(function(e){return e.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,n=this.options,r=n.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(r)?r:function(e){return e.is(r)},this.proportions=function(){if(!arguments.length)return t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};t=arguments[0]},this._addToManager(n.scope),n.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){var t=0;for(;t<e.length;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,n){if(t==="accept")this.accept=e.isFunction(n)?n:function(e){return e.is(n)};else if(t==="scope"){var r=e.ui.ddmanager.droppables[this.options.scope];this._splice(r),this._addToManager(n)}this._super(t,n)},_activate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),n&&this._trigger("activate",t,this.ui(n))},_deactivate:function(t){var n=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),n&&this._trigger("deactivate",t,this.ui(n))},_over:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]===this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(n)))},_out:function(t){var n=e.ui.ddmanager.current;if(!n||(n.currentItem||n.element)[0]===this.element[0])return;this.accept.call(this.element[0],n.currentItem||n.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(n)))},_drop:function(t,n){var r=n||e.ui.ddmanager.current,i=!1;return!r||(r.currentItem||r.element)[0]===this.element[0]?!1:(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var n=e(this).droppable("instance");if(n.options.greedy&&!n.options.disabled&&n.options.scope===r.options.scope&&n.accept.call(n.element[0],r.currentItem||r.element)&&e.ui.intersect(r,e.extend(n,{offset:n.element.offset()}),n.options.tolerance,t))return i=!0,!1}),i?!1:this.accept.call(this.element[0],r.currentItem||r.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(r)),this.element):!1)},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,n){return e>=t&&e<t+n}return function(t,n,r,i){if(!n.offset)return!1;var s=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,u=s+t.helperProportions.width,a=o+t.helperProportions.height,f=n.offset.left,l=n.offset.top,c=f+n.proportions().width,h=l+n.proportions().height;switch(r){case"fit":return f<=s&&u<=c&&l<=o&&a<=h;case"intersect":return f<s+t.helperProportions.width/2&&u-t.helperProportions.width/2<c&&l<o+t.helperProportions.height/2&&a-t.helperProportions.height/2<h;case"pointer":return e(i.pageY,l,n.proportions().height)&&e(i.pageX,f,n.proportions().width);case"touch":return(o>=l&&o<=h||a>=l&&a<=h||o<l&&a>h)&&(s>=f&&s<=c||u>=f&&u<=c||s<f&&u>c);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,n){var r,i,s=e.ui.ddmanager.droppables[t.options.scope]||[],o=n?n.type:null,u=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(r=0;r<s.length;r++){if(s[r].options.disabled||t&&!s[r].accept.call(s[r].element[0],t.currentItem||t.element))continue;for(i=0;i<u.length;i++)if(u[i]===s[r].element[0]){s[r].proportions().height=0;continue e}s[r].visible=s[r].element.css("display")!=="none";if(!s[r].visible)continue;o==="mousedown"&&s[r]._activate.call(s[r],n),s[r].offset=s[r].element.offset(),s[r].proportions({width:s[r].element[0].offsetWidth,height:s[r].element[0].offsetHeight})}},drop:function(t,n){var r=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){if(!this.options)return;!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,n)&&(r=this._drop.call(this,n)||r),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,n))}),r},dragStart:function(t,n){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)})},drag:function(t,n){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,n),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var r,i,s,o=e.ui.intersect(t,this,this.options.tolerance,n),u=!o&&this.isover?"isout":o&&!this.isover?"isover":null;if(!u)return;this.options.greedy&&(i=this.options.scope,s=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===i}),s.length&&(r=e(s[0]).droppable("instance"),r.greedyChild=u==="isover")),r&&u==="isover"&&(r.isover=!1,r.isout=!0,r._out.call(r,n)),this[u]=!0,this[u==="isout"?"isover":"isout"]=!1,this[u==="isover"?"_over":"_out"].call(this,n),r&&u==="isout"&&(r.isout=!1,r.isover=!0,r._over.call(r,n))})},dragStop:function(t,n){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,n)}},e.ui.droppable});