require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AnswerButton":[function(require,module,exports){
"use strict";
cc._RF.push(module, '25bf1FTAv9OGZ9Z0ctRAvBi', 'AnswerButton');
// Script/AnswerButton.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label: { default: null, type: cc.Label },
        data: { default: null, visible: false }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    setText: function setText(t) {
        this.label.string = t;
    }
});

cc._RF.pop();
},{}],"ClickWithScale":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'f38faz/KyxEApLr/5iahAgb', 'ClickWithScale');
// Script/ClickWithScale.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        activeTouch: { visible: false, default: null },
        origScale: { visible: false, default: 1 },
        startEnabled: true,
        targetScale: 0.95,
        clickEvent: {
            default: null,
            type: cc.Component.EventHandler
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.origScale = this.node.scale;
        if (this.startEnabled) {
            this.enableTouch();
        }
    },

    enableTouch: function enableTouch() {
        this.node.on('touchstart', this._onTouchStart, this);
        this.node.on('touchend', this._onTouchEnd, this);
        this.node.on('touchcancel', this._onTouchCancel, this);
    },

    disableTouch: function disableTouch() {
        this.node.off('touchstart', this._onTouchStart, this);
        this.node.off('touchend', this._onTouchEnd, this);
        this.node.off('touchcancel', this._onTouchCancel, this);
    },

    _onTouchStart: function _onTouchStart(event) {
        this.activeTouch = { time: Date.now, start: event.touch.getLocation() };
        this.node.scale = this.targetScale * this.origScale;
        return false;
    },

    _onTouchEnd: function _onTouchEnd(event) {

        if (this.activeTouch) {
            var loc = event.touch.getLocation();
            this.node.scale = this.origScale;
            var distX = Math.abs(this.activeTouch.start.x - loc.x);
            if (distX > 30) //todo content scale factor
                {
                    return false;
                }

            var duration = Date.now - this.activeTouch.time;
            if (duration > 0.5) {
                return false;
            }
            this.node.emit(MTEvents.CLICKED);
            var listener = this.clickEvent;
            if (listener) {
                var component = listener.target.getComponent(listener.component);
                var listenerFunction = component[listener.handler];
                listenerFunction.bind(component)();
            }
            this.activeTouch = null;
            return true;
        }
    },

    _onTouchCancel: function _onTouchCancel() {
        this.node.scale = this.origScale;
        this.activeTouch = null;
    }
});

cc._RF.pop();
},{}],"Dialog1":[function(require,module,exports){
"use strict";
cc._RF.push(module, '17458Ud8ZhEAbI0jc1jHj5y', 'Dialog1');
// Script/Dialog1.js

"use strict";

var AnswerButton = require("AnswerButton");
var EvaluationDialog = require("EvaluationDialog");

cc.Class({
    extends: cc.Component,

    properties: {
        headline: { default: null, type: cc.Node },
        text: { default: null, type: cc.Node },
        smiley: { default: null, type: cc.Node },
        faces: [cc.SpriteFrame],
        button: { default: null, type: cc.Prefab },
        data: { visible: false, default: null },
        buttons: { visible: false, default: null }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.buttons = [];
    },

    showWithData: function showWithData(data) {
        this.data = data;
        this.node.active = true;
        this.smiley.getComponent(cc.Sprite).spriteFrame = this.faces[data.smileyType];
        this.headline.getComponent(cc.Label).string = data.headline;

        this.setTextFromTree(data.tree);
        this.showTreeAnswers(data.tree);
    },

    setTextFromTree: function setTextFromTree(tree) {
        this.text.getComponent(cc.Label).string = tree.text;
    },

    showTreeAnswers: function showTreeAnswers(tree) {
        for (var i = 0; i < this.buttons.length; i++) {
            var obj = this.buttons[i];
            if (obj.isValid) {
                obj.destroy();
            }
        }
        this.buttons.length = 0;

        for (var i = 0; i < tree.answers.length; i++) {
            var b = cc.instantiate(this.button);
            var bc = b.getComponent(AnswerButton);
            var answer = tree.answers[i];
            bc.setText(answer.text);
            bc.data = answer;
            b.y = -i * b.height * 1.15 - 50;
            b.x = 0;
            this.node.addChild(b);
            b.on('click', this.onAnswered, this);
            this.buttons.push(b);
        }
    },

    onAnswered: function onAnswered(event) {
        var b = event.currentTarget;
        var bc = b.getComponent(AnswerButton);
        var data = bc.data;
        if (data.tree) {
            this.setTextFromTree(data.tree);
            this.showTreeAnswers(data.tree);
        } else {
            this.showEvaluation(data.evaluation);
        }
    },

    showEvaluation: function showEvaluation(id) {
        var evaluation = null;
        var evals = this.data.evaluations;
        for (var i = 0; i < evals.length; i++) {
            if (evals[i].id == id) {
                evaluation = evals[i];
                break;
            }
        }
        if (!evaluation) {
            throw new Error("Evaluation not found, id:" + id);
        }

        this.node.emit(MTEvents.EVALED, evaluation);

        console.log(evaluation);
        var ev = this.node.parent.getChildByName("Evaluation");
        ev.active = true;
        var evc = ev.getComponent(EvaluationDialog);
        evc.showWithData(evaluation);
        this.hide();
    },

    hide: function hide() {
        this.node.active = false;
    }

});

cc._RF.pop();
},{"AnswerButton":"AnswerButton","EvaluationDialog":"EvaluationDialog"}],"EndScene":[function(require,module,exports){
"use strict";
cc._RF.push(module, '0cbae4KYMlIFobR1lIhW1GO', 'EndScene');
// Script/scene/EndScene.js

"use strict";

var Score = require("Score");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    start: function start() {
        var score = GameManager.lastScore;
        if (!score) return;
        var scoreComp = this.node.getChildByName("score").getComponent(Score);
        for (var i = 0; i < score.length; i++) {
            scoreComp.addScore(score[i]);
        }
    },

    onRepeat: function onRepeat() {
        cc.director.loadScene("gameScene");
    },

    shareFB: function shareFB() {}
});

