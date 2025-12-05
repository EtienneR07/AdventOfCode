package utils

import (
	"fmt"
	"iter"
	"strconv"
	"strings"
)

type Matrix[T any] struct {
	matrix [][]T
}

func NewMatrix[T any]() *Matrix[T] {
	return &Matrix[T]{
		matrix: make([][]T, 0),
	}
}

func (matrix *Matrix[T]) Add(row []T) {
	matrix.matrix = append(matrix.matrix, row)
}

func (matrix Matrix[T]) Rows() iter.Seq2[int, []T] {
	return func(yield func(int, []T) bool) {
		for i, row := range matrix.matrix {
			if !yield(i, row) {
				return
			}
		}
	}
}

func (matrix Matrix[T]) Get(x int, y int) (T, error) {
	var defaultValue T
	if y >= len(matrix.matrix) || y < 0 {
		return defaultValue, fmt.Errorf("y is out of bounds")
	}
	if x >= len(matrix.matrix[y]) || x < 0 {
		return defaultValue, fmt.Errorf("x is out of bounds")
	}

	return matrix.matrix[y][x], nil
}

func GetStrMatrix(lines []string) *Matrix[string] {
	if len(lines) == 0 || len(lines[0]) == 0 {
		return nil
	}

	matrix := NewMatrix[string]()

	for _, line := range lines {
		line = strings.TrimSpace(line)
		row := make([]string, 0, len(line))
		for _, char := range line {
			row = append(row, string(char))
		}

		matrix.matrix = append(matrix.matrix, row)
	}

	return matrix
}

func GetIntMatrix(lines []string) *Matrix[int] {
	if len(lines) == 0 || len(lines[0]) == 0 {
		return nil
	}

	matrix := NewMatrix[int]()

	for _, line := range lines {
		row := make([]int, 0, len(line))
		for _, char := range line {
			val, _ := strconv.Atoi(string(char))
			row = append(row, val)
		}

		matrix.matrix = append(matrix.matrix, row)
	}

	return matrix
}

func (matrix Matrix[T]) PrintMatrix() {
	for i := 0; i < len(matrix.matrix); i++ {
		for j := 0; j < len(matrix.matrix[i]); j++ {
			print(matrix.matrix[i][j])
		}
		println()
	}
}
