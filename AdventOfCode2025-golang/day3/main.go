package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"time"
)

package main

import (
"AdventOfCode2025/utils"
"fmt"
"runtime"
"strconv"
"strings"
"sync"
"time"
)

type Range struct {
	start int
	end   int
}

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day3_test.txt")

	solveA(lines)
	// solveB(str)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(lines []string) {
	sum:=0
	for _, bank := range lines {
		joltage := getHighestJoltage(bank);
		sum += joltage
	}

	println(sum)
}

func solveB(lines []string) {

}

func getHighestJoltage(bank string) int {
	r := 0
	l := len(bank) - 1
	
}

