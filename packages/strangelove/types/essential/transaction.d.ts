export default interface Transaction {
  promise: Promise<Transaction>;
  promiseControls: {
    resolve: () => void;
    reject: () => void;
  };
  updateCount: number;
  startTime: number;
  endTime: number;
  cb: (trx: Transaction) => void;
}
