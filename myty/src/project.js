require=function e(t,n,o){function i(a,s){if(!n[a]){if(!t[a]){var r="function"==typeof require&&require;if(!s&&r)return r(a,!0);if(c)return c(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,e,t,n,o)}return n[a].exports}for(var c="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({AnswerButton:[function(e,t,n){"use strict";cc._RF.push(t,"25bf1FTAv9OGZ9Z0ctRAvBi","AnswerButton"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},data:{"default":null,visible:!1}},onLoad:function(){},setText:function(e){this.label.string=e}}),cc._RF.pop()},{}],ClickWithScale:[function(e,t,n){"use strict";cc._RF.push(t,"f38faz/KyxEApLr/5iahAgb","ClickWithScale"),cc.Class({"extends":cc.Component,properties:{activeTouch:{visible:!1,"default":null},origScale:{visible:!1,"default":1},startEnabled:!0,targetScale:.95,clickEvent:{"default":null,type:cc.Component.EventHandler}},onLoad:function(){this.origScale=this.node.scale,this.startEnabled&&this.enableTouch()},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this)},disableTouch:function(){this.node.off("touchstart",this._onTouchStart,this),this.node.off("touchend",this._onTouchEnd,this),this.node.off("touchcancel",this._onTouchCancel,this)},_onTouchStart:function(e){return this.activeTouch={time:Date.now,start:e.touch.getLocation()},this.node.scale=this.targetScale*this.origScale,!1},_onTouchEnd:function(e){if(this.activeTouch){var t=e.touch.getLocation();this.node.scale=this.origScale;var n=Math.abs(this.activeTouch.start.x-t.x);if(n>30)return!1;var o=Date.now-this.activeTouch.time;if(o>.5)return!1;this.node.emit(MTEvents.CLICKED);var i=this.clickEvent;if(i){var c=i.target.getComponent(i.component),a=c[i.handler];a.bind(c)()}return this.activeTouch=null,!0}},_onTouchCancel:function(){this.node.scale=this.origScale,this.activeTouch=null}}),cc._RF.pop()},{}],Dialog1:[function(e,t,n){"use strict";cc._RF.push(t,"17458Ud8ZhEAbI0jc1jHj5y","Dialog1");var o=e("AnswerButton"),i=e("EvaluationDialog");cc.Class({"extends":cc.Component,properties:{headline:{"default":null,type:cc.Node},text:{"default":null,type:cc.Node},smiley:{"default":null,type:cc.Node},faces:[cc.SpriteFrame],button:{"default":null,type:cc.Prefab},data:{visible:!1,"default":null},buttons:{visible:!1,"default":null}},onLoad:function(){this.buttons=[]},showWithData:function(e){this.data=e,this.node.active=!0,this.smiley.getComponent(cc.Sprite).spriteFrame=this.faces[e.smileyType],this.headline.getComponent(cc.Label).string=e.headline,this.setTextFromTree(e.tree),this.showTreeAnswers(e.tree)},setTextFromTree:function(e){this.text.getComponent(cc.Label).string=e.text},showTreeAnswers:function(e){for(var t=0;t<this.buttons.length;t++){var n=this.buttons[t];n.isValid&&n.destroy()}this.buttons.length=0;for(var t=0;t<e.answers.length;t++){var i=cc.instantiate(this.button),c=i.getComponent(o),a=e.answers[t];c.setText(a.text),c.data=a,i.y=-t*i.height*1.15-50,i.x=0,this.node.addChild(i),i.on("click",this.onAnswered,this),this.buttons.push(i)}},onAnswered:function(e){var t=e.currentTarget,n=t.getComponent(o),i=n.data;i.tree?(this.setTextFromTree(i.tree),this.showTreeAnswers(i.tree)):this.showEvaluation(i.evaluation)},showEvaluation:function(e){for(var t=null,n=this.data.evaluations,o=0;o<n.length;o++)if(n[o].id==e){t=n[o];break}if(!t)throw new Error("Evaluation not found, id:"+e);this.node.emit(MTEvents.EVALED,t),console.log(t);var c=this.node.parent.getChildByName("Evaluation");c.active=!0;var a=c.getComponent(i);a.showWithData(t),this.hide()},hide:function(){this.node.active=!1}}),cc._RF.pop()},{AnswerButton:"AnswerButton",EvaluationDialog:"EvaluationDialog"}],EndScene:[function(e,t,n){"use strict";cc._RF.push(t,"0cbae4KYMlIFobR1lIhW1GO","EndScene");var o=e("Score");cc.Class({"extends":cc.Component,properties:{},start:function(){var e=GameManager.lastScore;if(e)for(var t=this.node.getChildByName("score").getComponent(o),n=0;n<e.length;n++)t.addScore(e[n])},onRepeat:function(){cc.director.loadScene("gameScene")},shareFB:function(){return FB?void FB.ui({method:"share",mobile_iframe:!0,href:"https://developers.facebook.com/docs/"},function(e){}):void console.log("FB not found")}}),cc._RF.pop()},{Score:"Score"}],EvaluationDialog:[function(e,t,n){"use strict";cc._RF.push(t,"4d761+qMv1LLbUPN5I57fLx","EvaluationDialog"),cc.Class({"extends":cc.Component,properties:{headline:{"default":null,type:cc.Node},text:{"default":null,type:cc.Node},nextBtn:{"default":null,type:cc.Node},addit:{"default":null,visible:!1}},onLoad:function(){},showWithData:function(e){this.node.active=!0,this.headline.getComponent(cc.Label).string=e.headline,this.text.getComponent(cc.Label).string=e.text,this.nextBtn.on("click",this.onNextClicked,this),0==e.type.indexOf("eval")&&(this.addit=this.node.getChildByName("parts").getChildByName(e.type),console.log(this.addit),this.addit&&(this.addit.active=!0))},onNextClicked:function(){this.node.parent.emit(MTEvents.COMPLETE),this.addit&&(this.addit.active=!1),this.node.active=!1},showSourceInfo:function(){var e="https://www.amo.cz/cs/rusko-a-ceske-volby-2017/amo-se-bude-venovat-cesko-ruskym-vztahum-ve-volebnim-roce/";window.open(e,"_blank")}}),cc._RF.pop()},{}],GameManager:[function(e,t,n){"use strict";cc._RF.push(t,"f30bfv587dMhrQUL2Ks6/Rs","GameManager"),window.GameManager={data:null,lastScore:null,onLoad:function(){cc.view.enableRetina(!0);var e=this;cc.loader.load(cc.url.raw("resources/questions.json"),function(t,n){t?cc.log("loading error:"+t):cc.log("loaded succesfully!"),e.data=n,console.log(n)})}},cc._RF.pop()},{}],GameScene:[function(e,t,n){"use strict";cc._RF.push(t,"7e8d8Jzlv9J4J2X7NIapfQg","GameScene");var o=e("Score");cc.Class({"extends":cc.Component,properties:{psn:[cc.String],numRounds:{visible:!1,"default":0},scoreComp:{"default":null,type:o},score:{visible:!1,"default":null}},onLoad:function(){window.GameManager.onLoad(),cc.TextUtils.label_lastWordRex=/([a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûа-яА-ЯЁё]+|\S)$/,cc.TextUtils.label_lastEnglish=/[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]+$/,cc.TextUtils.label_firsrEnglish=/^[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]/,this.node.on(MTEvents.COMPLETE,this.setNewRound,this);var e=this.node.getChildByName("Dialog");e.active=!1;var t=this.node.getChildByName("Evaluation");t.active=!1,this.score=[]},setNewRound:function(){var e=cc.find("Canvas/Map/manace");if(this.numRounds>=6)return e.active=!1,void this.gameEnd();var t=this.psn[Math.floor(this.psn.length*Math.random())],n=t.split(" ");e.x=parseInt(n[0]),e.y=parseInt(n[1])},onMenace:function(){var e=window.GameManager.data[0],t=this.node.getChildByName("Dialog");t.getComponent("Dialog1").showWithData(e),t.active=!0,t.on(MTEvents.EVALED,this.roundFinished,this)},roundFinished:function(e){this.numRounds++,this.scoreComp.addScore(e.detail.score),this.score.push(e.detail.score)},gameEnd:function(){GameManager.lastScore=this.score;var e=this.node.getChildByName("overlay");e.opacity=0,e.active=!0;var t=new cc.FadeIn(1);e.runAction(t),setTimeout(function(){cc.director.loadScene("endScene")},1050)}}),cc._RF.pop()},{Score:"Score"}],InitScene:[function(e,t,n){"use strict";cc._RF.push(t,"1a672DPMPlJu5K5wqEhsL+j","InitScene"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},start:function(){},startGame:function(){var e=this.node.getChildByName("overlay");e.opacity=0,e.active=!0;var t=new cc.FadeIn(1);e.runAction(t),setTimeout(function(){cc.director.loadScene("gameScene")},1050)}}),cc._RF.pop()},{}],MTEvents:[function(e,t,n){"use strict";cc._RF.push(t,"20a8b7s+RJF9a/8hhfPlE+c","MTEvents");var o={};o.CLICKED="mt-event-clicked",o.START="mt-event-start",o.COMPLETE="mt-event-complete",o.CANCEL="mt-event-cancel",o.DESTROY="mt-event-destroy",o.EVALED="mt-event-evaled",o.SELECTED="mt-event-selected",o["default"]=null,window.MTEvents=o,cc._RF.pop()},{}],Score:[function(e,t,n){"use strict";cc._RF.push(t,"4648fad1eNDjolncrTz5p74","Score"),cc.Class({"extends":cc.Component,properties:{crossSprite:{"default":null,type:cc.SpriteFrame},circleSprite:{"default":null,type:cc.SpriteFrame},checkSprite:{"default":null,type:cc.SpriteFrame},buttons:{visible:!1,"default":null}},onLoad:function(){this.buttons=[]},addScore:function(e){var t=new cc.Node,n=t.addComponent(cc.Sprite);switch(e){case 0:n.spriteFrame=this.crossSprite;break;case 1:n.spriteFrame=this.circleSprite;break;case 2:n.spriteFrame=this.checkSprite}this.node.addChild(t),t.x=30*this.buttons.length,this.buttons.push(t)}}),cc._RF.pop()},{}]},{},["AnswerButton","ClickWithScale","Dialog1","EvaluationDialog","GameManager","MTEvents","Score","EndScene","GameScene","InitScene"]);