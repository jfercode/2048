/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Tile.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:50:14 by jaferna2          #+#    #+#             */
/*   Updated: 2025/12/02 16:06:51 by jaferna2         ###   ########.fr       */
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
        this.fontColor = this.getFontColor();
    }

    getColor()
    {
        const colors = 
        {
            2:    "#E3E3E3",
            4:    "#d0d7df",
            8:    "#b3c2d1",
            16:   "#456882",
            32:   "#234C6A",
            64:   "#1B3C53",
            128:  "#234C6A",
            256:  "#1B3C53",
            512:  "#234C6A",
            1024: "#1B3C53",
            2048: "#234C6A"
        };
        return colors[this.value] || "#1B3C53";
    }
    
    getFontColor()
    {
        if (this.value === 0) return "#E3E3E3";
        return (this.value >= 16) ? "#E3E3E3" : "#1B3C53";
    }

    getValue()
    {
        return this.value;
    }
    
    setValue(value)
    {
        this.value = value;
        this.color = this.getColor();
        this.fontColor = this.getFontColor()
    }
}
