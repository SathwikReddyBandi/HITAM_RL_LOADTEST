//There will be dealay of 5 seconds in increasing the load as the buttons are disalbed until the previous load values get printed.
// Buttous can't be clicked till the values are printed in table

//Blynk Virtual Pins
//V0-Primary Voltage, V3-Primary Output, V4-Iron loss, V5- Secondary Voltage, V8- No load,
var saved_u_val;
let value3; // primary output W1
let value5; // secondary voltage V2
let value6; // 
var iron_loss=1.7;


document.addEventListener('DOMContentLoaded', () => {
    if(saved_u_val == null)
    {
       saved_u_val = 0;  
    }
    document.querySelector("#us").innerHTML =  saved_u_val ;
    document.querySelector("#u").value = saved_u_val;
});


//increment 
function increment(ID) {
    fetch("https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v13") // load
   .then(response => response.json())
   .then(data => {
    const myJSON = JSON.stringify(data)
    if(myJSON=="0"){
    window.confirm(" 1. Please,Turn ON supply. \n 2. Please, Turn ON Load.");
}
     else if(myJSON=="1")
    {
        const cur = document.getElementById(ID);
        var v1 = cur.value;
        v1 = (Number(v1) + Number(cur.step));
        if (Number(v1) > 4) {
            v1 = 4;
        }  
        cur.value = v1;
        document.getElementById("us").innerHTML =   v1 ;
        fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6=" + v1) // Load slider
        
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6")
        .then(response => response.json())
        .then(data => {
        
         //slider status 1 and 3rd row in table
         if(data=="1"){
         const btn1 = document.getElementById('btn1').style.color='#FF0000'; 
         document.getElementById("resistance").innerHTML= "75"; 
         document.getElementById("btn_plus1").disabled = true;
         document.getElementById("u").disabled = true;
         setTimeout(function(){  
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v0") // primary voltage Vp
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[3].cells[1].innerHTML= data;
         })
        //primary current
            {
         document.getElementById("myTable").rows[3].cells[2].innerHTML= 15.29; // Ip
         }
         
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") // primary output Wp
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[3].cells[3].innerHTML= data;
         value3=data; //W1
         })
         //fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") // secondary voltage Vs
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[3].cells[4].innerHTML= data;
         value5=data; //Vs
         })
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") // iron loss
         .then(response => response.json())
         .then(data => 
         {
        var value6=document.getElementById("myTable").rows[3].cells[5].innerHTML= parseFloat(parseFloat(value3)- parseFloat(data)).toFixed(2); // Ws
       document.getElementById("myTable").rows[3].cells[6].innerHTML=parseFloat((parseFloat(value6)/parseFloat(value3))*100).toFixed(2); // Efficency
       
    } ) 
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // no load voltage
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[3].cells[7].innerHTML= parseFloat(((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100).toFixed(2); // Regulation
        }) 
        document.getElementById("btn_plus1").disabled = false;
        document.getElementById("u").disabled = false;
    },5000);
 }

    // slider status 2 and 4th row in table
    else if(data=="2"){
        const btn2 = document.getElementById('btn2').style.color='#FF0000'; 
        document.getElementById("resistance").innerHTML= "50"; 
        document.getElementById("btn_plus1").disabled = true;
        document.getElementById("u").disabled = true;
        setTimeout(function(){
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v0") // primary voltage Vp
         .then(response => response.json())
         .then(data => {
        document.getElementById("myTable").rows[4].cells[1].innerHTML= data;
         })
        //Primary Current
            {
        document.getElementById("myTable").rows[4].cells[2].innerHTML= 21.09; //Ip
         }
         
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") // primary output W1
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[4].cells[3].innerHTML= data;
        value3=data;
         })
       //  fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") //secondary voltage V2
       fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")  
       .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[4].cells[4].innerHTML= data;
        value5=data;
         })
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") // iron loss
         .then(response => response.json())
         .then(data =>  {
         var value6=document.getElementById("myTable").rows[4].cells[5].innerHTML= parseFloat(parseFloat(value3)- parseFloat(data)).toFixed(2); // W2
        document.getElementById("myTable").rows[4].cells[6].innerHTML=parseFloat((parseFloat(value6)/parseFloat(value3))*100).toFixed(2); // Efficiency  
    } ) 
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // no load voltage
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[4].cells[7].innerHTML= parseFloat(((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100).toFixed(2); // Regulation
        }) 
        document.getElementById("btn_plus1").disabled = false;
        document.getElementById("u").disabled = false;
    },5000);
    }

     // slider status 3 and 5th row in table
        else if(data=="3"){
        const btn3 = document.getElementById('btn3').style.color='#FF0000'; 
        document.getElementById("resistance").innerHTML= "28"; 
        document.getElementById("btn_plus1").disabled = true;
        document.getElementById("u").disabled = true;
           
         setTimeout(function(){
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v0") // primary voltage Vp
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[5].cells[1].innerHTML= data;
         })
         //primary current
             {
         document.getElementById("myTable").rows[5].cells[2].innerHTML= 24.64; //Ip
         }
        
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") // primary output Wp
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[5].cells[3].innerHTML= data;
         value3=data;
         })
         //fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") // secondary voltage Vs
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[5].cells[4].innerHTML= data;
         value5=data;
         })
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") //iron loss
         .then(response => response.json())
         .then(data =>
             {
         var value6=document.getElementById("myTable").rows[5].cells[5].innerHTML= parseFloat(parseFloat(value3)- parseFloat(data)).toFixed(2); //W2
         document.getElementById("myTable").rows[5].cells[6].innerHTML=parseFloat((parseFloat(value6)/parseFloat(value3))*100).toFixed(2); // Efficiency
         
        }) 
         fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // no load voltage 
         .then(response => response.json())
         .then(data => {
         document.getElementById("myTable").rows[5].cells[7].innerHTML= parseFloat(((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100).toFixed(2); // regulation
         }) 
         document.getElementById("btn_plus1").disabled = false;
        document.getElementById("u").disabled = false;
        } ,5000);
    }

    // slider status 4 and 6th row in table
        else if(data==4) 
        {
           const btn4 = document.getElementById('btn4').style.color='#FF0000'; 
           document.getElementById("resistance").innerHTML= "16"; 
           document.getElementById("btn_plus1").disabled = true;
        document.getElementById("u").disabled = true;
        setTimeout(function(){    
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V0") // Vp
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[6].cells[1].innerHTML= data;
        })
        //primary current
        {
        document.getElementById("myTable").rows[6].cells[2].innerHTML= 30.95; // Ip
        }
        
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") //Wp
        .then(response => response.json())
        .then(data => {
       document.getElementById("myTable").rows[6].cells[3].innerHTML= data;
       value3=data;
        })
        //fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") //Vs
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")
        .then(response => response.json())
        .then(data => {
       document.getElementById("myTable").rows[6].cells[4].innerHTML= data;
       value5=data;
        })
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") // iron loss 
        .then(response => response.json())
        .then(data =>{
         var value6=document.getElementById("myTable").rows[6].cells[5].innerHTML= parseFloat(parseFloat(value3)- parseFloat(data)).toFixed(2); //W2
         document.getElementById("myTable").rows[6].cells[6].innerHTML=parseFloat((parseFloat(value6)/parseFloat(value3))*100).toFixed(2); // Efficiency    
        }) 
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // no load voltage
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[6].cells[7].innerHTML= parseFloat(((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100).toFixed(2); //regulation
        })
        document.getElementById("btn_plus1").disabled = false;
        document.getElementById("u").disabled = false;
    },5000); 
 }
   else{
    console.log("done");
   }
       })  
    
    }   
   });
 }
   
