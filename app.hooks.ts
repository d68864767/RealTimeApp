import { Hook, Application } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';

// A hook that logs service method before, after and error
const logger: Hook = async (context) => {
  console.log(`Before ${context.method} a ${context.path}`);
  
  context.app.on('after', (method, path, result, context) => {
    console.log(`After ${method} a ${path}`);
  });

  context.app.on('error', (error, method, path, params, context) => {
    console.log(`Error in ${method} a ${path}`);
  });

  return context;
};

// Application hooks that run for every service
export default function (app: Application) {
  if (typeof app.hooks !== 'function') {
    // If this is a very old version of Feathers, the hooks module needs to be registered
    // and the hook functions updated to remove the first argument
    app = app.hooks({ before: logger, after: logger, error: logger });
  } else {
    app.hooks({ before: logger, after: logger, error: logger });
  }
}
