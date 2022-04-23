#url addresses
- \#general - general page
- \#play/:player/:id - player page with player type and its internal id
- \#settings/css/background - link to setting unit
- \#history - history window
- etc.

works identical both for pages and for windows.
before using link it needed to register in url watcher (URLWatch)
through Packet manager in general environment (general.urlWatch)

#urlwatch class defenition
##variables
- queries: Record<string, function[]> - store queries for different
interal links

##methods
- bind(string, function): number - bind function to specific link event
- register(string, ?function): number - create new link event and bind
a fnuction (optional)
- unbind(string, number) - unbind function by number id
- unbild(string) - unbind all functions for event
