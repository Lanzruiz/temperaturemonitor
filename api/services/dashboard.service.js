
module.exports = class DashboardService {

    constructor() {
    }

    listWidgetTypes() {
    	return new Promise(function(resolve, reject) {
    		let widgetTypes = [
                {
			        "id": "a0401a64-3199-4024-a535-e0bced4078a4",
			        "name": "Tasks Completed to Schedule",
			         "dataParameters": [{
			         	"tenant": {
			         		"type": "select",
			         		"required" : true
			         	},
			         	"region": {
			         		"type": "select",
			         		"required": false
			         	}, 
			         	"site": {
			         		"type": "select",
			         		"required": false
			         	}
			         }]
			    },
			    {
			        "id": "15e26e96-dac1-47d6-880a-c3e8398b0a07",
			        "name": "Tasks Completed to Schedule Breakdown",
			        "dataParameters": [{
			         	"tenant": {
			         		"type": "select",
			         		"required" : true
			         	},
			         	"region": {
			         		"type": "select",
			         		"required": false
			         	}, 
			         	"site": {
			         		"type": "select",
			         		"required": true
			         	}
			         }]
			    },
			    {
			        "id": "e68ecff8-b3e9-44b3-90c9-522cd65764ae",
			        "name": "Time in Alarm"
			    },
			    {
			        "id": "85820479-d3be-4791-8f70-e41c67d0724d",
			        "name": "Time in Alarm Breakdown"
			    },
			    {
			        "id": "ed2e25db-64a1-4d43-a578-331081beb787",
			        "name": "Hand Probing - Samples probed vs required"
			    },
			    {
			        "id": "fb477e6f-4be4-43a8-9bbb-e29881daf453",
			        "name": "Hand Probing - Samples probed vs required Today"
			    },
			    {
			        "id": "0cd75672-7431-495a-9faa-ffc4d118c6f7",
			        "name": "Tasks - Today's Progress"
			    },
			    {
			        "id": "222d7697-7095-43d4-898b-017df767eecc",
			        "name": "Health - Binary threshold"
			    },
			    {
			        "id": "ddc25526-8771-4c44-9c28-177996efd108",
			        "name": "Health - Percentage"
			    },
			    {
			        "id": "b8116382-df49-4b36-a89c-4030bc44e034",
			        "name": "Unit Sensor - Current Reading"
			    },
			    {
			        "id": "b0b00e1c-09fc-4089-ae84-a7dafd98e8f5",
			        "name": "Unit - Current"
			    },
			    {
			        "id": "f1b6f989-f20d-484b-9843-88b76ffdc73f",
			        "name": "Unit - Current"
			    }
    		]
    		 resolve(widgetTypes);
    	});
       
    }

    listWidget() {
		return new Promise(function(resolve, reject) {
	           let widgets =  [
      
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f73",
			        "title": "Task Completed to Schedule",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": true,
			        "legend": false,
			        "color":'#4a90e2',
			        "type": "donut",
			        "data": [60,40]
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f74",
			        "title": "Task Completed to Schedule Breakdown",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": true,
			        "legend": true,
			        "color":'#4a90e2',
			        "type": "donut",
			        "data":[50,40,30]
			      },
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f75",
			        "title": "Time in Alarm",
			        "subtitle" :"Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#9546e5',
			        "type": "donut",
			        "data": [60,40]
			      },
			       {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f76",
			        "title": "Time in Alarm Breakdown",
			        "subtitle" :"Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": true,
			        "color":'#9546e5',
			        "type": "donut",
			        "data":[50,40,30]
			      },
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f77",
			        "title": "Hand Probing  - Samples probed vs required",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#ee0284',
			        "type": "donut",
			        "data": [60,40]
			      }, 
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f78",
			        "title": "Hand Probing  - Samples probed vs required",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#ee0284',
			        "type": "progress",
			        "data": 30
			      }
			      ,
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f79",
			        "title": "Tasks - Today's Progress - Percentage",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": false,
			        "legend": false,
			        "color":'#0a5bfc',
			        "type": "donut",
			        "data": [60,40]
			      }, 
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f10",
			        "title": "Tasks - Today's Progress - Percentage",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": false,
			        "legend": false,
			        "color":'#0a5bfc',
			        "type": "progress",
			        "data": 30
			      }

			      , 
			      {
			        "id": "fa8518a0-89df-11e8-9a94-a6cf71072f11",
			        "title": "Time in Alarm Breakdown",
			        "region": "Worcester College - England",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": false,
			        "legend": false,
			        "color":'#58bb27',
			        "type": "map",
			        "data": [30,50,60]
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f12",
			        "title": "Health binary Threshold",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#eba816',
			        "type": "health",
			        "data": false
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f13",
			        "title": "Health binary Threshold",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#eba816',
			        "type": "health",
			        "data": true
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f14",
			        "title": "Health Percentage",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": true,
			        "legend": false,
			        "color":'#eba816',
			         "type": "donut",
			        "data": [60,40]
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f15",
			        "title": "Unit Sensor - Current Reading - Meter",
			        "subtitle": "Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": true,
			        "legend": false,
			        "color":'#15dfeb',
			         "type": "gauge",
			        "data": 42
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f16",
			        "title": "Unit - Current",
			        "subtitle": "Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#fad606',
			        "type": "icon2",
			        "data":true
			      }
			      ,
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f17",
			        "title": "Live Monitoring Overview",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": true,
			        "color":'#f53d3d',
			        "type": "overview",
			        "data":[{
			              "alarm":"alarm 1",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 3",
			              "status": false
			            },
			            {
			              "alarm":"alarm 4",
			              "status": false
			            },
			            {
			              "alarm":"alarm 5",
			              "status": false
			            },
			            {
			              "alarm":"alarm 6",
			              "status": true
			            },
			            {
			              "alarm":"alarm 7",
			              "status": true
			            },
			            {
			              "alarm":"alarm 8",
			              "status": true
			            },
			            {
			              "alarm":"alarm 9",
			              "status": true
			            },
			            {
			              "alarm":"alarm 10",
			              "status": false
			            },
			            {
			              "alarm":"alarm 11",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 1",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 3",
			              "status": false
			            },
			            {
			              "alarm":"alarm 4",
			              "status": false
			            },
			            {
			              "alarm":"alarm 5",
			              "status": false
			            },
			            {
			              "alarm":"alarm 6",
			              "status": true
			            },
			            {
			              "alarm":"alarm 7",
			              "status": true
			            },
			            {
			              "alarm":"alarm 8",
			              "status": true
			            },
			            {
			              "alarm":"alarm 9",
			              "status": true
			            },
			            {
			              "alarm":"alarm 10",
			              "status": false
			            },
			            {
			              "alarm":"alarm 11",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 1",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 3",
			              "status": false
			            },
			            {
			              "alarm":"alarm 4",
			              "status": false
			            },
			            {
			              "alarm":"alarm 5",
			              "status": false
			            },
			            {
			              "alarm":"alarm 6",
			              "status": true
			            },
			            {
			              "alarm":"alarm 7",
			              "status": true
			            },
			            {
			              "alarm":"alarm 8",
			              "status": true
			            },
			            {
			              "alarm":"alarm 9",
			              "status": true
			            },
			            {
			              "alarm":"alarm 10",
			              "status": false
			            },
			            {
			              "alarm":"alarm 11",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 1",
			              "status": true
			            },
			            {
			              "alarm":"alarm 2",
			              "status": true
			            },
			            {
			              "alarm":"alarm 3",
			              "status": false
			            },
			            {
			              "alarm":"alarm 4",
			              "status": false
			            }]
			      },
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f18",
			        "title": "Average Case Resolution Time - Statistics",
			        "region": "Worcester College",
			        "site":"Victoria - ABC Cafe Melbourne",
			        "time": true,
			        "legend": false,
			        "color":'#a0e623',
			        "type": "statistics",
			        "data":"44h"
			      }
			      ,
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f19",
			        "title": "Case Resolved vs Opened",
			        "subtitle": "Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#ed4c4c',
			        "type": "bar",
			        "data":[40,13]
			      }
			      ,
			      {
			        "id" : "fa8518a0-89df-11e8-9a94-a6cf71072f20",
			        "title": "Cases Resolved",
			        "subtitle": "Cold Room Freezer",
			        "region": "Worcester College",
			        "site":"All Site",
			        "time": true,
			        "legend": false,
			        "color":'#4a90e2',
			        "type": "statistics",
			        "data":"22"
			      }
			    ]
			    resolve(widgets);
              });
    }


    addWidget(data) {
        return new Promise(function(resolve, reject) {            
            resolve('fa8518a0-89df-11e8-9a94-a6cf71072f20');
        }.bind(this));
    }

    editWidget(id,patch) {
       return new Promise(function(resolve, reject) {
            //sample always sucesss
                return resolve();
        });
    }

    deleteWidget(id) {
       return new Promise(function(resolve, reject) {
            //sample always sucesss
                return resolve();
        });
    }



}