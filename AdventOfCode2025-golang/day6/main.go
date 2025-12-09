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

	lines := utils.GetLines("puzzles/day6.txt")

	// solveA(lines)
	solveB(lines)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(lines []string) {
	grandTotal := 0

	equationByIndex := getEquationsByIndex(lines)
	equatorByIndex := make(map[int]string)

	for index, equation := range equationByIndex {
		equator := equatorByIndex[index]
		isAdd := equator == "+"
		grandTotal += cal(equation, isAdd)
	}

	println(grandTotal)
}

func solveB(lines []string) {
	grandTotal := 0
	matrix := utils.GetStrMatrix(lines, false)
	if matrix == nil {
		println("matrix is nil")
		return
	}

	matrix = matrix.GetRotation()

	currEquation := make([]int, 0)
	for _, row := range matrix.Rows() {
		joinedString := strings.Join(row, "")
		trimed := strings.TrimSpace(joinedString)
		if trimed == "" {
			currEquation = []int{}
			continue
		}

		num, err := strconv.Atoi(trimed)
		if err != nil {
			operator := trimed[len(trimed)-1]
			isAdd := false
			if operator == '+' {
				isAdd = true
			}

			noOperator := trimed[:len(trimed)-1]
			trimedLast := strings.TrimSpace(noOperator)
			lastNum, _ := strconv.Atoi(trimedLast)
			currEquation = append(currEquation, lastNum)
			grandTotal += cal(currEquation, isAdd)
			continue
		}

		currEquation = append(currEquation, num)

		println(num)
	}

	println(grandTotal)
}

func getEquationsByIndex(lines []string) map[int][]int {
	equationByIndex := make(map[int][]int)

	firstRow := strings.Fields(lines[0])
	for i, numStr := range firstRow {
		num, _ := strconv.Atoi(numStr)
		numArray := make([]int, 0)
		numArray = append(numArray, num)
		equationByIndex[i] = numArray
	}

	return equationByIndex
}

func cal(equation []int, isAdd bool) int {
	equationResult := 0
	if !isAdd {
		equationResult = 1
	}
	for _, num := range equation {
		if isAdd {
			equationResult += num
		} else {
			equationResult *= num
		}
	}

	return equationResult
}
