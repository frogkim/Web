const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playTo');
const diyap = document.querySelector('#diyap');
const tie = document.querySelector('#tie');
const initialScore = 3;
const maxScore = 11;

let start = false;
let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;


function updateScores(player, opponent){
    if(!isGameOver){
        player.score++;
        
        if(tie.checked === true && player.score === opponent.score && winningScore - player.score === 1)
        {
            if(winningScore < maxScore)
            {
                winningScore++;
                winningScoreSelect.value = winningScore;   
            }
        }

        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            player === p1 ? 
                diyap.src = "good.jpg" :
                diyap.src = "crying.png";
        }
        player.display.textContent = player.score;
    }    
}

p1.button.addEventListener('click', () => {
    if(!start)
    {
        start = true;
        disableChangeRules();
    }
    updateScores(p1, p2);
});

p2.button.addEventListener('click', () => {
    if(!start)
    {
        start = true;
        disableChangeRules();
    }
    updateScores(p2, p1);
});


winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function disableChangeRules(){
    winningScoreSelect.disabled = true;
    tie.disabled = true;
}


function reset() {
    for(let p of [p1, p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.button.disabled = false;
        if(isGameOver)
        {
            p.display.classList.remove('has-text-success', 'has-text-danger');
        }
    }
    start = false;
    isGameOver = false;
    winningScoreSelect.disabled = false;
    tie.disabled = false;
    winningScore = initialScore;
    winningScoreSelect.value = winningScore;   
    diyap.src = "yummy.png";
}