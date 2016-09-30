/**
 * Created by richard on 27/09/2016.
 */
jQuery((function($) {
   var utile = new Codevanilla_Utile();
    var rowDef =[
        {
            header:{title:'name'},
            display:[{row:'name'}],
            className:{literal:'specialTd'},
            action:[{type:'click',func:moreInfo,args:[{type:'row',value:true}]},{type:'mouseover',func:console.log,args:[{type:'lookup',value:'name'}]}]


        },
        {
            header:{title:'email'},
            display:[{func:makeEmailLink,args:[{type:'lookup',value:'email'}]}]


        },
        {
            header:{title:'Website'},
            display:[{literal:'http://www.'},{row:'website'}],
            className:{func:isADotCom,args:[{type:'lookup',value:'website'}]}
        }
    ];


    function moreInfo(row){
        console.log(row)
        message = row.name+"'s company catchphrase is: "+row.company.catchPhrase;
        bootbox.alert({title:row.name,'message':message});
    }

    function makeEmailLink(emailStr){
        return $('<a/>').text(emailStr).attr('href','mailto:'+emailStr);
    }

    function isADotCom(address){
       return (address.indexOf('.com')>-1)?'dotCom':'';

    }

    function buildTestTable(result){
    utile.buildTable(rowDef,result,'#table_holder','uitle_table');
    }

    function setup(){
        console.log('i\'m alive');
        buildTestTable(data);
    }
return setup;
})(jQuery));
