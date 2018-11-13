import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { of } from 'rxjs';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentDataSvcService {

  subrcibeTimer = interval(5000);
  data =   [
    {
      "key": "Missing Incident",
      "y": 5
    },
    {
      "key": "Medical Incident",
      "y": 3
    },
    {
      "key": "Transport Incident",
      "y": 3
    },
    {
      "key": "Near Miss Incident",
      "y": 2
    },
    {
      "key": "Employee Incident",
      "y": 1
    },
    {
      "key": "Other Incident",
      "y": 1
    },
    {
      "key": "Approvals",
      "y": 2
    }
  ];

  incidentsData =  {
    noofinc : 3,
    incDesc : 'Open Incidents',
    data : {}
  };


  public getJSON(): Observable<any> {

     // return this.http.get("./assets/incidents.json")
     this.subrcibeTimer.subscribe((val) => {
        this.data = this.getRandomData();
        this.incidentsData.data= this.data;
        of(this.incidentsData);
      });

     this.incidentsData.noofinc= Math.floor(Math.random() * 20);
     this.incidentsData.data= this.data;
     return of(this.incidentsData);
  }

  public getRandomData() {
    this.data.forEach(dataObj => {
      dataObj.y =  Math.floor(Math.random() * 20);
    });
    return this.data;
  }
}
