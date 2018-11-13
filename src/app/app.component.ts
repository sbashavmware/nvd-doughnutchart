import { Component ,OnInit, ViewEncapsulation } from '@angular/core';
import { IncidentDataSvcService } from './services/incident-data-svc.service';
declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public  options :  any;
  public  noofinc = 0;
  incidentData = {};

  constructor(private getIncidentsService : IncidentDataSvcService) {
  }



  ngOnInit() {
    this.getIncidentsService.getJSON().subscribe( incdata => {
      this.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            color : ["#E0F1F6","#A6D8E7","#49AFD9","#0179B8","#004D8A","#073159","073159"],
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: false,
            donut:true,
            duration: 500,
            donutRatio: 0.6,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            growOnHover : true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            },
            padAngle : 0.05,
            legendPosition : 'bottom',
            dispatch  :  {
              renderEnd : function(a,b,c) {
                var svgChartEle = d3.select("#incidentdata svg");
                var initSlice = svgChartEle.selectAll("g.nv-slice").filter(
                  function (d, i) {
                    return i == 0;
                  }
              );
              //removing all the dynamic title elements to update with the new data
              var  incElems = document.querySelectorAll(".incEle");
              Array.prototype.forEach.call( incElems, function( incNode ) {
                incNode.parentNode.removeChild( incNode );
              });
               // Insert first line of text into middle of donut pie chart
               initSlice.insert("text", "g")
                   .text(incdata.noofinc)
                   .attr("class", "nv-pie-title noofinc incEle")
                   .attr("text-anchor", "middle")
                   .attr("dy", "-.55em")
                   .style("fill", "#000")
                   .style("color","#737373");
               // Insert second line of text into middle of donut pie chart
               initSlice.insert("text", "g")
                   .text(incdata.incDesc)
                   .attr("class", "nv-pie-title incDesc incEle")
                   .attr("text-anchor", "middle")
                   .attr("dy", ".85em")
                   .style("fill", "#000")
                  .style("font-size", "16px")
                  .style("color","#777777");
              }
            }
          }
      }
      this.noofinc = incdata.noofinc;
      this.incidentData = incdata.data;
   });

   setInterval(() => {
    this.getIncidentsService.getJSON().subscribe(incdata => {
      this.noofinc = incdata.noofinc;
      this.incidentData =[...incdata.data];
    });
   }, 5000);
  }
}
