window.onload = function() {
    /* Aan het begin heb ik een declaratie gemaakt van alle varaibelen die een globale scoop mogen krijgen */
    /* De enige die const is de totale afstand van aarde tot mars, want dit blijft altijd hetzelfde */

    const totalDistanceToMars = 34000000;
    var overDistanceToMars = 4000000;
    var currentSpeed = 1000;
    var co2R = 0;
    var cl2R = 0;
    var hn3R = 0;
    var rotateValue = 0.5;
    var textFill = 0;
    var distancePerecentage =0;
    var distanceRotate = 0;
    var arcUsed = document.getElementById('arcUsed');
    var ctx = arcUsed.getContext("2d");
    availableWaterAndFood = 50;
    /* tekenen van de eerste helft van de cirkel */

    ctx.beginPath();
    ctx.arc(150, 75, 70, 0, 1* Math.PI, false);
    ctx.fillStyle = "green";
    ctx.fill();
    /* tekenen van de tweede helft van de cirkel */

    ctx.beginPath();
    ctx.arc(150, 75, 70, 0, 1 * Math.PI, true);
    ctx.fillStyle = "#cfccc4";
    ctx.fill();
    ctx.beginPath();
    /* De aanroep van de functies alleen voor de eerste keer, daarna gaan ze zelf alleen aan de slag */

    calculateDistancePercentage();
    setTravelDistanceStatus();
    speedTimer();
    generateRandomNumbers();
    /* De JavaScript gelijk de html waarden laten overnemen om te behandelen */

    document.getElementById('overDistanceToMarsDOM').innerHTML = overDistanceToMars + (' mile over');
    document.getElementById('speedDOM').innerHTML = currentSpeed + (' mile/s');
    document.getElementById('speedUp').onclick = function() {
        if (currentSpeed >= 10000) {
        currentSpeed = 10000;}
        else{currentSpeed = currentSpeed + 1000;}};
    document.getElementById('slowDown').onclick = function() {
        if (currentSpeed <= 0) {
        currentSpeed = 0;}
        else{currentSpeed = currentSpeed - 1000;}};

    /* Deze functie berekent de overgebleven afstand t.o.v de huidige snelheid*/
    /* Omdat dat elke seconde gebeurt, heb ik ook andere een seconde delay functies aanroep hier gezet */
    function speedTimer() {
        setTimeout(function(){overDistanceToMars = overDistanceToMars - currentSpeed;
        document.getElementById('overDistanceToMarsDOM').innerHTML = overDistanceToMars + (' mile over');
        document.getElementById('speedDOM').innerHTML = currentSpeed + (' mile/s');
        speedTimer(); changeSpeedBarStatus(); changeEngineStatus(); arrived(); calculateDistancePercentage();
        setTravelDistanceStatus();}, 1000);
    }

    function arrived (){
        if(overDistanceToMars <= 0) {
            setTimeout(function(){location.reload();}, 2000);
            document.getElementById('overDistanceToMarsDOM').innerHTML = ('Arrived!');
        }
    }

    /* Veranderen van de kleur van de snelheid bar */

    function changeSpeedBarStatus(){
        if (currentSpeed < 1000) {
        document.getElementById('speedBar').classList.remove('speedBarGreen');
        document.getElementById('speedBar').classList.add('speedBarZero');
        } else if (currentSpeed >= 1000 && currentSpeed <= 3000) {
        document.getElementById('speedBar').classList.remove('speedBarZero');
        document.getElementById('speedBar').classList.remove('speedBarYellow');
        document.getElementById('speedBar').classList.add('speedBarGreen');
        } else if (currentSpeed > 3000 && currentSpeed <= 5000) {
        document.getElementById('speedBar').classList.remove('speedBarGreen');
        document.getElementById('speedBar').classList.remove('speedBarOrange');
        document.getElementById('speedBar').classList.add('speedBarYellow');
        } else if (currentSpeed > 5000 && currentSpeed <= 9000) {
        document.getElementById('speedBar').classList.remove('speedBarYellow');
        document.getElementById('speedBar').classList.remove('speedBarRed');
        document.getElementById('speedBar').classList.add('speedBarOrange');
        } else if (currentSpeed > 9000) {
            document.getElementById('speedBar').classList.remove('speedBarOrange');
            document.getElementById('speedBar').classList.add('speedBarRed');
        }
    }

    /* Laat de engine rood worden bij grote snelheden */

    function changeEngineStatus() {
        if (currentSpeed > 9000) {
            document.getElementById('engine').style.backgroundColor = 'red';
        }
        else {
            document.getElementById('engine').style.backgroundColor = 'white';
        }
    }
    
    /* Random numbers voor de giftige gassen */

    function generateRandomNumbers() {
        setTimeout(function(){ 
            co2R = Math.floor(Math.random() * 71);
            cl2R = Math.floor(Math.random() * 71);
            hn3R = Math.floor(Math.random() * 71);
            document.getElementById('co2').style.height = co2R + ('%'); 
            document.getElementById('cl2').style.height = cl2R + ('%'); 
            document.getElementById('hn3').style.height = hn3R + ('%'); 
            if (co2R >= 40 || cl2R >= 40 || hn3R >= 40) {
                console.log(co2R);
                console.log(cl2R);
                console.log(hn3R);
                document.getElementById('sleepingRoom').style.backgroundColor = 'red';
                document.getElementById('cockpit').style.backgroundColor = 'red';
            }
            else {
                document.getElementById('sleepingRoom').style.backgroundColor = 'white';
                document.getElementById('cockpit').style.backgroundColor = 'white';
            }
            generateRandomNumbers();
         }, 25000);

    }

    /* reset giftige gassen tot de waarde van 10 */

    document.getElementById('o2').onclick= function () {
        co2R = 10;
        cl2R = 10;
        hn3R = 10;
        document.getElementById('co2').style.height = co2R + ('%'); 
        document.getElementById('cl2').style.height = cl2R + ('%'); 
        document.getElementById('hn3').style.height = hn3R + ('%'); 
        document.getElementById('sleepingRoom').style.backgroundColor = 'white';
        document.getElementById('cockpit').style.backgroundColor = 'white';
    };

    function calculateDistancePercentage() {
        if ((overDistanceToMars / totalDistanceToMars) <= 0) {
            distancePerecentage = 100;
            document.getElementById('textFill').innerHTML = distancePerecentage+('%'); 
        } else {
        distancePerecentage = (100.00 - (( overDistanceToMars / totalDistanceToMars ) * 100).toFixed(2)).toFixed(2);
        distanceRotate = (( overDistanceToMars / totalDistanceToMars ) * 100).toFixed();
        }
     }

    function setTravelDistanceStatus() { 
        if (distancePerecentage <= 0) {
            document.getElementById('fill').style.transform = 'rotate(0.5turn)';
        } else {
        rotateValue = 0.5 - ((distanceRotate * 0.5) / 100);
        document.getElementById('fill').style.transform = 'rotate'+'('+rotateValue+'turn)';
        document.getElementById('textFill').innerHTML = distancePerecentage+('%'); 
        }
    }
    
    document.getElementById('availableData').innerHTML = 'Available ' + availableWaterAndFood + '%'; 

    /* De wekelijkse verbruik van brandstof */

    document.getElementById('Monday').style.height = "50%";
    document.getElementById('Tuesday').style.height = "47%";
    document.getElementById('Wednesday').style.height = "40%";
    document.getElementById('Thursday').style.height = "32%";
    document.getElementById('Friday').style.height = "27%";
    document.getElementById('Saturday').style.height = "20%";
    document.getElementById('Sunday').style.height = "10%";
   
};