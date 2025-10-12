package lib;

import java.util.ArrayList;

public abstract class PuzzleMatrix<T> {
    protected ArrayList<ArrayList<Cell<T>>> matrix = new ArrayList<>();

    public int height() {
        return matrix.size();
    }

    public int width() {
        if (matrix.isEmpty()) return 0;

        return matrix.getFirst().size();
    }

    public Cell<T> getValue(int row, int col) {
        return matrix.get(row).get(col);
    }

    public boolean inBounds(int row, int col) {
        return row >= 0 && row < height() && col >= 0 && col < width();
    }

    public void print() {
        for (var row : matrix) {
            for (var cell : row) {
                System.out.print(cell.value() + " ");
            }

            System.out.println();
        }
    }


}
