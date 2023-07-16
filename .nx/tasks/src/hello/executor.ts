import {
    ExecutorContext,
    ProjectConfiguration,
    workspaceRoot,
  } from '@nrwl/devkit';
  
  import { HelloExecutorSchema } from './schema';
  
  export default async function runExecutor(
    options: HelloExecutorSchema,
    context: ExecutorContext,
  ) {

  
    return {
      success: true,
    };
  }
