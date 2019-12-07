
# Module Jsskill ( create in javascript natif) version 1

How you can user this module

---

1. First of all, you should declare in your  page HTML the block
   like this:
   `<div id="jsskill"></div>`
2. Secondly, you can put your code in javascript.
   Look the code :

``` script
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
```

Utilisation du Module Jc

---
>Les fonctions utilitaire du module.
| Function                    | Description                  |
| --------------------------- | ---------------------------- |
| Jc.param(<Element option>)  | Fonction de configurations   |
| Jc.slide()                  | ?                            |
| Jc.show()                   | ?                            |
| Jc.progress()               | ?                            |
| Jc.animate()                | ?                            |
| Jc.addBloc()                | ?                            |

Linked logo: [![alt text](/favicon.ico)]
(http://keretben.com/jsskill "keretben")