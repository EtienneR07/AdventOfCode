package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	lines := utils.GetLines("puzzles/day1.txt")

	solveAandB(lines)
}

func solveAandB(lines []string) {
	countA := 0
	countB := 0
	current := 50
	for _, line := range lines {
		dir := line[0]
		rotation, err := strconv.Atoi(strings.TrimSpace(line[1:]))
		if err != nil {
			println(err.Error())
		}

		if dir == 'R' {
			countB += (current + rotation) / 100
			current += rotation
		} else {
			if current == 0 {
				countB += rotation / 100
			} else if rotation >= current {
				countB += 1 + (rotation-current)/100
			}

			current -= rotation
		}

		current = (current%100 + 100) % 100

		if current == 0 {
			countA++
		}
	}

	fmt.Printf("A count: %d\n", countA)
	fmt.Printf("B count: %d\n", countB)
}
