/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Score.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:51:12 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/03 11:09:59 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Score element reference
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");

// score variables
let score = 0;
let highScore = 0;

// Update score
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

// Update high score 
function updateHighScore(value)
{
    highScore = value;
    highScoreElement.textContent = score;

    highScoreElement.classList.add('score-anim');
    highScoreElement.addEventListener('animationend', function handler(){
        highScoreElement.classList.remove('score-anim');
        highScoreElement.removeEventListener('animationend', handler);
    })
}

// Lose game modal 
function loseGame(currentScore)
{
    state = "GAME_OVER";
    showGameOverModal("GAME OVER", `Your score: ${currentScore}`, false);   
}

// Win game modal 
function winGame()
{
    state = "WINNING";
    showGameOverModal("YOU WIN!", `You reached 2048!`, true);    
}

// Show game modals (creation of html div modal element)
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

// Close the modal and reset states
function closeModalAndReset()
{
    const modal = document.getElementById("game-over-modal");
    if (modal)
        modal.remove();
    resetGame();
}
