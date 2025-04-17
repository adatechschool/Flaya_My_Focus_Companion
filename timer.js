const testTimer = document.querySelector('#timer')

 
function timer(userTime) {
    let minutes = userTime;
    let secondes =  60;

    testTimer.innerText = `Il reste ${minutes} minutes`
    
    const timing = setInterval(() => {
    if (secondes == 0) {
            minutes--
            secondes = 60
        }

        secondes-- 

        if (minutes === 0 && secondes === 0) {
            clearInterval(timing);
        }
        testTimer.innerText = `Il reste ${minutes-1} minutes et ${secondes} secondes`

    }, 1000)

}



/* le user rentre 20 min
20 min on le convertit en seconde = 1200 secs
ensuite on décrémente les 1200 sec 
Dans 1 min, il y a  60 sec. Toutes les 60 sec on enlève 1 min
à la fin du temps, on clear :  console log ("time out")

*/
timer(3)
