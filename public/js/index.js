/**
    * @description      : 
    * @author           : christian
    * @group            : 
    * @created          : 05/09/2021 - 14:35:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 05/09/2021
    * - Author          : christian
    * - Modification    : 
**/
(function () {
    
    Jc.option({ selected: 'app', frame: "cercle" , ladder: 10, Function: "progress"})
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