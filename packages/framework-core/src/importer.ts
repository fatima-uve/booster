import * as fs from 'node:fs'
import * as path from 'node:path'

export class Importer {
  public static importUserProjectFiles(codeRootPath: string): void {
    for (const element of Importer.getImportFiles(codeRootPath)) {
      Importer.importWithoutExtension(element)
    }
  }

  private static importWithoutExtension(file: string): void {
    // eslint-disable-next-line unicorn/prefer-module
    require(Importer.removeDevExtension(file))
  }

  private static getImportFiles(codeRootPath: string): Array<string> {
    return Importer.walkDir(codeRootPath).filter(Importer.isJavaScriptFile).filter(Importer.isNotIndexJs)
  }

  private static walkDir(directory: string): Array<string> {
    const files: Array<string> = []
    for (const file of Importer.listDirectory(directory)) {
      const fileName = path.join(directory, file)
      if (Importer.isDirectory(fileName)) {
        const filesInDirectory = Importer.walkDir(fileName)
        files.push(...filesInDirectory)
      } else {
        files.push(fileName)
      }
    }
    return files
  }

  private static isJavaScriptFile(file: string): boolean {
    return file.match(/.*\.js$/) != undefined
  }

  private static isNotIndexJs(file: string): boolean {
    return file.match(/index.js$/) == undefined
  }
  private static removeDevExtension(file: string): string {
    return path.join(file.replace(/(\.d)?(\.ts|\.js)/, ''))
  }

  private static listDirectory(directory: string): Array<string> {
    return fs.readdirSync(directory)
  }

  private static isDirectory(fileName: string): boolean {
    return fs.statSync(fileName).isDirectory()
  }
}
