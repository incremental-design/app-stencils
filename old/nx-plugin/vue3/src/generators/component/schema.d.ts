export interface ComponentGeneratorSchema {
  name: string;
  description: string;
  tags?: string;
  directory?: string;
  npmScope?: string
  importPrefix?: string;
  bugs?: string;
  vueVersion?: string;
}
