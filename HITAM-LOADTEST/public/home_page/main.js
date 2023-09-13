

// Load Test
function loadtest_theory(){
  location.href='../load_test/theory.html';
 }
 function loadtest_exp(){
 // location.href='../load_test/index.html';
  fetch('https://blynk.cloud/external/api/isHardwareConnected?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ')
  .then(response => response.json())
  .then(data => {
    const connection = JSON.stringify(data)
    // console.log(connection);

    if(connection == "true"){
      fetch('https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v11')
      .then(response => response.json())
      .then(data => {
        const myJSON = JSON.stringify(data)
        if (myJSON == "0") {
         
          location.href='../load_test/index.html';
          fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v11=1")//usage
        
        }
        else{
          alert("Setup is in use, please try again later.");
        }
      })
    }
  if(connection=="false"){
    // console.log("hahaha");
     
     fetch('https://blynk.cloud/external/api/get?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v12')
     .then(response => response.json())
     .then(data => {
       const myJSON = JSON.stringify(data)
       console.log(myJSON);
       if (myJSON == "1") {
         //console.log("sorry");
       }
         else{
          // console.log("sarle");
           fetch('https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v12=1')
          // console.log("ok");
        // fetch('https://blynk.cloud/external/api/update?token=xhn8z8fVu6weEbbHIgVNjmQ4waWrX6Xm&v0=1')
         }
         alert('Device is currently offline, please try again later');
         fetch('https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v12=0')
        //fetch('https://blynk.cloud/external/api/update?token=xhn8z8fVu6weEbbHIgVNjmQ4waWrX6Xm&v0=0')
        
     });
   }
   
 })
 }




window.addEventListener("orientationchange", ()=> {
  if(window.orientation == 90){
    // console.log("landscape");
    document.querySelector('.head').style.display = 'block'
  }else{
    // console.log("portrait");
    document.querySelector('.head').style.display = 'none'
  }
})


