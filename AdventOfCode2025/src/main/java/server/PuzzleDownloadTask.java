package server;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;

public class PuzzleDownloadTask implements Runnable {
    private static final String URL_TEMPLATE = "https://adventofcode.com/2024/day/%s/input";
    private final String sessionToken = "53616c7465645f5fc35311840c2f9f3d4c003ca2bddd3f8da534c648cb40cf1195f6672f36e46378bb1460c67429e2e4bfda2e6bbb32c8200db484ffcfe3989c";

    @Override
    public void run() {
        try{
            HttpResponse<String> response;
            try (var client = HttpClient.newHttpClient()) {
                var request = HttpRequest.newBuilder()
                        .uri(URI.create(String.format(URL_TEMPLATE, 1)))
                        .header("Cookie", "session=" + sessionToken)
                        .GET()
                        .build();

                response = client.send(request, HttpResponse.BodyHandlers.ofString());
            }

            var outputPath = Path.of("puzzles", "textfiles", "day" + 1 + ".txt");

            Files.writeString(outputPath, response.body());
        } catch (IOException | InterruptedException  exception){
            System.out.println(exception.getMessage());
        }
    }
}