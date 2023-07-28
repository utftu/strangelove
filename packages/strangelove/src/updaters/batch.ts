export type BatchExec = () => void | Promise<void>;

export type Batch = (fn: BatchExec) => void | Promise<void>;
export const noopBatch = (fn: BatchExec) => fn();
