export type OptionType = "string" | "boolean";
export interface ParsedArgs {
  options: Record<string, string | boolean>;
  positionals: string[];
}
export function parseArgs(
  args: readonly string[],
  schema: Record<string, OptionType>,
): ParsedArgs {
  const options: Record<string, string | boolean> = Object.create(
      null,
    ) as Record<string, string | boolean>,
    positionals: string[] = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === "--") {
      positionals.push(...args.slice(i + 1));
      break;
    }
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    const key = arg.slice(2, eq === -1 ? undefined : eq);
    if (!Object.hasOwn(schema, key))
      throw new TypeError("Unknown option: " + key);
    const type = schema[key];
    if (type === "boolean") {
      const raw = eq === -1 ? "true" : arg.slice(eq + 1);
      if (!["true", "false"].includes(raw))
        throw new TypeError("Invalid boolean: " + key);
      options[key] = raw === "true";
    } else {
      const value = eq === -1 ? args[++i] : arg.slice(eq + 1);
      if (value === undefined || (eq === -1 && value.startsWith("--")))
        throw new TypeError("Missing value: " + key);
      options[key] = value;
    }
  }
  return { options, positionals };
}
