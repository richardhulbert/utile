/**
 *
 * @author Richard Hulbert
 *
 */
/*global bootbox */
/*global console */


var Codevanilla_Utile = function(){


    /**
     * This function takes a bootstrap button with a glyphicon icon and two special attributes
     * data-icon-1 and data-icon-2 each of these attributes contains the classname for their respective icon
     * @memberOf jQuery.fn
     * @param {Object} button
     * @param {boolean} status [optional] allows us to set the status of a button. True
     * @param {string} label [optional] allows you to change the text of the button
     */
    function toggleIcon(button,status,label){
        // is this a fontawsome button or a glyphicon button
        /* jshint expr: true */
        var fa = $(button).find('i').length===1;
        if(status===null) status = $(button).hasClass('toggled')===false;
        if(status){
            fa ? $(button).addClass('toggled').children('i.fa').removeClass($(button).attr('data-icon-2')).addClass($(button).attr('data-icon-1')):$(button).removeClass('toggled').children('span.glyphicon').removeClass($(button).attr('data-icon-2')).addClass($(button).attr('data-icon-1'));

        }else{

            fa ? $(button).removeClass('toggled').children('i.fa').removeClass($(button).attr('data-icon-1')).addClass($(button).attr('data-icon-2')): $(button).addClass('toggled').children('span.glyphicon').removeClass($(button).attr('data-icon-1')).addClass($(button).attr('data-icon-2'));
        }
        if(!!label)  $(button).html(fa ?$(button).find('i')[0]:$(button).find('span')[0]).append(label);
        return status;
    }

    function formatDateAsDaysSince(datestring,withtitle){
        if(datestring===null||datestring==='') return ' - ';
        var oneMinute = 60*1000;
        var oneHour= oneMinute*60;
        var oneDay = 24*oneHour; // hours*minutes*seconds*milliseconds
        var oneWeek = 7*oneDay; // hours*minutes*seconds*milliseconds
        var oneYear = 52*oneWeek; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(datestring);
        var secondDate = new Date();// now
        var in_the_past= firstDate.getTime() - secondDate.getTime() < 0;
        var diffMinute = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneMinute)));
        var diffHours = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneMinute)));
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var diffweeks= Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneWeek)));
        var diffyear= Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneYear)));
        if(diffMinute<3) return (!!withtitle)?addTitleAttr('Just now',datestring):'Just now';
        if(diffMinute<60) return (!!withtitle)?addTitleAttr(diffMinute+ (in_the_past?' Minutes ago':' Minutes left'),datestring):diffMinute+(in_the_past?' Minutes ago':' Minutes left');
        if(diffHours<6) return (!!withtitle)?addTitleAttr(diffHours+ (in_the_past?' Hours ago':' Hours left'),datestring):diffHours+(in_the_past?' Hours ago':' Hours left');
        if(diffDays===0) return (!!withtitle)?addTitleAttr('Today',datestring):'Today';
        if(diffDays===1) return (!!withtitle)?addTitleAttr(in_the_past?'Yesterday':'Tomorrow',datestring):in_the_past?'Yesterday':'Tomorrow';
        if(diffDays<14) return  (!!withtitle)?addTitleAttr(diffDays+ (in_the_past?' Days ago':' Days left'),datestring):diffDays+(in_the_past?' Days ago':' Days left');
        if(diffweeks>1 && diffweeks<52) return  (!!withtitle)?addTitleAttr(diffweeks+ (in_the_past?' Weeks ago':' Weeks left'),datestring):diffweeks+(in_the_past?' Weeks ago':' Weeks left');
        if(diffyear>1) return  (!!withtitle)?addTitleAttr(diffyear+(in_the_past?' Years ago':' Years left'),datestring):diffyear+(in_the_past?' Years ago':' Years left');
        if(diffyear===1) return  (!!withtitle)?addTitleAttr(diffyear+(in_the_past?' Year ago':' Year left'),datestring):diffyear+(in_the_past?' Year ago':' Year left');
        return datestring;

    }

    function addTitleAttr(string,title){
        return $('<span/>').attr({'data-toggle':"tooltip", 'data-placement':"auto left",'title':title}).text(string);
    }
    /**
     * converts the line breaks into br tags
     * @memberOf jQuery.fn
     * @param {string} str the string that you want to convert
     * @retun {string} the converted string
     */
    function nl2br(str){
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    /**
     * convertes the br tags into line breaks
     * @memberOf jQuery.fn
     * @param {string} html the sting that you want to convert
     * @retun {string} the converted string
     */
    function br2nl(html){
        return html.replace(/<br\s*[\/]?>/gi, "\n");
    }
    /**
     * returns a row from an array of rows given a filed key and a value for that key
     * @memberOf jQuery.fn
     * @param {Array} arr the array we are going to search
     * @param {string} key the key we are glong to try to match
     * @param val
     * @returns {object}
     */
    function findRowBykey(arr,key,val){
        var row = null;
        $.each(arr,function(index){

            if(arr[index][key]===val){
                row= arr[index];
            }
        });
        return row;
    }
    /**
     * takes an array of objects and outputs an array of values for a key in each object
     * @param {Array}  arr array of objects
     * @param {string} key  can be a simple key or an expression such as key.subkey
     * @memberOf jQuery.fn
     * @returns {Array} straight array of values
     *
     */
    function extractValuesByKey(arr,key){
        var f=[];
        $.each(arr,function(index,value){
            //jshint unused:false
            /*jshint evil:true */
            f.push(eval('value.'+key));
        });
        return f;
    }

    /**
     * This function builds a select element with a pre selected id
     * @param {Array} arr of objects
     * @param {string} label
     * @param {int} [id] to match ( the initial value)
     * @param {string} [idfield] the field name for when the record set has a nonstandard id
     */
    function buildSelector(arr,label,id,idfield){
        var sel = $('<select />').addClass('form-control');
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            $('<option/>').attr('value',!!idfield?row[idfield]:row.id).text(row[label]).appendTo(sel);
        }
        if(id!==undefined){
            return $(sel).val(id);
        }else{
            return sel;
        }
    }
    /**
     * This function builds table rows based on a row definition, an array containing the row objects,
     * a target (usually the table body) and whether to append it to the table or empty the table contents
     * @param {Object} rowDef a complex object that defines the content and attributes of each td in the row
     * @param {Array} rows containing objects containing name value pairs for each field
     * @param {string} target where the returned rows are appended to
     * @param {boolean} appendToTable whether to clear the table (true) or not
     */
    function buildTableRows(rowDef,rows,target,appendToTable){
        /* jshint loopfunc:true */
        if(appendToTable===undefined||appendToTable===true){ target.empty();}
        for(var i=0;i<rows.length;i++){
            var row= rows[i];
            // lets create the TR tag and add the data to it
            var tr= $('<tr/>').data(row).addClass('dataRow').appendTo(target);
            // now lets look at the definition of the TDs and create and add them to the TR
            $.each(rowDef,function(index,td){
                // lets now create the text for our td
                var TD = $('<td/>').appendTo(tr);
                var txt ='';
                $.each(td.display,function(key,val){
                    if(!!val.func) {

                        $(TD).append(val.func.apply(this,parseArguments(row,val.args)));

                    }
                    if(!!val.row) {$(TD).append(row[val.row]);}
                    if(!!val.literal){$(TD).append(val.literal);}

                });
                // is there an action that we want such as a click event?
                if(td.action!==undefined){
                    switch (td.action.type){
                        case 'click':$(TD).click(function(){
                            td.action.func($(this).closest('tr').data()[td.action.data]);
                        }).addClass('quasiLink');
                            break;
                    }
                }else{
                    if(txt!=='') TD.html(txt);
                }
                // ok what about adding a class to the TD
                if(td.className!==undefined){
                    // we can pass a literal string or a function based upon the data in the row
                    if(!!td.className.func){
                        //ok this is a function so lets add the class based on the function
                        TD.addClass(td.className.func(row[td.className.row]));
                    }else{
                        // just add the literal string
                        TD.addClass(td.className.literal);
                    }

                }
            });


        }

    }
    /**
     * This method prepares the arguments for a function
     * Argument objects with a type of 'lookup' will return the value found in the row object (if there is one)
     * Other arguments are just added to the array that is returned.
     * @param {object} row a record containing data
     * @param {Array} fields {type:'lookup':value:'fieldname',type:'literal',value:123}
     * @returns {Array} to be used as the second argument in func.apply(this, returedFromparseArguments)
     *
     */
    function parseArguments(row, fields) {
        var args = [];
        $.each(fields, function(index, value) {
            if (value.type ==='lookup'){
                // lookup from row object
                args.push(row[value.value]);
            }else{
                // just add the literal value
                args.push(value.value);
            }
        });
        return args;
    }


    /**
     * Acts on the passed orderObj which in turn updates the status of the UI (TH tag passed in by id reference)
     * The orderObj is a singular objectthis is passed to the search method to achive sort order.
     * @param {string} controller The id of the clicked object
     * @param {string} controllerClass one for each table on a page
     * @param {Object} orderObj consists of field (in the db), controller (the id of the TH) and direction (either DESC or ASC)
     * @param {Object} orderDefaultObj is structured as the orderObj but contains default sort properties.
     * @memberOf jQuery.fn
     */
    function setTableOrder(controller,controllerClass,orderObj,orderDefaultObj){
        var hashedId = '#'+controller;
        if(orderObj.controller!==controller){

            // we are starting to order by a new column so reset every selector
            $(controllerClass).removeClass('active desc asc');
            $(controllerClass+' i').removeClass('fa-sort-desc fa-sort-asc').addClass('fa-sort');
            $(hashedId).addClass('active desc');
            $(hashedId).find('i').removeClass('fa-sort').addClass('fa-sort-desc');
            orderObj.controller=controller;
            orderObj.field=$(hashedId).attr('data-sort-field');
            orderObj.direction='DESC';
        }else{
            if(orderObj.direction==='DESC'){
                $(hashedId).removeClass('desc').addClass('asc');
                $(hashedId).find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc');
                orderObj.direction='ASC';
            }else if(orderObj.direction==='ASC') {
                $(controllerClass).removeClass('active desc asc');
                $(controllerClass+' i').removeClass('fa-sort-desc fa-sort-asc').addClass('fa-sort');
                orderObj.field=orderDefaultObj.field;
                orderObj.direction=orderDefaultObj.direction;
                orderObj.controller=null;
            }
        }

    }
    /**
     * Builds a pagination button (if required), that updates the passed pagination object.offset and
     * inserts it into the DOM attaching it to the target
     *
     *  @memberOf jQuery.fn
     *  @param {string} target jquery selector to add the more... button to
     *  @param {object} pagniationObj pagniation object consists of offset and limit
     *  @param {function} clickFunction the function fired by the button
     */
    function buildPaginationUI(target,pagniationObj,clickFunction){
        console.log(pagniationObj)
        $(target).empty().html(
            (parseInt(pagniationObj.offset)+parseInt(pagniationObj.limit) < parseInt(pagniationObj.total_rows) )?
                $('<button/>').text("more...").addClass('btn btn-primary col-md-offset-5').click(function(){
                    pagniationObj.offset= parseInt(pagniationObj.offset)+parseInt(pagniationObj.limit)
                    clickFunction(true);
                }):''
        )
    }
    /**
     * General function for sending and receiving via ajax
     * relies on bootbox to show errors
     * @param {string} service the address of the API or end point
     * @param {string} type either GET,POST,PUT,DELETE
     * @param {string} address the API endpoint
     * @param {function} resultTo which function to send the results to
     * @param {object} [params] an object of key:value pairs
     * @param {string} [waitobjectSelector] the selector for the wait object (spinner)
     */
    function doAjax(service,type,address,resultTo,params,waitobjectSelector){
        if(typeof resultTo !=='function') console.error('You must pass a functionn to doAjax'+resultTo);
        var params =  (params === undefined)?'':'?'+jQuery.param( params );
        if(waitobjectSelector!== undefined) $(waitobjectSelector).addClass('active');
        $.ajax({
            type:type,
            url: service+address+params,
            success:function(result){
                if(waitobjectSelector!== undefined) $(waitobjectSelector).removeClass('active');
                if(result.error===undefined){
                    resultTo(result);
                }else{
                    bootbox.alert(result.error);
                }
            },
            error:function(result){
                if(waitobjectSelector!== undefined) $(waitobjectSelector).removeClass('active');
                if(!!result.responseJSON){
                    bootbox.alert(result.responseJSON.error);
                }else{
                    bootbox.alert(result.responseText);
                }
            }

        });
    }


       return {
           'doAjax':function(service,type,address,resultTo,params,waitobjectSelector){doAjax(service,type,address,resultTo,params,waitobjectSelector)},
           'buildSelector':function(arr,label,id,idfield){return buildSelector(arr,label,id,idfield)},
           'buildTableRows':function(rowDef,rows,target,appendToTable){buildTableRows(rowDef,rows,target,appendToTable)},
           'formatDateAsDaysSince':function(datestring,withtitle){return formatDateAsDaysSince(datestring,withtitle)},
           'setTableOrder':function(controller,controllerClass,orderObj,orderDefaultObj){setTableOrder(controller,controllerClass,orderObj,orderDefaultObj)},
           'buildPaginationUI':function(target,pagniationObj,clickFunction){buildPaginationUI(target,pagniationObj,clickFunction)},
           'toggleIcon':function(button,status,label){toggleIcon(button,status,label)},
           'nl2br':function(str){ return nl2br(str) },
           'br2nl':function(str){ return br2nl(str) },
           'findRowBykey':function(arr,key,val){ return findRowBykey(arr,key,val)},
           'extractValuesByKey':function(arr,key){return extractValuesByKey(arr,key)},
           'addTitleAttr':function(string,title){ return addTitleAttr(string,title)},
        };




}


