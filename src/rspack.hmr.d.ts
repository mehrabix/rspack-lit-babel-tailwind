interface ImportMeta {
  hot?: {
    accept(dependencies?: string | string[], callback?: (updatedModule?: any) => void): void;
  };
}