package lib;

import java.util.ArrayList;

public class PuzzleMatrixInt extends PuzzleMatrix<Integer> {
    public PuzzleMatrixInt(PuzzleLines lines) {
        for (var line : lines) {
            var row = new ArrayList<Integer>();
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c))
                    throw new IllegalArgumentException("This puzzle input cannot be a int matrix!");

                row.add(Character.getNumericValue(c));
            }
            matrix.add(row);
        }
    }
}
