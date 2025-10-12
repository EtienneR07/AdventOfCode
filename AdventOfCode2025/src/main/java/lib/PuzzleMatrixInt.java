package lib;

import java.util.ArrayList;

public class PuzzleMatrixInt extends PuzzleMatrix<Integer> {
    public PuzzleMatrixInt(PuzzleLines lines) {
        var y = 0;
        for (var line : lines) {
            var row = new ArrayList<Cell<Integer>>();
            for (int x = 0; x < line.length(); x++) {
                var c = line.charAt(x);
                if (!Character.isDigit(c))
                    throw new IllegalArgumentException("This puzzle input cannot be a int matrix!");

                row.add(new Cell<>(x, y, Character.getNumericValue(c)));
            }

            matrix.add(row);
            y++;
        }
    }
}
