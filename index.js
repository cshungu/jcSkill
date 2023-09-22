import { sgjs } from "./sgjs.js";


sgjs().option({ selected: 'app', frame: "cercle" , ladder: 10, Function: 'progress'})
    .add({
        titre: 'Langage & Framework',
        frames: [
            { name: 'html/css', level: 5 },
            { name: 'angular', level: 9 },
            { name: 'javascript', level: 5 },
            { name: 'jquery', level: 3 },
            { name: 'symfony', level: 4 },
            { name: 'php', level: 5 },
            { name: 'c#', level: 3 } 
        ]
    }).animate();