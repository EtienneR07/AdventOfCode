package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type Point struct {
	x int
	y int
}

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day9.txt")

	solveA(lines)
	// solveB(matrix)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(lines []string) {
	points := getPoints(lines)
	largestArea := 0
	for i := 0; i < len(points); i++ {
		for j := i + 1; j < len(points); j++ {
			x1 := points[i].x
			y1 := points[i].y
			println(x1, y1)

			x2 := points[j].x
			y2 := points[j].y
			println(x2, y2)

			var dx int
			if x2 > x1 {
				dx = x2 - x1
			} else {
				dx = x1 - x2
			}

			var dy int
			if y2 > y1 {
				dy = y2 - y1
			} else {
				dy = y1 - y2
			}

			multResult := (dx + 1) * (dy + 1)
			if multResult > largestArea {
				largestArea = multResult
			}
		}
	}

	println(largestArea)
}

func solveB(lines []string) {

}

func getPoints(lines []string) []Point {
	points := make([]Point, 0)

	for _, line := range lines {
		line = strings.TrimSpace(line)
		nums := strings.Split(line, ",")

		x, _ := strconv.Atoi(nums[0])
		y, _ := strconv.Atoi(nums[1])

		points = append(points, Point{x, y})
	}

	return points
}
