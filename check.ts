import ts from "typescript";
import * as fs from "fs";
const fileName = "src/app/mi-cuenta/page.tsx";
const sourceFile = ts.createSourceFile(
  fileName,
  fs.readFileSync(fileName, "utf8"),
  ts.ScriptTarget.Latest,
  true
);
const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([fileName], { jsx: 2 }));
diagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  }
});
