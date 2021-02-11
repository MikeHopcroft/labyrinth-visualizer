import {NodeSpec} from 'labyrinth-nsg';

export enum Direction {
  TO,
  FROM
}

export class AnalyzerPathProps {
  isOutbound: boolean;
  startKey: string;
  endKey?: string;
  redirect: boolean;

  static create(pathname: string, nodes?: NodeSpec[]): AnalyzerPathProps {
    const [ignore, mode, direction, start, end] = pathname.split('/');
    // TODO: come up with better URL encoding scheme.
    // This means both the architecture and the implementation.
    // For implementation, look at URLEncoder and other similar methods.
    // It is not clear that URLEncoder escapes forward slashes.
    // See https://stackoverflow.com/questions/2992231/slashes-in-url-variables#:~:text=You%20need%20to%20escape%20the%20slashes%20as%20%2F%20.&text=You%20could%20easily%20replace%20the,etc.%2C%20is%20common%20practice.&text=You%20need%20to%20escape%20those,replace%20it%20by%20%2F%20manually.
    const e = end ? end.replace(/%2f/g, '/'): end;
    const s = start ? start.replace(/%2f/g, '/'): start;
    return new AnalyzerPathProps(direction, s, e, nodes);
  }

  constructor(
    direction?: string,
    start?: string,
    end?: string,
    nodes?: NodeSpec[]
  ) {
    this.redirect = (
      direction === undefined ||
      start === undefined ||
      end === undefined
    );

    if (direction === 'to') {
      this.isOutbound = false;
    } else if (direction === 'from' || direction === undefined) {
      this.isOutbound = true;
    } else {
      // TODO: don't throw here.
      const message = `Bad direction: "${direction}".`;
      throw new TypeError(message);
    }

    if (start !== undefined) {
      this.startKey = start;
      // TODO: consider checking whether start is in nodes[]
      // Check is currently in AnalyzeMode.renderPage()
    } else if (nodes !== undefined && nodes.length > 0) {
      this.startKey = nodes[0].key;
    } else {
      const message = 'startKey undefined and nodes undefined or empty';
      throw new TypeError(message);
      // this.startKey = 'error'; // TODO: handle this case.
    }

    this.endKey = end;
  }

  // https://stackoverflow.com/questions/61444428/typescript-create-an-instance-using-the-constructor-property
  clone(): AnalyzerPathProps {
    const constructor = this.constructor as {
      new(
        ...args: ConstructorParameters<typeof AnalyzerPathProps>
      ): AnalyzerPathProps
    };

    return new constructor(
      this.isOutbound ? 'from' : 'to',
      this.startKey,
      this.endKey
    );
  }

  to(): AnalyzerPathProps {
    // TODO: do we really want to run all of the constructor logic here?
    const a = this.clone();
    a.isOutbound = false;
    return a;
  }

  // TODO: this function should return an AnalyzerPathProps like the to() method.
  from() {
    return [
      '/analyze',
      'from',
      this.startKey.replace(/\//g, '%2f'),
    ].join('/');
  }

  // TODO: this function should return an AnalyzerPathProps like the to() method.
  start(name: string) {
    return [
      '/analyze',
      this.isOutbound ? 'from' : 'to',
      name.replace(/\//g, '%2f'),
    ].join('/');
  }

  // TODO: this function should return an AnalyzerPathProps like the to() method.
  end(name: string) {
    return [
      '/analyze',
      this.isOutbound ? 'from' : 'to',
      this.startKey.replace(/\//g, '%2f'),
      name.replace(/\//g, '%2f'),
    ].join('/');
  }

  path() {
    return [
      '/analyze',
      this.isOutbound ? 'from' : 'to',
      this.startKey.replace(/\//g, '%2f'),
      this.endKey ? this.endKey.replace(/\//g, '%2f') : this.endKey
    ].join('/');
  }
}
