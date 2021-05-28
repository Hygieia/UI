import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DockerService {
	
	dockerMetaCountRoute : string = "/api/collector/docker/meta/count";
	
	metaDataRoute : string = "/api/collector/docker/meta/data";
	
	cpuStatsRoute : string = "/api/collector/docker/cpu/stats";
	
	conProcessesTopRoute : string = "/api/collector/docker/container/processes/top";

  constructor(private http: HttpClient) { }

	_GetDockerMetaCount : any = function() : Observable<any> {
		return this.http.get(this.dockerMetaCountRoute);
	}

	_GetDockerMetaData : any = function() : Observable<any> {
		return this.http.get(this.metaDataRoute);
	}

	_GetDockerConProcessesTop : any = function(conId) : Observable<any> {
		return this.http.get(this.conProcessesRoute, conId);
	}

	_GetDockerCPUStats : any = function() : Observable<any> {
		return this.http.get(this.cpuStatsRoute);
	}
}
