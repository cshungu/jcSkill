/**
* Name: skills
* description: This extract Module is intended for developpers. it can express the competence in a block
* Auteur: Christian Shungu
* Date: 29/10/2016.
*
* version: 1.0.0
*/

var JsSkills = (function(){
	
	var skill = {}, // the main objects
	    build = {}, // object Build Element for DOM 
        
        options = {};
        
        /*
         * Methode insert insert DOM
         */
        selectDom = {
             $jsskill : document.getElementById('jsskill')
        };
        
	
	var langageArray    = [],
		frameworkArray  = [],
		anotherArray    = [],
		defaulType = [],
        champs = [];
	
	skill.set = function(type="another",objects = []){ 
		 if(Array.isArray(objects)){ 
             if(type == "langage"){L(objects);}
             else if(type == "framework"){ F(objects);}
             else{ A(objects)}
         }
		 else{throw new TypeError(objects+' is not array');}
         return this;
	}

    skill.op = function(option){
          options = option;
          return  this;
    }
	
	function F(frameworks){
        for(var frame in frameworks){
           frameworkArray.push(frameworks[frame])
        }
    }
	function L(langages){
        for(var lang in langages){
           langageArray.push(langages[lang]);
        }
    }
	function A(anothers){
        for(var another in anothers){
           anotherArray.push(anothers[another]);
        }
    }
	skill.init = function(){ // initialising
          var block =  build.buildBlockLangage();
              selectDom.$jsskill.appendChild(block);
              console.log(parseInt(options.number));
              console.log(options);
              console.log(frameworkArray);
              return this;
	}
    
	build.add = function(balise){ // create à new element by add.
		var div  = document.createElement(balise);
		    return div;
	}
    build.buildBlockLangage = function(){ // Mtheode block
        var h2 = build.add('h2');
            h2.innerHTML = "Langage";
            var block = build.add('div');
            block.setAttribute("class","jsskill-block");
           if(langageArray.length !== null){
               block.appendChild(h2);
               for(var item in langageArray){ build.field(langageArray[item].name,langageArray[item].level);}
               for(var champ in champs){  block.appendChild(champs[champ]);}
           }
           return block;
    }
    build.field = function (name, level){ // Methode build the field 
        var field = build.add('div');
		    field.setAttribute("class","jsskill-field");
        var text = build.add('div');
		    text.setAttribute("class","jsskill-text");
            text.innerHTML = name;
            field.appendChild(text);
        var skill = build.add('div');
		    skill.setAttribute("class","jsskill-skill");
        var clear = build.add('div');
		    clear.setAttribute("class","jsskill-clear");
            var l = 1;
            while(l <= parseInt(options.number)){// number
               var circle = build.add('div');
			       circle.setAttribute("class", "jsskill-skill-"+options.figure);
                   skill.appendChild(circle);
                   l++;
            } 
            for(var i = 0; i<parseInt(level); i++){
                skill.children[i].classList.add(options.figure);
            }
            skill.appendChild(clear);
            field.appendChild(skill);
            field.appendChild(clear);
            champs.push(field);
    }
	return skill;
})();
if(window.JsSkills){window.sk = JsSkills;}
