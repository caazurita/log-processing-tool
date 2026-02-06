import fs from "fs";
import path from "path";
import { ReadAndProcessLog } from "./utils/readAndProccesLog";

const logProcessor = new ReadAndProcessLog();
logProcessor.run('./src/data/logs', "log.txt");
