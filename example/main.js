(function(){
    Jc.param({
        color: "#FFA07A", frame:"cercle",
        ladder:10, speed:1000, 
        number: 5, selected:'jsskill'
    }).addBlock('Langage & Framework', [
        {name:'html/css', level: 8},{name:'angular', level:9},
        {name:'javascript', level:5},{name:'jquery', level:3},
        {name:'symfony',level:4}, {name:'php', level:5},
        {name:'c#', level:3}
    ]).animate();
 })();