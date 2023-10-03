import {
    ExecutorContext,
    ProjectConfiguration,
    workspaceRoot,
  } from '@nrwl/devkit';
  
export type HelloExecutorSchema = {};

export default async function runExecutor(
  options: HelloExecutorSchema,
  context: ExecutorContext,
) {

  console.log('hibob')

  return {
    success: true,
  };
}

// don't use custom executors, because they are hard to follow compared to the shell commands