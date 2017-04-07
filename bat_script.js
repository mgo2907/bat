
  function dimer(bool){
  alert("D I S C L A I M E R:\n\nThis graph shows the evolution of European banks' outstanding publicly issued subordinated debt.\n\nNote that this graph does not(!) show banks' total amount of bail-inable debt, but the outstanding amount of publicly issued subordinated debt.\n\nA bank's total amount of bail-inable debt may be higher. Subordinated bonds are securities that are pivotal to a potential bail-in due to their claim structure.\n\nPlease confirm that you have read and understood the aforementioned information by clicking on the button below.\n"); 
   // document.getElementById("darkLayer").style.display =  '' ;
    


}    




function dim(cb) {
	console.log(cb.checked);
    document.getElementById("darkLayer").style.display = (cb.checked) ? '' : 'none';
}



//Plotly.d3.csv('http://raw.githubusercontent.com/mgo2907/bat/master/2016-08-09_2.csv', function(err, rows){
Plotly.d3.csv('https://raw.githubusercontent.com/mgo2907/bat/master/2017-04-05.csv', function(err, rows){

/// variables we use
var allBankNames = unpack(rows, 'bankname'),
    allRegions = unpack(rows, 'country'),
    listofBanks = [],
    listofRegions = [],
    currentBank,
    currentRegion;
    

/// get list of banks
  for (var i = 0; i < allBankNames.length; i++ ){
    if (listofBanks.indexOf(allBankNames[i]) === -1 ){
      listofBanks.push(allBankNames[i]);
    }
  }
  
  listofRegions.push('ALL');
  
// get list of regions
  for (var i = 0; i < allRegions.length; i++ ){
    if (listofRegions.indexOf(allRegions[i]) === -1 ){
      listofRegions.push(allRegions[i]);
    }
  }
// add all region


/// determine which region to show
  function getRegionData(chosenRegion) {
currentBank=[];
    for (var i = 0 ; i < allRegions.length ; i++){
      if ( allRegions[i] === chosenRegion ) {
        currentBank.push(allBankNames[i]);
       // console.log(allBankNames[i]);
      } 
    }
    // get unique names
    return ArrNoDupe(currentBank);
  };


/// determine which region to show
  function selectData(banklist) {
    currentBank = [];
    for (var i = 0 ; i < banklist.length ; i++){
      if ( allRegions[i] === chosenRegion ) {
        currentBank.push(allBankNames[i]);
    		// console.log(allBankNames[i]);
      } 
    }
  };

/// remove duplicates from array
var a =[];
function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}


/// unpack data and assing
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


		  
setBubblePlot('ALL');

//console.log(listofBanks);


function setBubblePlot(chosenRegion) {

		if (chosenRegion=='ALL'){
			banks2show =  listofBanks;
		} else {
		// which regions do we show?
    banks2show =  getRegionData(chosenRegion);  
		}
		
		// cycle over data for regions
console.log(banks2show);
var data = banks2show.map(function(identifier) {
  var rowsFiltered = rows.filter(function(row) {
      return (row.bankname === identifier);
  });
  
  
  return {
      mode: 'line',
      //type: 'scatter',
      name: unpack(rowsFiltered, 'bankname')[1],
      x: unpack(rowsFiltered, 'date'),
     y: unpack(rowsFiltered, 'share'),
      text: unpack(rowsFiltered, 'bankname'),
      showlegend: true,
  };
});




    var layout = { 
      title: '<em>Outstanding subordinated debt by European banks<br> as a percentage of previous total liabilities</em>  ',
      hovermode:'closest',
     annotations: {
      text: 'simple annotation',
     },

xaxis: {
    autotick: false,
    //ticks: 'outside',
    tick0: 0,
    dtick: 20,
    ticklen: 8,
    //tickwidth: 0.5,
    //tickcolor: '#000'
  },
  
  legend: {
    x: 1,
    y: 1,
    traceorder: 'normal',
    showlegend: true,
    font: {
      family: 'sans-serif',
      size: 10,
      color: '#000'
    },
   // bgcolor: '#E2E2E2',
   // bordercolor: '#FFFFFF',
   // borderwidth: 2
  },
  images: [
    {
      x: 0.05,
      y: 1.05,
      sizex: 0.2,
      sizey: 0.2,
      source: "https://raw.githubusercontent.com/mgo2907/bat/master/bat_logo.jpg",
      xanchor: "right",
      xref: "paper",
      yanchor: "bottom",
      yref: "paper"
    }
  ],
  
  
    };

    Plotly.newPlot('plotdiv', data, layout, {displayModeBar: true});
};

var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    regionSelector = innerContainer.querySelector('.regiondata');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofRegions, regionSelector);

function updateRegion(){
    setBubblePlot(regionSelector.value);
}
  
regionSelector.addEventListener('change', updateRegion, false);
});
