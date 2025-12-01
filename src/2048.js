/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   2048.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:49:43 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/01 17:11:54 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Element references
let grid = [
  [1024, 1024, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let state;

// Set the grid to 0 (initial state) and score too
function StartGame(grid)
{
    state = "STARTING";
    score = 0;
    
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
            grid[i][j] = 0;
    }

    addRandomTile(grid);
    addRandomTile(grid);
    drawGrid(grid);
}

// Calls start game function
window.onload = function () 
{
    StartGame(grid)
    state = "PLAYING";
};

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
                moved = slideUp(grid);
                if (moved)
                    updateGridU(grid);
                break;
            }
            case "ArrowDown":
            {
                moved = slideDown(grid);
                if (moved)
                    updateGridD(grid);
                break;
            }
            case "ArrowLeft":
            {
                moved = slideLeft(grid);
                if (moved)
                    updateGridL(grid);
                break;
            }
            case "ArrowRight":
            {
                moved = slideRight(grid);
                if (moved)
                    updateGridR(grid);
                break;
            }
            default:
                break;
        }
        if (!moved && getEmptyCells(grid).length === 0)
            return loseGame();
    }
    
    if (state === "PLAYING")
    {
        addRandomTile(grid);
        drawGrid(grid);
    }
});

//reset grid and score with the start game function
function resetGame()
{
    state = "RESTARTING";
    console.log("reset");
    StartGame(grid)
}

// add reset functionality to the btn
document.getElementById("restart-btn").addEventListener("click", resetGame);
