/**
    * @description      : 
    * @author           : christian
    * @group            : 
    * @created          : 07/10/2021 - 21:07:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/10/2021
    * - Author          : christian
    * - Modification    : 
**/
import "./sass/jcskill.scss";
import "./app.scss";
import { Jc } from "./ts/jcskill";

(function () {
    let arrFunc = ["show", "progress"];
    let randfunc: string = arrFunc[Math.floor(Math.random() * arrFunc.length)];

    Jc.option({ selected: 'app', frame: "cercle" , ladder: 10, Function: `${randfunc}`})
        .add({
            titre: 'Langage & Framework',
            frames: [
                { name: 'html/css', level: 8 },
                { name: 'angular', level: 9 },
                { name: 'javascript', level: 5 },
                { name: 'jquery', level: 3 },
                { name: 'symfony', level: 4 },
                { name: 'php', level: 5 },
                { name: 'c#', level: 3 } 
            ]
        }).animate();
 })();
