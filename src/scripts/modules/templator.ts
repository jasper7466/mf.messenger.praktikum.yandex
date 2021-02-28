interface ITemplator {
    compile(ctx: object): string;
}

export class Templator implements ITemplator {
    static readonly findEx = /\{\{\s?(.*?)\s?\}\}/gi;
    static readonly xssEx = /(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/ig;

    public constructor(protected readonly template: string) {}

    protected get(obj: object, path: string, defaultValue?: string): any {
        console.log(path);
        const keys: string[] = path.split('.');
        let result: any = obj;

        for (let key of keys) {
            result = result[key];
            if (result === undefined)
                return defaultValue;
        }
        return result ?? defaultValue;
    }

    protected xssCheck(value: any): boolean {
        return Templator.xssEx.test(value);
    }

    public compile(ctx: any): string {
        let markdown: string = this.template;
        markdown = markdown.replace(Templator.findEx, this.get(ctx, RegExp.$1));
        return markdown;
    }
}