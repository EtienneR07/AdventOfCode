package server;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class SolverCreator {
    private static final String SOLVERS_PATH = "src/main/java/solvers";
    private static final String SOLVER_TEMPLATE_NAME = "SolverDay%s";

    private static final String SOLVER_TESTS_PATH = "src/test/java/solvers";
    private static final String SOLVER_TEST_TEMPLATE_NAME = "SolverDay%sTests";

    public void create(long day) {
        createSolver(day);
        createSolverTest(day);
    }

    private void createSolver(long day) {
        var fileName = SOLVER_TEMPLATE_NAME.formatted(day);
        var classContent = """
                package solvers;
                
                import lib.PuzzleLines;
                
                public class %s implements Solver {
                        @Override
                        public String SolveA(PuzzleLines puzzleLines) {
                            return "";
                        }
                
                        @Override
                        public String SolveB(PuzzleLines puzzleLines) {
                            return "";
                        }
                }
                """.formatted(fileName);

        createClass(classContent, fileName, SOLVERS_PATH, day);
    }

    private void createSolverTest(long day) {
        var testFileName = SOLVER_TEST_TEMPLATE_NAME.formatted(day);
        var solverFileName = SOLVER_TEMPLATE_NAME.formatted(day);

        var classContent = """
                package solvers;
                
                import lib.PuzzleLines;
                import lib.PuzzleParser;
                import org.junit.jupiter.api.BeforeEach;
                import org.junit.jupiter.api.Test;
                
                public class %s {
                    private %s solver;
                    private PuzzleLines puzzleLines;
                
                    @BeforeEach
                    public void setup() {
                        solver = new %s();
                        var parser = new PuzzleParser();
                        puzzleLines = parser.parseFile(%s);
                    }
                
                    @Test
                    public void testSolveA() {
                        var result = solver.SolveA(puzzleLines);
                    }
                
                    @Test
                    public void testSolveB() {
                        var result = solver.SolveB(puzzleLines);
                    }
                }
                """.formatted(testFileName, solverFileName, solverFileName, day);

        createClass(classContent, testFileName, SOLVER_TESTS_PATH, day);
    }

    private void createClass(String content, String fileName, String path, long day) {
        var dir = new File(path);
        var javaFile = new File(dir, fileName + ".java");

        try (var writer = new FileWriter(javaFile)) {
            writer.write(content);
            System.out.println(javaFile + ".java created successfully!");
        } catch (IOException exception) {
            System.out.println(exception.getMessage());
        }
    }
}