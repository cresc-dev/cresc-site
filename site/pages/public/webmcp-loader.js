(function () {
  if (typeof window !== 'undefined') {
    const registerWebMcp = () => {
      if (typeof navigator !== 'undefined' && navigator.modelContext) {
        try {
          if (typeof navigator.modelContext.provideContext === 'function') {
            navigator.modelContext.provideContext({
              tools: [
                {
                  name: 'search_docs',
                  description: 'Search documentation of Cresc React Native OTA update service',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      query: {
                        type: 'string',
                        description: 'The search query for docs'
                      }
                    },
                    required: ['query']
                  },
                  execute: async (args) => {
                    return { content: `Search results for: ${args.query}` };
                  }
                }
              ]
            });
            console.log('WebMCP provideContext registered successfully.');
          }
          if (typeof navigator.modelContext.registerTool === 'function') {
            navigator.modelContext.registerTool({
              name: 'search_docs',
              description: 'Search documentation of Cresc React Native OTA update service',
              inputSchema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'The search query for docs'
                  }
                },
                required: ['query']
              },
              execute: async (args) => {
                return { content: `Search results for: ${args.query}` };
              }
            });
            console.log('WebMCP registerTool registered successfully.');
          }
        } catch (e) {
          console.error('Failed to register WebMCP:', e);
        }
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      registerWebMcp();
    } else {
      window.addEventListener('load', registerWebMcp);
    }
  }
})();
