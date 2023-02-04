import { DocumentExecutorSchema } from './schema';

export default async function runExecutor(
  options: DocumentExecutorSchema,
) {
  console.log('Executor ran for Document', options);
  return {
    success: true
  };
}

