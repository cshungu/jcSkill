/**
* @name: jc
* @description: This extract Module is intended for developpers. it can express the competence in a block
* @auteur: Christian Shungu
* @date: 29/10/2016.
* @version 1.0.0
*
*/
const Jc= (function()
{
    "use strict";
    /**
     * @type {object}  // the main objects
     */
    var _self = {}, _option= {},
        _compteur = 0,
        _liste = new ArrayListe();
    /**
     * Methode param
     * 
     * @param {Object} opt - L'objet option
     */
    _self.param = function(opt) {
        (function(){
            if (typeof opt == 'object') {
                _option.selected = opt.selected !=undefined? document.getElementById(opt.selected) : null;
                _option.speed    = opt.speed    !=undefined? opt.speed    : 0;
                _option.ladder   = opt.ladder   !=undefined? opt.ladder   : 5;
                _option.frame    = opt.frame    !=undefined? opt.frame    : 'cercle';
                _option.color    = opt.color    !=undefined? opt.color    : '#76C24F';
                _option.width    = opt.width    !=undefined? opt.width    : 24;
                _option.space    = opt.width    !=undefined? opt.space    : 4;
            }
        })();
        return this;
    }
    /**
     * Methode addBlock
     */
    _self.addBlock = function (titre, keyframes=[]) {
        let _b = {
            titre: titre !=undefined? titre : null,
            keyframes : keyframes
        }
        _liste.add(_b);
        _compteur++;
        return this;
    }
    /**
     * @method show
     * @description this method allow show frame
     */
    _self.show = function () {
        for (let k = 0; _compteur> k; k++) {
            !function(k) 
            {
                let o     = _liste.getAt(k);
                let panel = new JCPanel();
                    panel.append(new JCTitre(o.titre));
                let interval = null;
                let i = 0;
                let cardinal = o.keyframes.length-1;
                let repeat = function() {
                    let name  = o.keyframes[i].name;
                    panel.append(_inContour(name));
                    _option.selected.appendChild(panel.gElement());
                    if(i == cardinal) clearInterval(interval);
                    Animate.show(o, i);
                    i++;
                };
                interval = setInterval(repeat, _option.speed);
            }(k); 
        }
        return this;
    }
    /**
     * @method slide
     * @description this method allow slide frame
     */
    _self.slide = function () {
        for (let k = 0; _compteur> k; k++) {
            !function(k) {
                let o     = _liste.getAt(k);
                let panel = new JCPanel();
                    panel.append(new JCTitre(o.titre));
                let interval = null;
                let i = 0;
                let cardinal = o.keyframes.length-1; // for array
                let repeat = function() {
                    let name  = o.keyframes[i].name;
                    panel.append(_inContour(name));
                    _option.selected.appendChild(panel.gElement());
                    if(i == cardinal) clearInterval(interval);
                    Animate.slide(o, i);
                    i++;
                };
                interval = setInterval(repeat, _option.speed);
            }(k);
        }
        return this;
    }
    /**
     * @method progress
     * @description this method allow slide frame
     */
    _self.progress = function()
    {
        for (let k = 0; _compteur> k; k++) {
            !function(k) 
            {
                let o     = _liste.getAt(k);
                let panel = new JCPanel();
                    panel.append(new JCTitre(o.titre));
                let interval = null;
                let i = 0;
                let cardinal = o.keyframes.length-1;
                let repeat = function() {
                    let name  = o.keyframes[i].name;
                    panel.append(_inProgress(name));
                    _option.selected.appendChild(panel.gElement());
                    Animate.progress(o, i);
                    if(i == cardinal) {
                        clearInterval(interval);
                    }
                    i++; 
                };
                interval = setInterval(repeat, _option.speed);
            }(k); 
        }
        return this;
    };
    /**
     * @method animate
     * @description this method allow animate frame
     */
    _self.animate =function () {
        let liste = new ArrayListe();
            liste.add('slide').add('show').add('progress');
        let index = Math.floor(Math.random() * liste.size()); 
        _self[liste.getAt(index)]();
        return this;
    }
    var Animate  = (function()
    {
        let self       = {};
        let _listeContour  = document.getElementsByClassName('jc-contour');
        self.show = function(o, i)
        {
            let _contour = _listeContour[i];
            let _box     = _contour.childNodes[1];
            let _frames  = _box.getElementsByClassName('jc-frame');
            let _left    = _option.width+_option.space;
            let _opt     = {
                cardinal: _frames.length-1,
                a :{speed: _option.speed/10, intervalID: null},
                b :{speed: (_option.speed/10)/2, intervalID: null},
            };
            let k = 0;
            let repeat = function() {
                if(_frames[k].classList.contains("jc-frame")) {
                    _frames[k].classList.add('show');
                    let _margin_ = _left*k;
                    _frames[k].style.marginLeft= _margin_+"px";
                } 
                if (k===_opt.cardinal) {
                    let keyframe = o.keyframes[i];
                    let level    = keyframe.level-1;
                    let z        = 0;
                    _opt['b'].intervalID = setInterval(function(){
                   _frames[z].classList.add('cercle');
                        if(level == z) clearInterval(_opt['b'].intervalID);
                        z++;
                    }, _opt['b'].speed);
                    clearInterval(_opt['a'].intervalID);
                }
                k++;
            };
            _opt['a'].intervalID = setInterval(repeat, _opt['a'].speed); 
        };
        self.slide = function(o, i) {
            let _contour = _listeContour[i];
            let _box     = _contour.childNodes[1];
            let divs     =_box.getElementsByClassName('jc-frame');
            let deCounter=_option.ladder-1;
            let s = 1, k=0;
            let left  =_option.width+_option.space;
            let speed =5;
            let keyframe = o.keyframes[i];
            let level    = keyframe.level;
            let liste    = _self.Util.gListe();
            while (deCounter>=0) {
                let _o = {
                    id:deCounter,
                    left:left*deCounter,
                    pos:deCounter,
                    speed:speed*s,
                    opt: {
                        a :{speed: speed*s, intervalID: null},
                        b :{speed: speed*s/2, intervalID: null}
                    },
                    div : divs[deCounter]
                };
                liste.add(_o);
                deCounter--;
                s++;
            } 
            !function() {
                let _t  = _option.ladder-1;
                let z   = 0;
                while (_t>=0) {
                    let _o = liste.getAt(_t);
                    if(_o.div.classList.contains("jc-frame")) 
                        _o.div.classList.add('show');
                    if (z==_o.id) {
                        _o.opt.a.intervalID = setInterval(()=>{ 
                            if(_o.pos==_o.left){
                                clearInterval(_o.opt.a.intervalID);
                            } else{
                                _o.pos++;
                                _o.div.style.left=_o.pos+'px'; 
                            }
                       }, _o.opt.a.speed);
                    }
                    z++;_t--;
                }
                let counter = 0;
                while (level>counter) {
                    divs[counter].classList.add('cercle');
                    counter++;
                } 
            }();
        };
        self.progress = function(o, i)
        {
            let deCounter=_option.ladder-1;
            let _contour = _listeContour[i];
            let _box     = _contour.childNodes[1];
            let _frame  = _box.querySelector('.jc-bar');
            let keyframe = o.keyframes[i];
            let level    = keyframe.level;
            let width    = 10;
            let _o = {
                Id  : i+'_intervalID',
                width: width *level,
                counter : 0
            };
            !function() {
                var repeat = function () {
                    if (_o.counter>=_o.width) {
                        let tip    = new JCElement('div', 'jc-tooltip');
                        let tiptxt = new JCElement('div', 'jc-tooltiptext')
                            .sNode(level);
                        tip.append(tiptxt);
                        _frame.append(tip.gElement());
                      clearInterval(_o.Id);
                    } else {
                      _o.counter++;
                      _frame.style.width =_o.counter + "%";
                    }
                } 
                _o.Id= setInterval(repeat, 10);
            }();
        };
        return self;
    })();
    function JCElement (tag, classe)
    {
        let _eOut = document.createElement(tag);
        let _style='';
        let _classe= classe;
        this.addClass = function(classe){
            _eOut.classList.add(classe);
            return this;
        };
        this.replaceClass = function(oldClasse, newClasse){
            _eOut.classList.replace(oldClasse, newClasse);
            return this;
        };
        this.sNode = function(node){
            _eOut.innerHTML = String(node).toString();
            return this;
        };
        this.attr = function(k, s){
            _eOut.setAttribute(k, s);
            return this;
        };
        this.sData = function(k, s){
            let a =String('data-'+k).toString();
            this.attr(a, s);
        return this;
        };
        this.css = function(k, s){
            _style+=k+':'+s+';';
            return this;
        };
        this.append = function(node){
            _eOut.append(node.gElement());
            return this;
        };
        this.gData = function(k){
            let r = _eOut.dataset.k;
            return r;
        };
        this.gElement = function(){
            this.addClass(_classe);
            if (_style.length-1 !== -1){
                this.attr('style', _style);
            }
            return _eOut;
        };
    };
    function JCBox() {
        JCElement.call(this, 'div', 'jc-box');
        let _collection = new ArrayListe();
        this.gCollection = ()=>{
           return _collection;
        };
    };
    function JCContour () {
        JCElement.call(this, 'div', 'jc-contour');
    }
    function JCFrame (width, space, color) {
        JCElement.call(this, 'div', 'jc-frame');
        let _width = width;
        let _space = space;
        let _color = color;
        this.gWidth = function(){
            return _width;
        };
        this.gSpace = function(){
            return _space;
        };
        this.gColor = function(){
            return _color;
        }
    }
    function JCCercle(width, space, color, number) {
        JCFrame.call(this, width, space, color);
    }
    function JCLabel(label) {
        JCElement.call(this, 'div', 'jc-label');
        this.sNode(label);
    }
    function JCTitre(label) {
        JCElement.call(this, 'h4', 'jc-titre');
        this.sNode(label);
    }
    function JCPanel() {
        JCElement.call(this, 'div', 'jc-panel');
    }
    function JCFactory(type){
        this.type = type;
        let p = null;
        this.create = function(margin) {
            if(this.type=="cercle") {
                p = new JCCercle(
                    _option.width, _option.space,  
                    _option.color, margin
                );
            } else {
                p = new JCCercle(
                    _option.width, _option.space,  
                    _option.color, margin
                );
            }
            return p;
        };
    }
    var _inContour = function(labelText) {
        let jcContour = new JCContour();
        let jsBox     = new JCBox();
        let jsFactory = new JCFactory(_option.frame);
        let jslabel   = new JCLabel(labelText);
        let counter   = 0;
        while (_option.ladder>counter) {
            let frame = jsFactory.create(counter);
            jsBox.append(frame);
            counter++;
        }
        jcContour.append(jslabel)
            .append(jsBox)
            .append(new JCElement('div', 'jc-clear'));
        return jcContour;
    };
    var _inProgress = function(labelText) {
        let jcContour = new JCContour();
        let jsBox     = new JCBox();
        let frame     = new JCElement('div', 'jc-bar');
        let jslabel   = new JCLabel(labelText);
        jsBox.append(frame);
        jcContour.append(jslabel)
            .append(jsBox)
            .append(new JCElement('div', 'jc-clear'));
        return jcContour;
    };
    function ArrayListe() {
		var aList = [];
		this.size = ()=>{return aList.length;};
		this.add   = (object)=>{aList.push(object);return this};
		this.getAt = (index) =>{
			if(index > -1 && index < aList.length )return aList[index];
			else return undefined; 
		};
		this.clear = ()=>{aList = [];};
		this.removeAt = (index) =>{ 
			var m_count = aList.length;
			if ( m_count > 0 && index > -1 && index < aList.length ) 
			   {
				switch( index )
				{
				  case 0:
					this.aList.shift(); // Premiere element
					break;
				 case m_count - 1:
					this.aList.pop(); // Derniere element
					break;
				 default:
					var head   = aList.slice(0, index );
					var tail   = aList.slice(index + 1);
					this.aList = head.concat(tail);
				    break;
				}
			}	 
		};
		this.indexOf = (object, startIndex) => {
		   var m_count       = aList.length;
		   var m_returnValue = - 1;
			if ( startIndex > -1 && startIndex < m_count ) 
			{
				  var i = startIndex;
				while(i < m_count)
				{
					 if (aList[i] == object)
					 {
						m_returnValue = i;
						break;
					}	
					 i++;
				}
			}
		   return m_returnValue;
		};
		this.lastIndexOf = (object, startIndex ) => {
		   var m_count       = aList.length;
		   var m_returnValue = - 1;
		   if (startIndex > -1 && startIndex < m_count ) 
		   {
			  var i = m_count - 1;
			  while( i >= startIndex )
			  {
				if (aList[i] == object )
				 {
					m_returnValue = i;
					break;
				}		
				i--;
			  }
		   }	
		   return m_returnValue;
		};
		this.isEmpty = () =>{return  aList.length>0?false: true;};
		this.getAll = ()=>{return  aList;};
        this.contains = (object) =>{}
        this.reverse = () =>{
            aList.reverse();
            return this;
        };
    };
    _self.Util = {
        gElement: function(el, cl) {return new JCElement(el, cl);},
        gBox: function() {return new JCBox();},
        gContour:function() {return new JCContour();},
        gFactory:function(width, space, color, margin) {
            return new JCFactory(width, space, color, margin);
        },
        gLabel:function(label) {return new JCLabel(label);},
        gTitre:function(label) {return new JCTitre(label);},
        gPanel:function() {return new JCPanel();},
        gListe:function(){return new ArrayListe();}
    };
	return _self;
})();