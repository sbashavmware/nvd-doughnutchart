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
  public  clearIconBtmVal = '31%';
  public  isClearVisible = 'none';
  public  clearIconBtmKeysVal = {
    "Missing_Incident" : "31%",
    "Medical_Incident" : "26%",
    "Transport_Incident": "21%",
    "Near_Miss_Incident" : "16%",
    "Employee_Incident" : "11%",
    "Other_Incident" : "6%",
    "Approvals" : "1%"
  };
  incidentData = {};
  incGridData = [];
  incNewData = [];
  clearText = '';

  constructor(private getIncidentsService : IncidentDataSvcService) {
  }

 clearFunction() {
  this.incNewData =  this.incGridData;
  this.isClearVisible = "none";
 }
  populateIncidentTable(tableData){
    this.isClearVisible = "block";
    this.clearIconBtmVal = this.clearIconBtmKeysVal[tableData.key.replace(/ /g,"_")];
    this.incNewData = [];
    let matchedData = {},matchedKey = ' ';
    Array.prototype.forEach.call( this.incGridData, function( gridData ) {
       if(gridData.type == tableData.key){
        matchedData  = gridData;
        matchedKey = gridData.key;
       }
    });

    this.incNewData.push(matchedData);
    this.clearText = matchedKey;
  }

  ngOnInit() {
    this.getIncidentsService.getJSON().subscribe( incdata => {
      let self = this;
      this.options = {
        chart: {
            type: 'pieChart',
            height: 400,
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
               vers: 'classic',
                margin: {
                    top: 5,
                    right: 30,
                    bottom: 5,
                    left: 50
                },
                dispatch: {
                  legendDblclick: function(e) {self.populateIncidentTable(e)},
                  legendClick: function(e) {self.isClearVisible = "none";self.incNewData =  self.incGridData;},
                },
                updateState : true
            },
            padAngle : 0,
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

                          //for each text
                  d3.selectAll(".nv-legend text")[0].forEach(function(d){
                    //get the data
                    var t= d3.select(d).data()[0];
                    //set the new data in the innerhtml
                    d3.select(d).html(t.key + " ("+ t.y + ")");
                  });
              }
            }
          },
      }

      this.noofinc = incdata.noofinc;
      this.incidentData = incdata.data;
      this.incGridData =  incdata.incGridData;
      this.incNewData = this.incGridData;
   });
  }
}