cc._RF.pop();
},{"Score":"Score"}],"EvaluationDialog":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4d761+qMv1LLbUPN5I57fLx', 'EvaluationDialog');
// Script/EvaluationDialog.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        headline: { default: null, type: cc.Node },
        text: { default: null, type: cc.Node },
        nextBtn: { default: null, type: cc.Node },
        addit: { default: null, visible: false }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    showWithData: function showWithData(data) {
        this.node.active = true;
        this.headline.getComponent(cc.Label).string = data.headline;
        this.text.getComponent(cc.Label).string = data.text;

        this.nextBtn.on('click', this.onNextClicked, this);

        if (data.type.indexOf("eval") == 0) {
            this.addit = this.node.getChildByName("parts").getChildByName(data.type);
            console.log(this.addit);
            if (this.addit) {
                this.addit.active = true;
            }
        }
    },

    onNextClicked: function onNextClicked() {
        this.node.parent.emit(MTEvents.COMPLETE);
        if (this.addit) {
            this.addit.active = false;
        }
        this.node.active = false;
    },

    showSourceInfo: function showSourceInfo() {
        var ulr = "https://www.amo.cz/cs/rusko-a-ceske-volby-2017/amo-se-bude-venovat-cesko-ruskym-vztahum-ve-volebnim-roce/";
        window.open(ulr, '_blank');
    }
});

cc._RF.pop();
},{}],"GameManager":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'f30bfv587dMhrQUL2Ks6/Rs', 'GameManager');
// Script/GameManager.js

"use strict";

window.GameManager = {

    data: null,
    lastScore: null,

    // use this for initialization
    onLoad: function onLoad() {
        cc.view.enableRetina(true);
        var self = this;
        cc.loader.load(cc.url.raw("resources/questions.json"), function (error, data) {
            if (error) cc.log("loading error:" + error);else cc.log("loaded succesfully!");

            self.data = data;
            console.log(data);
        });
    }

};

