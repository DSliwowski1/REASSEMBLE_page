import "./style.css";
import { WebViewer } from "@rerun-io/web-viewer";

// First, ensure your .rrd files are copied to dist/data during build
const rrdFiles = [
  "./2025-01-11-14-04-40.rrd",
  "./2025-01-09-15-27-49.rrd",
  // "./data/file2.rrd",
  // Add paths to all your .rrd files
];

const viewer = new WebViewer();

rrdFiles.forEach(file => {
  viewer.start(file, null, {
    width: "100%",
    height: "100%",
  });
});