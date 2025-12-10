package main

import (
	"AdventOfCode2025/utils"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Pair struct {
	id1, id2 int
}

type PairDistance struct {
	pair     Pair
	distance float64
}

type JunctionBox struct {
	id int
	x  int
	y  int
	z  int
}

func main() {
	start := time.Now()

	lines := utils.GetLines("puzzles/day8.txt")

	junctionBoxes := getJunctionBoxes(lines)

	solveA(junctionBoxes)
	// solveB(matrix)

	elapsed := time.Since(start)

	fmt.Printf("Execution took %s\n", elapsed)
}

func solveA(junctionBoxes map[int]JunctionBox) {
	distances := getSortedDistances(junctionBoxes)

	junctionsByCircuitId := getCircuits(distances, junctionBoxes)

	lengths := make([]int, 0)
	for _, v := range junctionsByCircuitId {
		lengths = append(lengths, len(v))
	}

	sort.Sort(sort.Reverse(sort.IntSlice(lengths)))

	result := 1
	for i := 0; i < 3; i++ {
		result *= lengths[i]
	}

	println(result)
}

func solveB(junctionBoxes []JunctionBox) {

}

func getJunctionBoxes(lines []string) map[int]JunctionBox {
	junctionBoxes := make(map[int]JunctionBox)

	for i, line := range lines {
		line = strings.TrimSpace(line)
		nums := strings.Split(line, ",")

		x, _ := strconv.Atoi(nums[0])
		y, _ := strconv.Atoi(nums[1])
		z, _ := strconv.Atoi(nums[2])

		junctionBoxes[i] = JunctionBox{i, x, y, z}
	}

	return junctionBoxes
}

func calculateDistance3D(x1, y1, z1, x2, y2, z2 int) float64 {
	dx := float64(x2) - float64(x1)
	dy := float64(y2) - float64(y1)
	dz := float64(z2) - float64(z1)

	sumOfSquares := dx*dx + dy*dy + dz*dz
	distance := math.Sqrt(sumOfSquares)

	return distance
}

func getCircuits(sortedJunctionBoxes []PairDistance, junctionBoxes map[int]JunctionBox) map[int][]JunctionBox {
	circuitIdByJunctionIds := make(map[int]int)
	circuitId := 1

	for i := 0; i < 1000; i++ {
		pairDistance := sortedJunctionBoxes[i]
		id1 := pairDistance.pair.id1
		id2 := pairDistance.pair.id2

		j1Circuit, ok1 := circuitIdByJunctionIds[id1]
		j2Circuit, ok2 := circuitIdByJunctionIds[id2]

		if ok1 && !ok2 {
			circuitIdByJunctionIds[id2] = j1Circuit
		} else if !ok1 && ok2 {
			circuitIdByJunctionIds[id1] = j2Circuit
		} else if !ok1 {
			circuitIdByJunctionIds[id1] = circuitId
			circuitIdByJunctionIds[id2] = circuitId
			circuitId++
		} else if j1Circuit != j2Circuit {
			replace(circuitIdByJunctionIds, j2Circuit, j1Circuit)
		}
	}

	junctionsByCircuitId := make(map[int][]JunctionBox)
	for k, v := range circuitIdByJunctionIds {
		junctionsByCircuitId[v] = append(junctionsByCircuitId[v], junctionBoxes[k])
	}

	return junctionsByCircuitId
}

func getCircuits2(sortedJunctionBoxes []PairDistance, junctionBoxes map[int]JunctionBox) {
	circuitIdByJunctionIds := make(map[int]int)
	circuitId := 1

	for len(circuitIdByJunctionIds) != 1 {
		pairDistance := sortedJunctionBoxes[i]
		id1 := pairDistance.pair.id1
		id2 := pairDistance.pair.id2

		j1Circuit, ok1 := circuitIdByJunctionIds[id1]
		j2Circuit, ok2 := circuitIdByJunctionIds[id2]

		if ok1 && !ok2 {
			circuitIdByJunctionIds[id2] = j1Circuit
		} else if !ok1 && ok2 {
			circuitIdByJunctionIds[id1] = j2Circuit
		} else if !ok1 {
			circuitIdByJunctionIds[id1] = circuitId
			circuitIdByJunctionIds[id2] = circuitId
			circuitId++
		} else if j1Circuit != j2Circuit {
			replace(circuitIdByJunctionIds, j2Circuit, j1Circuit)
		}
	}

	junctionsByCircuitId := make(map[int][]JunctionBox)
	for k, v := range circuitIdByJunctionIds {
		junctionsByCircuitId[v] = append(junctionsByCircuitId[v], junctionBoxes[k])
	}

	return junctionsByCircuitId
}

func replace(circuitIdByJunctionIds map[int]int, from, to int) {
	for k, v := range circuitIdByJunctionIds {
		if v == from {
			circuitIdByJunctionIds[k] = to
		}
	}
}

func getSortedDistances(junctionBoxes map[int]JunctionBox) []PairDistance {
	distances := make([]PairDistance, 0)

	for i := 0; i < len(junctionBoxes); i++ {
		for j := i + 1; j < len(junctionBoxes); j++ {
			junctionBox1 := junctionBoxes[i]
			junctionBox2 := junctionBoxes[j]

			distance := calculateDistance3D(
				junctionBox1.x,
				junctionBox1.y,
				junctionBox1.z,
				junctionBox2.x,
				junctionBox2.y,
				junctionBox2.z)

			distances = append(distances, PairDistance{pair: Pair{id1: junctionBox1.id, id2: junctionBox2.id}, distance: distance})
		}
	}

	sort.Slice(distances, func(i, j int) bool {
		return distances[i].distance < distances[j].distance
	})

	return distances
}
