require=function t(e,n,i){function o(a,s){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(c)return c(a,!0);var r=new Error("Cannot find module '"+a+"'");throw r.code="MODULE_NOT_FOUND",r}var h=n[a]={exports:{}};e[a][0].call(h.exports,function(t){var n=e[a][1][t];return o(n?n:t)},h,h.exports,t,e,n,i)}return n[a].exports}for(var c="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({AnswerButton:[function(t,e,n){"use strict";cc._RF.push(e,"25bf1FTAv9OGZ9Z0ctRAvBi","AnswerButton"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},data:{"default":null,visible:!1}},onLoad:function(){this.node.on("mouseenter",this._onTouchStart,this),this.node.on("mouseleave",this._onTouchEnd,this)},setText:function(t){this.label.string=t;var e=t.indexOf("\n"),n=t.lastIndexOf("\n");if(e>0&&n!=e)this.node.height=120;else if(e>0)this.node.height=80;else{var i=t.length;i>74?this.node.height=120:i>37?this.node.height=80:this.node.height=60}},_onTouchStart:function(t){this.activeTouch={time:Date.now},this.label.node.color=this.getClr("#d2ba92"),console.log(this.label.node),cc._canvas.style.cursor="pointer"},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e},_onTouchEnd:function(t){this.activeTouch&&(this.label.node.color=this.getClr("#BF2523"),this.activeTouch=null),cc._canvas.style.cursor="default"}}),cc._RF.pop()},{}],ClickWithLabelMove:[function(t,e,n){"use strict";cc._RF.push(e,"0b7aaleFtZLUpf4iO/QCCJD","ClickWithLabelMove"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Node},targetY:0,origY:{visible:!1,"default":1},targetX:0,origX:{visible:!1,"default":1},activeTouch:{visible:!1,"default":null},origScale:{visible:!1,"default":1},sprite:{visible:!1,"default":1},startEnabled:!0,targetScale:1,clickEvent:{"default":null,type:cc.Component.EventHandler},normalSprite:{"default":null,visible:!1},hoverSprite:{"default":null,type:cc.SpriteFrame},pressedSprite:{"default":null,type:cc.SpriteFrame}},onLoad:function(){this.origScale=this.node.scale,this.label&&(this.origY=this.label.y,this.origX=this.label.x),this.sprite=this.node.getComponent(cc.Sprite),this.normalSprite=this.sprite.spriteFrame,this.startEnabled&&this.enableTouch()},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this),this.node.on(cc.Node.EventType.MOUSE_ENTER,this._onMouseMoveIn,this),this.node.on(cc.Node.EventType.MOUSE_LEAVE,this._onMouseMoveOut,this)},_onMouseMoveIn:function(t){cc._canvas.style.cursor="pointer",console.log(this.node.name+" pointer")},_onMouseMoveOut:function(t){cc._canvas.style.cursor="default"},disableTouch:function(){this.node.off("touchstart",this._onTouchStart,this),this.node.off("touchend",this._onTouchEnd,this),this.node.off("touchcancel",this._onTouchCancel,this)},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},this.node.scale=this.targetScale*this.origScale,this.label&&(this.label.y=this.targetY,this.label.x=this.targetX),this.pressedSprite&&(this.sprite.spriteFrame=this.pressedSprite),!1},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation();this.node.scale=this.origScale,this.label&&(this.label.y=this.origY,this.label.x=this.origX),this.sprite.spriteFrame=this.normalSprite;var n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;if(i>.5)return!1;cc._canvas.style.cursor="default",this.node.emit(MTEvents.CLICKED);var o=this.clickEvent;if(o){var c=o.target.getComponent(o.component),a=c[o.handler];a.bind(c)()}return this.activeTouch=null,!0}},_onTouchCancel:function(){this.node.scale=this.origScale,this.label&&(this.label.y=this.origY,this.label.x=this.origX),this.sprite.spriteFrame=this.normalSprite,this.activeTouch=null}}),cc._RF.pop()},{}],ClickWithScale:[function(t,e,n){"use strict";cc._RF.push(e,"f38faz/KyxEApLr/5iahAgb","ClickWithScale"),cc.Class({"extends":cc.Component,properties:{activeTouch:{visible:!1,"default":null},origScale:{visible:!1,"default":1},startEnabled:!0,targetScale:.95,clickEvent:{"default":null,type:cc.Component.EventHandler}},onLoad:function(){this.origScale=this.node.scale,this.startEnabled&&this.enableTouch()},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this)},disableTouch:function(){this.node.off("touchstart",this._onTouchStart,this),this.node.off("touchend",this._onTouchEnd,this),this.node.off("touchcancel",this._onTouchCancel,this)},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},this.node.scale=this.targetScale*this.origScale,!1},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation();this.node.scale=this.origScale;var n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;if(i>.5)return!1;this.node.emit(MTEvents.CLICKED);var o=this.clickEvent;if(o){var c=o.target.getComponent(o.component),a=c[o.handler];a.bind(c)()}return this.activeTouch=null,!0}},_onTouchCancel:function(){this.node.scale=this.origScale,this.activeTouch=null}}),cc._RF.pop()},{}],ClickableIcon:[function(t,e,n){"use strict";cc._RF.push(e,"b0b18dYJzFFba6vYzwunH9v","ClickableIcon");var i=t("ClickWithLabelMove");cc.Class({"extends":cc.Component,properties:{},onLoad:function(){for(var t=0;t<this.node.children.length;t++){var e=this.node.children[t];e.opacity=0}},enableTouch:function(){for(var t=0;t<this.node.children.length;t++){var e=this.node.children[t];e.addComponent(i),e.on(MTEvents.CLICKED,this.onClicked,this)}},disableTouch:function(){for(var t=0;t<this.node.children.length;t++){var e=this.node.children[t];e.removeComponent(i),e.off(MTEvents.CLICKED,this.onClicked,this)}},onClicked:function(){this.node.emit(MTEvents.CLICKED)}}),cc._RF.pop()},{ClickWithLabelMove:"ClickWithLabelMove"}],Dialog1:[function(t,e,n){"use strict";cc._RF.push(e,"17458Ud8ZhEAbI0jc1jHj5y","Dialog1");var i=t("AnswerButton"),o=t("EvaluationDialog");cc.Class({"extends":cc.Component,properties:{headline:{"default":null,type:cc.Node},text:{"default":null,type:cc.Node},smiley:{"default":null,type:cc.Node},faces:[cc.SpriteFrame],button:{"default":null,type:cc.Prefab},data:{visible:!1,"default":null},buttons:{visible:!1,"default":null},overlay:{"default":null,type:cc.Node}},onLoad:function(){this.buttons=[]},showWithData:function(t){this.node.y=GameManager.superWide?90:0,this.data=t,this.node.active=!0,this.smiley.getComponent(cc.Sprite).spriteFrame=this.faces[t.smileyType],this.headline.getComponent(cc.Label).string=t.headline.toUpperCase(),this.headline.parent.y=220,this.headline.y=24,this.setTextFromTree(t.tree,!0),this.showTreeAnswers(t.tree,!0),this.overlay.active=!0,this.overlay.opacity=0;var e=cc.fadeTo(.8,230);this.overlay.runAction(e)},setTextFromTree:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.text.getComponent(cc.Label).string=t.text,this.text.opacity=0,e?this.text.runAction(cc.sequence(cc.delayTime(.4),cc.fadeIn(.4))):this.text.runAction(cc.fadeIn(.2))},showTreeAnswers:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0;n<this.buttons.length;n++){var o=this.buttons[n];o.isValid&&o.destroy()}this.buttons.length=0;for(var c=0,n=0;n<t.answers.length;n++){var a=cc.instantiate(this.button),s=a.getComponent(i),l=t.answers[n];s.setText(l.text),s.data=l,a.y=c-a.height/2-10,c-=a.height+10,a.x=8,this.node.addChild(a),a.on("click",this.onAnswered,this),this.buttons.push(a),a.opacity=0,e?a.runAction(cc.sequence(cc.delayTime(.7+.1*n),cc.fadeIn(.5))):a.runAction(cc.sequence(cc.delayTime(.2+.1*n),cc.fadeIn(.3)))}},onAnswered:function(t){var e=t.currentTarget,n=e.getComponent(i),o=n.data;o.tree?(this.setTextFromTree(o.tree),this.showTreeAnswers(o.tree)):this.showEvaluation(o)},showEvaluation:function(t){for(var e=t.evaluation,n=t.score,i=null,c=this.data.evaluations,a=0;a<c.length;a++)if(c[a].id==e){i=c[a];break}if(!i)throw new Error("Evaluation not found, id:"+e);i.score=n,this.node.emit(MTEvents.EVALED,i);var s=this.node.parent.getChildByName("Evaluation");s.active=!0;var l=s.getComponent(o);l.showWithData(i),this.hide()},hide:function(){this.node.active=!1}}),cc._RF.pop()},{AnswerButton:"AnswerButton",EvaluationDialog:"EvaluationDialog"}],EndScene:[function(t,e,n){"use strict";cc._RF.push(e,"0cbae4KYMlIFobR1lIhW1GO","EndScene");t("Score");cc.Class({"extends":cc.Component,properties:{percentLabel1:{"default":null,type:cc.Label},percentLabel2:{"default":null,type:cc.Label},evalLabel:{"default":null,type:cc.Label},titleLabel:{"default":null,type:cc.Label},targetPercent:{"default":0,visible:!1},curPercent:{"default":0,visible:!1},quote:{"default":null,visible:!1},repeatBtnLabel:{"default":null,type:cc.Label}},start:function(){this.cI=0;var t=GameManager.lastScore;null===t&&(t=[1,2,2,2,2,2]),console.log(t);var e=0;t.forEach(function(t){e+=t}),this.targetPercent=e/(2*t.length),this.curPercent=0;var n="0%";this.percentLabel1.string=n,this.percentLabel2.string=n;var i=Math.round(100*this.targetPercent).toString()+"%",o="",c="";this.targetPercent<.2?(o="Není všechno zlato, co se třpytí. A taky není všechno pravda, co člověk slyší.\n\nHůř už nedopadneš, tak zkusíš to ještě jednou?",c="Factman nejsi, ale nevzdáváš to",this.quote=i+" Není všechno zlato, co se třpytí. A taky není všechno pravda, co člověk slyší. Hůř už nedopadneš."):this.targetPercent<.5?(o="Něco se ti povedlo, něco taky ne. No, chybami se člověk učí. Napoprvé se nepostavilo ani Národní divadlo.\n\nPomůžeš Factmanovi s další sadou mýtů? Tentokrát to třeba vyjde!",c="Factman začátečník",this.quote=i+" Factman začátečník. No, něco se ti povedlo, něco taky ne."):this.targetPercent<=.8?(o="Většinou střílíš ostrými náboji faktů a máloco tě zaskočí. Přesto je tu prostor se zlepšit.\n\nPostavíš se s Factmanem další sadě mýtů? Svou pověst můžeš vylepšit!",c="Jsi malý Factmaník",this.quote=i+" Většinou střílíš ostrými náboji faktů a máloco tě zaskočí. Přesto je tu prostor se zlepšit."):(o="Svou kápi hrdiny nosíš oprávněně. Lidé si povídají příběhy o tvé neomylnosti.\n\nVydrží ti po boku Factmana i v další sadě mýtů?",c="Jsi SuperFactman a krotitel mýtů",this.quote=i+" Jsi SuperFactman. Svou kápi hrdiny nosíš oprávněně. Lidé si povídají příběhy o tvé neomylnosti."),this.titleLabel.string=c,this.evalLabel.string=o,GameManager.currentSets&&0!=GameManager.currentSets.length?this.repeatBtnLabel.string="BOJOVAT DÁL":this.repeatBtnLabel.string="OPAKOVAT"},update:function(){if(this.cI<2)return void this.cI++;if(this.cI=0,this.curPercent<this.targetPercent){this.curPercent+=this.targetPercent/20,this.curPercent>this.targetPercent&&(this.curPercent=this.targetPercent);var t=Math.round(100*this.curPercent).toString()+"%";this.percentLabel1.string=t,this.percentLabel2.string=t}},onRepeat:function(){cc.director.loadScene("gameScene")},shareFB:function(){FB?FB.ui({method:"share",mobile_iframe:!0,href:"http://www.factman.cz",quote:this.quote,hashtag:"#factman"},function(t){}):console.log("FB not found")}}),cc._RF.pop()},{Score:"Score"}],EvaluationDialog:[function(t,e,n){"use strict";cc._RF.push(e,"4d761+qMv1LLbUPN5I57fLx","EvaluationDialog"),cc.Class({"extends":cc.Component,properties:{text:{"default":null,type:cc.Node},titleLbl:{"default":null,type:cc.Label},nextBtn:{"default":null,type:cc.Node},sourceBtn:{"default":null,type:cc.Node},overlay:{"default":null,type:cc.Node},addit:{"default":null,visible:!1},sourceDialog:{"default":null,type:cc.Node},data:{visible:!1,"default":null},evals:{"default":null,type:cc.Node}},onLoad:function(){this.titleLblStartY=this.titleLbl.node.parent.y},showWithData:function(t){this.node.y=GameManager.superWide?60:0,cc._canvas.style.cursor="default",this.node.active=!0;var e=this.text.getComponent(cc.Label);t.text.length>400||0===t.type.indexOf("eval")?(console.log("eval too long"),e.fontSize=34):e.fontSize=38,t.text.length<350?e.lineHeight=48:(e.lineHeight=44,0===t.type.indexOf("eval")&&(e.lineHeight=40)),e.string=t.text;var n=this.evals.getChildByName("faktacekFail");n.active=0==t.score;var i=this.evals.getChildByName("faktacekMezi");i.active=1==t.score;var o=this.evals.getChildByName("faktacekWin");o.active=2==t.score,0==t.score?this.titleLbl.string="Nachytal ses.":1==t.score?this.titleLbl.string="Úplně dobře to nebylo.":this.titleLbl.string="Super, nenechal ses napálit.",this.titleLbl.node.parent.y=this.titleLblStartY-20;var c=cc.moveBy(.4,0,20);c.easing(cc.easeBackOut()),this.titleLbl.node.parent.runAction(c);var a=cc.sequence(cc.delayTime(.2),cc.fadeIn(.6)),s=cc.sequence(cc.delayTime(.5),cc.fadeIn(.6)),l=s.clone();if(this.nextBtn.opacity=0,this.nextBtn.runAction(a),this.text.opacity=0,this.text.runAction(s),this.sourceBtn.opacity=0,this.sourceBtn.runAction(l),this.nextBtn.on("click",this.onNextClicked,this),0===t.type.indexOf("eval")){var r=this.node.getChildByName("parts");r.active=!0,this.addit=r.getChildByName(t.type),this.addit&&(this.addit.active=!0,r.opacity=0,r.runAction(s.clone()))}else{var r=this.node.getChildByName("parts");r.active=!1}this.data=t},onNextClicked:function(){this.sourceDialog.active||(this.node.parent.emit(MTEvents.COMPLETE),this.addit&&(this.addit.active=!1),GameManager.currentData=null,this.overlay.active=!1,this.node.active=!1)},showSourceInfo:function(){this.sourceDialog.active=!0,this.sourceDialog.getComponent("SourceDialog").showLinks(GameManager.currentData.sources)}}),cc._RF.pop()},{}],Factman:[function(t,e,n){"use strict";cc._RF.push(e,"4dc17VfJPRPHKXsqvI9jzvs","Factman"),cc.Class({"extends":cc.Component,properties:{swaying:{"default":null,visible:!1},flying:{"default":null,type:cc.Node},normal:{"default":null,type:cc.Node}},onLoad:function(){this.swaying=this.normal.getComponent("Swaying")},flyTo:function(t){var e=function(t){return t.easing(cc.easeSineInOut()),t},n=function(t){return t.easing(cc.easeQuadraticActionIn()),t},i=this,o=function(){i.flying.active=!0,i.normal.active=!0},c=function(){i.node.active=!1},a=cc.sequence(e(cc.rotateTo(.4,-74.8)),cc.callFunc(o),cc.spawn(n(cc.moveTo(.5,t.x,t.y)),cc.scaleTo(.5,.1)),cc.callFunc(c));this.node.runAction(a)},onEnable:function(){this.flying.active=!1,this.normal.active=!0,this.node.rotation=0,this.node.scale=1,this.node.x=415,this.node.y=156,this.swaying.pause();var t=cc.moveBy(2,20,10);t.easing(cc.easeExponentialOut()),this.node.runAction(t);var e=this;setTimeout(function(){e.swaying.resume()},2010)}}),cc._RF.pop()},{}],GameManager:[function(t,e,n){"use strict";cc._RF.push(e,"f30bfv587dMhrQUL2Ks6/Rs","GameManager"),window.GameManager={data:null,lastScore:null,currentData:null,numGames:0,superWide:!1,sets:[[0,12,16,4,17,1],[3,2,18,19,22,21],[11,6,23,15,8,5],[7,9,10,14,20,13]],onLoad:function(){cc.view.enableRetina(!0);var t=this;cc.loader.load(cc.url.raw("resources/questions.json"),function(e,n){e?cc.log("loading error:"+e):cc.log("loaded succesfully!"),t.data=n,console.log(n)})}},cc._RF.pop()},{}],GameScene:[function(t,e,n){"use strict";cc._RF.push(e,"7e8d8Jzlv9J4J2X7NIapfQg","GameScene");var i=(t("Score"),t("KrajeHighlights"));cc.Class({"extends":cc.Component,properties:{psn:[cc.String],numRounds:{visible:!1,"default":0},score:{visible:!1,"default":null},factman:{"default":null,type:cc.Node},highlights:{"default":null,type:i},freshData:{visible:!1,"default":null},freshIcon:{visible:!1,"default":null},roundQuestions:{visible:!1,"default":null},lastMenace:0},onLoad:function(){window.GameManager.onLoad(),this.node.on(MTEvents.COMPLETE,this.setNewRound,this);var t=this.node.getChildByName("Dialog");t.active=!1;var e=this.node.getChildByName("Evaluation");e.active=!1,cc.find("Canvas/Map/icons").active=!1;var n=this.node.getChildByName("InitScene");n.active=!0,this.score=[]},startGame:function(){cc.find("Canvas/Map/icons").active=!0,cc.find("Canvas/factman").active=!0,this.setNewRound()},initRound:function(){var t=window.GameManager.data;console.log(t),GameManager.currentSets&&0!=GameManager.currentSets.length||(GameManager.currentSets=this.shuffleArray(GameManager.sets.slice()));var e=GameManager.currentSets.pop(),n=[];e.forEach(function(e){n.push(t[e])}),this.roundQuestions=n,console.log(this.roundQuestions);for(var i=[],o=0;o<this.roundQuestions.length;o++){var c=this.roundQuestions[o];this.highlights.highlight(c.place);var a=this.getIcon(c.place);a.on(MTEvents.CLICKED,this.onMenace,this),a.getComponent("ClickableIcon").enableTouch(),a.question=c,i.push(a)}for(var s=cc.find("Canvas/Map/icons"),o=0;o<s.children.length;o++){var l=s.children[o];i.indexOf(l)<0&&(l.active=!1)}},shuffleArray:function(t){for(var e,n,i=t.length;0!==i;)n=Math.floor(Math.random()*i),i-=1,e=t[i],t[i]=t[n],t[n]=e;return t},getIcon:function(t){for(var e=cc.find("Canvas/Map/icons"),n=0;n<e.children.length;n++){var i=e.children[n];if(i.name.indexOf(t)>=0)return i}console.log("name "+t+" not found")},setNewRound:function(){return this.roundQuestions||this.initRound(),console.log("ROUND "+this.numRounds),this.numRounds>=6?void this.gameEnd():void(this.factman.active=!0)},onMenace:function(t){screen.availWidth/screen.availHeight>1.7&&(GameManager.superWide=!0);var e=this.node.getChildByName("Dialog");if(!(e.active||(e=this.node.getChildByName("Evaluation"),e.active||Date.now()-this.lastMenace<3500))){this.lastMenace=Date.now();var n=t.currentTarget;this.freshData=n.question,this.highlights.depleted(this.freshData.place),n.getComponent("ClickableIcon").disableTouch(),this.factman.getComponent("Factman").flyTo(n),setTimeout(this.showQuestion.bind(this),870)}},showQuestion:function(){GameManager.currentData=this.freshData;var t=GameManager.currentData,e=this.node.getChildByName("Dialog");e.getComponent("Dialog1").showWithData(t),e.active=!0,e.on(MTEvents.EVALED,this.roundFinished,this)},roundFinished:function(t){this.numRounds++,this.score.push(t.detail.score),this.highlights.showScore(this.freshData.place,t.detail.score)},gameEnd:function(){GameManager.lastScore=this.score,GameManager.numGames++;var t=this.node.getChildByName("overlay5");t.active=!0,console.log(t),t.opacity=0;var e=cc.fadeTo(1.5,215);t.runAction(e),cc.director.loadScene("endScene")},onAmo:function(){window.open("http://www.amo.cz/jaknarusko","_blank")}}),cc._RF.pop()},{KrajeHighlights:"KrajeHighlights",Score:"Score"}],InitScene:[function(t,e,n){"use strict";cc._RF.push(e,"1a672DPMPlJu5K5wqEhsL+j","InitScene");var i=t("GameScene");cc.Class({"extends":cc.Component,properties:{gameScene:{"default":null,type:i},overlay:{"default":null,type:cc.Node},startBtn:{"default":null,type:cc.Node},bubble:{"default":null,type:cc.Node},currentLabel:{"default":0,visible:!1}},onLoad:function(){cc.TextUtils.label_lastWordRex=/([a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûа-яА-ЯЁё]+|\S)$/,cc.TextUtils.label_lastEnglish=/[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]+$/,cc.TextUtils.label_firsrEnglish=/^[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]/},start:function(){this.bubble.children[0].active=!0,this.bubble.children[1].active=!1,this.bubble.children[2].active=!1,console.log("initScene start"),console.log(GameManager.currentSets),GameManager.currentSets&&(this.currentLabel=4,this.startGame())},startGame:function(){if(screen.availWidth/screen.availHeight>1.7&&(GameManager.superWide=!0),console.log("screen availheight:"+screen.availHeight),this.currentLabel>=2){this.startBtn.active=!1,this.bubble.active=!1,this.overlay.runAction(new cc.fadeOut(.25));var t=this;setTimeout(function(){t.node.active=!1},.25),this.gameScene.startGame()}else{this.currentLabel++,this.bubble.children[0].active=!1,this.bubble.children[1].active=!1,this.bubble.children[2].active=!1;var e=this.bubble.children[this.currentLabel];e.active=!0,e.opacity=0,e.runAction(cc.fadeIn(.2)),2==this.currentLabel&&(this.startBtn.children[0].getComponent(cc.Label).string="SPUSTIT HRU")}}}),cc._RF.pop()},{GameScene:"GameScene"}],KrajeHighlights:[function(t,e,n){"use strict";cc._RF.push(e,"a9965l9Cg5FHo56g8w3icP7","KrajeHighlights"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e];n.color=this.getClr("#bf2422"),n.active=!1}},highlight:function(t){for(var e=this.node.children,n=0;n<e.length;n++){var i=e[n];i.name.indexOf(t)>=0&&(i.active=!0,i.opacity=0,i.runAction(cc.fadeTo(1+.5*Math.random(),200)))}},depleted:function(t){console.log("depleted:"+t);for(var e=this.node.children,n=0;n<e.length;n++){var i=e[n];i.name.indexOf(t)>=0&&i.runAction(cc.fadeTo(3,60))}},showScore:function(t,e){console.log("score:"+t+" "+e);var n=this.node.children,i=0;0==e?i=60:1==e&&(i=40);for(var o=0;o<n.length;o++){var c=n[o];c.name.indexOf(t)>=0&&c.runAction(cc.fadeTo(1,i))}},blink:function(t){for(var e=this.node.children,n=0;n<e.length;n++){var i=e[n];i.name.indexOf(t)>=0?this.doHighlight(i):(i.stopAllActions(),i.active=!1)}},getHighlighted:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e];if(n.active)return n}},doHighlight:function(t){var e=cc.find("Canvas/Map/manace");e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e.active=!0,e.opacity=0,t.active=!0,t.opacity=0;var n=function(t){return t.easing(cc.easeSineInOut()),t},i=cc.sequence(n(cc.fadeTo(2.1,200)),n(cc.fadeOut(1.8))).repeat(25);t.runAction(i)},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e}}),cc._RF.pop()},{}],MTEvents:[function(t,e,n){"use strict";cc._RF.push(e,"20a8b7s+RJF9a/8hhfPlE+c","MTEvents");var i={};i.CLICKED="mt-event-clicked",i.START="mt-event-start",i.COMPLETE="mt-event-complete",i.CANCEL="mt-event-cancel",i.DESTROY="mt-event-destroy",i.EVALED="mt-event-evaled",i.SELECTED="mt-event-selected",i["default"]=null,window.MTEvents=i,cc._RF.pop()},{}],Manace:[function(t,e,n){"use strict";cc._RF.push(e,"e5b8dwBUUVJA77PCNML2fZ2","Manace"),cc.Class({"extends":cc.Component,properties:{sprite:{"default":null,visible:!1},box:{"default":null,visible:!1}},onLoad:function(){this.node.active=!1,this.sprite=this.node.getComponent(cc.Sprite),this.box=this.node.getBoundingBoxToWorld(),console.log(this.box),this.node.on(cc.Node.EventType.MOUSE_ENTER,this._onMouseMoveIn,this),this.node.on(cc.Node.EventType.MOUSE_LEAVE,this._onMouseMoveOut,this)},_onMouseMoveIn:function(t){cc._canvas.style.cursor="pointer"},_onMouseMoveOut:function(t){cc._canvas.style.cursor="default"}}),cc._RF.pop()},{}],MapIcons:[function(t,e,n){"use strict";cc._RF.push(e,"bb9ccvswLJL3Ig6WDKY5z7N","MapIcons"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},start:function(){for(var t=this.node.children,e=0;e<t.length;e++){var n=t[e],i=n.scale;console.log(i),n.scale=1.5*i,n.opacity=0;var o=cc.scaleTo(1.4,i);o.easing(cc.easeElasticOut());var c=cc.sequence(cc.delayTime(.05+.06*e),cc.spawn(cc.fadeIn(.3),o));n.runAction(c)}}}),cc._RF.pop()},{}],Score:[function(t,e,n){"use strict";cc._RF.push(e,"4648fad1eNDjolncrTz5p74","Score"),cc.Class({"extends":cc.Component,properties:{crossSprite:{"default":null,type:cc.SpriteFrame},circleSprite:{"default":null,type:cc.SpriteFrame},checkSprite:{"default":null,type:cc.SpriteFrame},buttons:{visible:!1,"default":null}},onLoad:function(){this.buttons=[]},addScore:function(t){var e=new cc.Node,n=e.addComponent(cc.Sprite);switch(t){case 0:n.spriteFrame=this.crossSprite;break;case 1:n.spriteFrame=this.circleSprite;break;case 2:n.spriteFrame=this.checkSprite}this.node.addChild(e),e.x=30*this.buttons.length,this.buttons.push(e)}}),cc._RF.pop()},{}],SourceDialog:[function(t,e,n){"use strict";cc._RF.push(e,"c1a92kE8z9C7KOwjP8hmcgQ","SourceDialog");var i=t("SourceLink");cc.Class({"extends":cc.Component,properties:{linkButton:{"default":null,type:cc.Prefab}},onLoad:function(){},showLinks:function(t){for(var e=this.node.children,n=0;n<e.length;n++){var o=e[n];o&&0===o.name.indexOf("b_")&&o.destroy()}var c=this.node.getChildByName("bgAdd");c.active=t.length>3;for(var a=0,n=0;n<t.length;n++){var s=cc.instantiate(this.linkButton);s.name="b_"+n;var l=s.getComponent(i),r=t[n];l.setText(r),l.data=r,s.y=a-s.height/2+180,a-=s.height,this.node.addChild(s),s.on("clicked",this.onClicked,this)}},onClicked:function(t){var e=t.currentTarget.getComponent(i).data;window.open(e.url,"_blank")},close:function(){this.node.active=!1}}),cc._RF.pop()},{SourceLink:"SourceLink"}],SourceLink:[function(t,e,n){"use strict";cc._RF.push(e,"626c0+cWztI0KLdpajXCCqU","SourceLink"),cc.Class({"extends":cc.Component,properties:{nameNode:{"default":null,type:cc.Node},title:{"default":null,type:cc.Node},bg:{"default":null,type:cc.Node},activeTouch:{visible:!1,"default":null},data:{visible:!1,"default":null}},onLoad:function(){this.enableTouch(),this.bg.skewX=4*Math.random()-2},enableTouch:function(){this.node.on("touchstart",this._onTouchStart,this),this.node.on("touchend",this._onTouchEnd,this),this.node.on("touchcancel",this._onTouchCancel,this),this.node.on("mouseenter",this._onMouseEnter,this),this.node.on("mouseleave",this._onMouseLeave,this)},_onMouseEnter:function(){this.bg.opacity=255,this.nameNode.color=this.getClr("#ceb184"),cc._canvas.style.cursor="pointer",console.log("source link "+this.node+" pointer")},_onMouseLeave:function(){this.bg.opacity=0,this.nameNode.color=this.getClr("#282634"),cc._canvas.style.cursor="default"},_onTouchStart:function(t){return this.activeTouch={time:Date.now,start:t.touch.getLocation()},!1},getClr:function(t){var e=new cc.Color;return e.fromHEX(t),e},setText:function(t){var e=t.name;e.length>60&&(e=e.substring(0,60)+"..."),this.nameNode.getComponent(cc.Label).string=e,this.title.getComponent(cc.Label).string=t.title.substring(0,32)},_onTouchEnd:function(t){if(this.activeTouch){var e=t.touch.getLocation(),n=Math.abs(this.activeTouch.start.x-e.x);if(n>30)return!1;var i=Date.now-this.activeTouch.time;return!(i>.5)&&(this.node.emit("clicked"),this.activeTouch=null,!0)}},_onTouchCancel:function(){this.activeTouch=null}}),cc._RF.pop()},{}],Swaying:[function(t,e,n){"use strict";cc._RF.push(e,"1f16aeQZSNIh46myzneMmKT","Swaying"),cc.Class({"extends":cc.Component,properties:{amountY:6,amountX:2,speedX:2,speedY:1.3,sway:{visible:!1,"default":null},swayTime:{visible:!1,"default":0},startPos:{visible:!1,"default":null},paused:!1},onLoad:function(){this.startPos={x:this.node.x,y:this.node.y},this.sway={},this.sway.sin1=Math.random()*this.speedY*.75+.25*this.speedY,this.sway.sin2=Math.random()*this.speedX*.25+.75*this.speedX,this.sway.sin3=Math.random()/2+.3,this.sway.offset=0},pause:function(){this.paused=!0},resume:function(){this.swayTime=0,this.startPos={x:this.node.x,y:this.node.y},this.paused=!1},update:function(t){this.paused||(this.node.x=this.startPos.x+this.amountX*Math.sin(this.sway.sin2*this.swayTime+this.sway.offset)+Math.sin(this.sway.sin3*this.swayTime),this.node.y=this.startPos.y+this.amountY*Math.sin(this.sway.sin1*this.swayTime+this.sway.offset),this.swayTime+=t)}}),cc._RF.pop()},{}]},{},["AnswerButton","ClickWithLabelMove","ClickWithScale","ClickableIcon","Dialog1","EvaluationDialog","Factman","GameManager","KrajeHighlights","MTEvents","Manace","MapIcons","Score","SourceDialog","SourceLink","Swaying","EndScene","GameScene","InitScene"]);