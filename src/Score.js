/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Score.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:51:12 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/01 17:04:42 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Score element reference
const scoreElement = document.getElementById("score");

// score variable
let score = 0;

// Update score prototype
function updateScore(value) 
{
    score += value
    scoreElement.textContent = score;
}

function loseGame()
{
    state = "GAME_OVER";
    alert("YOU LOoooOOOSE");
}