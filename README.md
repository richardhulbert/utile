<h1>Welcome to Utile</h1>

This is a bit of a mishmash of utilities that I am gradually pulling together into one js file for convenience. Uitle is latin for useful thing in case you are wondering. 

Currently it contains the following methods:

* **doAjax** - General function for sending and receiving via ajax to REST or any other JSON service (relies) on bootbox to show errors [docs](Codevanilla_Utile.html#~doAjax__anchor)
* **formatDateAsDaysSince** - a pretty date function you give it a date string('Fri Sep 30 2016 12:54:08 GMT+0100 (BST)') and it returns a more human respons such as yesterday or 2 months ago
* **buildSelector** - builds a select box from data (an array of objects containing records) 
* **buildTable** - builds a table using data (an array of objects containing records) that is shaped by a [configuration object](#rowdef)
* **buildTableRows** - builds table rows using data and a [configuration object](#rowdef)
* **nl2br** -  converts the line breaks into br tags
* **br2nl** - converts the br tags into line breaks
* **indRowBykey** - returns a row from an array of rows given a filed key and a value for that key
* **extractValuesByKey** - takes an array of objects and outputs an array of values for a key in each object

You can see all the docs with a little bit of explanation [here](Codevanilla_Utile.html)

You can install it using bower
```
bower install codevanilla_utile
```

<a name="rowdef"><h3>Row Definition for tables</h3></a>

In order to use buildTable() or buildTableRows() you need to pass it a configuration object.
This object defines how your table with look -  The header text and its sortability, which fields or values to use for each cell in each row of data, and what method to invoke on click or hover.


The row definition object is an array where each object in the array represents a  column
```javascript
var rowDef=[
{header:{title:'column 1'}}
{header:{title:'column 2'}}
{header:{title:'column 3'}}
}
]
```
|column 1|column 2|column 3|
|--------|--------|--------|

Each column object will have the following properties`:
<h4>header</h4>
This property defines the content and interaction of header (`<th>`) for the column.
It contains the following:-`
An object containing a **title** property
```javascript
header:{title:'column header'}
```
<h4>display</h4>
This property defines what is shown in the table cell (`<td>`) for each column.
An array of objects that concatenate together in the td. 
You can pass three types of object:

1 **literal** - this places a literal string in the td
```javascript
display:[literal:' & '}]
```

2 **row** - this looks up the value (in the data row) using the key and places that in the td
```javascript
display:[{row:'firstName'},{literal:' '},{row:'lastName'}]
```

3 **function** - This places the product of a function into the td. 
It has two properties the first is the reference to a function and the second is args which is an array of objects describing the arguments to be passed to the function.
These function argument objects have two properties: _type_ and _value_.
_type_ is currently 'lookup' or 'literal'. literal simply passes whatever is in the value property fo the object into the function. Lookup passes whatever the value of the key in the data row
```javascript
 display:[{formatDateAsDaysSince,args:[{type:'lookup',value:'last_login'},{type:'literal',value:true}]}]
```

<h4>action</h4>
The action property is where you can set an event handler the value of this property is an object.
The action property can be an array or a single object containing the following properties:
type - the type of event such as 'click'
func - a reference to a funciton
args - the arguments passed to the function


```javascript
 action:{type:'click',func:getAccount,args:[{type:'lookup',value:'id'}]}
```
<h4>ClassName</h4>
This defines any classes you want to apply to a td

