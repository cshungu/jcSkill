var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
    * @name             : jc
    * @description      : This extract Module is intended for developpers. it can express the competence in a block
    * @author           : christian
    * @group            :
    * @created          : 05/09/2021 - 16:27:44
    * @version          : 1.0.0
    *
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 05/09/2021
    * - Author          : christian
    * - Modification    :
**/
var Jc = (function () {
    "use strict";
    var _o = {};
    var _setProperty = function (name, value) {
        var root = document.documentElement;
        root.style.setProperty(name, value);
    };
    var _CallFunction = function (callback) {
        _o.collections.forEach(function (collection, index) {
            if (collection) {
                var panel_1 = new JPanel;
                panel_1.append(new JTitre(collection.titre));
                var pos_1 = 0;
                var taille_1 = collection.frames.length - 1;
                var repeat = function () {
                    panel_1.append(JContour.Init(collection.frames[pos_1].name));
                    var bindCallback = callback.bind(_animate);
                    _o.selected.appendChild(panel_1.gElement());
                    if (taille_1 === pos_1)
                        clearInterval(intervalID_1);
                    bindCallback(collection, pos_1);
                    pos_1++;
                };
                var intervalID_1 = setInterval(repeat, 2000);
            }
        });
    };
    var ValidationElement = /** @class */ (function (_super) {
        __extends(ValidationElement, _super);
        function ValidationElement(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "ValidationElement";
            return _this;
        }
        return ValidationElement;
    }(Error));
    var OptionError = /** @class */ (function (_super) {
        __extends(OptionError, _super);
        function OptionError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = "OptionError";
            return _this;
        }
        return OptionError;
    }(Error));
    var AbstractElement = /** @class */ (function () {
        function AbstractElement(tag, eClasse) {
            try {
                this.eOut = document.createElement(tag);
                this.eStyle = "";
                this.eClasse = eClasse;
            }
            catch (err) {
                throw new ValidationElement("Problem with the html floor");
            }
        }
        AbstractElement.prototype.addClass = function (classe) {
            this.eOut.classList.add(classe);
            return this;
        };
        AbstractElement.prototype.replaceClass = function (oClasse, nClasse) {
            this.eOut.classList.replace(oClasse, nClasse);
            return this;
        };
        ;
        AbstractElement.prototype.sNode = function (node) {
            this.eOut.innerHTML = node.toString();
            return this;
        };
        AbstractElement.prototype.attr = function (name, value) {
            this.eOut.setAttribute(name, value);
            return this;
        };
        AbstractElement.prototype.sData = function (cle, value) {
            var key = "data-" + cle;
            this.attr(key, value);
            return this;
        };
        AbstractElement.prototype.css = function (k, s) {
            this.eStyle += k + ':' + s + ';';
            return this;
        };
        AbstractElement.prototype.append = function (node) {
            this.eOut.append(node.gElement());
            return this;
        };
        AbstractElement.prototype.gData = function (k) {
            var r = this.eOut.dataset.k;
            return r;
        };
        return AbstractElement;
    }());
    var JElement = /** @class */ (function (_super) {
        __extends(JElement, _super);
        function JElement(tag, eClasse) {
            return _super.call(this, tag, eClasse) || this;
        }
        JElement.prototype.gElement = function () {
            this.addClass(this.eClasse);
            if (this.eStyle.length - 1 !== -1) {
                this.attr('style', this.eStyle);
            }
            return this.eOut;
        };
        return JElement;
    }(AbstractElement));
    var JPanel = /** @class */ (function (_super) {
        __extends(JPanel, _super);
        function JPanel() {
            return _super.call(this, 'div', 'jc-panel') || this;
        }
        return JPanel;
    }(JElement));
    var JWrap = /** @class */ (function (_super) {
        __extends(JWrap, _super);
        function JWrap() {
            return _super.call(this, 'div', 'jc-wrap') || this;
        }
        JWrap.Init = function () {
            JWrap.that = new this();
            var frame;
            switch (_o.Function) {
                case "progress": {
                    frame = JProgress.Init();
                    JWrap.that.append(frame);
                    break;
                }
                default: {
                    var counter = 0;
                    while (_o.ladder > counter) {
                        frame = new JFrame();
                        JWrap.that.append(frame);
                        counter++;
                    }
                    break;
                }
            }
            return JWrap.that;
        };
        return JWrap;
    }(JElement));
    var JTitre = /** @class */ (function (_super) {
        __extends(JTitre, _super);
        function JTitre(titre) {
            var _this = _super.call(this, 'h4', 'jc-titre') || this;
            _this.sNode(titre);
            return _this;
        }
        return JTitre;
    }(JElement));
    var JFrame = /** @class */ (function (_super) {
        __extends(JFrame, _super);
        function JFrame() {
            return _super.call(this, 'div', 'jc-frame') || this;
        }
        return JFrame;
    }(JElement));
    var JLabel = /** @class */ (function (_super) {
        __extends(JLabel, _super);
        function JLabel(label) {
            var _this = _super.call(this, 'div', 'jc-label') || this;
            _this.sNode(label);
            return _this;
        }
        return JLabel;
    }(JElement));
    var JContour = /** @class */ (function (_super) {
        __extends(JContour, _super);
        function JContour() {
            return _super.call(this, 'div', 'jc-contour') || this;
        }
        JContour.Init = function (name) {
            JContour.that = new this();
            JContour.that
                .append(new JLabel(name))
                .append(JWrap.Init());
            return JContour.that;
        };
        return JContour;
    }(JElement));
    var JBar = /** @class */ (function (_super) {
        __extends(JBar, _super);
        function JBar() {
            return _super.call(this, 'div', 'jc-bar') || this;
        }
        JBar.Init = function () {
            JBar.that = new this();
            JBar.that.append(new JElement('div', 'jc-tooltip')
                .append(new JElement('div', 'jc-tooltiptext')));
            return JBar.that;
        };
        return JBar;
    }(JElement));
    var JProgress = /** @class */ (function (_super) {
        __extends(JProgress, _super);
        function JProgress() {
            return _super.call(this, 'div', 'jc-progress') || this;
        }
        JProgress.Init = function () {
            JProgress.that = new this();
            JProgress.that.append(JBar.Init());
            return JProgress.that;
        };
        return JProgress;
    }(JElement));
    var _animate = {
        contours: document.getElementsByClassName('jc-contour'),
        show: function (collection, index) {
            var _contour = this.contours[index];
            var _wrap = _contour.childNodes[1];
            var _frames = _wrap.getElementsByClassName('jc-frame');
            var o = {
                left: _o.width + _o.space,
                cardinal: _frames.length - 1,
                x: { speed: _o.speed / 8, id: 0, index: 0 },
                y: { speed: _o.speed / 4, id: 0, index: 0 }
            };
            o.x.id = setInterval(function () {
                var ml = o.left * o.x.index;
                var figure = "jc-" + _o.frame;
                _frames[o.x.index].classList.add(figure);
                _frames[o.x.index].style.marginLeft = ml + "px";
                if (o.x.index === o.cardinal) {
                    clearInterval(o.x.id);
                    var oFrame = collection.frames[index];
                    var level_1 = oFrame.level - 1;
                    o.y.id = setInterval(function () {
                        _frames[o.y.index].classList.add("jc-level");
                        if (level_1 === o.y.index) {
                            clearInterval(o.y.id);
                        }
                        o.y.index++;
                    }, o.y.speed);
                }
                o.x.index++;
            }, o.x.speed);
        },
        progress: function (collection, index) {
            var o = {
                x: { id: 0, index: 10 },
                y: { id: 0, index: 0 }
            };
            var f = collection.frames[index];
            var width = 10 * f.level;
            var level = f.level;
            var _contour = this.contours[index];
            var _wrap = _contour.childNodes[1];
            var _progress = _wrap.querySelector(".jc-progress");
            var _bar = _progress.querySelector(".jc-bar");
            var _tip = _bar.querySelector(".jc-tooltip");
            var _tiptext = _tip.querySelector(".jc-tooltiptext");
            _tiptext.innerText = level;
            o.x.id = setInterval(function () {
                _bar.style.width = o.x.index + "%";
                if (o.x.index === width) {
                    clearInterval(o.x.id);
                }
                o.x.index = o.x.index + 10;
            }, 100);
        }
    };
    var _self = {
        option: function (o) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var picked = document.getElementById(o.selected);
            if (picked) {
                _o = {
                    selected: picked,
                    speed: (_a = o.speed) !== null && _a !== void 0 ? _a : 1000,
                    ladder: (_b = o.ladder) !== null && _b !== void 0 ? _b : 10,
                    frame: (_c = o.frame) !== null && _c !== void 0 ? _c : "cercle",
                    frontColor: (_d = o.frontColor) !== null && _d !== void 0 ? _d : "#74b9ff",
                    backColor: (_e = o.backColor) !== null && _e !== void 0 ? _e : "#2c3e50",
                    width: (_f = o.width) !== null && _f !== void 0 ? _f : 24,
                    space: (_g = o.space) !== null && _g !== void 0 ? _g : 4,
                    counter: 0,
                    collections: [],
                    Function: (_h = o.Function) !== null && _h !== void 0 ? _h : "show"
                };
                return this;
            }
            else {
                throw new OptionError("L'option selected est obligatoire");
                return this;
            }
        },
        add: function (collection) {
            if (collection.titre) {
                var frames_1 = collection.frames;
                var arr = frames_1.filter(function (frame) { return frame.level > _o.ladder; });
                if (arr.length > 0) {
                    var msg = void 0;
                    msg = "L'une d'option leve est supérieur à l'option ladder";
                    throw new OptionError(msg);
                }
                else {
                    _o.collections.push(collection);
                    _o.counter++;
                    _setProperty("--jc-front-color", _o.frontColor);
                    _setProperty("--jc-back-color", _o.backColor);
                }
            }
            else {
                throw new OptionError("L'option titre est obligatoire");
            }
            return this;
        },
        animate: function () {
            var animateFunc = _o.Function;
            switch (animateFunc) {
                case "progress": {
                    _CallFunction(_animate.progress);
                    break;
                }
                default: {
                    _CallFunction(_animate.show);
                    break;
                }
            }
        }
    };
    return _self;
})();
