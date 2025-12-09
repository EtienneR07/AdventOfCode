package main

import (
	"AdventOfCode2025/utils"
	"fmt"
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

	lines := utils.GetLines("puzzles/day5.txt")

	solveA(lines)
	solveB(lines)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(lines []string) {
	freshIngredients := 0

	ranges, ids := getIngredients(lines)

	for _, id := range ids {
		for _, fresh := range ranges {
			if id >= fresh.start && id <= fresh.end {
				freshIngredients++
				break
			}
		}
	}

	println(freshIngredients)
}

func solveB(lines []string) {
	freshIngredients := 0

	ranges, _ := getIngredients(lines)

	mergedRanges := make([]Range, 0)
	for _, r := range ranges {
		if len(mergedRanges) == 0 {
			mergedRanges = append(mergedRanges, r)
			continue
		}

		newMergedRanges := make([]Range, 0)

		for _, mergedRange := range mergedRanges {
			res := mergeRanges(mergedRange, r)
			if res == nil {
				newMergedRanges = append(newMergedRanges, mergedRange)
			} else {
				r = *res
			}
		}

		newMergedRanges = append(newMergedRanges, r)
		mergedRanges = newMergedRanges
	}

	for _, mergedRange := range mergedRanges {
		freshIngredients += mergedRange.end - mergedRange.start + 1
	}

	println(freshIngredients)
}

func getIngredients(lines []string) ([]Range, []int) {
	ranges := make([]Range, 0)
	ingredients := make([]int, 0)
	checkRanges := true
	for _, line := range lines {
		if line == "\r" {
			checkRanges = false
			continue
		}
		line = strings.TrimSpace(line)
		if checkRanges {
			split := strings.Split(line, "-")
			start, _ := strconv.Atoi(split[0])
			end, _ := strconv.Atoi(split[1])
			ranges = append(ranges, Range{start: start, end: end})
		} else {
			ingredient, _ := strconv.Atoi(line)
			ingredients = append(ingredients, ingredient)
		}
	}

	return ranges, ingredients
}

func mergeRanges(range1 Range, range2 Range) *Range {
	if range1.end < range2.start || range2.end < range1.start {
		return nil
	}

	return &Range{
		start: min(range1.start, range2.start),
		end:   max(range1.end, range2.end),
	}
}
