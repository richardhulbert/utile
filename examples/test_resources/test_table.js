/**
 * Created by richard on 27/09/2016.
 */
/*global bootbox*/

jQuery((function($) {
    var utile = new Codevanilla_Utile();
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
    }

    function makeEmailLink(emailStr){
        return $('<a/>').text(emailStr).attr('href','mailto:'+emailStr);
    }

    function isADotCom(address){
       return (address.indexOf('.com')>-1)?'dotCom':'';

    }

    function pretendTopaginate(po){
        buildTestTable(getData(data,po.offset,po.limit));
    }

    function buildTestTable(result){

    utile.buildTable(rowDef,result.rows,'#table_holder','uitle_table',result.pagination, pretendTopaginate,HEADER_CLASS,parseInt($('#series_length').val()));
    }

    function setup(){
        buildTestTable(getData(data,0,parseInt($('#num_of_rows').val())));
        $('#uitle_table').on('header_sort',function(event,field,id){
            console.log('sort triggered',event,field,id)
        })
        $('#refresh').click(function(){
            buildTestTable(getData(data,0,parseInt($('#num_of_rows').val())));
        })
    }
return setup;
})(jQuery));
