import fs from "fs";
import path from "path";

// types
type LogLevel = "INFO" | "ERROR" | "WARNING" | "DEBUG";

export class ReadAndProcessLog {
  constructor() {
    console.log("ReadAndProcessLog class initialized");
  }

  private parseLog(line: string): {
    level: LogLevel | null;
    message: string;
  } {
    const regex = /\[(info|error|warning|debug)\]\s*(?:<[^>]+>\s*)?(.*)$/i;
    const match = line.match(regex);
    if (!match) {
      return { level: null, message: line };
    }
    return {
      level: match[1].toUpperCase() as LogLevel,
      message: match[2],
    };
  }

  run(basePath: string, filename: string): void {
    // read file
    const logFilePath: string = path.join(basePath, filename);
    const fileData: string = fs.readFileSync(logFilePath, "utf-8");

    // process lines
    const lines: string[] = fileData.split("\n").filter(Boolean);

    const eventCount = new Map<LogLevel, number>();
    const errorMessages = new Map<string, number>();

    // Analyze each line and extract information
    for (const line of lines) {
      const { level, message } = this.parseLog(line);

      if (!level) continue;

      // Count events
      eventCount.set(level, (eventCount.get(level) ?? 0) + 1);

      // Count error messages
      if (level === "ERROR") {
        errorMessages.set(message, (errorMessages.get(message) ?? 0) + 1);
      }
    }

    // get error messages
    const topErrors = Array.from(errorMessages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    // generate report
    let report = "Event count:\n";

    for (const [level, count] of eventCount.entries()) {
      report += `- ${level}: ${count}\n`;
    }

    report += "\nTop 3 most frequent error message:\n";

    topErrors.forEach(([message, count], index) => {
      ``;
      report += `${index + 1}. ${message} (${count})\n`;
    });

    const now = new Date();
    const timestamp = now.getTime();

    // write report to file
    fs.writeFileSync(`./src/data/reports/report-${timestamp}.txt`, report, "utf-8");

    console.log("Report generated");
  }
}
