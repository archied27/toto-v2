"""
handles parsing commands from command bar
"""

class CommandRouter:
    def __init__(self):
        self.plugins: list[BaseCommand] = []

    def register_plugin(self, plugin: BaseCommand) -> None:
        """
        registers a plugin with the command router
        """
        self.plugins.append(plugin)

    async def process(self, raw: str) -> Optional[MatchResult]:
        """
        takes in raw command string
        called by api
        """
        if not raw or not raw.strip():
            return CommandResult(
                success=False,
                action='EMPTY',
                response_text="Nothing to process",
                data={}
            )
        
        raw = raw.strip()
        tokens = raw.split(" ")

        match = self._try_plugins(raw, tokens)

        if match:
            plugin = self._get_plugin(match.plugin)
            return await plugin.handle(match, raw)

    def _try_plugins(self, raw: str, tokens: list[str]) -> Optional[MatchResult]:
        """
        tries to match command with each plugin
        returns first match found
        """
        for plugin in self.plugins:
            try:
                match = plugin.match(raw, tokens)
                if match:
                    return match
            except Exception as e:
                continue
        return None

    def _get_plugin(self, name: str) -> Optional[BasePlugin]:
        """
        returns plugin object by name
        """
        for plugin in self.plugins:
            try:
                if plugin.name == name:
                    return plugin
            except AttributeError:
                continue
        return None

router = CommandRouter()