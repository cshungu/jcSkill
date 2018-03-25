/**
* @name: jsskills
* @description: This extract Module is intended for developpers. it can express the competence in a block
* @auteur: Christian Shungu
* @date: 29/10/2016.
* @version 1.0.0
*
*/

const JsSkills = (function()
{
    "use strict";
    
    /**
     * @type {object}  // the main objects
     */
    var skill    = {};
    var build    = {}; // object Build Element for DOM 
    var options  = {};
    var configs  = {};
        
    var langageArray    = []; // Array For langage

    
    skill.set = function(type="another",langages = [])
    { 
        if(Array.isArray(langages))
        { 
            if(type == "langage")
            {
                for(let langage in langages) langageArray.push(langages[langage]);
            }
        }else{
            throw new TypeError(langages+' is not array');
        }
        return this;
    }

    /**
     *  Config
     *  @param{object} config - The object config
     *  @description - This method all config
    */
    skill.config = function(config)
    {
        !function()
        {
            configs.selector   = config.element != undefined ? config.element: null;  /* box element */
            configs.title      = config.title   != undefined ? config.title  : null;
            configs.ladder     = config.ladder  != undefined ? config.ladder : null;
            configs.speed      = config.speed   != undefined ? config.speed  : null;
            configs.figure     = config.figure  != undefined ? config.figure : "cercle";
            configs.color      = config.color   != undefined ? config.color  : "#76C24F"
            configs.width      = 24;
            configs.space      = 4;
        }();
        return this;
    };
    
    /**
     * @method show
     * @description this method allow show frame
     */
    skill.show = function()
    {
        !function()
        {
            let block = BuildElement.block();
            let htmlElementBlock = block.getElement();

            let intervalOne = null;
            let counter = 0;
            let numberLangage = langageArray.length-1; // for array
            let repeat = function()
            {
                let name  = langageArray[counter].name;
                let field = BuildElement.blockField(name);

                htmlElementBlock.appendChild(field.getElement());

                configs.selector.appendChild(htmlElementBlock); // insertion in DOM
                if(counter == numberLangage) clearInterval(intervalOne);
                Animate.show(counter); // Animate
                counter++;
            };
            intervalOne = setInterval(repeat,configs.speed); 
        }();
        return this;
    };

    /**
     * @description this method allow slide frame
     */
    skill.slide = function()
    {
        !function(){
            let block = BuildElement.block();
            let htmlElementBlock = block.getElement();

            let intervalOne = null;
            let counter = 0;
            let numberLangage = langageArray.length-1; // for array
            
            let repeat = function()
            {
                let name  = langageArray[counter].name;
                let field = BuildElement.blockField(name);

                htmlElementBlock.appendChild(field.getElement());
                configs.selector.appendChild(htmlElementBlock); // insertion in DOM
                if(counter == numberLangage) clearInterval(intervalOne);
                Animate.slide(counter); // Animate
                counter++;
            };
            intervalOne = setInterval(repeat,configs.speed); 
            
        }();
        return this;
    };

     /**
     * @description this method allow slide frame
     */
    skill.progress = function()
    {
        return this;
    };

    /**
     *  Manager Element
     *  BuildElement [Module Element] 
     *  @description - This module allow to create and add element in page web
     * 
     */
    var BuildElement = (function()
    {
        let self     = {};
        
        /**
         * Represent Major block
         * @return {string}
         */
        self.block = function()
        {
            let block   = new BlockObject();
                block.setTitle(new TitleObject('h4', 'jsskill-head', configs.title));
            return block;
        };
        /**
         * Represents the block Field
         * @param {string} name - this is a param is for block text
         * @return {string}
         */
        self.blockField = function(name)
        {
            let _Field  = new FieldObject();
            let _skill  = new SkillObject();
            let counter = 0;

            while (configs.ladder>counter) 
            {
                let factory = new Factory(configs.width, configs.space, configs.color, counter);
                let polygon  = factory.createPolygon(configs.type);
                _skill.setFrame(polygon);
                counter++;
            }
            _skill.setClear(new ClearObject());
            _Field.setText(new TitleObject('div', 'jsskill-text',name));
            _Field.setSkill(_skill);
            _Field.setClear(new ClearObject());
            return _Field;
        };

        /**
         * Represent the Element Object
         * @description this is method create element
         * @constructor ElementObject
         * @param {string} element - this is element we should create
         * @param {string} $class - this is a class we should append
         * @return {string}
         */
        function ElementObject(element, $class){
            /**
             *  Element div by default
             */
            this._elementHtml = document.createElement(element); // element div for  DOM
            this._class = $class;

            /**
             *  Add $class of the block
             *  @param {string} $class - this is the title of the block
             */
            this.setClass =($class)=>{
                this._class = $class;
            }
            /**
             *  Add class again
             *  @param {string} $class - this is the title of the block
             */
            this.addClass =($class)=>{
                this._elementHtml.classList.add($class);
            };
            /**
             *  Get Element 
             *  @return {string}
             */
            this.element = ()=>{
                this._elementHtml.setAttribute('class',this._class);
                return this._elementHtml;
            };
        }
        /**
         * Represent th title major 
         * @description this is method all to build  title object
         * @constructor  TitleObject 
         * @param {string} element - this is element we should create
         * @param {string} $class  - this is a class we should append
         * @param {string} nodeText - this is a text of the title
         * @return {string}
         */
        function TitleObject(element,$class, nodeText){
            ElementObject.call(this,element, $class);
            this._nodeText = nodeText;

            /**
             *  Add nodeText
             *  @param {string} nodeText - this is the nodeText of the title
             */
            this.setText =(nodeText)=>{
                this._nodeText = nodeText;
            };
            /**
             *  Get Element 
             *  @return {string}
             */
            this.getElement = ()=>{
                let htmlElement = this.element();
                htmlElement.innerHTML = this._nodeText;
                return htmlElement;
            };
        }
        /**
         * Represent the clear Object
         * @description This is method allow to build clear object
         * @constructor  ClearObject
         */
        function ClearObject(){
            ElementObject.call(this,'div','clear');

            this.getElement  = ()=>{
                let htmlElement = this.element();
                return htmlElement;
            }
        }

        /**
         * Represents the block object
         * @description This is method allow to build block object
         * @constructor  BlockObject
         * @param {TitleObject} title - this is the title of block
         * @param {FieldObject} field - this is the field of block
         * @return {string} 
         */
        function BlockObject(title, field){
            ElementObject.call(this, 'div', 'jsskill-block');

            this._field = field;
            this._title = title;
            /**
             *  Add title of the block
             *  @param {TitleObject} title - this is the title of the block
             */
            this.setTitle =(title)=>{
                this._title = title;
            };

            /**
             *  GET the title of the block
             *  @return {TitleObject}
             */
            this.getTitle =()=>{
                return this._title
            };

            /**
             *  Add field object
             *  @param {FieldObject} field - this is the field object of the block
             */
            this.setField = (field)=>{
                this._field = field;
            };

            /**
             *  Get collection field
             *  @return {array}
             */
            this.getField =()=>{
                return this._field;
            };

             /**
             *  Get Element 
             *  @return {string}
             */
            this.getElement = ()=>{
                let htmlElement = this.element();
                    htmlElement.appendChild(this._title.getElement());
                return htmlElement;
            };
        }

       /**
         * Represents the Field object
         * @description This is method allow to build field object
         * @constructor  FieldObject
         * @param {TitleObject} title - this is the title of Field
         * @param {SkillObject} Skill - this is the skill of Field
         * @param {ClearObject} clear - this is  the clear of Field
         * @return {string} 
         */
        function FieldObject(title, skill, clear){
            ElementObject.call(this,'div', 'jsskill-field');
            this._skill  = skill;
            this._text   = title;
            this._clear  = clear;

            /**
             * Add text innerHTML 
             * @param {string} text - this is the text of Field Object
             */
            this.setText = (title)=>{
                this._text = title;
            };

            /**
             *  Add field object
             *  @param {SkillObject} skill - this is is the frame object of the skill
             */
            this.setSkill = (skill)=>{
                this._skill = skill;
            };

            /**
             *  Add Clear object
             *  @param {ClearObject} clear - this is is the clear object of the skill
             */
            this.setClear = (clear)=>{
                this._clear = clear;
            };

            /**
             *  Get Element 
             *  @return {string}
             */
            this.getElement = ()=>{
                let htmlElement = this.element();
                htmlElement.appendChild(this._text.getElement());
                htmlElement.appendChild(this._skill.getElement());
                htmlElement.appendChild(this._clear.getElement());
                return htmlElement;
            };
        }
         /**
         * Represents the skill object
         * @description This is method allow to build skill object
         * @constructor  SkillObject
         * @param {array} frames - this is the collection frame of skill Object
         * @param {ClearObject} clear - this is  the clear of Field
         * @return {string} 
         */
        function SkillObject(frames=[], clear){
            ElementObject.call(this, 'div', 'jsskill-skill');
            let _frames = frames;
            this._clear = clear;
            
            /**
             * Add object frame 
             * @param {Polygone} frame - this is the frame of Skill Object
             */
            this.setFrame = (frame)=>{
                _frames.push(frame);
            };

            /**
             * Add text innerHTML 
             * @param {ClearOject} clear - this is the clear of Skill Object
             */
            this.setClear = (clear)=>{
                this._clear = clear;
            };

             /**
             *  Get Element 
             *  @return {string}
             */
            this.getElement = ()=>{
                let htmlElement = this.element();
                let liste = _frames;
                let cardinalFrame = liste.length;
                let k= 0;
                while(cardinalFrame>k)
                {
                    let polygon = liste[k].getElement();
                    htmlElement.appendChild(polygon);
                    k++;
                } 
               htmlElement.appendChild(this._clear.getElement());
               return htmlElement;
            };
            
        }
        /**
         * Represent a polygon
         * @constructor
         * @param {string} width   - The width of the polygon
         * @param {number} space   - the gap between polygon
         */
        function Polygon(width,space, color)
        {
            ElementObject.call(this,'div','keyframe');
            this._width   = width;
            this._space   = space;
            this._color   = color;
        }
        /**
         * Represent a cercle 
         * @constructor
         * @param {string} width - The width of the polygon
         * @param {number} space - the gap between polygon 
         * @param {string} color - the colorof the cercle
         * @param {int} number   - the number  left of the cercle
         * @return {string}
         */
        function Cercle(width, space, color,number)
        {
            Polygon.call(this, width, space, color);
            this._marginLeft= width*number+space;
            /**
             * @return {string} 
             */
            this.getElement = function()
            {
                let htmlElement  = this.element();              
                   //htmlElement.style.borderColor = this.color;
                return htmlElement;
            }
        }
        
        /**
         *  Factory
         *  @param {array} data - the data
         */
        function Factory(width, space, color, margeLeft)
        {
            let polygon = null;
            this.createPolygon = function(type)
            {
                if(type== "circle"|| type=="cercle"){
                    polygon = new Cercle(width, space, color, margeLeft);
                }else{
                    polygon = new Cercle(width, space, color, margeLeft);
                }
                return polygon;
            };
        }


        return self;
    })();

    /**
     *  Manager Animate 
     *  Animate [Module animate element]
     *  @description - This module allow to animate every element we build
     * 
     */
    var Animate  = (function()
    {
        let self       = {};
        let listeField  = document.getElementsByClassName('jsskill-field');
        /**
         *  Show
         *  @description - This method allow to display every frame after ten seconds
         */
        self.show = function(numberField)
        {
            let OneField         = listeField[numberField];
            let secondChildField = OneField.childNodes[1];
            let Frames           = secondChildField.getElementsByClassName('keyframe');
            let counter          = 0;
            let left = configs.width+configs.space;
            let params           = {
                cardinal : Frames.length-1,
                one :{
                    speed: 100,
                    intervalId: null,
                },
                two : {
                    speed: 50,
                    intervalId: null,
                },
            }

            /**
             * Repeat 
             * @description cette fonction permet repeter 
             */
            let repeat = function()
            {
                if(Frames[counter].classList.contains("keyframe")) {
                    Frames[counter].classList.add('show');
                    let margin = left * counter;
                    Frames[counter].style.marginLeft= margin+"px";  
                } 
                if(counter==params.cardinal) {
                    let level = langageArray[numberField].level-1;
                    let counter = 0;
                    params['two'].intervalId = setInterval(function(){
                    Frames[counter].classList.add('cercle');
                        if(level == counter) {
                            clearInterval(params['two'].intervalId);
                        }
                        counter++;
                    },params['two'].speed);
                    clearInterval(params['one'].intervalId);
                }
                counter++;
            };
            params['one'].intervalId = setInterval(repeat,params['one'].speed);
        };

        /**
         * Show slide
         * @description - This method allow to show with sliding
         */
        self.slide = function(numberField)
        {
            let OneField         = listeField[numberField];
            let secondChildField = OneField.childNodes[1];
            let divs = secondChildField.getElementsByClassName('keyframe');
            let frames  = {};
            let deCounter= configs.ladder-1;
            let s = 1, k=0;
            let left = configs.width+configs.space;
            let level = langageArray[numberField].level-1;
            let speed=5;
           

            while(deCounter>=0){
                frames['o'+deCounter] = {
                    id:deCounter,
                    left: left*deCounter,
                    pos:deCounter,
                    speed:speed*s,
                    params : {
                        one :{
                            speed: speed*s,
                            intervalId: null
                        },
                        two :{
                            speed: speed*s/2,
                            intervalId: null
                        }
                    },
                    div : divs[deCounter]
                 }; 
                deCounter--;
                s++;
            }
            !function(){
                let deCrement  = configs.ladder-1;
                let deCrement2 = configs.ladder-1;
                while(deCrement>=0){
                    let id     = frames['o'+deCrement].id;
                    let left   = frames['o'+deCrement].left;
                    let pos    = frames['o'+deCrement].pos;
                    let params = frames['o'+deCrement].params;
                    let div    =  frames['o'+deCrement].div;
                    if(div.classList.contains("keyframe")) div.classList.add('show');

                    let onCounter = 0;
                    if(deCrement==id){
                        params['one'].intervalId = setInterval(()=>{ 
                            if(pos==left){
                                clearInterval(params['one'].intervalId);
                              
                            }else{
								pos++;
                                div.style.left=pos+'px'; 
                            }
                       },params['one'].speed);
                    }
                    deCrement--;
                }

                let counter = 0;
                while (level>counter) {
                    divs[counter].classList.add('cercle');
                    counter++;
                } 
            }();
        };
        return self;
    })();
	return skill;
})();
if(window.JsSkills){window.skill = JsSkills;}