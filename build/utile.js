/**
 *
 * @author Richard Hulbert
 *
 */
/*global bootbox */
/*global console */

/**
 *
 *  @constructor
 */
var Codevanilla_Utile = function(){


    /**
     * This method controls a bootstrap button with a glyphicon or fontawsome icon to toggle. The button needs two special attributes
     * data-icon-1 and data-icon-2 each of these attributes contains the classname for their respective icon.
     * You can force it to be in one state or another by passing the status argument
     * You can pass it a label
     *
     *
     * @param {Object} button The button object
     * @param {boolean} [status] Allows us to set the status of a button. True
     * @param {string} [label] Allows you to change the text of the button
     */
    function toggleIcon(button,status,label){
        // is this a fontawsome button or a glyphicon button
        /* jshint expr: true */
        button = typeof button==="object"?button:$(button);
        var fa = $(button).find('i').length===1;
        if(status==null) status = $(button).hasClass('toggled')===false;
        if(status){
            fa ? $(button).addClass('toggled').children('i.fa').removeClass($(button).attr('data-icon-2')).addClass($(button).attr('data-icon-1')):$(button).removeClass('toggled').children('span.glyphicon').removeClass($(button).attr('data-icon-2')).addClass($(button).attr('data-icon-1'));

        }else{

            fa ? $(button).removeClass('toggled').children('i.fa').removeClass($(button).attr('data-icon-1')).addClass($(button).attr('data-icon-2')): $(button).addClass('toggled').children('span.glyphicon').removeClass($(button).attr('data-icon-1')).addClass($(button).attr('data-icon-2'));
        }
        if(!!label)  $(button).html(fa ?$(button).find('i')[0]:$(button).find('span')[0]).append(label);
        return status;
    }

    /**
     * This method takes a date string (2015-03-14 15:36:01) or null and returrns either a
     * pretty sting such as Just now or n Days ago. If you pass it a second boolean argument
     * it will return a span with the orginal value as the title attribute (so that a user can see the exact date and time on a hover
     * @param {string} datestring In the currrent format 2015-03-14 15:36:01
     * @param {boolean} [withtitle] If you want
     * @returns {*} Either string with the pretty date or a span with the same and a title attribute that has value of passed string
     */
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

    /**
     * Takes a string and converts it into a span (jQuery object) and adds a title attribute
     * Useful when you want to highlight text. If you are using bootstrap it will force it to be a tooltip
     *
     * @param {string} string The text in the span
     * @param {string} title  The value of title attribute
     * @returns {*|jQuery} A span
     */
    function addTitleAttr(string,title){
        return $('<span/>').attr({'data-toggle':"tooltip", 'data-placement':"auto left",'title':title}).text(string);
    }
    /**
     * Converts the line breaks in a string into br tags
     *
     * @param {string} str the sting that you want to convert
     * @retun {string} the converted string
     */
    function nl2br(str){
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
    /**
     * Converts the br tags in a string into line breaks
     *
     * @param {string} html the sting that you want to convert
     * @retun {string} the converted string
     */
    function br2nl(html){
        return html.replace(/<br\s*[\/]?>/gi, "\n");
    }
    /**
     * Returns a row from an array of rows given a field key and a value for that key
     *
     * @param {Array} arr The array we are going to search
     * @param {string} key The key we are going to use to try to match the value
     * @param {*} val The value we are going to match against
     * @returns {array}
     */
    function findRowBykey(arr,key,val){
        var row = [];
        $.each(arr,function(index){

            if(arr[index][key]===val){
                row= arr[index];
            }
        });
        return row;
    }
    /**
     * <p>Takes an array of objects and outputs an array of values for a key in each object</p>
     * @example extractValuesByKey([{firstname:'Alice',lastname:'Bear'},{firstname:'Steve',lastname:'Farr'}] , 'firstname')
     * // outputs ['Alice','Steve']
     *
     * @example
     * //it can do nested object keys
     * extractValuesByKey([{firstname:'Alice',email:{public:'alice@acme.com',private:'alice@hotmail.com'},{firstname:'Steve',email:{public:'steve@acme.com',private:'steve@hotmail.com'}],'email.public')
     * //becomes ['alice@acme.com','steve@acme.com']
     *
     * @param {Array}  arr array of objects
     * @param {string} key  can be a simple key or an expression such as key.subkey
     *
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
     * Builds a select element with an optional pre selected id
     * @param {Array} arr of objects
     * @param {string} label the Key of the object whoes value will be the text of the option
     * @param {int} [id] to match ( the initial value)
     * @param {string} [idfield] The field name for when the record set has a nonstandard id
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
     * Builds a table based upon a table definition object using data
     * @param {Array} rowDef an array of column definitions
     * @param {Array} data and array of data objects
     * @param {Object|string} target a dom reference where the Table will reside
     * @param {String} tableId is dom Id that you want to give your table (so you can reference it later on
     * @param {Object} [paginationObject] an pagination object {offset:1,limit,10,total_rows:200}
     * @param {Function} [paginationClickFunction] the function that is going to run as a result of the button being clicked
     *
     */
    function buildTable(rowDef,data,target,tableId,paginationObject,paginationClickFunction,sortHeaderClass){
        target = typeof target==="object"?target:$(target);
        target.empty();
        var paginationTdId = Math.floor((Math.random() * 10000) + 1)+'_paginationTdId';
        var headerTr = $('<tr/>');
        var tbody = $('<tbody/>');
        var tfooter = $('<tfoot/>');
        var paginationtd = $('<td/>').attr({'colspan':rowDef.length,id:paginationTdId}).appendTo(tfooter);
        var table=$('<table/>').attr({id:tableId}).addClass('table table-bordered table-hover dataTable').append(
            $('<thead/>').html(headerTr)
        ).append(tbody).append(tfooter).appendTo(target);

        buildTableHeader(rowDef,headerTr,sortHeaderClass);
        buildTableRows(rowDef,data,tbody);
        if(paginationObject !=undefined && paginationClickFunction!=undefined&& (parseInt(paginationObject.offset)+parseInt(paginationObject.limit) < parseInt(paginationObject.total_rows) )){
            paginationtd.html($('<button/>').text("more...").addClass('btn btn-primary ').click(function(){
                paginationClickFunction(true);
            }))
        }
    }

    /**
     * Builds the table header based on the rowDef object passed to it. If the rowDef header.sortField property exists it adds fontawsome icons and a click event that triggers a header sort event
     * on the <b>table</b>. This event sends two addtional parameters (apart from the event) they are: the targets data-sort-field attribute and the id attribute
     *
     * @param rowDef an array of column definitions
     * @param headerTr the object it will be attached to
     * @param sortHeaderClass the class of any headers that need sorting
     */
    function buildTableHeader(rowDef,headerTr,sortHeaderClass){
        for(var i in rowDef){
            var row = rowDef[i];
            var th =$('<th/>').html(row.header.title)
            if(!!row.header.sortField) th.addClass(sortHeaderClass).attr({'id':'th_'+row.header.title.replace(/ /g,"_"),'tab-index':0,'data-sort-field':row.header.sortField}).append($('<i/>').addClass('fa fa-sort pull-right')).click(function(e){
                $(this).closest('table').trigger('header_sort',[$(this).attr('data-sort-field'),$(this).attr('id')]);
            });
            th.appendTo(headerTr);
        }
    }

    /**
     * Builds table rows based on a row definition, an array containing the row objects,
     * a target (usually the table body) and whether to append it to the table or empty the table contents
     * NB you would usually use the buildTable method that calls this method
     * @param {Object} rowDef a complex object that defines the content and attributes of each td in the row
     * @param {Array} rows containing objects containing name value pairs for each field
     * @param {string} target where the returned rows are appended to
     * @param {boolean} [appendToTable] whether to clear the table (true) or not
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
                    if(Array.isArray(td.action)){
                        $.each(td.action,function(key,val){
                            $(TD).on(val.type, function (e) {
                                val.func.apply(this, parseArguments($(e.currentTarget).closest('.dataRow').data(), val.args));
                            })
                        })
                    }else {
                        $(TD).on(td.action.type, function (e) {
                            td.action.func.apply(this, parseArguments($(e.currentTarget).closest('.dataRow').data(), td.action.args));
                        })
                    }

                }else{
                    if(txt!=='') TD.html(txt);
                }
                // ok what about adding a class to the TD
                if(td.className!==undefined){
                    // we can pass a literal string or a function based upon the data in the row
                    if(!!td.className.func){
                        //ok this is a function so lets add the class based on the function
                        TD.addClass(td.className.func.apply(this,parseArguments(row,td.className.args)));
                    }else{
                        // just add the literal string
                        TD.addClass(td.className.literal);
                    }

                }
            });
        }

    }
    /**
     * Prepares the arguments for a function
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
            switch(value.type){
                case 'lookup': args.push(row[value.value]);
                    break;
                case 'row':args.push(row);
                    break;
                default:args.push(value.value);
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
     * @TODO inergrate into buildTable - at the moment orderObj is passed in from the invoking code
     *
     */
    function setTableOrder(controller,controllerClass,orderObj,orderDefaultObj){
        var hashedId = '#'+controller;
        console.log(hashedId);
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
     *
     *  @param {string} target jquery selector to add the more... button to
     *  @param {object} pagniationObj pagniation object consists of offset and limit
     *  @param {function} clickFunction the function fired by the button
     */
    function buildPaginationUI(target,pagniationObj,clickFunction){
        $(target).html(
            (parseInt(pagniationObj.offset)+parseInt(pagniationObj.limit) < parseInt(pagniationObj.total_rows) )?
                $('<button/>').text("more...").addClass('btn btn-primary ').click(function(){
                    pagniationObj.offset= parseInt(pagniationObj.offset)+parseInt(pagniationObj.limit);
                    clickFunction(true);
                }):''
        )
    }
    /**
     * General function for sending and receiving via ajax. This could be a REST endpoint or a plain old ajax service
     * relies on bootbox to show errors
     *
     * @param {String} service The address of the API or end point
     * @param {String} type Either GET,POST,PUT,DELETE
     * @param {String} address The API endpoint
     * @param {Function} resultTo Which function to send the results to
     * @param {Object} [paramObj]  An object of key:value pairs
     * @param {String} [waitobjectSelector] The selector for the wait object (spinner)
     * @param {Object} [header] Custom headers in the form {'my-custom-header:'header-value'}
     */
    function doAjax(service,type,address,resultTo,paramObj,waitobjectSelector,header,passedArgs){
        if(typeof resultTo !=='function') console.error('You must pass a functionn to doAjax'+resultTo);
        var params =  (paramObj === undefined)?'':'?'+jQuery.param( paramObj );
        if(waitobjectSelector!== undefined) $(waitobjectSelector).addClass('active');
        var h =  (header === undefined)?{}:header;
        $.ajax({
            type:type,
            url: service+address+params,
            header:h,
            success:function(result){
                if(waitobjectSelector!== undefined) $(waitobjectSelector).removeClass('active');
                if(!!passedArgs) result.passedArgs=passedArgs;
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

    // offer these functions to the world
    return {
        'doAjax':function(service,type,address,resultTo,params,waitobjectSelector){doAjax(service,type,address,resultTo,params,waitobjectSelector)},
        'buildSelector':function(arr,label,id,idfield){return buildSelector(arr,label,id,idfield)},
        'buildTable':function(rowDef,data,target,tableId,pagniationObj,paginationClickFunction,sortHeader){buildTable(rowDef,data,target,tableId,pagniationObj,paginationClickFunction,sortHeader)},
        'buildTableRows':function(rowDef,rows,target,appendToTable){buildTableRows(rowDef,rows,target,appendToTable)},
        'formatDateAsDaysSince':function(datestring,withtitle){return formatDateAsDaysSince(datestring,withtitle)},
        'setTableOrder':function(controller,controllerClass,orderObj,orderDefaultObj){setTableOrder(controller,controllerClass,orderObj,orderDefaultObj)},
        'buildPaginationUI':function(target,pagniationObj,clickFunction){buildPaginationUI(target,pagniationObj,clickFunction)},
        'toggleIcon':function(button,status,label){toggleIcon(button,status,label)},
        'nl2br':function(str){ return nl2br(str) },
        'br2nl':function(str){ return br2nl(str) },
        'findRowBykey':function(arr,key,val){ return findRowBykey(arr,key,val)},
        'extractValuesByKey':function(arr,key){return extractValuesByKey(arr,key)},
        'addTitleAttr':function(string,title){ return addTitleAttr(string,title)}
    };

};


