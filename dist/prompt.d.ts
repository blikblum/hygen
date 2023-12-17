import type { Prompter, RunnerConfig } from './types';
declare const prompt: <Q, T>(createPrompter: () => Prompter<Q, T>, actionfolder: string, args: Record<string, any>, config: RunnerConfig) => Promise<object | T>;
export default prompt;
//# sourceMappingURL=prompt.d.ts.map