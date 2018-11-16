// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  incConstants : {
    CLEAR : "clear",
    LEGENDCOLORS: ["#E0F1F6","#A6D8E7","#49AFD9","#0179B8","#004D8A","#073159","#073159"],
    CHARTPROPERTIES : {
      "TYPE" : "pieChart",
      "HEIGHT" : 400,
      "DONUT" : true,
      "DONMUTRATIO" : 0.6,
      "LABELTHRESHHOLD": 0.01,
      "LABELSUNBEAMLAYOUT": true,
      "GROWONHOVER" :  true,
      "SHOWLEGEND" : false,
      "SHOWLABELS" : false,
    },
    INCJSONURL : './assets/api/incidents.json'
  }
};

export interface CHARTRECORD {
  key: string;
  y: string;
}

