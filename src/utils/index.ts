export const LogStart = (title: string, cb: any = () => {}) => {
    console.group(title);
    cb();
    console.groupEnd();
};

export const Log = (...args: any[]) => {
    console.log(...args);
};

/**
 * 运行计时器
 * @param name 计时器名称
 * @param cb 需要执行计时的运行函数
 */
export const Timer = (name = '计时器名称',cb = () => {}) => {
    console.time(name);
    cb();
    console.timeEnd(name);
};
