package lib;

import java.util.Iterator;
import java.util.List;

public class PuzzleLines implements Iterable<String> {
    private final List<String> lines;

    public PuzzleLines(List<String> lines) {
        this.lines = lines;
    }

    @Override
    public Iterator<String> iterator() {
        return lines.iterator();
    }

    public String asOneLine() {
        var sb = new StringBuilder();

        for (var line : lines) {
            sb.append(line);
        }

        return sb.toString();
    }
}