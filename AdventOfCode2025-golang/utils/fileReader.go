package utils

import (
	"os"
	"strings"
)

func GetLines(filename string) []string {
	file, err := os.ReadFile(filename)
	if err != nil {
		println(err.Error())
	}

	return strings.Split(string(file), "\n")
}

func GetString(filename string) string {
	file, err := os.ReadFile(filename)
	if err != nil {
		println(err.Error())
	}

	return string(file)
}
