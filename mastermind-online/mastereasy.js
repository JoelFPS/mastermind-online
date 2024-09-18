// GLOBAL
let tourNumber = 1;
let color = "";
let mainCode = [];

// ONLOAD BODY
function startApp()
{
    let defaultColor = "#007e77";
    for(var i=1;i<13;i++)
    {
        for(j=1;j<6;j++){
            id = 'i'+j+'-c'+i;
            document.getElementById(id).style.backgroundColor = defaultColor;
        }
    }
}
function randomizeNumber() {
    min = Math.ceil(1);
    max = Math.floor(4);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateCode()
{
    mainCode.push(randomizeNumber());
    mainCode.push(randomizeNumber());
    mainCode.push(randomizeNumber());
    mainCode.push(randomizeNumber());
    mainCode.push(randomizeNumber());

    for(i=0;i<mainCode.length;i++){
        switch (mainCode[i]) {
            case 1: mainCode[i] = "red";
            break;
            case 2: mainCode[i] = "yellow";
            break;
            case 3: mainCode[i] = "green";
            break;
            case 4: mainCode[i] = "blue";
            break;
        }
    }
    //console.log(mainCode);
}

// ONCLICK COLOR BUTTONS
function getColor(selectedColor)
{
    if(color != ""){
        let oldColor = color;
        document.getElementById(oldColor).style.border = "1px solid black";
        document.getElementById(oldColor).style.boxShadow = "-6px 6px black";
        document.getElementById(oldColor).style.transform = "";
    }
    color = selectedColor;
    document.getElementById(selectedColor).style.border = "3px solid black";
    document.getElementById(selectedColor).style.boxShadow = "-1px 1px black";
    document.getElementById(selectedColor).style.transform = "translate(-5px, 5px)";
}

// ONCLICK PIN BUTTONS
function setColor(id)
{
    document.getElementById(id).style.backgroundColor = color;
}

// ONCLICK CHECK BUTTON
function notEmpty()
{
    let nr = tourNumber;
    let checkColor = "rgb(0, 126, 119)";
    let id1 = 'i1-c'+nr;
    let id2 = 'i2-c'+nr;
    let id3 = 'i3-c'+nr;
    let id4 = 'i4-c'+nr;
    let id5 = 'i5-c'+nr;
    let pole1 = document.getElementById(id1).style.backgroundColor;
    let pole2 = document.getElementById(id2).style.backgroundColor;
    let pole3 = document.getElementById(id3).style.backgroundColor;
    let pole4 = document.getElementById(id4).style.backgroundColor;
    let pole5 = document.getElementById(id5).style.backgroundColor;

    if(pole1 != checkColor && pole2 != checkColor && pole3 != checkColor && pole4 != checkColor && pole5 != checkColor){
        compatibility();
    } else {
        alert("Nie zaznaczyłeś wszystkich pól!");
    } 
}

function scoreCounter()
{
    let score = 80;
    let round = tourNumber;
    let a = 1;

    for(i=1;i<=round;i++){
        if(i == round){
            return score;
        } else {
            a++;
            score = score - a;
        }
    } 
}
function compatibility()
{
    let blackPins = 0;
    let whitePins = 0;
    let correctId = [];
    let nr = tourNumber;

    for(i=0;i<mainCode.length;i++){
        let j = i+1;
        let id = 'i'+j+'-c'+nr;
        if(document.getElementById(id).style.backgroundColor == mainCode[i]){
            blackPins = blackPins+1;
            correctId[i] = 'black';
        } else {
            correctId[i] = '';
        }
        if (tourNumber < 12){
            if(blackPins == 5) {
                let score = scoreCounter();
                alert("You win! \nYour score: "+score); //ALERT WYGRANA
                window.ipcRenderer.send('openPage','index');
            }
        } else {
            if(blackPins == 5) {
                let score = scoreCounter();
                alert("You win! \nYour score: "+score); //ALERT WYGRANA
                window.ipcRenderer.send('openPage','index');
            } else {
                alert("You lost!") //ALERT PRZEGRANEJ
                finish();
            }
        }
    }
    for(i=0;i<mainCode.length;i++){
        if(correctId[i] != 'black'){
            let j = i+1;
            let id = 'i'+j+'-c'+nr;
            let statusRep = 0;
            let numberWhites = [];
            console.log("Przeładunek: "+j);
            for(k=0;k<mainCode.length;k++){
                if(correctId[k] == ''){
                    if(document.getElementById(id).style.backgroundColor == mainCode[k]){
                        statusRep++;
                        numberWhites.push(k);

                    }
                }
            }
            console.log(numberWhites);
            if(numberWhites != null){
                correctId[numberWhites[0]] = 'white';
            }
            if(statusRep > 0){
                whitePins++;
                statusRep = 0;
            }
        }       
    }
    console.log(correctId);
    showResult(blackPins, whitePins);
}

function showResult(blackPins, whitePins)
{
    let nr = tourNumber;
    let result = [];
    for(i=0;i<blackPins;i++){
        result.push("black");
    }
    for(j=0;j<whitePins;j++){
        result.push("white");
    }
    for(k=result.length; k<=5; k++){
        if(result.length < 5){
            result.push("#007e77");
        }
    }
    for(l=0;l<mainCode.length;l++){
        let m = l+1;
        let id = 'i'+m+'-r'+nr;
        document.getElementById(id).style.backgroundColor = result[l];
    }
    if(tourNumber < 12){
        removeDisabled();
    }
}

function removeDisabled()
{
    tourNumber++;
    let nr = tourNumber;
    let id1 = 'i1-c'+nr;
    let id2 = 'i2-c'+nr;
    let id3 = 'i3-c'+nr;
    let id4 = 'i4-c'+nr;
    let id5 = 'i5-c'+nr;

    document.getElementById(id1).removeAttribute('disabled');
    document.getElementById(id2).removeAttribute('disabled');
    document.getElementById(id3).removeAttribute('disabled');
    document.getElementById(id4).removeAttribute('disabled');
    document.getElementById(id5).removeAttribute('disabled');
    setDisabled();
}

function setDisabled()
{
    let nr = tourNumber-1;
    let id1 = 'i1-c'+nr;
    let id2 = 'i2-c'+nr;
    let id3 = 'i3-c'+nr;
    let id4 = 'i4-c'+nr;
    let id5 = 'i5-c'+nr;

    document.getElementById(id1).setAttribute('disabled','');
    document.getElementById(id2).setAttribute('disabled','');
    document.getElementById(id3).setAttribute('disabled','');
    document.getElementById(id4).setAttribute('disabled','');
    document.getElementById(id5).setAttribute('disabled','');
}

function giveUp()
{
    let text = "Are you sure?";
    if (confirm(text) == true){
        finish();
    }
}

function finish()
{
    let nr = tourNumber;
    document.getElementById('notEmpty').setAttribute('disabled','');
    document.getElementById('giveUp').setAttribute('disabled','');
    document.getElementById('notEmpty').style.border='6px solid gray';
    document.getElementById('giveUp').style.border='6px solid gray';
    document.getElementById('notEmpty').style.color='gray';
    document.getElementById('giveUp').style.color='gray';
    document.getElementById('cc').removeAttribute('hidden','');

    for(i=1;i<6;i++){
        let id1 = 'i'+i+'-c'+nr;
        let id2 = 'i'+i+'-cc';
        let j = i-1;
        document.getElementById(id1).setAttribute('disabled','');
        document.getElementById(id2).style.backgroundColor = mainCode[j];
    }   
}
function back()
{
    let text = "Are you sure?";
    if (confirm(text) == true){
        location.href="index.html";
    }
}