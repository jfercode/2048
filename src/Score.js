/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Score.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:51:12 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/02 15:39:58 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Score element reference
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");

// score variable
let score = 0;
let highScore = 0;

// Update score prototype
function updateScore(value) 
{
    score += value
    scoreElement.textContent = score;
    
    scoreElement.classList.add('score-anim');
    scoreElement.addEventListener('animationend', function handler(){
        scoreElement.classList.remove('score-anim');
        scoreElement.removeEventListener('animationend', handler);
    })
}

// TODO save high score in session (search it)
function updateHighScore(value)
{
    highScore = value;
    highScoreElement.textContent = score;

}

function loseGame(currentScore)
{
    state = "GAME_OVER";
    alert("GAME_OVER");
    if (currentScore >= highScore)
        updateHighScore(currentScore)
}


function winGame(currentScore)
{
    state = "WINNING";
    alert("YOU_WIN");
    if (currentScore >= highScore)
        updateHighScore(currentScore)
}