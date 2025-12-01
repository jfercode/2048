/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Tile.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:50:14 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/01 16:40:18 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Simple tile class
class Tile
{
    constructor (x, y, value = 2)
    {
        this.x = x; // column
        this.y = y; // row
        this.value = value; // value
        this.color = this.getColor(); // color
    }
    // TODO change to another (color scheme)
    getColor()
    {
        const colors = 
        {
            2:    "#eee4da",
            4:    "#ede0c8",
            8:    "#f2b179",
            16:   "#f59563",
            32:   "#f67c5f",
            64:   "#f65e3b",
            128:  "#edcf72",
            256:  "#edcc61",
            512:  "#edc850",
            1024: "#edc53f",
            2048: "#edc22e"
        };
        return colors[this.value] || "#3c3a32";
    }
    
    getValue()
    {
        return this.value;
    }
    
    setValue(value)
    {
        this.value = value;
        this.color = this.getColor();
    }
}