// Decrement
 function decrement(ID) {
    fetch("https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v13") // load
   .then(response => response.json())
   .then(data => {
    const myJSON = JSON.stringify(data)
    if(myJSON=="0"){
    window.confirm(" 1. Please,Turn ON supply. \n 2. Please, Turn ON Load.");
    
    }
    {const cur = document.getElementById(ID);
            var v1 = cur.value;
        v1 = (Number(v1) - Number(cur.step));
        if (Number(v1) < 0) {
            v1 = 0;
        }
        cur.value = v1;
        document.getElementById("us").innerHTML =  v1 ;
        fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6=" + v1)
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6") //load slider
            .then(response => response.json())
            .then(data => {
                
        if(data=="3"){
                  const btn4 = document.getElementById('btn4').style.color='#414141'; 
                    document.getElementById("resistance").innerHTML= "28"; 
                }
         else if(data=="2"){
            const btn3 = document.getElementById('btn3').style.color='#414141'; 
            document.getElementById("resistance").innerHTML= "50"; 
         }
         else if(data=="1"){
            const btn2 = document.getElementById('btn2').style.color='#414141'; 
            document.getElementById("resistance").innerHTML= "75"; 
         }
         else if(data=="0"){
            const btn1 = document.getElementById('btn1').style.color='#414141'; 
            document.getElementById("resistance").innerHTML= "95"; 
         }
    })
       
    }    

});
}

