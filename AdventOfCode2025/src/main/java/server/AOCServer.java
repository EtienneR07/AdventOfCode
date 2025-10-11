package server;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class AOCServer {
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public static void main(String[] args) {
        var server = new AOCServer();
        server.start();
        System.out.println("AdventOfCode server started.");

        var task = new PuzzleDaySetupTask();

        task.run();
    }

    private void start() {

    }
}