package main

import (
	"AdventOfCode2025/utils"
	"errors"
	"fmt"
	"time"
)

type Point struct {
	x int
	y int
}

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day7.txt")
	matrix := utils.GetStrMatrix(lines, true)

	// solveA(matrix)
	solveB(matrix)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(matrix *utils.Matrix[string]) {
	visited := make(map[Point]int)
	x, y, _ := getTachyonBeam(matrix)
	pos := Point{x: x, y: y}

	moveTachyonBeam(matrix, pos, visited)

	println(len(visited))
}

func solveB(matrix *utils.Matrix[string]) {
	visited := make(map[Point]int)
	timelines := 0
	x, y, _ := getTachyonBeam(matrix)
	pos := Point{x: x, y: y}

	timelines = moveTachyonBeam(matrix, pos, visited)

	println(timelines)
}

func getTachyonBeam(matrix *utils.Matrix[string]) (int, int, error) {
	for y, row := range matrix.Rows() {
		for x, cell := range row {
			if cell == "S" {
				return x, y, nil
			}
		}
	}

	return 0, 0, errors.New("matrix does not have a tachyon beam")
}

func moveTachyonBeam(matrix *utils.Matrix[string], point Point, visited map[Point]int) int {
	splitReached := false
	for !splitReached {
		value, err := matrix.Get(point.x, point.y)
		if err != nil {
			return 1
		}

		if value == "^" {
			if timelines, ok := visited[point]; ok {
				return timelines
			}

			splitReached = true
		} else {
			point.y++
		}
	}

	leftSplit := Point{x: point.x - 1, y: point.y}
	rightSplit := Point{x: point.x + 1, y: point.y}

	leftTimelines := moveTachyonBeam(matrix, leftSplit, visited)
	rightTimelines := moveTachyonBeam(matrix, rightSplit, visited)

	visited[point] = leftTimelines + rightTimelines

	return leftTimelines + rightTimelines
}
