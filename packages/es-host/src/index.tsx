import { loadScript } from './scriptLoader';

interface Module {
  mount: (module: any, options: any) => void;
}
interface Container {
  init: (module: any) => void;
  get: (modelName: string) => () => Module;
}
declare function __webpack_init_sharing__(scope: string): void;
declare let __webpack_share_scopes__: any;

const loadAndInitiateWebpackContainer = async (name: string) => {
  // Initializes the share scope.
  // This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');
  const container = (window[name] as any) as Container;
  if (!container || !container.init) throw new Error(`Cannot find external remote: ${name}`);

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);
  return container;
};

const getRemoteModule = async (name: string, moduleName: string): Promise<Module> => {
  const container = await loadAndInitiateWebpackContainer(name);
  const factory = await container.get(moduleName);
  const module = factory();
  return module;
};

const mounts = [];

const register = (remote: string, moduleName: string, options): void => {
  const { selector } = options || {};
  const element = document.querySelector(selector);
  const remoteParts = remote.split('@');
  const name = remoteParts[0];
  const url = remoteParts[1];
  if (!name || !url) {
    throw Error('Invalid remote');
  }

  mounts.push({
    name,
    url,
    moduleName,
    element,
    selector,
    options,
  });
};

const start = async () => {
  // load all scripts
  const promisesScripts = mounts.map((mount) => {
    return loadScript(mount.url);
  });
  await Promise.all(promisesScripts);

  // get all modules
  const promisesModules = mounts.map((mount) => {
    return getRemoteModule(mount.name, mount.moduleName).then((module) => {
      return {
        module,
        selector: mount.selector,
        element: mount.element,
        options: mount.options,
      };
    });
  });
  const moduleContexts = await Promise.all(promisesModules);

  // mount modules
  moduleContexts.forEach((context) => {
    if (!context.element) {
      console.error(`Missing or invalid selector: ${context.selector}`);
    } else {
      context.module.mount(context.element, context.options);
    }
  });
};

export default {
  register,
  start,
  getRemoteModule,
  loadScript,
};
