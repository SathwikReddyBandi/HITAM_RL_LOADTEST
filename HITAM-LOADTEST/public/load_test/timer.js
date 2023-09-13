var time = 10; // This is the time allowed
var time_seconds = time*60; // This is time allowed in seconds
var saved_countdown = sessionStorage.getItem('saved_countdown');

if(saved_countdown == null) {
    // Set the time we're counting down to using the time allowed
    var new_countdown = new Date().getTime() + (time_seconds+1) * 1000;

    time = new_countdown;
    sessionStorage.setItem('saved_countdown', new_countdown);
} else {
    time = saved_countdown;
}

// Update the count down every 1 second
var x = setInterval(() => {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the allowed time
    var distance = time - now;

    // Time counter
    var minutes = Math.floor((distance / 60)/1000);
    var formattedMinutes = ("0" + minutes).slice(-2);
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var formattedSeconds = ("0" + seconds).slice(-2);

    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = formattedMinutes + ":" + formattedSeconds;
        
    // If the count down is over, write some text 
    if (distance <= 0) {
        clearInterval(x);
        
        // setTimeout(2000);
        
        sessionStorage.removeItem("saved_countdown");

         document.getElementById("demo").innerHTML = "Session Ended";
         //fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v10=" + "1")
         fetch("https://blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v11=0")//usage off
            .then(() => {
                fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v9=0")//supply off
                
                location.replace("../home_page/home.html")
          
                
               // fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v6=0")
            //  fetch("https://blr1.blynk.cloud/external/api/update?token=fhuOie_TVJlJEv9q661APCGovOiIohHZ&v13=0")
              
            })
    }
}, 1000);

