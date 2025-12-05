package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"time"
)

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day4.txt")

	matrix := utils.GetStrMatrix(lines)

	// solveA(matrix)
	solveB(matrix)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(matrix *utils.Matrix[string]) {
	count := 0
	for y, row := range matrix.Rows() {
		for x, col := range row {
			if col == "@" && hasFewerThanFourRolls(matrix, y, x) {
				count++
			}
		}
	}

	println(count)
}

func solveB(matrix *utils.Matrix[string]) {
	count := 0
	localCount := 0
	noMore := false
	for !noMore {
		nextMatrix := utils.NewMatrix[string]()
		for y, row := range matrix.Rows() {
			newRow := make([]string, 0, len(row))
			for x, col := range row {
				if col == "@" && hasFewerThanFourRolls(matrix, y, x) {
					newRow = append(newRow, "x")
					localCount++
				} else {
					newRow = append(newRow, col)
				}
			}

			nextMatrix.Add(newRow)
		}

		if localCount == 0 {
			noMore = true
		}

		count += localCount
		localCount = 0
		matrix = nextMatrix
	}

	println(count)
}

func hasFewerThanFourRolls(matrix *utils.Matrix[string], x, y int) bool {
	localCount := 0
	for j := y - 1; j <= y+1; j++ {
		for k := x - 1; k <= x+1; k++ {
			if j == y && k == x {
				continue
			}

			value, err := matrix.Get(j, k)
			if err == nil && value == "@" {
				localCount++
			}
		}
	}

	return localCount < 4
}
