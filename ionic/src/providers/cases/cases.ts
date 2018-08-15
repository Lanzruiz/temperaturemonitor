import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';

/*
  Generated class for the CasesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CasesProvider {
	// url = `http://127.0.0.1:9000/api/v1/case`
	//url = `https://monika-cloudplatform-api-qa.aptiture.com/api/v1/case`
	url = this.appConfig.monikaApiBaseUrl + "/case";
	constructor(public http: HttpClient, public appConfig: AppConfig) {
		console.log('Hello CasesProvider Provider');
	}
	getCases() {
	    var data = {
	    "caseListFilterQuery": {},
	    "caseListSortQuery": {
	    "sortBy": []
	      }
	    };
	    return this.http.post(this.url+`/list`,data)
		    .map((res:Response) => res);
	}


	addComment(caseId, comment) {
	    return this.http.post(this.url+`/`+caseId+'/comment',comment)
		    .map((res:Response) => res);
	}

	updateComment(data) {
	    return this.http.put(this.url+`/comment`,data)
		    .map((res:Response) => res);
	}

	addAttachment(caseId, attachment) {
	    return this.http.post(this.url+`/`+caseId+'/attachment',attachment)
		    .map((res:Response) => res);
	}

	deleteAttachment(id) {
	    return this.http.delete(this.url+`/attachment/`+id)
		    .map((res:Response) => res);
	}

	processStep(caseId, params){
		var data = {
			"input" : params.text,
			"inputType" : params.type
		};
		return this.http.post(this.url+`/`+caseId+'/processStep',data)
		    .map((res:Response) => res);
	}

}
