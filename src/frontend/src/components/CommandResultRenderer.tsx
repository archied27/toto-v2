import type { CommandResult } from "@/plugins/types";
import { useCommandRegistry } from "@/hooks/useCommandRegistry";

export default function CommandResultRenderer({
  result,
}: {
  result: CommandResult;
}) {
  const registry = useCommandRegistry();

  if (!result.success) {
    return (
      <p className="text-sm text-destructive">{result.response_text}</p>
    );
  }

  const Renderer = registry[result.action];

  if (Renderer) {
    return <Renderer data={result.data} />;
  }

  return (
    <p className="text-sm text-muted-foreground">{result.response_text}</p>
  );
}