import type { PlatformPath } from 'path'
import importedPath from 'path'
import type { ResolverIO } from './types'

// inline fp methods due to perf
const uniq = (arr) => arr.filter((elem, pos, a) => a.indexOf(elem) === pos)
const reversePathsToWalk = ({
  folder,
  path,
}: {
  folder: string
  path: PlatformPath
}): string[] => {
  const resolved = path.resolve(folder)
  const parts = resolved.split(path.sep)
  const results = parts.map((_, idx, arr) =>
    arr.slice(0, idx + 1).join(path.sep),
  )
  results[0] = results[0] || '/'
  return results.reverse()
}

const configLookup = (
  files: string[],
  folder: string,
  path: PlatformPath = importedPath,
) =>
  uniq(
    reversePathsToWalk({ folder, path }).flatMap((p) =>
      files.map((f) => path.join(p, f)),
    ),
  )

class ConfigResolver {
  configFiles: string[]

  io: ResolverIO

  constructor(configFiles: string[], io: ResolverIO) {
    this.configFiles = configFiles
    this.io = io
  }

  async resolve(from: string) {
    const configCandidates = configLookup(this.configFiles, from)
    const { exists, load, none } = this.io
    for (const candidate of configCandidates) {
      if (await exists(candidate)) {
        return load(candidate)
      }
    }
    return none(from)
  }
}

export { configLookup, ConfigResolver, reversePathsToWalk }
