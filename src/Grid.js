/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Grid.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:50:11 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/01 17:22:37 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Grid element reference
const gridElement = document.querySelector(".grid-container");

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
                const tileDiv = document.createElement("div");
                tileDiv.className = "tile";
                tileDiv.textContent = cell.value;
                tileDiv.style.backgroundColor = cell.color;
                cellDiv.appendChild(tileDiv);
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

// Add a single tile into my grid
function addRandomTile(grid) 
{
    const emptyCells = getEmptyCells(grid);
    
    if (emptyCells.length == 0) return;
    
    const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[row][col] = new Tile(col, row, Math.random() < 0.9 ? 2 : 4);
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
                    grid[row][col] = 0;
                    moved = true;
                }
                targetCol++;
            }
        }
    }
    return moved;
}

function slideLeft(grid)
{
    let moved = slide(grid);
    return moved;
}

function slideRight(grid) 
{
    reverseRows(grid);
    let moved = slideLeft(grid);
    reverseRows(grid);
    return moved;
}

function slideUp(grid)
{
    transpose(grid);
    let moved = slideLeft(grid);
    transpose(grid);
    return moved;
}

function slideDown(grid)
{
    transpose(grid);
    reverseRows(grid)
    let moved = slideLeft(grid);
    reverseRows(grid);
    transpose(grid);
    return moved;
}

// TODO UPDATE WIN CONDITION // 

function updateGridL(grid)
{
    for (let col = 0; col < 3; col++)
    {
        for (let row = 0; row < 4; row++)
        {
            let current = grid[row][col];
            let next = grid[row][col + 1];
            if (current instanceof Tile && next instanceof Tile && current.value === next.value)
            {
                let value = current.value + next.value;
                if (value  === 2048)
                    alert("YOU WIIIIN mamon");
                current.setValue(value);
                grid[row][col + 1] = 0;
                updateScore(current.getValue());
            }   
        }
    }
}

function updateGridR(grid)
{
    for (let row = 0; row < 4; row++)
    {
        for (let col = 3; col > 0; col--)
        {
            let current = grid[row][col];
            let prev = grid[row][col - 1];
            if (current instanceof Tile && prev instanceof Tile && current.value === prev.value)
            {
                let value = current.value + prev.value
                if (value  === 2048)
                    alert("YOU WIIIIN mamon");
                current.setValue(value);
                grid[row][col - 1] = 0;
                updateScore(current.getValue());
            }   
        }
    }
}

function updateGridU(grid)
{
    for (let col = 0; col < 4; col++)
    {
        for (let row = 1; row < 4; row++)
        {
            let current = grid[row][col];
            let top = grid[row - 1][col];
            if (current instanceof Tile && top instanceof Tile && current.value === top.value)
            {
                let value = current.value + top.value;
                if (value === 2048)
                    alert("YOU WIIIIN mamon");
                top.setValue(current.value + top.value);
                grid[row][col] = 0;
                updateScore(top.getValue());
            }   
        }
    }
}

function updateGridD(grid)
{
    for (let col = 0; col < 4; col++)
    {
        for (let row = 2; row >= 0; row--)
        {
            let current = grid[row][col];
            let down = grid[row + 1][col];
            if (current instanceof Tile && down instanceof Tile && current.value === down.value)
            {
                let value = current.value + down.value;
                if (value === 2048)
                    alert("YOU WIIIIN mamon");
                down.setValue(value);
                grid[row][col] = 0;
                updateScore(down.getValue());
            }   
        }
    }
}