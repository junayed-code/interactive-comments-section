export type VariantProps<T extends (...args: any) => string> = {
  variant?: Parameters<T>[0];
};

export function createVariants<T extends object>(variants: T) {
  return function selectVariant(variantName: keyof typeof variants) {
    return variants[variantName];
  };
}

export default createVariants;
