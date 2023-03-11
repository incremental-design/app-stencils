export default async function checkVite(): Promise<boolean> {
  try {
    await import('vite');
    return true;
  } catch (e) {
    console.error(e);
    console.error('vite not installed');
    return false;
  }
}
