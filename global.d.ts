declare module "@env" {
  export const MISTRAL_API_KEY: string;
  export const MISTRAL_MODEL: string;
}

// Déclaration pour résoudre l'erreur TS2688 sur les modules manquants
declare module "components" {
  export * from './src/components';
}

declare module "services" {
  export * from './src/services';
}

declare module "styles" {
  export * from './src/styles/styles';
} 