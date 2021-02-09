import {
  AnyRuleSpec,
  createSimplifier,
  Graph,
  GraphBuilder,
  GraphSpec,
  loadYamlGraphSpec,
  loadYamlUniverseSpec,
  Simplifier,
  Universe,
  UniverseSpec
} from "labyrinth-nsg";

export interface World {
  graph: Graph,
  universe: Universe,
  simplifier: Simplifier<AnyRuleSpec>,
}

export function createWorldFromYaml(
  universeYamlText: string,
  configYamlText: string
): World {
  const graphSpec = loadYamlGraphSpec(configYamlText);
  const universeSpec = loadYamlUniverseSpec(universeYamlText);
  return createWorld(universeSpec, graphSpec);

}

export function createWorld(
  universeSpec: UniverseSpec,
  graphSpec: GraphSpec
): World {
  const universe = new Universe(universeSpec);
  const simplifier = createSimplifier<AnyRuleSpec>(universe);
  const builder = new GraphBuilder(universe, simplifier, graphSpec);
  const graph = builder.buildGraph();

  return { graph, universe, simplifier };
}
