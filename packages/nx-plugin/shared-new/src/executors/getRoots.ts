import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';

export default function getRoots(context: ExecutorContext): {
  workspaceRoot: string;
  projectRoot: string;
  projectName: string;
} {
  const workspaceRoot = context.root;

  const projectName = context.projectName;

  if (!projectName) {
    throw new Error('project is undefined');
  }

  const projectRoot = path.resolve(
    workspaceRoot,
    context.projectsConfigurations.projects[projectName].root
  );

  return { workspaceRoot, projectRoot, projectName };
}
