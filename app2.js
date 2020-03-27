function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)

        // pull top 10 otu ids for the plot OTU and reverse 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();

        // pull otu id's in desired form for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)

         // pull top 10 labels for plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'light blue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            var data = [trace];
    
            // create layout variable to set plots layout
            var layout = {
                title: "Top 10 OTU Interactive Bar Chart ",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 10,
                    t: 90,
                    b: 20
                }
            };
    
            // create bar plot
        Plotly.newPlot("bar", data, layout);
            // bubble chart - can't figure out how to change colors...
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers", 
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                    // color: color=[120, 155]
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            // setting layout for the bubble plot
            var layout_2 = 
            {
            //     xaxis:{title: "OTU ID"},
                title: "Top 10 OTU Interactive Bubble Chart Display",
                height: 600,
                width: 1000,
                           
            };
    
            // creating data variable 
            var data1 = [trace1];
           
    
        // create bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // create function to get necessary data
    function getDemoInfo(id) {
    // read json file to get data
        d3.json("samples.json").then((data)=> {
    // getting metadata for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic panel each time before getting new id info
           demographicInfo.html("");
    
         // grabbing necessary demographic data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // creating function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // creating function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // reading the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();