---
order: 12
title: CLI Tools (Custom Modules)
type: Guide
---

## Module System

Since version v2.0.0, the CLI supports modular extensions, enabling developers to customize commands and workflows.

### Core Architecture

- **CLI Module**: A self-contained module encompassing your custom commands and workflows.
- **Command**: A single, executable ad-hoc terminal command.
- **Workflow**: Complex, stateful action flows composed of chronological steps.
- **Module Manager**: The underlying component framework that hooks modules and executes them.

### Registering Modules

```typescript
import { moduleManager } from 'react-native-update-cli';
import { myCustomModule } from './my-custom-module';

// Register a customized module
moduleManager.registerModule(myCustomModule);
```

### Developing Custom Modules

```typescript
import type { CLIModule, CommandContext, CommandResult } from 'react-native-update-cli';

export const myCustomModule: CLIModule = {
  name: 'my-module',
  version: '1.0.0',
  commands: [
    {
      name: 'my-command',
      description: 'My custom command',
      handler: async (context: CommandContext): Promise<CommandResult> => {
        // Execute arbitrary logic
        return { success: true, data: 'Hello from custom command!' };
      },
      options: {
        flag: {
          hasValue: true,
          description: 'Custom Flag Parameter'
        }
      }
    }
  ],
  workflows: [
    {
      name: 'my-workflow',
      description: 'My custom workflow process',
      steps: [
        {
          name: 'step1',
          description: 'Step One initialization',
          execute: async (context: CommandContext) => {
            console.log('Executing step 1...');
            return { step1Result: 'completed' };
          }
        },
        {
          name: 'step2',
          description: 'Step Two execution',
          execute: async (context: CommandContext, previousResult: any) => {
            console.log('Executing step 2. Input from previous step:', previousResult);
            return { ...previousResult, step2Result: 'completed' };
          }
        }
      ]
    }
  ],
  init: (provider) => {
    console.log('Custom Module initialized');
  }
};
```

### Review Created Commands

```bash
# List all currently recognized module commands
cresc list
```

---

## Workflow System

Workflows manage the complicated end-to-end task flows consisting of distinct states. They support conditional execution thresholds, standardized error handling, and robust data propagation parameters.

### Built-in Workflows

#### 1. User Authentication Flow

##### cresc auth-check
Verifies current user authentication conditions.

```bash
cresc workflow auth-check
```

##### cresc login-flow  
Complete end-to-end CLI dashboard login procedure.

```bash
cresc workflow login-flow
```

#### 2. Cross-Platform App Management Flows

##### cresc workflow multi-platform-app-management
Consolidated unified oversight over multi-platform apps.

```bash
cresc workflow multi-platform-app-management
```

##### cresc workflow incremental-build
Executes an incremental build generation to assemble partial/delta updates.

```bash
cresc workflow incremental-build
```

### Workflow Utilities

Lists all available workflow suites dynamically.

```bash
cresc list
```

##### cresc workflow
Perform a specified dynamic workflow sequence.

```bash
cresc workflow <workflowName>
```

##### cresc list
Lists the full set of registered modules framework-wide.

```bash
cresc list
```

### Workflow Features

1. **Procedural Execution**: Handfuls of workflow steps fire strictly in chronological sequences.
2. **Context Passing**: Each node's returned result can be passed into subsequent execution nodes.
3. **Conditional Thresholds**: Execution nodes can dynamically route execution based on conditions.
4. **Error Handling**: Standardized rollback mechanism handles exceptions robustly.
5. **Realtime Feedback**: Visually monitors stage progress metrics via STDERR streaming.
6. **Input Validation**: Required parameter variables are strictly schema-verified before execution paths begin.

---

## Example Repository

Explore an assortment of complete modules and robust workflows documented thoroughly via code samples within the `example/` directory folder:

- `example/modules/` - Basic Module instantiation guides.
- `example/workflows/` - Elaborate Workflow architecture samples.  
- `example/scripts/` - TypeScript command triggers for CI tooling.

To exercise the sandbox scripts directly:

```bash
# Registering and triggering simple module tests
npx ts-node example/scripts/register-modules.ts

# Boot up the testing workflow sandbox
npx ts-node example/scripts/workflow-demo.ts

# Run the complex stateful workflow test
npx ts-node example/scripts/enhanced-workflow-demo.ts
```
