package lib;

import java.util.ArrayList;

public class PuzzleMatrixChar extends PuzzleMatrix<Character> {
    public PuzzleMatrixChar(PuzzleLines lines) {
        for (var line : lines) {
            var row = new ArrayList<Character>();
            for (char c : line.toCharArray()) {
                row.add(c);
            }
            
            matrix.add(row);
        }
    }
}