cc._RF.pop();
},{}],"GameScene":[function(require,module,exports){
"use strict";
cc._RF.push(module, '7e8d8Jzlv9J4J2X7NIapfQg', 'GameScene');
// Script/scene/GameScene.js

"use strict";

var Score = require("Score");

cc.Class({
    extends: cc.Component,

    properties: {
        psn: [cc.String],
        numRounds: { visible: false, default: 0 },
        scoreComp: { default: null, type: Score },
        score: { visible: false, default: null }
    },

    // use this for initialization
    onLoad: function onLoad() {
        window.GameManager.onLoad();
        //fix text wrap on diacritics

        cc.TextUtils.label_lastWordRex = /([a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûа-яА-ЯЁё]+|\S)$/;
        cc.TextUtils.label_lastEnglish = /[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]+$/;
        cc.TextUtils.label_firsrEnglish = /^[a-zA-Z0-9ÄÖÜäöüßěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõ-яА-ЯЁё]/;

        this.node.on(MTEvents.COMPLETE, this.setNewRound, this);

        var dialog = this.node.getChildByName("Dialog");
        dialog.active = false;

        var evalu = this.node.getChildByName("Evaluation");
        evalu.active = false;

        this.score = [];
    },

    setNewRound: function setNewRound() {
        var m = cc.find("Canvas/Map/manace");

        if (this.numRounds >= 6) {
            m.active = false;
            this.gameEnd();
            return;
        }
        var pos = this.psn[Math.floor(this.psn.length * Math.random())];
        var pa = pos.split(" ");
        m.x = parseInt(pa[0]);
        m.y = parseInt(pa[1]);
    },

    onMenace: function onMenace() {
        var data = window.GameManager.data[0];
        var dialog = this.node.getChildByName("Dialog");
        dialog.getComponent("Dialog1").showWithData(data);
        dialog.active = true;
        dialog.on(MTEvents.EVALED, this.roundFinished, this);
    },

    roundFinished: function roundFinished(e) {
        this.numRounds++;
        this.scoreComp.addScore(e.detail.score);
        this.score.push(e.detail.score);
    },

    gameEnd: function gameEnd() {
        GameManager.lastScore = this.score;
        var overlay = this.node.getChildByName("overlay");
        overlay.opacity = 0;
        overlay.active = true;
        var action = new cc.FadeIn(1);
        overlay.runAction(action);
        setTimeout(function () {
            cc.director.loadScene("endScene");
        }, 1050);
    }
});

cc._RF.pop();
},{"Score":"Score"}],"InitScene":[function(require,module,exports){
"use strict";
cc._RF.push(module, '1a672DPMPlJu5K5wqEhsL+j', 'InitScene');
// Script/scene/InitScene.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    startGame: function startGame() {
        var overlay = this.node.getChildByName("overlay");
        overlay.opacity = 0;
        overlay.active = true;
        var action = new cc.FadeIn(1);
        overlay.runAction(action);
        setTimeout(function () {
            cc.director.loadScene("gameScene");
        }, 1050);
    }
});

cc._RF.pop();
},{}],"MTEvents":[function(require,module,exports){
"use strict";
cc._RF.push(module, '20a8b7s+RJF9a/8hhfPlE+c', 'MTEvents');
// Script/MTEvents.js

"use strict";

var MTEvents = {};

MTEvents.CLICKED = "mt-event-clicked";
MTEvents.START = "mt-event-start";
MTEvents.COMPLETE = "mt-event-complete";
MTEvents.CANCEL = "mt-event-cancel";
MTEvents.DESTROY = "mt-event-destroy";
MTEvents.EVALED = "mt-event-evaled";
MTEvents.SELECTED = "mt-event-selected";
MTEvents.default = null;

window.MTEvents = MTEvents;

cc._RF.pop();
},{}],"Score":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4648fad1eNDjolncrTz5p74', 'Score');
// Script/Score.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        crossSprite: { default: null, type: cc.SpriteFrame },
        circleSprite: { default: null, type: cc.SpriteFrame },
        checkSprite: { default: null, type: cc.SpriteFrame },
        buttons: { visible: false, default: null }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.buttons = [];
    },

    addScore: function addScore(id) {
        var p = new cc.Node();
        var sp = p.addComponent(cc.Sprite);
        switch (id) {
            case 0:
                sp.spriteFrame = this.crossSprite;break;
            case 1:
                sp.spriteFrame = this.circleSprite;break;
            case 2:
                sp.spriteFrame = this.checkSprite;break;
        }
        this.node.addChild(p);
        p.x = this.buttons.length * 30;
        this.buttons.push(p);
    }
});

