import { Effect, tag } from '@boostercloud/framework-types/dist/effect'

export class FileSystemError {
  readonly _tag = 'FileSystemError'
  constructor(readonly error: Error) {}
}

export interface FileSystemService {
  readonly readDirectoryContents: (directoryPath: string) => Effect<unknown, FileSystemError, ReadonlyArray<string>>
}

export const FileSystemService = tag<FileSystemService>()
