import type { PlatformPath } from 'path';
import type { ResolverIO } from './types';
declare const reversePathsToWalk: ({ folder, path, }: {
    folder: string;
    path: PlatformPath;
}) => string[];
declare const configLookup: (files: string[], folder: string, path?: PlatformPath) => any;
declare class ConfigResolver {
    configFiles: string[];
    io: ResolverIO;
    constructor(configFiles: string[], io: ResolverIO);
    resolve(from: string): Promise<Record<string, any>>;
}
export { configLookup, ConfigResolver, reversePathsToWalk };
//# sourceMappingURL=config.d.ts.map