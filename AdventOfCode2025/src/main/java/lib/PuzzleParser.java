package lib;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class PuzzleParser {
    private static final String SOLVER_TESTS_PATH = "puzzles/textfiles/day%s.txt";

    public PuzzleLines parseFile(long day) {
        var file = new File(SOLVER_TESTS_PATH.formatted(day));
        var lines = new ArrayList<String>();

        try (var reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading file for day " + day, e);
        }

        return new PuzzleLines(lines);
    }
}