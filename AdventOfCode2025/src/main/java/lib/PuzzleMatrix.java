package lib;

import java.util.ArrayList;

public abstract class PuzzleMatrix<T> {
    protected ArrayList<ArrayList<T>> matrix = new ArrayList<>();

    public int height() {
        return matrix.size();
    }

    public int width() {
        if (matrix.isEmpty()) return 0;

        return matrix.getFirst().size();
    }

    public T get(int row, int col) {
        return matrix.get(row).get(col);
    }

    public void set(int row, int col, T value) {
        matrix.get(row).set(col, value);
    }

    public boolean inBounds(int row, int col) {
        return row >= 0 && row < height() &&
                col >= 0 && col < width();
    }

    public void print() {
        for (var row : matrix) {
            for (var elem : row) {
                System.out.print(elem + " ");
            }

            System.out.println();
        }
    }
}
