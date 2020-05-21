//Initialising the guage
function initGuage(){
    var washingFrequency;
    d3.json("samples.json").then(function(data){
    console.log(data);
    washingFrequency= data.metadata[0].wfreq;
    console.log(washingFrequency);
    });

    //Plotting the gauge

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
};
//d3.select("#gauge").append("h4").append("strong").text("Belly Button washing Frequency");
initGuage();