// load button
function Load(){   
    fetch("https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9")// supply
    .then(response => response.json())
    .then(data => {
         const myJSON = JSON.stringify(data)
    if(myJSON=="0"){
       alert('Please, Turn ON supply') 
   }
     else if(myJSON=="1")
    {
       const btn_load = document.getElementById('btn_load').style.color="#0bc029";
       fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v13=1") // load
       const btn0 = document.getElementById('btn0').style.color='#FF0000'; 
       const ohm = document.getElementById('ohm').style.color='#055a72'; 
       const btnnl = document.getElementById('btnnl').style.color=' #414141';
       document.getElementById("resistance").innerHTML= "95"; 
       fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6")
       .then(response => response.json())
       .then(data => {
       
        //slider status 0  
        if(data=="0"){
        document.getElementById("btn_plus1").disabled = true;
        document.getElementById("u").disabled = true;
        setTimeout(function(){  
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v0") // primary voltage Vp
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[2].cells[1].innerHTML= data;
        })
       // primary current
       {
        document.getElementById("myTable").rows[2].cells[2].innerHTML= 13.98; //I1
        }
        
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") // primary output Wp
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[2].cells[3].innerHTML= data;
        value3=data; //W1
        })
        //fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") // secondary voltage Vs
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[2].cells[4].innerHTML= data;
        value5=data; //V2
        })
        
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") // iron loss
        .then(response => response.json())
        .then(data =>
             {
       var value6=document.getElementById("myTable").rows[2].cells[5].innerHTML= parseFloat(parseFloat(value3)- parseFloat(data)).toFixed(2); // W2
      var data_ef= document.getElementById("myTable").rows[2].cells[6].innerHTML=parseFloat((parseFloat(value6)/parseFloat(value3))*100).toFixed(2); // Efficency
   }) 
       fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // no load voltage
       .then(response => response.json())
       .then(data => {
       document.getElementById("myTable").rows[2].cells[7].innerHTML= parseFloat(((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100).toFixed(2); // Regulation
       }) 
       document.getElementById("btn_plus1").disabled = false;
        document.getElementById("u").disabled = false;
   },5000);

   }
    })
}
    });
}

// Supply Button
 function Power(){
    const btn_power = document.getElementById('btn_power').style.color='#0bc029';
    const ohm = document.getElementById('ohm').style.color='#fff'; 
    const btnnl = document.getElementById('btnnl').style.color='#ff0000';
    fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9=1") // supply 
    document.getElementById("resistance").innerHTML= "NL"; 
    document.getElementById("btn_load").disabled = true;
    setTimeout(function(){
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v0") //Vp
        .then(response => response.json())
        .then(data => { 
          document.getElementById("myTable").rows[1].cells[1].innerHTML= data;
        })
        // primary current
        { 
       document.getElementById("myTable").rows[1].cells[2].innerHTML= 7.43; //Ip
        }
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V3") //Wp
        .then(response => response.json())
        .then(data => {
       document.getElementById("myTable").rows[1].cells[3].innerHTML= data;
       value3=data;
      })
        //fetch("https://blr1.blynk.cloud/external/api/get?token=8814IN0L2pBemCkves4Jj7DtfAjiT1Zh&V0") //Vs
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V5")
        .then(response => response.json())
        .then(data => {
       document.getElementById("myTable").rows[1].cells[4].innerHTML= data;
       value5=data;
        })
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V4") //iron loss
        .then(response => response.json())
        .then(data =>
        {
          //w2
         var value6=document.getElementById("myTable").rows[1].cells[5].innerHTML= parseFloat((parseFloat(value3)- parseFloat(data))||0).toFixed(2); //W2
         document.getElementById("myTable").rows[1].cells[6].innerHTML=parseFloat(((parseFloat(value6)/parseFloat(value3))*100)||0).toFixed(2); // Efficiency
        }) 
        fetch("https://blr1.blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&V8") // No load voltage
        .then(response => response.json())
        .then(data => {
        document.getElementById("myTable").rows[1].cells[7].innerHTML= parseFloat((((parseFloat(data)- parseFloat(value5))/parseFloat(data))*100)||0).toFixed(2); // regulation
        }) 
        document.getElementById("btn_load").disabled = false;
    },3000);
  }

