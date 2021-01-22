import * as yaml from 'js-yaml';

import {
  createSimplifier,
  firewallSpec,
  ForwardRuleSpecEx,
  Graph,
  GraphBuilder,
  NodeSpec,
  Simplifier,
  Universe
} from 'labyrinth-nsg';

export interface ApplicationState {
  configYamlText: string;
  nodes: NodeSpec[] | undefined;
  graph: Graph | undefined;
  universe: Universe;
  simplifier: Simplifier<ForwardRuleSpecEx>;
}

export function initialState(): ApplicationState {
  const config = {
    types: [
      {
        name: 'ip address',
        key: 'ip',
        parser: 'ip',
        formatter: 'ip',
        domain: '0.0.0.0-255.255.255.255',
        values: [
          {symbol: 'internet', range: '0.0.0.0-255.255.255.255'},
          {symbol: 'localhost', range: '127.0.0.1'},
          {symbol: 'loopback', range: '127.0.0.0/8'},
        ],
      },
    ]  
  };

  const nodes: NodeSpec[] = [
    {
      name: 'internet',
      key: 'internet',
      endpoint: true,
      rules: [
        {
          destination: 'gateway',
        },
      ],
    },
    {
      name: 'gateway',
      key: 'gateway',
      rules: [
        {
          destination: 'subnet1',
          destinationIp: '10.0.0.0/8',
        },
        {
          destination: 'subnet2',
          destinationIp: '10.0.0.0/7',
        },
      ],
    },
    {
      name: 'subnet1',
      key: 'subnet1',
      rules: [
        {
          destination: 'subnet2',
          destinationPort: '80',
        },
        {
          destination: 'subnet3',
        },
      ],
    },
    {
      name: 'subnet2',
      key: 'subnet2',
      rules: [
        {
          destination: 'server',
          protocol: 'tcp',
        },
      ],
    },
    {
      name: 'subnet3',
      key: 'subnet3',
      rules: [],
    },
    {
      name: 'server',
      key: 'server',
      endpoint: true,
      rules: [],
    },
  ];

  const configYamlText = yaml.dump(nodes);

  // TODO: put this all in a function wrapped in a try/catch.
  // Share with applyAnalyze()
  const universe = new Universe(firewallSpec);
  const simplifier = createSimplifier<ForwardRuleSpecEx>(universe);
  const builder = new GraphBuilder(universe, simplifier, nodes);
  const graph = builder.buildGraph();

  return {
    configYamlText,
    nodes,
    graph,
    universe,
    simplifier
  };
}
