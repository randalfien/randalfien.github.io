require=function t(e,n,i){function o(a,s){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(c)return c(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var r=n[a]={exports:{}};e[a][0].call(r.exports,function(t){var n=e[a][1][t];return o(n?n:t)},r,r.exports,t,e,n,i)}return n[a].exports}for(var c="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({AnswerButton:[function(t,e,n){"use strict";cc._RF.push(e,"25bf1FTAv9OGZ9Z0ctRAvBi","AnswerButton"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},data:{"default":null,visible:!1}},onLoad:function(){this.node.on("mouseenter",this._onTouchStart,this),this.node.on("mouseleave",this._onTouchEnd,this)},setText:function(t){this.label.string=t;var e=t.indexOf("\n"),n=t.lastIndexOf("\n");e>0&&n!=e?this.node.height=120:e>0?this.node.height=80:this.node.height=60},_onTouchStart:function(t){this.activeTouch={time:Date.now},this.label.node.color=this.getClr("#d2ba92"),console.log(this.label.node),cc._canvas.style.cursor="pointer"},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e},_onTouchEnd:function(t){this.activeTouch&&(this.label.node.color=this.getClr("#BF2523"),this.activeTouch=null),cc._canvas.style.cursor="default"}}),cc._RF.pop()},{}],ClickWithLabelMove:[function(t,e,n){"use strict";cc._RF.push(e,"0b7aaleFtZLUpf4iO/QCCJD","ClickWithLabelMove"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Node},targetY:0,origY:{visible:!1,"default":1},targetX:0,origX:{visible:!1,"default":1},activeTouch:{visible:!1,"default":null},origScale:{visible:!1,"default":1},sprite:{visible:!1,"default":1},startEnabled:!0,targetScale:1,clickEvent:{"default":null,type:cc.Component.EventHandler},normalSprite:{"default":null,visible:!1},hoverSprite:{"default":null,type:cc.SpriteFrame},pressedSprite:{"default":null,type:cc.SpriteFrame}},onLoad:function(){this.origScale=this.node.scale,this.label&&(this.origY=this.label.y,this.origX=this.label.x),this.sprite=this.node.getComponent(cc.Sprite),this.normalSprite=this.sprite.spriteFrame,this.startEnabled&&this.enableTouch()},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this),this.node.on(cc.Node.EventType.MOUSE_ENTER,this._onMouseMoveIn,this),this.node.on(cc.Node.EventType.MOUSE_LEAVE,this._onMouseMoveOut,this)},_onMouseMoveIn:function(t){cc._canvas.style.cursor="pointer",console.log(this.node.name+" pointer")},_onMouseMoveOut:function(t){cc._canvas.style.cursor="default"},disableTouch:function(){this.node.off("touchstart",this._onTouchStart,this),this.node.off("touchend",this._onTouchEnd,this),this.node.off("touchcancel",this._onTouchCancel,this)},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},this.node.scale=this.targetScale*this.origScale,this.label&&(this.label.y=this.targetY,this.label.x=this.targetX),this.pressedSprite&&(this.sprite.spriteFrame=this.pressedSprite),!1},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation();this.node.scale=this.origScale,this.label&&(this.label.y=this.origY,this.label.x=this.origX),this.sprite.spriteFrame=this.normalSprite;var n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;if(i>.5)return!1;cc._canvas.style.cursor="default",this.node.emit(MTEvents.CLICKED);var o=this.clickEvent;if(o){var c=o.target.getComponent(o.component),a=c[o.handler];a.bind(c)()}return this.activeTouch=null,!0}},_onTouchCancel:function(){this.node.scale=this.origScale,this.label&&(this.label.y=this.origY,this.label.x=this.origX),this.sprite.spriteFrame=this.normalSprite,this.activeTouch=null}}),cc._RF.pop()},{}],ClickWithScale:[function(t,e,n){"use strict";cc._RF.push(e,"f38faz/KyxEApLr/5iahAgb","ClickWithScale"),cc.Class({"extends":cc.Component,properties:{activeTouch:{visible:!1,"default":null},origScale:{visible:!1,"default":1},startEnabled:!0,targetScale:.95,clickEvent:{"default":null,type:cc.Component.EventHandler}},onLoad:function(){this.origScale=this.node.scale,this.startEnabled&&this.enableTouch()},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this)},disableTouch:function(){this.node.off("touchstart",this._onTouchStart,this),this.node.off("touchend",this._onTouchEnd,this),this.node.off("touchcancel",this._onTouchCancel,this)},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},this.node.scale=this.targetScale*this.origScale,!1},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation();this.node.scale=this.origScale;var n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;if(i>.5)return!1;this.node.emit(MTEvents.CLICKED);var o=this.clickEvent;if(o){var c=o.target.getComponent(o.component),a=c[o.handler];a.bind(c)()}return this.activeTouch=null,!0}},_onTouchCancel:function(){this.node.scale=this.origScale,this.activeTouch=null}}),cc._RF.pop()},{}],Dialog1:[function(t,e,n){"use strict";cc._RF.push(e,"17458Ud8ZhEAbI0jc1jHj5y","Dialog1");var i=t("AnswerButton"),o=t("EvaluationDialog");cc.Class({"extends":cc.Component,properties:{headline:{"default":null,type:cc.Node},text:{"default":null,type:cc.Node},smiley:{"default":null,type:cc.Node},faces:[cc.SpriteFrame],button:{"default":null,type:cc.Prefab},data:{visible:!1,"default":null},buttons:{visible:!1,"default":null},overlay:{"default":null,type:cc.Node}},onLoad:function(){this.buttons=[]},showWithData:function(t){this.data=t,this.node.active=!0,this.smiley.getComponent(cc.Sprite).spriteFrame=this.faces[t.smileyType],this.headline.getComponent(cc.Label).string=t.headline.toUpperCase(),t.headline.indexOf("\n")>0?(this.headline.parent.y=220,this.headline.y=24):(this.headline.y=44,this.headline.parent.y=186),this.setTextFromTree(t.tree),this.showTreeAnswers(t.tree),this.overlay.active=!0,this.overlay.opacity=0;var e=cc.fadeTo(.8,230);this.overlay.runAction(e)},setTextFromTree:function(t){this.text.getComponent(cc.Label).string=t.text},showTreeAnswers:function(t){for(var e=0;e<this.buttons.length;e++){var n=this.buttons[e];n.isValid&&n.destroy()}this.buttons.length=0;for(var o=0,e=0;e<t.answers.length;e++){var c=cc.instantiate(this.button),a=c.getComponent(i),s=t.answers[e];a.setText(s.text),a.data=s,c.y=o-c.height/2-10,o-=c.height+10,c.x=8,this.node.addChild(c),c.on("click",this.onAnswered,this),this.buttons.push(c)}},onAnswered:function(t){var e=t.currentTarget,n=e.getComponent(i),o=n.data;o.tree?(this.setTextFromTree(o.tree),this.showTreeAnswers(o.tree)):this.showEvaluation(o)},showEvaluation:function(t){for(var e=t.evaluation,n=t.score,i=null,c=this.data.evaluations,a=0;a<c.length;a++)if(c[a].id==e){i=c[a];break}if(!i)throw new Error("Evaluation not found, id:"+e);i.score=n,this.node.emit(MTEvents.EVALED,i);var s=this.node.parent.getChildByName("Evaluation");s.active=!0;var l=s.getComponent(o);l.showWithData(i),this.hide()},hide:function(){this.node.active=!1}}),cc._RF.pop()},{AnswerButton:"AnswerButton",EvaluationDialog:"EvaluationDialog"}],EndScene:[function(t,e,n){"use strict";cc._RF.push(e,"0cbae4KYMlIFobR1lIhW1GO","EndScene");t("Score");cc.Class({"extends":cc.Component,properties:{percentLabel1:{"default":null,type:cc.Label},percentLabel2:{"default":null,type:cc.Label},evalLabel:{"default":null,type:cc.Label}},start:function(){var t=GameManager.lastScore;if(t){console.log(t);var e=0;t.forEach(function(t){e+=t});var n=e/(2*t.length),i=Math.round(100*n).toString()+"%";this.percentLabel1.string=i,this.percentLabel2.string=i;var o="";n<.2?(o="Jej, tak to se nepovedlo! Zkus to znovu, třeba to bude lepší!",Math.random()>.5&&(o="Tak takhle ne. Zkus to znovu, třeba to bude lepší!")):n<.5?(o="Dobrý základ, ale ještě bych měl trénovat.",Math.random()>.5&&(o="Chybičky tam byly, nezkusíme to ještě jednou?")):n<=.8?(o="Dobrý, ale zlepšit se jde vždycky!",Math.random()>.5&&(o="Chválihodné úsilí, chceš to zkusit ještě vylepšit?")):(o="Výborně, s mýty jsi zatočil! Pochlub se přátelům!",Math.random()>.5&&(o="Takhle se to dělá, dobrý práce! Pochlub se přátelům!")),this.evalLabel.string=o}},onRepeat:function(){cc.director.loadScene("gameScene")},shareFB:function(){return FB?void FB.ui({method:"share",mobile_iframe:!0,href:"https://developers.facebook.com/docs/"},function(t){}):void console.log("FB not found")}}),cc._RF.pop()},{Score:"Score"}],EvaluationDialog:[function(t,e,n){"use strict";cc._RF.push(e,"4d761+qMv1LLbUPN5I57fLx","EvaluationDialog"),cc.Class({"extends":cc.Component,properties:{text:{"default":null,type:cc.Node},nextBtn:{"default":null,type:cc.Node},overlay:{"default":null,type:cc.Node},addit:{"default":null,visible:!1},sourceDialog:{"default":null,type:cc.Node},data:{visible:!1,"default":null},evals:{"default":null,type:cc.Node}},onLoad:function(){},showWithData:function(t){cc._canvas.style.cursor="default",this.node.active=!0,this.text.getComponent(cc.Label).string=t.text;var e=this.evals.getChildByName("faktacekFail");e.active=0==t.score;var n=this.evals.getChildByName("faktacekMezi");n.active=1==t.score;var i=this.evals.getChildByName("faktacekWin");if(i.active=2==t.score,this.nextBtn.on("click",this.onNextClicked,this),0===t.type.indexOf("eval")){var o=this.node.getChildByName("parts");o.active=!0,this.addit=o.getChildByName(t.type),this.addit&&(this.addit.active=!0)}else{var o=this.node.getChildByName("parts");o.active=!1}this.data=t},onNextClicked:function(){this.node.parent.emit(MTEvents.COMPLETE),this.addit&&(this.addit.active=!1),GameManager.currentData=null,this.overlay.active=!1,this.node.active=!1},showSourceInfo:function(){this.sourceDialog.active=!0,this.sourceDialog.getComponent("SourceDialog").showLinks(GameManager.currentData.sources)}}),cc._RF.pop()},{}],Factman:[function(t,e,n){"use strict";cc._RF.push(e,"4dc17VfJPRPHKXsqvI9jzvs","Factman"),cc.Class({"extends":cc.Component,properties:{swaying:{"default":null,visible:!1},flying:{"default":null,type:cc.Node},normal:{"default":null,type:cc.Node}},onLoad:function(){this.swaying=this.normal.getComponent("Swaying")},flyTo:function(t){var e=function(t){return t.easing(cc.easeSineInOut()),t},n=function(t){return t.easing(cc.easeQuadraticActionIn()),t},i=this,o=function(){i.flying.active=!0,i.normal.active=!0},c=function(){i.node.active=!1},a=cc.sequence(e(cc.rotateTo(.4,-74.8)),cc.callFunc(o),cc.spawn(n(cc.moveTo(.5,t.x,t.y)),cc.scaleTo(.5,.1)),cc.callFunc(c));this.node.runAction(a)},onEnable:function(){this.flying.active=!1,this.normal.active=!0,this.node.rotation=0,this.node.scale=1,this.node.x=415,this.node.y=156,this.swaying.pause();var t=cc.moveBy(2,20,10);t.easing(cc.easeExponentialOut()),this.node.runAction(t);var e=this;setTimeout(function(){e.swaying.resume()},2010)}}),cc._RF.pop()},{}],GameManager:[function(t,e,n){"use strict";cc._RF.push(e,"f30bfv587dMhrQUL2Ks6/Rs","GameManager"),window.GameManager={data:null,lastScore:null,currentData:null,onLoad:function(){cc.view.enableRetina(!0);var t=this;cc.loader.load(cc.url.raw("resources/questions.json"),function(e,n){e?cc.log("loading error:"+e):cc.log("loaded succesfully!"),t.data=n,console.log(n)})}},cc._RF.pop()},{}],GameScene:[function(t,e,n){"use strict";cc._RF.push(e,"7e8d8Jzlv9J4J2X7NIapfQg","GameScene");var i=(t("Score"),t("KrajeHighlights"));cc.Class({"extends":cc.Component,properties:{psn:[cc.String],numRounds:{visible:!1,"default":0},score:{visible:!1,"default":null},factman:{"default":null,type:cc.Node},highlights:{"default":null,type:i}},onLoad:function(){window.GameManager.onLoad(),this.node.on(MTEvents.COMPLETE,this.setNewRound,this);var t=this.node.getChildByName("Dialog");t.active=!1;var e=this.node.getChildByName("Evaluation");e.active=!1,cc.find("Canvas/Map/icons").active=!1;var n=this.node.getChildByName("InitScene");n.active=!0,this.score=[]},startGame:function(){cc.find("Canvas/Map/icons").active=!0,cc.find("Canvas/factman").active=!0,this.setNewRound()},setNewRound:function(){var t=cc.find("Canvas/Map/manace");if(t.active=!0,t.opacity=0,this.numRounds>=6)return this.highlights.highlight("*"),void this.gameEnd();var e=window.GameManager.data,n=e[this.numRounds%e.length];console.log(n.place),this.highlights.highlight(n.place),this.factman.active=!0},onMenace:function(){if(!GameManager.currentData){var t=cc.find("Canvas/Map/manace");t.active=!1,this.factman.getComponent("Factman").flyTo(this.highlights.getHighlighted()),setTimeout(this.showQuestion.bind(this),870)}},showQuestion:function(){var t=window.GameManager.data,e=t[this.numRounds%t.length];GameManager.currentData=e;var n=this.node.getChildByName("Dialog");n.getComponent("Dialog1").showWithData(e),n.active=!0,n.on(MTEvents.EVALED,this.roundFinished,this)},roundFinished:function(t){this.numRounds++,this.score.push(t.detail.score)},gameEnd:function(){GameManager.lastScore=this.score;var t=this.node.getChildByName("overlay5");t.active=!0,console.log(t),t.opacity=0;var e=cc.fadeTo(.5,215);t.runAction(e),setTimeout(function(){cc.director.loadScene("endScene")},510)}}),cc._RF.pop()},{KrajeHighlights:"KrajeHighlights",Score:"Score"}],InitScene:[function(t,e,n){"use strict";cc._RF.push(e,"1a672DPMPlJu5K5wqEhsL+j","InitScene");var i=t("GameScene");cc.Class({"extends":cc.Component,properties:{gameScene:{"default":null,type:i},overlay:{"default":null,type:cc.Node},startBtn:{"default":null,type:cc.Node},bubble:{"default":null,type:cc.Node}},onLoad:function(){cc.TextUtils.label_lastWordRex=/([a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûа-яА-ЯЁё]+|\S)$/,cc.TextUtils.label_lastEnglish=/[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]+$/,cc.TextUtils.label_firsrEnglish=/^[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]/},start:function(){},startGame:function(){this.startBtn.active=!1,this.bubble.active=!1,this.overlay.runAction(new cc.fadeOut(.25));var t=this;setTimeout(function(){t.node.active=!1},.25),this.gameScene.startGame()}}),cc._RF.pop()},{GameScene:"GameScene"}],KrajeHighlights:[function(t,e,n){"use strict";cc._RF.push(e,"a9965l9Cg5FHo56g8w3icP7","KrajeHighlights"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e];n.color=this.getClr("#bf2422"),n.active=!1}},highlight:function(t){for(var e=this.node.children,n=0;n<e.length;n++){var i=e[n];i.name.indexOf(t)>=0?this.doHighlight(i):(i.stopAllActions(),i.active=!1)}},getHighlighted:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e];if(n.active)return n}},doHighlight:function(t){var e=cc.find("Canvas/Map/manace");e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e.active=!0,e.opacity=0,t.active=!0,t.opacity=0;var n=function(t){return t.easing(cc.easeSineInOut()),t},i=cc.sequence(n(cc.fadeTo(2.1,200)),n(cc.fadeOut(1.8))).repeat(25);t.runAction(i)},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e}}),cc._RF.pop()},{}],MTEvents:[function(t,e,n){"use strict";cc._RF.push(e,"20a8b7s+RJF9a/8hhfPlE+c","MTEvents");var i={};i.CLICKED="mt-event-clicked",i.START="mt-event-start",i.COMPLETE="mt-event-complete",i.CANCEL="mt-event-cancel",i.DESTROY="mt-event-destroy",i.EVALED="mt-event-evaled",i.SELECTED="mt-event-selected",i["default"]=null,window.MTEvents=i,cc._RF.pop()},{}],Manace:[function(t,e,n){"use strict";cc._RF.push(e,"e5b8dwBUUVJA77PCNML2fZ2","Manace"),cc.Class({"extends":cc.Component,properties:{sprite:{"default":null,visible:!1},box:{"default":null,visible:!1}},onLoad:function(){this.node.active=!1,this.sprite=this.node.getComponent(cc.Sprite),this.box=this.node.getBoundingBoxToWorld(),console.log(this.box),this.node.on(cc.Node.EventType.MOUSE_ENTER,this._onMouseMoveIn,this),this.node.on(cc.Node.EventType.MOUSE_LEAVE,this._onMouseMoveOut,this)},_onMouseMoveIn:function(t){cc._canvas.style.cursor="pointer"},_onMouseMoveOut:function(t){cc._canvas.style.cursor="default"}}),cc._RF.pop()},{}],MapIcons:[function(t,e,n){"use strict";cc._RF.push(e,"bb9ccvswLJL3Ig6WDKY5z7N","MapIcons"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},start:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e],i=n.scale;console.log(i),n.scale=1.5*i,n.opacity=0;var o=cc.scaleTo(1.4,i);o.easing(cc.easeElasticOut());var c=cc.sequence(cc.delayTime(.05+.06*e),cc.spawn(cc.fadeIn(.3),o));n.runAction(c)}}}),cc._RF.pop()},{}],Score:[function(t,e,n){"use strict";cc._RF.push(e,"4648fad1eNDjolncrTz5p74","Score"),cc.Class({"extends":cc.Component,properties:{crossSprite:{"default":null,type:cc.SpriteFrame},circleSprite:{"default":null,type:cc.SpriteFrame},checkSprite:{"default":null,type:cc.SpriteFrame},buttons:{visible:!1,"default":null}},onLoad:function(){this.buttons=[]},addScore:function(t){var e=new cc.Node,n=e.addComponent(cc.Sprite);switch(t){case 0:n.spriteFrame=this.crossSprite;break;case 1:n.spriteFrame=this.circleSprite;break;case 2:n.spriteFrame=this.checkSprite}this.node.addChild(e),e.x=30*this.buttons.length,this.buttons.push(e)}}),cc._RF.pop()},{}],SourceDialog:[function(t,e,n){"use strict";cc._RF.push(e,"c1a92kE8z9C7KOwjP8hmcgQ","SourceDialog");var i=t("SourceLink");cc.Class({"extends":cc.Component,properties:{linkButton:{"default":null,type:cc.Prefab}},onLoad:function(){},showLinks:function(t){for(var e=this.node.children,n=0;n<e.length;n++){var o=e[n];o&&0===o.name.indexOf("b_")&&o.destroy()}var c=this.node.getChildByName("bgAdd");c.active=t.length>3;for(var a=0,n=0;n<t.length;n++){var s=cc.instantiate(this.linkButton);s.name="b_"+n;var l=s.getComponent(i),h=t[n];l.setText(h),l.data=h,s.y=a-s.height/2+180,a-=s.height,this.node.addChild(s),s.on("clicked",this.onClicked,this)}},onClicked:function(t){var e=t.currentTarget.getComponent(i).data;window.open(e.url,"_blank")},close:function(){this.node.active=!1}}),cc._RF.pop()},{SourceLink:"SourceLink"}],SourceLink:[function(t,e,n){"use strict";cc._RF.push(e,"626c0+cWztI0KLdpajXCCqU","SourceLink"),cc.Class({"extends":cc.Component,properties:{nameNode:{"default":null,type:cc.Node},title:{"default":null,type:cc.Node},bg:{"default":null,type:cc.Node},activeTouch:{visible:!1,"default":null},data:{visible:!1,"default":null}},onLoad:function(){this.enableTouch(),this.bg.skewX=4*Math.random()-2},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this),this.node.on("mouseenter",this._onMouseEnter,this),this.node.on("mouseleave",this._onMouseLeave,this)},_onMouseEnter:function(){this.bg.opacity=255,this.nameNode.color=this.getClr("#ceb184"),cc._canvas.style.cursor="pointer",console.log("source link "+this.node+" pointer")},_onMouseLeave:function(){this.bg.opacity=0,this.nameNode.color=this.getClr("#282634"),cc._canvas.style.cursor="default"},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},!1},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e},setText:function(t){var e=t.name;e.length>50&&(e=e.substring(0,50)+"..."),this.nameNode.getComponent(cc.Label).string=e,this.title.getComponent(cc.Label).string=t.title.substring(0,32)},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation(),n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;return!(i>.5)&&(this.node.emit("clicked"),this.activeTouch=null,!0)}},_onTouchCancel:function(){this.activeTouch=null}}),cc._RF.pop()},{}],Swaying:[function(t,e,n){"use strict";cc._RF.push(e,"1f16aeQZSNIh46myzneMmKT","Swaying"),cc.Class({"extends":cc.Component,properties:{amountY:6,amountX:2,speedX:2,speedY:1.3,sway:{visible:!1,"default":null},swayTime:{visible:!1,"default":0},startPos:{visible:!1,"default":null},paused:!1},onLoad:function(){this.startPos={x:this.node.x,y:this.node.y},this.sway={},this.sway.sin1=Math.random()*this.speedY*.75+.25*this.speedY,this.sway.sin2=Math.random()*this.speedX*.25+.75*this.speedX,this.sway.sin3=Math.random()/2+.3,this.sway.offset=0},pause:function(){this.paused=!0},resume:function(){this.swayTime=0,this.startPos={x:this.node.x,y:this.node.y},this.paused=!1},update:function(t){this.paused||(this.node.x=this.startPos.x+this.amountX*Math.sin(this.sway.sin2*this.swayTime+this.sway.offset)+Math.sin(this.sway.sin3*this.swayTime),this.node.y=this.startPos.y+this.amountY*Math.sin(this.sway.sin1*this.swayTime+this.sway.offset),this.swayTime+=t)}}),cc._RF.pop()},{}]},{},["AnswerButton","ClickWithLabelMove","ClickWithScale","Dialog1","EvaluationDialog","Factman","GameManager","KrajeHighlights","MTEvents","Manace","MapIcons","Score","SourceDialog","SourceLink","Swaying","EndScene","GameScene","InitScene"]);