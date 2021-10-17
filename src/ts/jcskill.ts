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
export const Jc: any = (function () {
    "use strict";
    let _o: Partial<IOption> = {};
    const _setProperty = (name: string, value: string) => {
        let root = document.documentElement;
        root.style.setProperty(name, value);
    };
    const _CallFunction = (callback: any) => {
        _o.collections.forEach((collection, index) => {
            if (collection) {
                let panel = new JPanel;
                panel.append(new JTitre(collection.titre));
                let pos = 0;
                let taille = collection.frames.length-1;
                let repeat = () => {
                    panel.append(JContour.Init(collection.frames[pos].name));
                    let bindCallback = callback.bind(_animate);
                      _o.selected.appendChild(panel.gElement());
                    if (taille === pos) clearInterval(intervalID);
                    bindCallback(collection, pos);
                    pos++;
                };
                let intervalID = setInterval(repeat, 2000);
            }
        }); 
    };
    interface IOption {
        selected: any;
        speed: number;
        ladder: number;
        frame: string;
        frontColor: string;
        backColor: string;
        width: number;
        space: number;
        counter: number;
        collections: Array<ICollection>;
        Function: string;
    }
    type Partial <T> = { [P in keyof T]? : T[P]}
    interface IO {
        left?: number,
        cardinal?: number,
        x?: any,
        y?: any,
        z?: any
    }
    interface IJ {
        animate: () => void;
    }
    interface IObject extends IJ {
        option: (o: Partial<IOption>) => this;
        add: (collection: Partial<ICollection>) => this;
    }
    interface ICollection {
        titre: string;
        frames: Array<any>;
    }
    class ValidationElement extends Error {
        constructor(message: string) {
            super(message);
            this.name = "ValidationElement";
        }
    }
    class OptionError extends Error {
        constructor(message: string) {
            super(message);
            this.name = "OptionError";
        }
    }
    abstract class AbstractElement {
        protected eOut?: HTMLElement;
        protected eClasse?: string;
        protected eStyle?: string;
    
        constructor(tag: string, eClasse?: string) {
            try {
                this.eOut = document.createElement(tag);
                this.eStyle = "";
                this.eClasse = eClasse;
            } catch (err) {
                throw new ValidationElement("Problem with the html floor");
            }
        }
        addClass(classe: string): this {
            this.eOut.classList.add(classe);
            return this;
        }
        replaceClass (oClasse: string, nClasse: string): this {
            this.eOut.classList.replace(oClasse, nClasse);
            return this;
        };
        sNode(node?: string) : this {
            this.eOut.innerHTML = node.toString();
            return this;
        }
        attr (name:string, value: string): this {
            this.eOut.setAttribute(name, value);
            return this;
        }
        sData(cle: string, value: string): this {
            let key = `data-${cle}`;
            this.attr(key, value);
            return this;
        }
        css(k:string, s:string): this {
            this.eStyle += k+':'+s+';';
            return this;
        }
        append(node: any): this {
            this.eOut.append(node.gElement());
            return this;
        }
        gData(k:string) : any {
            let r = this.eOut.dataset.k;
            return r;
        }
        abstract gElement(): HTMLElement;
    }
    class JElement extends AbstractElement {
        constructor(tag: string, eClasse?: string) {
            super(tag, eClasse);
        }
        gElement(): HTMLElement {
            this.addClass(this.eClasse);
            if (this.eStyle.length-1 !== -1){
                this.attr('style', this.eStyle);
            }
            return this.eOut;
        }
    }
    class JPanel extends JElement {
        constructor() {
            super('div', 'jc-panel');
        }
    }
    class JWrap extends JElement {
        static that: JWrap;
        constructor() {
            super('div', 'jc-wrap');
        }
        static Init(): JElement {
            JWrap.that = new this();
            let frame;
            switch (_o.Function) {
                case "progress": {
                    frame = JProgress.Init();
                    JWrap.that.append(frame);
                    break;
                }
                default: {
                    let counter = 0;
                    while (_o.ladder > counter) {
                        frame = new JFrame();
                        JWrap.that.append(frame);
                        counter++;
                    }
                    break; 
                } 
            }
            return JWrap.that;
        }
    }
    class JTitre extends JElement {
        constructor(titre: string) {
            super('h4', 'jc-titre');
            this.sNode(titre);
        }
    }
    class JFrame extends JElement {
        constructor() {
            super('div', 'jc-frame');
        }
    }
    class JLabel extends JElement {
        constructor(label:string) {
            super('div', 'jc-label');
            this.sNode(label);
        }
    }
    class JContour extends JElement {
        static that: JContour;
        constructor() {
            super('div', 'jc-contour');
        }
        static Init(name : string): JElement {
            JContour.that = new this();
            JContour.that
                .append(new JLabel(name))
                .append(JWrap.Init());
            return JContour.that;
        }
    }
    class JBar extends JElement {
        static that: JBar;
        constructor() {
            super('div', 'jc-bar');
        }
        static Init() {
            JBar.that = new this();
            JBar.that.append(
                new JElement('div', 'jc-tooltip')
                    .append(new JElement('div', 'jc-tooltiptext'))
            );
            return JBar.that;
        }
    }
    class JProgress extends JElement {
        static that: JProgress;
        constructor() {
            super('div', 'jc-progress');
        }
        static Init() {
            JProgress.that = new this();
            JProgress.that.append(JBar.Init());
            return JProgress.that;
        }
    }
    const _animate = {
        contours: document.getElementsByClassName('jc-contour'),
        show(collection: ICollection, index?: number) {
            let _contour = this.contours[index];
            let _wrap = _contour.childNodes[1];
            let _frames = _wrap.getElementsByClassName('jc-frame');
            let o: IO = {
                left: _o.width + _o.space,
                cardinal: _frames.length - 1,
                x: { speed: _o.speed / 8, id: 0, index: 0 },
                y: { speed: _o.speed / 4, id: 0, index: 0 }
            };
            o.x.id = setInterval(() => {
                let ml = o.left * o.x.index;
                let figure = `jc-${_o.frame}`;
                _frames[o.x.index].classList.add(figure);
                _frames[o.x.index].style.marginLeft = ml + "px";
                if (o.x.index === o.cardinal) {
                    clearInterval(o.x.id);
                    let oFrame = collection.frames[index];
                    let level = oFrame.level - 1;
                    o.y.id = setInterval(() => {
                        _frames[o.y.index].classList.add("jc-level");
                        if (level === o.y.index) {
                            clearInterval(o.y.id);
                        }
                        o.y.index++;
                    }, o.y.speed);
                }
                o.x.index++;
            }, o.x.speed);
        },
        progress(collection: ICollection, index?: number) {
            let o = {
                x: { id: 0, index: 10},
                y: { id: 0, index: 0}
            };
            let f = collection.frames[index];
            let width: number = 10 * f.level;
            let level: number = f.level;
            let _contour  = this.contours[index];
            let _wrap     = _contour.childNodes[1];
            let _progress = _wrap.querySelector(".jc-progress");
            let _bar      = _progress.querySelector(".jc-bar");
            let _tip  = _bar.querySelector(".jc-tooltip");
            let _tiptext = _tip.querySelector(".jc-tooltiptext");
            _tiptext.innerText = level;
          
            o.x.id = setInterval(() => {
                _bar.style.width= o.x.index+ "%";
                if (o.x.index === width) {
                    clearInterval(o.x.id);
                }
                o.x.index = o.x.index + 10;
            }, 100);
        }
    }
    const _self: Partial<IObject> = {
        option(o:IOption) {
            let picked = document.getElementById(o.selected);
            if (picked) {
                _o = {
                    selected: picked,
                    speed: o.speed ?? 1000,
                    ladder: o.ladder ?? 10,
                    frame: o.frame ?? "cercle",
                    frontColor: o.frontColor ?? "#74b9ff",
                    backColor: o.backColor ?? "#2c3e50",
                    width: o.width ?? 24,
                    space: o.space ?? 4,
                    counter: 0,
                    collections: [],
                    Function: o.Function?? "show"
                };
                return this;
            } else {
                throw new  OptionError("L'option selected est obligatoire");
                return this;
            }
        },
        add(collection: ICollection) {
            if (collection.titre) {
                let frames = collection.frames;
                let arr = frames.filter(frame => frame.level > _o.ladder);
                if (arr.length > 0) {
                    let msg: string;
                    msg = "L'une d'option leve est supérieur à l'option ladder";
                    throw new  OptionError(msg);
                } else {
                    _o.collections.push(collection);
                    _o.counter++;
                    _setProperty("--jc-front-color", _o.frontColor);
                    _setProperty("--jc-back-color", _o.backColor);
                }
            } else {
                throw new  OptionError("L'option titre est obligatoire");
            }
            return this
        },
        animate() {
            let animateFunc =_o.Function;
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