/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   2048.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:49:43 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/03 11:10:48 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Important variables
let grid = [];  // Game grid
let state;      // Current state

// Windows on load (fake presentation page)
window.onload = function()
{
    state = "WINDOWS_LOAD"
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];

    initializeGrid(grid);

    spawnTile(grid, 0, 0, 2);
    spawnTile(grid, 1, 1, 0);
    spawnTile(grid, 2, 2, 4);
    spawnTile(grid, 3, 3, 8);
    drawGrid(grid)
}

// Event listener with keydown event
document.addEventListener("keydown", function (event)
{
    if (state === "PLAYING")
    {
        let moved = false;
        switch (event.key) 
        {
            case "ArrowUp":
            {
                state = "MOVING";
                moved = slideUp(grid);
                state ="PLAYING";
                break;
            }
            case "ArrowDown":
            {
                state = "MOVING";
                moved = slideDown(grid);
                state = "PLAYING";
                break;
            }
            case "ArrowLeft":
            {
                state = "MOVING";
                moved = slideLeft(grid);
                state = "PLAYING";
                break;
            }
            case "ArrowRight":
            {
                state = "MOVING";
                moved = slideRight(grid);
                state = "PLAYING";
                break;
            }
            default:
                return;
        }
        if (!moved && getEmptyCells(grid).length === 0 && validateNoMoreMoves(grid) === true)
            return loseGame(score);
    }
    
    if (state === "PLAYING")
    {
        addRandomTile(grid);
        drawGrid(grid);
    }
});

// Set the grid to 0 (initial state) and score too
function StartGame()
{
    state = "STARTING";
    score = 0;
    scoreElement.textContent = 0;

    grid = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],]
    
    addRandomTile(grid);
    addRandomTile(grid);
    drawGrid(grid);
    state = "PLAYING";
}

// add start functionality to the start btn
document.getElementById("start-btn").addEventListener("click", function(){
    StartGame();
})

//reset grid and score with the start game function
function resetGame()
{
    state = "RESTARTING";
    StartGame(grid);
}

// add reset functionality to the btn
document.getElementById("restart-btn").addEventListener("click", resetGame);
