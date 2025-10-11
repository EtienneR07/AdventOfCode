package server;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Objects;

public class PuzzleDaySetupTask implements Runnable {
    private static final String URL_TEMPLATE = "https://adventofcode.com/2024/day/%s/input";

    @Override
    public void run() {
        var day = getDay();

        download(day);

        createPuzzleFile(day);
    }

    private long getDay() {
        var folder = new File("puzzles/textfiles");

        return Arrays.stream(Objects.requireNonNull(folder.list())).count() + 1;
    }

    private void download(long day) {
        try {
            HttpResponse<String> response;
            try (var client = HttpClient.newHttpClient()) {
                var sessionToken = "53616c7465645f5fc35311840c2f9f3d4c003ca2bddd3f8da534c648cb40cf1195f6672f36e46378bb1460c67429e2e4bfda2e6bbb32c8200db484ffcfe3989c";
                var request = HttpRequest.newBuilder()
                        .uri(URI.create(URL_TEMPLATE.formatted(day)))
                        .header("Cookie", "session=" + sessionToken)
                        .GET()
                        .build();

                response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    var outputPath = Path.of("puzzles", "textfiles", "day" + day + ".txt");

                    Files.writeString(outputPath, response.body());
                } else {
                    System.out.printf("AdventOfCode return status code %s%n", response.statusCode());
                }
            }
        } catch (IOException | InterruptedException exception) {
            System.out.println(exception.getMessage());
        }
    }

    private void createPuzzleFile(long day) {
        var creator = new SolverCreator();

        creator.create(day);
    }
}