import configYamlText from '../data/config.yaml';
import resourceGraphYamlText from '../data/resource-graph-1.yaml';
import universeYamlText from '../data/universe.yaml';
import {createWorldFromYaml, World} from '../lib';

export interface ApplicationState {
  universeYamlText: string;
  configYamlText: string;
  world?: World;
  error?: Error;
}

export function initialState(): ApplicationState {
  const networkYamlText = configYamlText;;
  // const networkYamlText = resourceGraphYamlText;

  try {
    // const world = createWorldFromYaml(universeYamlText, configYamlText);
    const world = createWorldFromYaml(universeYamlText, networkYamlText);
    return {
      universeYamlText,
      configYamlText: networkYamlText,
      world,
      error: undefined
    };
  } catch (error) {
    return {
      universeYamlText,
      configYamlText: networkYamlText,
      error: error as Error
    };
  }
}
