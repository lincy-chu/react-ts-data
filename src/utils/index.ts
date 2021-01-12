export const LogStart = (title: string, cb: any = () => {}) => {
    console.group(title);
    cb();
    console.groupEnd();
};

export const Log = (...args: any[]) => {
    console.log(...args);
};
