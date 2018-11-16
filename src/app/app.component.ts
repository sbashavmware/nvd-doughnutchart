import { Component ,OnInit, ViewEncapsulation } from '@angular/core';
import { IncidentDataSvcService } from './services/incident-data-svc.service';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { environment, CHARTRECORD } from 'src/environments/environment';

declare let d3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private  options :  any;
  private  noofinc = 0;
  private incidentData = [];
  private incGridData = [];
  private incUpdatedData = [];
  private clearText = environment.incConstants.CLEAR;;
  private legendColors =  environment.incConstants.LEGENDCOLORS;

  constructor(private getIncidentsService : IncidentDataSvcService) {
  }

 clearFunction() {
  this.incUpdatedData =  this.incGridData;
 }

populateIncidentTable(tableKey){
    this.incUpdatedData = [];
    let matchedData = {};

    this.incGridData.forEach( (gridData) => {
      if(gridData.type == tableKey){
        matchedData  = gridData;
      }
    });
    this.incUpdatedData.push(matchedData);
  }

  addCharData(incdata) {
    incdata.incGridData.forEach(gridData => {
      let chartDataVal = <CHARTRECORD>{};
      chartDataVal.key = gridData.type;
      chartDataVal.y = gridData.count;
      this.incidentData.push(chartDataVal);
    });
  }
  ngOnInit() {
    this.getIncidentsService.getJSON().subscribe( incdata => {
      this.options = {
        chart: {
            type: environment.incConstants.CHARTPROPERTIES.TYPE,
            height: environment.incConstants.CHARTPROPERTIES.HEIGHT,
            color : this.legendColors,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: environment.incConstants.CHARTPROPERTIES.SHOWLABELS,
            donut:environment.incConstants.CHARTPROPERTIES.DONUT,
            donutRatio: environment.incConstants.CHARTPROPERTIES.DONMUTRATIO,
            labelThreshold: environment.incConstants.CHARTPROPERTIES.LABELTHRESHHOLD,
            labelSunbeamLayout: environment.incConstants.CHARTPROPERTIES.LABELSUNBEAMLAYOUT,
            growOnHover : environment.incConstants.CHARTPROPERTIES.GROWONHOVER,
            showLegend:environment.incConstants.CHARTPROPERTIES.SHOWLEGEND,
            dispatch  :  {
              renderEnd : function(a,b,c) {
                var svgChartEle = d3.select("#incidentdata svg");
                var initSlice = svgChartEle.selectAll("g.nv-slice").filter(
                  function (ele, indx) {
                    return indx == 0;
                  }
              );
              //removing all the dynamic title elements to update with the new data
              var  incElems = document.querySelectorAll(".incEle");
              Array.prototype.forEach.call( incElems, function( incNode ) {
                incNode.parentNode.removeChild( incNode );
              });
               // Insert first line of text into middle of donut pie chart
               initSlice.insert("text", "g")
                   .text(incdata.incGridData.length)
                   .attr("class", "nv-pie-title noofinc incEle")
                   .attr("text-anchor", "middle")
                   .attr("dy", "-.55em")
                   .style("fill", "#000")
                   .style("font-size", "32px")
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
          },
      }
      this.noofinc = incdata.noofinc;
      this.addCharData(incdata);
      this.incGridData =  incdata.incGridData;
      this.incGridData.forEach((legendElem, index) => {
        legendElem.color =this.legendColors[index];
      });
      this.incUpdatedData = this.incGridData;
   });
  }
}
