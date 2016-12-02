/**
 * Created by richard on 27/09/2016.
 */
/*global bootbox*/
jQuery((function($) {
   var utile = new Codevanilla_Utile();
    var paginationObject ={offset:0,limit:10,total_rows:200};
    var HEADER_CLASS = 'sortHeader';
    var rowDef =[
        {
            header:{title:'name'},
            display:[{row:'name'}],
            className:{literal:'specialTd'},
            action:[{type:'click',func:moreInfo,args:[{type:'row',value:true}]},{type:'mouseover',func:console.log,args:[{type:'lookup',value:'name'}]}]


        },
        {
            header:{title:'email',sortField:'email'},
            display:[{func:makeEmailLink,args:[{type:'lookup',value:'email'}]}]


        },
        {
            header:{title:'Website'},
            display:[{literal:'http://www.'},{row:'website'}],
            className:{func:isADotCom,args:[{type:'lookup',value:'website'}]}
        }
    ];


    function moreInfo(row){
        console.log(row);
        var message = row.name+"'s company catchphrase is: "+row.company.catchPhrase;
        bootbox.alert({title:row.name,'message':message});
    }

    function makeEmailLink(emailStr){
        return $('<a/>').text(emailStr).attr('href','mailto:'+emailStr);
    }

    function isADotCom(address){
       return (address.indexOf('.com')>-1)?'dotCom':'';

    }

    function pretendTopaginate(){
        var message  = "Generally The button will increment the offset in the paginationObject to maintain the state of the pagination on the client" ;
        bootbox.alert({title:'pretend pagination','message':message});
    }

    function buildTestTable(result){
    utile.buildTable(rowDef,result,'#table_holder','uitle_table',paginationObject,pretendTopaginate,HEADER_CLASS);
    }

    function setup(){
        console.log('i\'m alive');
        buildTestTable(data);
        $('#uitle_table').on('header_sort',function(event,field,id){
            console.log('sort triggered',event,field,id)
        })
    }
return setup;
})(jQuery));
