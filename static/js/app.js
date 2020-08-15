var optionSelect= d3.select("#selDataset");





//Initialising the page with default charts and info
 function init(){
    var otuID;
    var sampData;
    var otuLabel;
    var strMeta=[];
    
    d3.json("samples.json").then(function(data){
        
     
         otuID=data.samples[0].otu_ids;
         console.log(otuID);
         sampData=data.samples[0].sample_values;
         var labelOtuId=otuID.map(d=>`OTU ${d}`);
         
         
         otuLabel=data.samples[0].otu_labels;
    
         console.log(sampData);

         //Plotting the bar Graph
        var trace1={
                x: sampData.slice(0,10).reverse(),
                y: labelOtuId.slice(0,10).reverse() ,
                text:otuLabel.slice(0,10).reverse(),
                type :"bar",
                orientation:"h"
                };
        var data1=[trace1];
        var layout={
            autosize: true
        }
           

        Plotly.newPlot("bar",data1,layout);

        //Geographic Information
        for(var j=0;j<Object.keys(data.metadata[0]).length;j++){
            strMeta.push(`${Object.keys(data.metadata[0])[j]}: ${Object.values(data.metadata[0])[j]}`)
        }

        d3.select("#sample-metadata").selectAll("h6")
                    .data(strMeta)
                    .enter()
                    .append("h6")
                    .append("strong")
                    .text(d=>d);


        
        //Plotting the bubble chart

        var trace2={
            x:otuID,
            y:sampData,
            mode:"markers",
            marker:{
                size:sampData,
                color:otuID,
              
               
            },
            text:otuLabel,
            type: "scatter"
        };

        var data2=[trace2];
        var layout={
            xaxis:{title:"OTU ID"}
        }

        Plotly.newPlot("bubble",data2,layout);

        //Making the guage
        washingFrequency= data.metadata[0].wfreq;
    
    

        //Plotting the gauge
        console.log(washingFrequency);
        var trace3={
            domain: { x: [0, 1], y: [0, 1] },
            value: washingFrequency,
            title: { text: "Scrubs per week" },
            // labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
            textinfo: 'text',
            textposition: 'inside',
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                steps: [
                         
                  { range: [0, 1], color: "#ff1a40"},
                  { range: [1, 2], color: "#ff3355" },
                  { range: [2, 3], color: "#ff4d6a" },
                  { range: [3, 4], color: "#ff6680" },
                  { range: [4, 5], color: "#ff8095" },
                  { range: [5, 6], color: "#ff99aa" },
                  { range: [6, 7], color: "#ffb3bf" },
                  { range: [7, 8], color: "#ffc0cb" },
                  { range: [8, 9], color: "#ffccd5" },
                ] 
            }
        };
    
        var layout={
           title:"Belly Button Washing Frequency"
        }
    
        var data3=[trace3];
    
        Plotly.newPlot("gauge",data3,layout);


 })
};



//Adding the test subject names in Dropdown menu
d3.json("samples.json").then(function(data){
    console.log(data.names);
    var testSubject= data.names.map(n=>n);
    //console.log(testSubject);
    optionSelect.selectAll("option").data(testSubject)
                .enter()
                .append("option")
                .attr("value",d=>d).text(d=>d);
                
});



//Restyling the graph and metadata on changing the option
function optionChanged(optionValue){

    //Removing the previous demographic info
    d3.select("#sample-metadata").selectAll("*").remove();
    //d3.preventDefaultchange();
    
    
    d3.json("samples.json").then(function(data){
//    console.log(data);
        var otuIDLabel;
        var otuID;
        var sampData;
        var sampDatafiltered;
        var otuLabel;
        var otuLabelfiltered;
        var strMeta=[];
        var washfreq;
        
        console.log(optionValue);
    
        for(var i=0;i<153;i++){
            if(data.samples[i].id==optionValue){
                otuID=data.samples[i].otu_ids;
                otuIDLabel=otuID.map(d=>`OTU ${d}`);
                otuIDLabel=otuIDLabel.slice(0,10).reverse();
                sampData=data.samples[i].sample_values;
                sampDatafiltered= sampData.slice(0,10).reverse();
                otuLabel=data.samples[i].otu_labels;
                otuLabelfiltered=otuLabel.slice(0,10).reverse();
                
            };
            if(data.metadata[i].id==optionValue){
                
                console.log(Object.keys(data.metadata[i])[0]);
                washfreq=data.metadata[i].wfreq;
                //var metaData=d3.select("#sample-metadata");
            
                for(var j=0;j<Object.keys(data.metadata[i]).length;j++){
                    strMeta.push(`${Object.keys(data.metadata[i])[j]}: ${Object.values(data.metadata[i])[j]}`);
                
                };
                console.log(strMeta);
            
            
            d3.select("#sample-metadata").selectAll("h6")
            .data(strMeta)
            .enter()
            .append("h6")
            .append("strong")
            .text(d=>d);
                        
        };   
    };

    
    //Restyle the bar graph
    Plotly.restyle("bar","x",[sampDatafiltered]);
    Plotly.restyle("bar","y",[otuIDLabel]);
    Plotly.restyle("bar","text",[otuLabelfiltered]);

    //Restyle the bubble chart
    Plotly.restyle("bubble","x",[otuID]);
    Plotly.restyle("bubble","y",[sampData]);
    Plotly.restyle("bubble","text",[otuLabel]);
    Plotly.restyle("bubble","size",[sampData]);
    Plotly.restyle("bubble","color",[otuID]);

    //Restyle the gauge
    Plotly.restyle("gauge","value",[washfreq]);

    
});

};


// d3.select("#selDataset").on("change",optionChanged(this.value));
init();
