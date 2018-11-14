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

  gridData =   [
    {
      "type": "Missing Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Medical Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Transport Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Near Miss Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Employee Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Other Incident",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    },
    {
      "type": "Approvals",
      "date": "Oct 12",
      "location": "Kalyani Vista , Bangalore",
      "region": "INDIA",
      "status": "Open",
    }
  ];

  incidentsData =  {
    noofinc : 3,
    incDesc : 'Open Incidents',
    data : {},
    incGridData : {}
  };


  public getJSON(): Observable<any> {
     this.incidentsData.noofinc=3;
     this.incidentsData.data= this.data;
     this.incidentsData.incGridData = this.gridData;
     return of(this.incidentsData);
  }

  public getRandomData() {
    this.data.forEach(dataObj => {
      dataObj.y =  Math.floor(Math.random() * 20);
    });
    return this.data;
  }
}
