
module.exports = class CaseService {

    constructor() {
    }

    listCases(filterSortQuery) {
		return new Promise(function(resolve, reject) {

// 7.1.5-1 list cases - press to open
//   7.1.5-2 open Case: dishwasher
//   7.1.5-3 open Case: freezer
//   7.1.5-4 open case: cold room
//   7.1.5-5 open case: fridge
//   7.1.5-6 open case: oven
//   7.1.5-7 open case: other
	           let cases = [
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f73",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit" : "dishwasher",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f61",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f51"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f74",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit" : "freezer",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f64",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f54"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f75",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit": "cold room",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f65",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f55"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f73",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit":"fridge",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f61",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f51"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f74",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit": "oven",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f64",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f54"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      {
			      	"id":"fa8518a0-89df-11e8-9a94-a6cf71072f75",
			        "region": "VIC Metro - 60 Elizabeth Street",
			        "location": "Kitchen Freezer",
			        "description": "(-13.8°C)Temperature too High",
			        "created": "1995-09-07T10:40:52Z",
			        "unit": "other",
			        "alarms": {
			        	"alarmId":"fa8518a0-89df-11e8-9a94-a6cf71072f65",
			        	"alarmType":"sample Alarm Type"
			        },
			        "status": "Closed",
			        "resolution": "Unresolved",
			        "asignee": {
			        	"userId": "fa8518a0-89df-11e8-9a94-a6cf71072f55"
			        },
			        "comments": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
			        "attachments":["File.doc", "0012.jpg", "0022.jpg", "0014.jpg"]
			      },
			      
			    ];
			    resolve(cases);
              });
    }


    addComment(comment) {
       
    }

    editComment(comment) {
       
    }

    uploadAttachment(attachment) {
           
    }

    deleteAttachment(attachmentId) {
        
    }

    processStep() {
  
    }

}