import { UseMutationOptions } from "@tanstack/react-query";
import { bgQueryClient } from "@/entrypoints/background/common/bg-query-client.ts";

/**
 * A helper function to mutate data using the background query client
 * @param options
 * @param variables
 */
export default async function mutate<T, K>(
  options: UseMutationOptions<K, unknown, T>,
  variables: T,
) {
  return bgQueryClient
    .getMutationCache()
    .build(bgQueryClient, options)
    .execute(variables);
}
