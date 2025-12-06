package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Range struct {
	start int
	end   int
}

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day3_test.txt")

	// solveA(lines)
	solveB(lines)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(lines []string) {
	sum := 0
	for _, bank := range lines {
		bank = strings.TrimSpace(bank)
		joltage := getHighestJoltageA(bank)
		sum += joltage
	}

	println(sum)
}

func solveB(lines []string) {
	sum := 0
	for _, bank := range lines {
		bank = strings.TrimSpace(bank)
		joltage := getHighestJoltageB(bank)
		sum += joltage
	}

	println(sum)
}

func getHighestJoltageA(bank string) int {
	l := 0
	r := len(bank) - 1
	highest := 0

	for l < len(bank) && r > 0 {
		batteryL := string(bank[l])
		batteryR := string(bank[r])

		bL, _ := strconv.Atoi(batteryL)
		bR, _ := strconv.Atoi(batteryR)

		currentJoltage := 0
		if l < r {
			currentJoltage, _ = strconv.Atoi(batteryL + batteryR)
		} else {
			currentJoltage, _ = strconv.Atoi(batteryR + batteryL)
		}

		if currentJoltage > highest {
			highest = currentJoltage
		}

		if bL > bR {
			if r == l+1 {
				r = r - 2
			} else {
				r--
			}
		} else {
			if l == r-1 {
				l = l + 2
			} else {
				l++
			}
		}
	}

	return highest
}

func getHighestJoltageB(bank string) int {
	rawDigits := make([]int, 0, len(bank))
	for i, _ := range bank {
		num, _ := strconv.Atoi(string(bank[i]))
		rawDigits = append(rawDigits, num)
	}

	return finalNum
}
