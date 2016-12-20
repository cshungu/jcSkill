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
        
	
	var langageArray    = [], // Array For langage
		frameworkArray  = [], // Array For framework
		anotherArray    = [], // For something else.
		defaulType = [],
        champs = [];  // every field build 
	
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
              console.log(block);
              return this;
	}

	build.add = function(balise){ // create à new element by add.
		var div  = document.createElement(balise);
		    return div;
	}
    build.buildBlockLangage = function(){ // Metheode block
        var h4 = build.add('h4');
            h4.innerHTML = "Langage";

            var block = build.add('div');
            block.setAttribute("class","jsskill-block");

           if(langageArray.length !== null){
               block.appendChild(h4);
               for(var item in langageArray){ 
                   build.field(langageArray[item].name, langageArray[item].level);
               }

               for(var champ in champs){  block.appendChild(champs[champ]);}
           }
           return block;
    }
    build.field = function (name, level){ // Methode build the field  whose take two param name and level

        var field = build.add('div'); // Make div field
		    field.setAttribute("class","jsskill-field");

        var text = build.add('div');
		    text.setAttribute("class","jsskill-text");
            text.innerHTML = name;
            field.appendChild(text); // Add the text in the field

        var skill = build.add('div'); // Make  the skill
		    skill.setAttribute("class","jsskill-skill");
        var ul = build.add('ul'); // Make  the skill

        var clear = build.add('div');
		    clear.setAttribute("class","jsskill-clear");
            
            var l = 1;
            while(l <= parseInt(options.number)){// number
                 var li = build.add('li');
                     li.setAttribute("class", "jsskill-skill-"+options.figure);
                     ul.appendChild(li);
                      l++;
             } 
            for(var i = 0; i<parseInt(level); i++){
                ul.children[i].classList.add(options.figure);
            }
           skill.appendChild(ul);
           field.appendChild(skill);
           field.appendChild(clear);
           champs.push(field); //Add in array 
           
    }
	return skill;
})();
if(window.JsSkills){window.sk = JsSkills;}
