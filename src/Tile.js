/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Tile.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jaferna2 <jaferna2@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/12/01 14:50:14 by jaferna2          #+#    #+#             */
/*   Updated: 2026/01/26 14:49:56 by jaferna2         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// Simple tile class
class Tile
{
    constructor (x, y, value = 2)
    {
        this.x = x;
        this.y = y;
        this.value = value;
        this.prevX = x;    
        this.prevY = y;    
        this.div = null;   
        this.isNew = false;
        this.color = this.getColor();
        this.fontColor = this.getFontColor();
    }

    getColor()
    {
        const colors = 
        {
            2:    "rgba(255, 255, 255, 255)",
            4:    "rgba(255, 255, 255, 0.9)",
            8:    "rgba(255, 255, 255, 0.8)",
            16:   "rgba(86, 255, 235, 0.8)",
            32:   "rgba(86, 255, 235, 0.8)",
            64:   "rgba(27, 206, 185, 0.8)",
            128:  "rgba(27, 206, 185, 0.8)",
            256:  "rgba(20, 109, 99, 0.8)",
            512:  "rgba(20, 109, 99, 0.8)",
            1024: "rgba(20, 109, 99, 0.9)",
            2048: "#146d63ff"
        };
        return colors[this.value] || "rgba(20, 109, 99, 0.8)";
    }
    
    getFontColor()
    {
        if (this.value === 0) return "#E3E3E3";
        return (this.value >= 16) ? "#E3E3E3" : "#146d63ff";
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
