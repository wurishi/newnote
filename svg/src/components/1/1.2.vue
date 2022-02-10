<template>
    <svg width="30" height="10">
        <g fill="red">
            <rect x="0" y="0" width="10" height="10" />
            <rect x="20" y="0" width="10" height="10" />
        </g>
    </svg>
    <br />
    <svg width="40" height="50" style="background-color:#bff;">
        <rect x="0" y="0" width="10" height="10" transform="translate(30,40)" />
        <rect x="0" y="0" width="10" height="10" transform="skewX(45)" />
        <rect x="0" y="10" width="10" height="10" transform="skewY(45)" />
        <g transform="translate(15,15)">
            <rect x="0" y="0" width="10" height="10" transform="scale(0.5,0.5)" />
        </g>
        <g transform="translate(25,25)">
            <rect x="0" y="0" width="10" height="10" transform="scale(0.5)" />
        </g>
    </svg>
    <br />
    <svg width="31" height="31">
        <rect x="12" y="-10" width="20" height="20" transform="rotate(45)" />
    </svg>
    <br />
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="30" height="20" fill="green" />

        <!--
  In the following example we are applying the matrix:
  [a c e]    [3 -1 30]
  [b d f] => [1  3 40]
  [0 0 1]    [0  0  1]

  which transform the rectangle as such:

  top left corner: oldX=10 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80

  top right corner: oldX=40 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 10 + 30 = 140
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 10 + 40 = 110

  bottom left corner: oldX=10 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 30 + 30 = 30
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 30 + 40 = 140

  bottom right corner: oldX=40 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 30 + 30 = 120
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 30 + 40 = 170
        -->
        <rect x="10" y="10" width="30" height="20" fill="red" transform="matrix(3 1 -1 3 30 40)" />
    </svg>
    <br />
    <svg width="100" height="100">
        <g transform="scale(2)">
            <rect width="50" height="50" />
        </g>
    </svg>
    <br />
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
        <svg width="100" height="100" viewBox="0 0 50 50">
            <rect width="50" height="50" />
        </svg>
    </svg>
</template>