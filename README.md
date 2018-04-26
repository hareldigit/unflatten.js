# unflatten.js
Convert flat array of objects to unFlate array

### Live example
* https://jsfiddle.net/uf04cg56/

## Example:
```
For data:
--------                                                      
var Employees = [
    {
        'FirstName': 'Romin',
        'LastName': 'Irani',
        'DepartmentName': 'Development',
        'DepartmentId': '1',
        'Gender': 'M'
    },
    {
        'FirstName': 'Alex',
        'LastName': 'Yuston',
        'DepartmentName': 'Development',
        'DepartmentId': '1',
        'Gender': 'M'
    },
    {
        'FirstName': 'Dani',
        'LastName': 'Tramp',
        'DepartmentName': 'Development',
        'DepartmentId': '1',
        'Gender': 'F'
    },
    {
        'FirstName': 'Tom',
        'LastName': 'Hanks',
        'DepartmentName': 'IT',
        'DepartmentId': '2',
        'Gender': 'M'
    },
    {
        'FirstName': 'Yulia',
        'LastName': 'Pit',
        'DepartmentName': 'Qa',
        'DepartmentId': '3',
        'Gender': 'F'
    },
	  {
        'FirstName': 'Barbara',
        'LastName': 'Jons',
        'DepartmentName': 'Qa',
        'DepartmentId': '3',
        'Gender': 'F'
    }
];
```
```
Execution of the unflatten function:
------------------------------------

var GroupingRulesExample = [
    {
      key:"DepartmentId",
      associatedInfo:["DepartmentName"]
    },
    {
      key:"Gender",
      associatedInfo:[]
    }
];

unflatten(Employees,GroupingRulesExample);

```

```
Will return:
------------  
[{
  "DepartmentId": "1",
  "DepartmentName": "Development"
  "__Items": [{
	  "Gender": "M",
	  "__Items": [{
		  "FirstName": "Romin",
		  "LastName": "Irani"
	  },
	  {
		  "FirstName": "Alex",
		  "LastName": "Yuston"
	  }]
  },
  {
	  "Gender": "F",
	  "__Items": [{
		  "FirstName": "Dani",
		  "LastName": "Tramp"
	  }]
  }], 
},
{
  "DepartmentId": "2",
  "DepartmentName": "IT"
  "__Items": [{
    "Gender": "M",
	  "__Items": [{
		  "FirstName": "Tom",
		  "LastName": "Hanks"
	  }]
  }],
 },
 {
  "DepartmentId": "3",
  "DepartmentName": "Qa"
  "__Items": [{
    "Gender": "F",
	  "__Items": [{
		  "FirstName": "Yulia",
		  "LastName": "Pit"
	  },
	  {
		  "FirstName": "Barbara",
		  "LastName": "Jons"
	  }]
  }], 
 }]
```

### Prerequisites
* lodash.min.js

### License
* This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
* MIT © Harel
