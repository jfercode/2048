/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Score.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:51:12 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/02 18:02:50 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Score element reference
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");

// score variable
let score = 0;
let highScore = localStorage.getItem("high-score");

// Update score prototype
function updateScore(value) 
{
    score += value
    scoreElement.textContent = score;
     if (score >= highScore)
        updateHighScore(score)
    
    scoreElement.classList.add('score-anim');
    scoreElement.addEventListener('animationend', function handler(){
        scoreElement.classList.remove('score-anim');
        scoreElement.removeEventListener('animationend', handler);
    })
}

function updateHighScore(value)
{
    highScore = value;
    highScoreElement.textContent = score;
    localStorage.setItem("high-score", value);

    highScoreElement.classList.add('score-anim');
    highScoreElement.addEventListener('animationend', function handler(){
        highScoreElement.classList.remove('score-anim');
        highScoreElement.removeEventListener('animationend', handler);
    })
}

function loseGame(currentScore)
{
    state = "GAME_OVER";
    showGameOverModal("GAME OVER", `Your score: ${currentScore}`, false);   
}

function winGame()
{
    state = "WINNING";
    showGameOverModal("YOU WIN!", `You reached 2048!`, true);    
}

function showGameOverModal(title, message, isWin)
{
    const modal = document.createElement("div");
    modal.className = "game-modal";
    modal.id = "game-over-modal";
    
    modal.innerHTML = `
        <div class="modal-content ${isWin ? 'win' : 'lose'}">
            <h2>${title}</h2>
            <p>${message}</p>
            <p>Final Score: ${score}</p>
            <button onclick="closeModalAndReset()">Play Again</button>
        </div>`;
    
    document.body.appendChild(modal);
}

function closeModalAndReset()
{
    const modal = document.getElementById("game-over-modal");
    if (modal)
        modal.remove();
    resetGame();
}