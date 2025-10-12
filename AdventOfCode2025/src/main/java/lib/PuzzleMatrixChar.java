package lib;

import java.util.ArrayList;

public class PuzzleMatrixChar extends PuzzleMatrix<Character> {
    public PuzzleMatrixChar(PuzzleLines lines) {
        var y = 0;
        for (var line : lines) {
            var row = new ArrayList<Cell<Character>>();
            for (int x = 0; x < line.length(); x++) {
                char c = line.charAt(x);
                row.add(new Cell<>(x, y, c));
            }

            matrix.add(row);
            y++;
        }
    }
}