cc._RF.pop();
},{}]},{},["AnswerButton","ClickWithScale","Dialog1","EvaluationDialog","GameManager","MTEvents","Score","EndScene","GameScene","InitScene"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQW5zd2VyQnV0dG9uLmpzIiwiYXNzZXRzL1NjcmlwdC9DbGlja1dpdGhTY2FsZS5qcyIsImFzc2V0cy9TY3JpcHQvRGlhbG9nMS5qcyIsImFzc2V0cy9TY3JpcHQvc2NlbmUvRW5kU2NlbmUuanMiLCJhc3NldHMvU2NyaXB0L0V2YWx1YXRpb25EaWFsb2cuanMiLCJhc3NldHMvU2NyaXB0L0dhbWVNYW5hZ2VyLmpzIiwiYXNzZXRzL1NjcmlwdC9zY2VuZS9HYW1lU2NlbmUuanMiLCJhc3NldHMvU2NyaXB0L3NjZW5lL0luaXRTY2VuZS5qcyIsImFzc2V0cy9TY3JpcHQvTVRFdmVudHMuanMiLCJhc3NldHMvU2NyaXB0L1Njb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUZROztBQUtaO0FBQ0E7O0FBSUE7QUFDSTtBQUNIO0FBZkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGUTtBQUxKOztBQVdaO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEOztBQUVJO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNIO0FBdEVJOzs7Ozs7Ozs7O0FDQVQ7QUFDQTs7QUFFQTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQUTs7QUFVWjtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFDRDs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFFSjs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0k7QUFDSDs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7O0FBN0ZJOzs7Ozs7Ozs7O0FDSFQ7O0FBRUE7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVlE7O0FBYVo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNKOztBQUVEO0FBQ0k7QUFDSDs7QUFHRDtBQS9CSzs7Ozs7Ozs7OztBQ0ZUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUpROztBQU9aO0FBQ0E7O0FBSUE7QUFDSTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSDtBQTFDSTs7Ozs7Ozs7OztBQ0FUOztBQUVJO0FBQ0E7O0FBRUE7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNJOztBQUtBO0FBQ0E7QUFDSDtBQUNKOztBQWxCZ0I7Ozs7Ozs7Ozs7QUNBckI7O0FBRUE7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBSlE7O0FBT1o7QUFDQTtBQUNJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNIOztBQUVEO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBR0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSDtBQUNKO0FBckVJOzs7Ozs7Ozs7O0FDRlQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVlE7O0FBYVo7QUFDQTs7QUFJQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDSjtBQTlCSTs7Ozs7Ozs7OztBQ0FUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYQTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFKUTs7QUFPWjtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQVE7QUFDUjtBQUFRO0FBQ1I7QUFBUTtBQUhaO0FBS0E7QUFDQTtBQUNBO0FBQ0g7QUExQkkiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGxhYmVsOntkZWZhdWx0Om51bGwsIHR5cGU6Y2MuTGFiZWx9LFxyXG4gICAgICAgIGRhdGE6e2RlZmF1bHQ6bnVsbCwgdmlzaWJsZTpmYWxzZX1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRleHQ6IGZ1bmN0aW9uKHQpe1xyXG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gdDtcclxuICAgIH1cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYWN0aXZlVG91Y2g6IHsgdmlzaWJsZTpmYWxzZSwgZGVmYXVsdDpudWxsfSxcclxuICAgICAgICBvcmlnU2NhbGU6e3Zpc2libGU6ZmFsc2UsIGRlZmF1bHQ6MX0sXHJcbiAgICAgICAgc3RhcnRFbmFibGVkOnRydWUsXHJcbiAgICAgICAgdGFyZ2V0U2NhbGU6MC45NSxcclxuICAgICAgICBjbGlja0V2ZW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5vcmlnU2NhbGUgPSB0aGlzLm5vZGUuc2NhbGU7XHJcbiAgICAgICAgaWYodGhpcy5zdGFydEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVUb3VjaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlVG91Y2g6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCAndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCwgdGhpcyApO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbiggJ3RvdWNoZW5kJywgdGhpcy5fb25Ub3VjaEVuZCwgdGhpcyApO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbiggJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaENhbmNlbCwgdGhpcyApO1xyXG4gICAgfSxcclxuXHJcbiAgICBkaXNhYmxlVG91Y2g6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZiggJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQsIHRoaXMgKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCAndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzICk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZiggJ3RvdWNoY2FuY2VsJywgdGhpcy5fb25Ub3VjaENhbmNlbCwgdGhpcyApO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaFN0YXJ0OmZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB0aGlzLmFjdGl2ZVRvdWNoID0geyB0aW1lOkRhdGUubm93LCBzdGFydDpldmVudC50b3VjaC5nZXRMb2NhdGlvbigpIH07XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy50YXJnZXRTY2FsZSp0aGlzLm9yaWdTY2FsZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoRW5kOmZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVRvdWNoKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLm9yaWdTY2FsZTtcclxuICAgICAgICAgICAgdmFyIGRpc3RYID0gIE1hdGguYWJzKHRoaXMuYWN0aXZlVG91Y2guc3RhcnQueCAtIGxvYy54KTtcclxuICAgICAgICAgICAgaWYoIGRpc3RYID4gMzApLy90b2RvIGNvbnRlbnQgc2NhbGUgZmFjdG9yXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gRGF0ZS5ub3cgLSB0aGlzLmFjdGl2ZVRvdWNoLnRpbWU7XHJcbiAgICAgICAgICAgIGlmIChkdXJhdGlvbiA+IDAuNSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KE1URXZlbnRzLkNMSUNLRUQpO1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmNsaWNrRXZlbnQ7XHJcbiAgICAgICAgICAgIGlmKCBsaXN0ZW5lciApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IGxpc3RlbmVyLnRhcmdldC5nZXRDb21wb25lbnQobGlzdGVuZXIuY29tcG9uZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lckZ1bmN0aW9uID0gY29tcG9uZW50W2xpc3RlbmVyLmhhbmRsZXJdO1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJGdW5jdGlvbi5iaW5kKGNvbXBvbmVudCkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRvdWNoID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaENhbmNlbDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5vcmlnU2NhbGU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVUb3VjaCA9IG51bGw7XHJcbiAgICB9LFxyXG59KTtcclxuIiwidmFyIEFuc3dlckJ1dHRvbiA9IHJlcXVpcmUoXCJBbnN3ZXJCdXR0b25cIik7XHJcbnZhciBFdmFsdWF0aW9uRGlhbG9nID0gcmVxdWlyZShcIkV2YWx1YXRpb25EaWFsb2dcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGhlYWRsaW5lOntkZWZhdWx0Om51bGwsIHR5cGU6Y2MuTm9kZX0sXHJcbiAgICAgICAgdGV4dDp7ZGVmYXVsdDpudWxsLCB0eXBlOmNjLk5vZGV9LFxyXG4gICAgICAgIHNtaWxleTp7ZGVmYXVsdDpudWxsLCB0eXBlOmNjLk5vZGV9LFxyXG4gICAgICAgIGZhY2VzOltjYy5TcHJpdGVGcmFtZV0sXHJcbiAgICAgICAgYnV0dG9uOntkZWZhdWx0Om51bGwsIHR5cGU6Y2MuUHJlZmFifSxcclxuICAgICAgICBkYXRhOnt2aXNpYmxlOmZhbHNlLCBkZWZhdWx0Om51bGx9LFxyXG4gICAgICAgIGJ1dHRvbnM6e3Zpc2libGU6ZmFsc2UsIGRlZmF1bHQ6bnVsbH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHNob3dXaXRoRGF0YTogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNtaWxleS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZmFjZXNbZGF0YS5zbWlsZXlUeXBlXTtcclxuICAgICAgICB0aGlzLmhlYWRsaW5lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5oZWFkbGluZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRUZXh0RnJvbVRyZWUoZGF0YS50cmVlKTtcclxuICAgICAgICB0aGlzLnNob3dUcmVlQW5zd2VycyhkYXRhLnRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUZXh0RnJvbVRyZWU6IGZ1bmN0aW9uKHRyZWUpe1xyXG4gICAgICAgIHRoaXMudGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRyZWUudGV4dDtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1RyZWVBbnN3ZXJzOmZ1bmN0aW9uICh0cmVlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHRoaXMuYnV0dG9uc1tpXTtcclxuICAgICAgICAgICAgaWYoIG9iai5pc1ZhbGlkICl7XHJcbiAgICAgICAgICAgICAgICBvYmouZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnV0dG9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IHRyZWUuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYnV0dG9uKTtcclxuICAgICAgICAgICAgdmFyIGJjID0gYi5nZXRDb21wb25lbnQoQW5zd2VyQnV0dG9uKTtcclxuICAgICAgICAgICAgdmFyIGFuc3dlciA9IHRyZWUuYW5zd2Vyc1tpXTtcclxuICAgICAgICAgICAgYmMuc2V0VGV4dChhbnN3ZXIudGV4dCk7XHJcbiAgICAgICAgICAgIGJjLmRhdGEgPSBhbnN3ZXI7XHJcbiAgICAgICAgICAgIGIueSA9IC0gaSAqIGIuaGVpZ2h0KiAxLjE1IC0gNTA7XHJcbiAgICAgICAgICAgIGIueCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChiKTtcclxuICAgICAgICAgICAgYi5vbignY2xpY2snLCB0aGlzLm9uQW5zd2VyZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnMucHVzaChiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkFuc3dlcmVkOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgdmFyIGIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHZhciBiYyA9IGIuZ2V0Q29tcG9uZW50KEFuc3dlckJ1dHRvbik7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBiYy5kYXRhO1xyXG4gICAgICAgIGlmKCBkYXRhLnRyZWUgKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0RnJvbVRyZWUoZGF0YS50cmVlKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VHJlZUFuc3dlcnMoZGF0YS50cmVlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG93RXZhbHVhdGlvbihkYXRhLmV2YWx1YXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2hvd0V2YWx1YXRpb246ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdmFyIGV2YWx1YXRpb24gPSBudWxsO1xyXG4gICAgICAgIHZhciBldmFscyA9IHRoaXMuZGF0YS5ldmFsdWF0aW9ucztcclxuICAgICAgICBmb3IoIHZhciBpID0gMDsgaSA8IGV2YWxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCBldmFsc1tpXS5pZCA9PSBpZCApe1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvbiA9IGV2YWxzW2ldO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoICFldmFsdWF0aW9uICl7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV2YWx1YXRpb24gbm90IGZvdW5kLCBpZDpcIitpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZW1pdChNVEV2ZW50cy5FVkFMRUQsIGV2YWx1YXRpb24pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhldmFsdWF0aW9uKTtcclxuICAgICAgICB2YXIgZXYgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiRXZhbHVhdGlvblwiKTtcclxuICAgICAgICBldi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBldmMgPSBldi5nZXRDb21wb25lbnQoRXZhbHVhdGlvbkRpYWxvZyk7XHJcbiAgICAgICAgZXZjLnNob3dXaXRoRGF0YShldmFsdWF0aW9uKTtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGlkZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJ2YXIgU2NvcmUgPSByZXF1aXJlKFwiU2NvcmVcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2NvcmUgPSBHYW1lTWFuYWdlci5sYXN0U2NvcmU7XHJcbiAgICAgICAgaWYoIXNjb3JlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHNjb3JlQ29tcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjb3JlXCIpLmdldENvbXBvbmVudChTY29yZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzY29yZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzY29yZUNvbXAuYWRkU2NvcmUoc2NvcmVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25SZXBlYXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZVNjZW5lXCIpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgc2hhcmVGQjpmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaGVhZGxpbmU6e2RlZmF1bHQ6bnVsbCwgdHlwZTpjYy5Ob2RlfSxcclxuICAgICAgICB0ZXh0OntkZWZhdWx0Om51bGwsIHR5cGU6Y2MuTm9kZX0sXHJcbiAgICAgICAgbmV4dEJ0bjp7ZGVmYXVsdDpudWxsLCB0eXBlOmNjLk5vZGV9LFxyXG4gICAgICAgIGFkZGl0OntkZWZhdWx0Om51bGwsIHZpc2libGU6ZmFsc2V9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2hvd1dpdGhEYXRhOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGVhZGxpbmUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYXRhLmhlYWRsaW5lO1xyXG4gICAgICAgIHRoaXMudGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGEudGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5uZXh0QnRuLm9uKCdjbGljaycsIHRoaXMub25OZXh0Q2xpY2tlZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIGlmKCBkYXRhLnR5cGUuaW5kZXhPZihcImV2YWxcIikgPT0gMCApe1xyXG4gICAgICAgICAgICB0aGlzLmFkZGl0ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGFydHNcIikuZ2V0Q2hpbGRCeU5hbWUoZGF0YS50eXBlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5hZGRpdCk7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLmFkZGl0ICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRpdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbk5leHRDbGlja2VkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5lbWl0KE1URXZlbnRzLkNPTVBMRVRFKTtcclxuICAgICAgICBpZiggdGhpcy5hZGRpdCApe1xyXG4gICAgICAgICAgICB0aGlzLmFkZGl0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzaG93U291cmNlSW5mbzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1bHIgPSBcImh0dHBzOi8vd3d3LmFtby5jei9jcy9ydXNrby1hLWNlc2tlLXZvbGJ5LTIwMTcvYW1vLXNlLWJ1ZGUtdmVub3ZhdC1jZXNrby1ydXNreW0tdnp0YWh1bS12ZS12b2xlYm5pbS1yb2NlL1wiO1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKHVsciwgJ19ibGFuaycpO1xyXG4gICAgfVxyXG59KTtcclxuIiwid2luZG93LkdhbWVNYW5hZ2VyID0ge1xyXG5cclxuICAgIGRhdGE6IG51bGwsXHJcbiAgICBsYXN0U2NvcmU6IG51bGwsXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy52aWV3LmVuYWJsZVJldGluYSh0cnVlKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWQoIGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvcXVlc3Rpb25zLmpzb25cIiksICBmdW5jdGlvbiAoZXJyb3IsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwibG9hZGluZyBlcnJvcjpcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwibG9hZGVkIHN1Y2Nlc2Z1bGx5IVwiKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufTsiLCJ2YXIgU2NvcmUgPSByZXF1aXJlKFwiU2NvcmVcIik7XHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHBzbjpbY2MuU3RyaW5nXSxcclxuICAgICAgICBudW1Sb3VuZHM6e3Zpc2libGU6ZmFsc2UsIGRlZmF1bHQ6MH0sXHJcbiAgICAgICAgc2NvcmVDb21wOntkZWZhdWx0Om51bGwsIHR5cGU6U2NvcmV9LFxyXG4gICAgICAgIHNjb3JlOnt2aXNpYmxlOmZhbHNlLCBkZWZhdWx0Om51bGx9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LkdhbWVNYW5hZ2VyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8vZml4IHRleHQgd3JhcCBvbiBkaWFjcml0aWNzXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MuVGV4dFV0aWxzLmxhYmVsX2xhc3RXb3JkUmV4ID0gLyhbYS16QS1aMC05w4TDlsOcw6TDtsO8w5/Em8WhxI3FmcW+w73DocOtw6nDs8O6xa/FpcSPxYjEmsWgxIzFmMW9w4HDjcOJw5PDmsWkw6nDqMOnw6DDucOqw6LDrsO0w7vQsC3Rj9CQLdCv0IHRkV0rfFxcUykkLztcclxuICAgICAgICBjYy5UZXh0VXRpbHMubGFiZWxfbGFzdEVuZ2xpc2ggPSAvW2EtekEtWjAtOcOEw5bDnMOkw7bDvMOfxJvFocSNxZnFvsO9w6HDrcOpw7PDusWvxaXEj8WIxJrFoMSMxZjFvcOBw43DicOTw5rFpMOpw6jDp8Ogw7nDqsOiw67DtMO70LDDrcOsw43DjMOvw4HDgMOhw6DDicOIw5LDk8Oyw7PFkMWRw5nDmsWww7rFscOxw5HDpsOGxZPFksODw4LDo8OUw7Ut0Y/QkC3Qr9CB0ZFdKyQvO1xyXG4gICAgICAgIGNjLlRleHRVdGlscy5sYWJlbF9maXJzckVuZ2xpc2ggPSAgL15bYS16QS1aMC05w4TDlsOcw6TDtsO8w5/Em8WhxI3FmcW+w73DocOtw6nDs8O6xa/FpcSPxYjEmsWgxIzFmMW9w4HDjcOJw5PDmsWkw6nDqMOnw6DDucOqw6LDrsO0w7vQsMOtw6zDjcOMw6/DgcOAw6HDoMOJw4jDksOTw7LDs8WQxZHDmcOaxbDDusWxw7HDkcOmw4bFk8WSw4PDgsOjw5TDtS3Rj9CQLdCv0IHRkV0vO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKE1URXZlbnRzLkNPTVBMRVRFLCB0aGlzLnNldE5ld1JvdW5kLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGRpYWxvZyA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkRpYWxvZ1wiKTtcclxuICAgICAgICBkaWFsb2cuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBldmFsdSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkV2YWx1YXRpb25cIik7XHJcbiAgICAgICAgZXZhbHUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2NvcmUgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0TmV3Um91bmQ6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtID0gY2MuZmluZChcIkNhbnZhcy9NYXAvbWFuYWNlXCIpO1xyXG5cclxuICAgICAgICBpZiggdGhpcy5udW1Sb3VuZHMgPj0gNiApe1xyXG4gICAgICAgICAgICBtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVFbmQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5wc25bTWF0aC5mbG9vcih0aGlzLnBzbi5sZW5ndGgqTWF0aC5yYW5kb20oKSldO1xyXG4gICAgICAgIHZhciBwYSA9IHBvcy5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgbS54ID0gcGFyc2VJbnQocGFbMF0pO1xyXG4gICAgICAgIG0ueSA9IHBhcnNlSW50KHBhWzFdKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25NZW5hY2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB3aW5kb3cuR2FtZU1hbmFnZXIuZGF0YVswXTtcclxuICAgICAgICB2YXIgZGlhbG9nID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiRGlhbG9nXCIpO1xyXG4gICAgICAgIGRpYWxvZy5nZXRDb21wb25lbnQoXCJEaWFsb2cxXCIpLnNob3dXaXRoRGF0YShkYXRhKTtcclxuICAgICAgICBkaWFsb2cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBkaWFsb2cub24oTVRFdmVudHMuRVZBTEVELCB0aGlzLnJvdW5kRmluaXNoZWQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcm91bmRGaW5pc2hlZDpmdW5jdGlvbihlKXtcclxuICAgICAgICB0aGlzLm51bVJvdW5kcysrO1xyXG4gICAgICAgIHRoaXMuc2NvcmVDb21wLmFkZFNjb3JlKGUuZGV0YWlsLnNjb3JlKTtcclxuICAgICAgICB0aGlzLnNjb3JlLnB1c2goZS5kZXRhaWwuc2NvcmUpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZ2FtZUVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmxhc3RTY29yZSA9IHRoaXMuc2NvcmU7XHJcbiAgICAgICAgdmFyIG92ZXJsYXkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdmVybGF5XCIpO1xyXG4gICAgICAgIG92ZXJsYXkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgb3ZlcmxheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZUluKDEpO1xyXG4gICAgICAgIG92ZXJsYXkucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZW5kU2NlbmVcIik7XHJcbiAgICAgICAgfSwgMTA1MCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG92ZXJsYXkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvdmVybGF5XCIpO1xyXG4gICAgICAgIG92ZXJsYXkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgb3ZlcmxheS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZUluKDEpO1xyXG4gICAgICAgIG92ZXJsYXkucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZVNjZW5lXCIpO1xyXG4gICAgICAgIH0sIDEwNTApO1xyXG4gICAgfVxyXG59KTtcclxuIiwidmFyIE1URXZlbnRzID0ge307XHJcblxyXG5NVEV2ZW50cy5DTElDS0VEID0gXCJtdC1ldmVudC1jbGlja2VkXCI7XHJcbk1URXZlbnRzLlNUQVJUID0gXCJtdC1ldmVudC1zdGFydFwiO1xyXG5NVEV2ZW50cy5DT01QTEVURSA9IFwibXQtZXZlbnQtY29tcGxldGVcIjtcclxuTVRFdmVudHMuQ0FOQ0VMID0gXCJtdC1ldmVudC1jYW5jZWxcIjtcclxuTVRFdmVudHMuREVTVFJPWSA9IFwibXQtZXZlbnQtZGVzdHJveVwiO1xyXG5NVEV2ZW50cy5FVkFMRUQgPSBcIm10LWV2ZW50LWV2YWxlZFwiO1xyXG5NVEV2ZW50cy5TRUxFQ1RFRCA9IFwibXQtZXZlbnQtc2VsZWN0ZWRcIjtcclxuTVRFdmVudHMuZGVmYXVsdCA9IG51bGw7XHJcblxyXG53aW5kb3cuTVRFdmVudHMgPSBNVEV2ZW50czsiLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNyb3NzU3ByaXRlOntkZWZhdWx0Om51bGwsIHR5cGU6Y2MuU3ByaXRlRnJhbWV9LFxyXG4gICAgICAgIGNpcmNsZVNwcml0ZTp7ZGVmYXVsdDpudWxsLCB0eXBlOmNjLlNwcml0ZUZyYW1lfSxcclxuICAgICAgICBjaGVja1Nwcml0ZTp7ZGVmYXVsdDpudWxsLCB0eXBlOmNjLlNwcml0ZUZyYW1lfSxcclxuICAgICAgICBidXR0b25zOnt2aXNpYmxlOmZhbHNlLCBkZWZhdWx0Om51bGx9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5idXR0b25zID0gW107XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFNjb3JlOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgdmFyIHAgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHZhciBzcCA9IHAuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3dpdGNoKGlkKXtcclxuICAgICAgICAgICAgY2FzZSAwOiBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY3Jvc3NTcHJpdGU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTogc3Auc3ByaXRlRnJhbWUgPSB0aGlzLmNpcmNsZVNwcml0ZTticmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOiBzcC5zcHJpdGVGcmFtZSA9IHRoaXMuY2hlY2tTcHJpdGU7YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChwKTtcclxuICAgICAgICBwLnggPSB0aGlzLmJ1dHRvbnMubGVuZ3RoICogMzA7XHJcbiAgICAgICAgdGhpcy5idXR0b25zLnB1c2gocCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9