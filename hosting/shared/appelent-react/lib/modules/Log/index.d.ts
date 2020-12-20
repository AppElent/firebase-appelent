declare class Log {
    private debug;
    constructor(debug: boolean);
    generateMessage(level: string, message: any, source?: string): void;
    trace(message: any, source?: string): void;
    info(message: any, source?: string): void;
    warn(message: any, source?: string): void;
    error(message: any, source?: string): void;
    log(...args: any[]): void;
}
export default Log;
