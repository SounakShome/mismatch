<script lang="ts">
    import { page } from "$app/state"
</script>

<div>


  
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap" rel="stylesheet">
    <title>webdev</title>
    <style>
        
body {
    background-color: black;
    font-family: 'Rubik Glitch', cursive;
    color: white;
    margin: 0;
    padding: 0;
}
.navbar{
  background-color: black;
    height: 80px;

}

.pg1{
    background-color:black;
    width: 100%;
    min-height: 100px; 
    
}

.img{
    display: block;  
    margin: 0 auto;   
    max-height: 50px; 
   
  }
.left{
    
    
    float: left;
    text-align: center;
    padding: 20px 22px;
  text-decoration: none;
}

.right{
 
    float: right;
    text-align: center;
    padding: 14px 16px;
  text-decoration: none;
}
.line{
  color: white;
  text-align: center;
  font-family: 'Rubik Glitch', cursive;
  font-size: 30px;
}

.reg1{
  
  text-align: center;
  font-family: 'Rubik Glitch', cursive;
  
  margin-top: -100px;
  text-decoration: none;
}
.reg{
  
  text-align: center;
  font-family: 'Rubik Glitch', cursive;
  
  margin-top: -100px;
  text-decoration: none;
  
}
img.image {
  position: relative;
        top: -90px; 
        left: -150px;
  max-width: 400px;
        height: auto;
    }
.image1{
  display: block;
        margin: auto;
        max-width: 100px;
        height: auto;
    }
    .navbar a {
      position: relative;
      text-decoration: none;
      color: white;
      font-size: 23px;
      font-weight: bold;
      padding: 10px 20px;
      transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
  }
  
  .navbar a:hover {
      transform: translateY(-3px); 
      color:#A677FB;
  }
  .n {
    font-family: 'Jersey 25', sans-serif;
    padding: 10px 20px;
    background-color: black;
    text-decoration: none;
    color: white;
    font-size: 23px;
    font-weight: bold;
    display: inline-block;
    transition: transform 0.3s ease, background-color 0.3s ease;
}


.n:hover {
    transform: scale(1.2);  
    background-color: rgba(255, 255, 255, 0.2); 
    border-radius: 8px; 
}

.countdown-container {
  text-align: center;
}

#countdown {
  font-family: 'Rubik Glitch', cursive;
  font-size: 5rem;
  color: white;
  text-shadow: 3px 3px 5px rgba(255, 255, 255, 0.3);
  animation: glitch 1.5s infinite;
}

/* Glitch Effect */
@keyframes glitch {
  0% {
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2);
  }
  25% {
      text-shadow: -2px -2px 0px rgba(255, 255, 255, 0.3);
  }
  50% {
      text-shadow: 3px -3px 0px rgba(255, 255, 255, 0.4);
  }
  75% {
      text-shadow: -3px 3px 0px rgba(255, 255, 255, 0.5);
  }
  100% {
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2);
  }
}

.reg {
  font-family: 'Rubik Glitch', cursive;
  font-size: 2rem;
  text-align: center;
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 10px 25px;
 
  transition: 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}


.reg:hover {
  color:#E2EAF4;
  text-shadow: 2px 2px #A677FB;
  transform: scale(1.05);
}

    </style>
</head>

<body style="background-color:black">
    
    <section  class="navbar">
        <div class="left" >
            
            <a href="#" class="n">Home</a>
            
            <a href="#"class="n" >Tracks</a>
            <a href="#"class="n">Organizers</a>
            <a href="#"class="n">Prizes</a></div>
            
            <div class="right">
            <a href="#" class="n">Timeline</a>
            <a href="#"  class="n">Sponsors</a>
            <a href="#"  class="n">FAQ</a>
            <a href="#" class="n">Contact</a>
        </div> 
        <img src= "ieeeras logo.png"
            width="200" height="50" alt="" class="img"> 
    
    </section>
    <section class="pg1">
        <div class="line"> <p>Presents</p></div>
       <div class="image1"><img src= "logo.png" alt="" class="image"> </div> 
       <div class="reg1"><a href="#" class="reg">Register Now!!!</a></div>
        
       </section>
       <div class="countdown-container">
        <p id="countdown">66d : 27h : 17m</p>
    </div>

    <script>
        function startCountdown(targetDate) {
            function updateTimer() {
                let now = new Date().getTime();
                let distance = targetDate - now;

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                document.getElementById("countdown").textContent = 
                    `${days}d : ${hours}h : ${minutes}m`;

                if (distance > 0) {
                    requestAnimationFrame(updateTimer);
                } else {
                    document.getElementById("countdown").textContent = "Time's Up!";
                }
            }

            updateTimer();
        }

        let countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 66); 
        countdownDate.setHours(countdownDate.getHours() + 27); 
        countdownDate.setMinutes(countdownDate.getMinutes() + 17);

        startCountdown(countdownDate);
    </script>
</body>

</html>
</div>