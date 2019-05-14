import { Pipe, PipeTransform } from '@angular/core';

export function serializer() {
  const stack: any[] = [];
  const keys: string[] = [];

  const cycleReplacer = (key: string, value: any) => {
    if (stack[0] === value) {
      return '[Circular ~]';
    }
    return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
  };

  return function(this: any, key: string, value: any) {
    if (stack.length > 0) {
      const thisPos = stack.indexOf(this);
      // tslint:disable-next-line: no-bitwise
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      // tslint:disable-next-line: no-bitwise
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
      // tslint:disable-next-line: no-bitwise
      if (~stack.indexOf(value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }
    return value;
  };
}

@Pipe({ name: 'prettyPrint', pure: false })
export class PrettyPrintPipe implements PipeTransform {
  public transform(obj: any, spaces = 2): string {
    return this.syntaxHighlight(obj, serializer(), spaces);
  }

  // tslint:disable-next-line: no-shadowed-variable
  syntaxHighlight(json: any, serializer: any, spacing: number) {
    if (json === undefined) {
      return '<span class="undefined"></span>';
    }

    if (typeof json !== 'string') {
      json = JSON.stringify(json, serializer, spacing);
    }

    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match: any) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }
}