// reset
   function reset(){
    const btn_power = document.getElementById('btn_power').style.color='#414141';
    const btn_load = document.getElementById('btn_load').style.color='#414141';
    const btn0 = document.getElementById('btn0').style.color='#414141';
    const btn1 = document.getElementById('btn1').style.color='#414141';
    const btn2 = document.getElementById('btn2').style.color='#414141';
    const btn3 = document.getElementById('btn3').style.color='#414141';
    const btn4 = document.getElementById('btn4').style.color='#414141';
    const btnnl = document.getElementById('btnnl').style.color='#414141';
    const ohm = document.getElementById('ohm').style.color='#fff'; 
  
     fetch('https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10') // reset switch
     .then(response => response.json())
     .then(data => {
       const myJSON = JSON.stringify(data)
       console.log(myJSON);
       if (myJSON == "0") {
          // console.log("sarle");
           fetch('https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10=1')
           fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9=0") //supply 
         }
       
         setTimeout(function(){
            alert('Reset Done.');
             window.location.reload();
             fetch('https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10=0')
        },5000)   
     },); 
   }     


//Leave session
function leave(){
    sessionStorage.removeItem("saved_countdown");
    sessionStorage.removeItem("saved_val_u");
    //fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10=" + "1")
    fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v11=0")
         .then(() =>{
            fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9=0")
            location.replace("../home_page/home.html")     
        })
       // fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10=0")
}

function return_home(){
    location.href='../home_page/home.html'
}

window.addEventListener('beforeunload', () => {
    // const btn_power = document.getElementById('btn_power').style.color='#0bc029';
    fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9=0")
    fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6=0")
    fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v13=0")

}); 

// Fetch data from the table
function fetchData() {
    var table = document.getElementById("myTable");
    var data = [];
    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var W = row.cells[3].textContent;
      var Efficiency = parseFloat(row.cells[6].textContent);
      data.push({ x: W, y: Efficiency });
    }
    return data;
  }
  // Update the graph with live data
  function updateGraph() {
  var data = fetchData();

// Plot the line graph using Plotly
var layout = { title: "Graph"};
var trace = { x: data.map((d) => d.x), y: data.map((d) => d.y), type: "line"};
Plotly.newPlot("graph", [trace], layout);
  }
  
// Refresh the graph every 5 seconds
setInterval(updateGraph, 5000);

//Fetch data from table
function fetchData() {
const table = document.getElementById('myTable');
const tableData = [];
for (let i = 1; i < table.rows.length; i++) {
  tableData.push({
    x: parseFloat(table.rows[i].cells[5].innerHTML),
    y1: parseFloat(table.rows[i].cells[6].innerHTML),
    y2: parseFloat(table.rows[i].cells[7].innerHTML)
  });
}
return tableData;
  }

// Update the graph with live data
  function updateGraph() {
  const tableData = fetchData();
  
// Create traces
const trace1 = {
  x: tableData.map(row => row.x),
  y: tableData.map(row => row.y1),
  name: 'Efficiency',
  type: 'line'
};
const trace2 = {
  x: tableData.map(row => row.x),
  y: tableData.map(row => row.y2),
  name: 'Regulation',
  type: 'line'
};

// Create layout
const layout = {
  title: 'LOAD TEST GRAPH',
  xaxis: { title: 'Power (Watts)' },
  yaxis: { title: 'Efficiency (η) & Regulation (%)'}
};

// Create plot
const data = [trace1, trace2];
Plotly.newPlot('graph', data, layout);
  }

//   // Refresh the graph every 2 seconds
  setInterval(updateGraph, 2000);

    