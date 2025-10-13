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

    public Cell<T> getValue(int x, int y) {
        return matrix.get(y).get(x);
    }

    public boolean inBounds(int x, int y) {
        return y >= 0 && y < height() && x >= 0 && x < width();
    }

    public ArrayList<Cell<T>> diagonalDownRight(int x, int y) {
        var diagonalList = new ArrayList<Cell<T>>();

        var row = y;
        var col = x;
        while (inBounds(row, col)) {
            diagonalList.add(getValue(row, col));
            row++;
            col++;
        }

        return diagonalList;
    }

    public ArrayList<Cell<T>> diagonalDownLeft(int x, int y) {
        var diagonalList = new ArrayList<Cell<T>>();

        var row = y;
        var col = x;
        while (inBounds(row, col)) {
            diagonalList.add(getValue(row, col));
            row++;
            col--;
        }

        return diagonalList;
    }

    public ArrayList<Cell<T>> getNeighbors(int x, int y) {
        var neighbors = new ArrayList<Cell<T>>();
        if (!inBounds(x, y)) return neighbors;
        
        for (int row = y - 1; row < y + 2; row++) {
            for (int col = x - 1; col < x + 2; col++) {
                if (x == col && row == y) continue;
                if (!inBounds(col, row)) continue;

                neighbors.add(getValue(col, row));
            }
        }

        return neighbors;
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
