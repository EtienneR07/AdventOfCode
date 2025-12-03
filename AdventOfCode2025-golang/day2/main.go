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

	str := utils.GetString("puzzles/day2.txt")

	solveA(str)
	// solveB(str)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(file string) {
	solve(file, true)
}

func solveB(file string) {
	solve(file, false)
}

func solve(file string, puzA bool) {
	pairs := strings.Split(file, ",")

	rangeChan := make(chan Range, len(pairs))
	sumResultChan := make(chan int)

	var workerWg sync.WaitGroup
	for i := 0; i < runtime.NumCPU(); i++ {
		workerWg.Add(1)
		go checkInvalidsInPairs(rangeChan, sumResultChan, &workerWg, puzA)
	}

	for _, pair := range pairs {
		ids := strings.Split(strings.TrimSpace(pair), "-")

		start, _ := strconv.Atoi(ids[0])
		end, _ := strconv.Atoi(ids[1])

		rangeChan <- Range{start: start, end: end}
	}

	sumDone := make(chan int)
	go func(sumChan <-chan int, done chan<- int) {
		localSum := 0
		for sum := range sumChan {
			localSum += sum
		}

		done <- localSum
	}(sumResultChan, sumDone)

	close(rangeChan)

	workerWg.Wait()

	close(sumResultChan)

	totalSum := <-sumDone

	println(totalSum)
}

func checkInvalidsInPairs(rangeChan <-chan Range, sum chan<- int, wg *sync.WaitGroup, puzA bool) {
	defer wg.Done()

	localSum := 0
	for rangePair := range rangeChan {
		startStr := strconv.Itoa(rangePair.start)
		endStr := strconv.Itoa(rangePair.end)

		if len(startStr) == len(endStr) && len(startStr)%2 != 0 && puzA {
			continue
		}

		for i := rangePair.start; i <= rangePair.end; i++ {
			localSum += invalidIds(i, puzA)
		}
	}

	sum <- localSum
}

func invalidIds(num int, puzA bool) int {
	str := strconv.Itoa(num)

	if puzA {
		p1 := str[0 : len(str)/2]
		p2 := str[len(str)/2:]

		if p1 == p2 {
			num, _ := strconv.Atoi(str)
			return num
		}
	} else {
		for i := 2; i <= len(str); i++ {
			if len(str)%i != 0 {
				continue
			}

			parts := getParts(str, i)

			if allPartsEqual(parts) {
				num, _ := strconv.Atoi(str)
				return num
			}
		}
	}

	return 0
}

func getParts(str string, n int) []string {
	parts := make([]string, 0, n)
	size := len(str) / n

	for i := 0; i < len(str); i = i + size {
		parts = append(parts, str[i:i+size])
	}

	return parts
}

func allPartsEqual(parts []string) bool {
	f := parts[0]
	for i := 0; i < len(parts); i++ {
		if parts[i] != f {
			return false
		}
	}

	return true
}
