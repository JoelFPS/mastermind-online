function difficultyChoose(){
    let difficulty = document.getElementById('difficulty');
    let selected = difficulty.selectedIndex;
    if(selected == 0){
        location.href="masterhard.html";
    }else{
        location.href="mastereasy.html";
    }
}


