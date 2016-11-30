(function(){

   // This part is significant in developement
    var options = {
        color: "#000",
        figure:"square", // By default circle [ circle, square, progress, auto],
        number: 5
    };
    JsSkills.set('langage',[{ name:'html/css', level: 5},{ name:'javascript', level:4},{ name:'c#', level:2},{ name:'php', level:4}])
            .set('framework',[{ name:'symfony',level:3},{ name:'jquery', level:4},{ name:'angular', level:3}])
            .op(options)
            .init();
})();