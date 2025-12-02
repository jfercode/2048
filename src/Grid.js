/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Grid.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:50:11 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/02 18:02:59 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Grid element reference
const gridElement = document.querySelector(".grid-container");

// Draws an empty grid
function initializeGrid(grid)
{
    gridElement.innerHTML = "";
    
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            cellDiv.id = `cell-${row}-${col}`;
            gridElement.appendChild(cellDiv);
        }
    }
}

// Draws an empty grid
function drawGrid(grid)
{
    if (gridElement !== undefined && gridElement !== null)
        gridElement.innerHTML = ""; // Clean previous grid

    for (let row of grid) 
    {
        for (let cell of row)
        {
            const cellDiv = document.createElement("div");
            cellDiv.className = "cell";
            if (cell instanceof Tile)
            {
                // Tile creation (when it is inside a cell) // 
                const tileDiv = document.createElement("div");
                
                tileDiv.className = "tile";
                tileDiv.textContent = cell.value;
                tileDiv.style.setProperty("background-color", cell.color);
                tileDiv.style.color = cell.fontColor;
                
                cell.div = tileDiv;
                cellDiv.appendChild(tileDiv);

                // Spawn Cell animation
                if (cell.isNew === true)
                {
                    cell.div.classList.add('tile-spawn');
                    cell.div.addEventListener('animationend', function handler(){
                        cell.div.classList.remove('tile-spawn');
                        cell.div.removeEventListener('animationend', handler);
                    })
                    cell.isNew = false;
                }
            }
            gridElement.appendChild(cellDiv);
        } 
    }
}

// Returns all empty cells as an array
function getEmptyCells(grid)
{
    const empty = [];
    for (let i = 0; i < grid.length; i++)
    {
        for (let j = 0; j < grid[i].length; j++) 
        {
            if (grid[i][j] === 0 || grid[i][j] === null)
            empty.push({ row: i, col: j });
        }
    }
    return empty;
}

function spawnTile(grid, x, y, value, isNew = true) 
{
    grid[y][x] = new Tile(x, y, value);
    grid[y][x].isNew = isNew;
}

// Add a single tile into my grid
function addRandomTile(grid) 
{
    const emptyCells = getEmptyCells(grid);
    if (emptyCells.length == 0) return;
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    spawnTile(grid, col, row, Math.random() < 0.9 ? 2 : 4, true);
}

// reverse rows
/*
    A B C      C B A
    D E F  =>  F E D
    G H I      I H G
*/
function reverseRows(grid) {
  for (let row = 0; row < grid.length; row++) {
    grid[row].reverse();
  }
}

// Transponse the grid
/* 
    A B C      A D G
    D E F  =>  B E H
    G H I      C F I
*/
function transpose(grid)
{
    for (let i = 0; i < grid.length; i++) 
    {
        for (let j = i + 1; j < grid[i].length; j++) 
        {
            let temp = grid[i][j];
            grid[i][j] = grid[j][i];
            grid[j][i] = temp;
        }
    }
}

function savePreviousPositions(grid)
{
    for (let row of grid)
    {
        for (let cell of row)
        {
            if (cell instanceof Tile)
            {
                cell.prevX = cell.x;
                cell.prevY = cell.y;
            }
        }
    }
}

 // TODO animate movement // 
function slide(grid)
{
    let moved = false;
    for (let row = 0; row < 4; row++) 
    {
        let targetCol = 0;
        for (let col = 0; col < 4; col++) 
        {
            if (grid[row][col] instanceof Tile)
            {
                if (col !== targetCol)
                {
                    grid[row][targetCol] = grid[row][col];
                    grid[row][targetCol].x = targetCol;
                    grid[row][targetCol].y = row;
                    grid[row][col] = 0;
                    moved = true;
                }
                else if (grid[row][col] instanceof Tile)
                {
                    grid[row][col].x = col;
                    grid[row][col].y = row;
                }
                targetCol++;
            }
        }
    }
    return moved;
}

/**
 * compact -> merge -> compact
 */
function slideLeft(grid) 
{
    savePreviousPositions(grid);
    let moved1 = slide(grid);
    let merged = updateGridL(grid);
    let moved2 = slide(grid);   
    return moved1 || merged || moved2;
}

function slideRight(grid) 
{
    savePreviousPositions(grid);
    reverseRows(grid);
    let moved = slideLeft(grid);
    reverseRows(grid);
    return moved;
}

function slideUp(grid)
{
    savePreviousPositions(grid);
    transpose(grid);
    let moved = slideLeft(grid);
    transpose(grid);
    return moved;
}

function slideDown(grid)
{
    savePreviousPositions(grid);
    transpose(grid);
    reverseRows(grid)
    let moved = slideLeft(grid);
    reverseRows(grid);
    transpose(grid);
    return moved;
}

function updateGridL(grid)
{
    let merged = false;

    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 3; col++)
        {
            let current = grid[row][col];
            let next = grid[row][col + 1];
            if (current instanceof Tile && next instanceof Tile && current.value === next.value)
            {
                let value = current.value + next.value;
                if (value === 2048)
                    winGame();
                current.setValue(value);
                current.isNew = true;
                grid[row][col + 1] = 0;
                updateScore(current.getValue());
                merged = true;
                col++;
            }   
        }
    }
    return merged;
}

/*
    For each Tile i need to check for neightbours (if tile.value === neighbour.value) the game doesnt finnish
*/
function validateNoMoreMoves(grid)
{
    for (let row = 0; row < 4; row++)
    {
        for (let col = 0; col < 4; col++)
        {
            let current = grid[row][col];
            if (current instanceof Tile)
            {
                if (row > 0 && grid[row - 1][col] instanceof Tile && grid[row - 1][col].value === current.value)
                    return false;
                if (row < 3 && grid[row + 1][col] instanceof Tile && grid[row + 1][col].value === current.value)
                    return false;
                if (col > 0 && grid[row][col - 1] instanceof Tile && grid[row][col - 1].value === current.value)
                    return false;
                if (col < 3 && grid[row][col + 1] instanceof Tile && grid[row][col + 1].value === current.value)
                    return false;
            }
        }
    }
    return true;
}
