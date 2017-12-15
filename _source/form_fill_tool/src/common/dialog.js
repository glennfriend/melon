import alertify from 'alertify.js';

const dialog =
{
    basic: function(message, second=3)
    {
        message = `
            <div style="font-family: hack; font-size: 8px;">
                ${message}
            </div>
        `;

        alertify
            .delay(second * 1000)
            .logPosition("bottom right")
            .log(message)
        ;
    },
    
    show: function show(message, second=10)
    {
        message = `
            <input type="button" value="Close" 
                   onclick=this.parentElement.remove()
                   style="float:right;">
            <div style="font-family: hack; font-size: 8px; min-width:300px;">
                ${message}
            </div>
        `;

        alertify
            .delay(second * 1000)   // 1000 = 1秒
            .logPosition("bottom right")
            .closeLogOnClick(false)
            .log(message, function(ev) {
            })
        ;
    },

};

export default dialog;
