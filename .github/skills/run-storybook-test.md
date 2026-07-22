---
name: run-storybook-test
description: 'Run Storybook tests for current component or story. Use when: user wants to run storybook tests, test a story, test current component, run test for current file, mentions "yarn test-storybook", "run story test", "test this story", or is viewing a .stories.tsx or test file and wants to run tests.'
argument-hint: 'Optional: specific story name or test name to run'
---

# Run Storybook Test

Intelligently locates and runs Storybook tests for the current component based on the open file.

## When to Use

- User wants to run tests for a Storybook story
- Current file is a `*.stories.tsx` file
- Current file is a test file under `src/test/`
- User mentions: "run test", "test this", "test storybook", "run story test"
- User wants to test a specific component

## How It Works

1. **Identify current context**:
   - Check if current file is a `.stories.tsx` file or a test file
   - Extract relevant story/test names

2. **Locate test names**:
   - For `.stories.tsx` files: Extract all exported story names (constants exported from the file)
   - For test files: Find the corresponding story file and identify the export name
3. **Run the test**:
   - Use command: `npx vitest run --project=storybook -t "Story Name"`
   - Story name must be derived from the corresponding stories export name
   - `run` mode is required so the process exits after execution (no watch mode)

## Project Structure

```
src/
  stories/
    *.stories.tsx          # Stories files that export test components
  test/
    <feature>/
      *Test.tsx            # Test components imported by stories
```

## Command Pattern

```bash
# Run specific story test
npx vitest run --project=storybook -t "Story Name"

# Run all tests in a story file
npx vitest run --project=storybook -t "Component Title"
```

## Examples

### Example 1: From Test File

```
Current file: src/test/lvForm/choiceGroupTest.tsx
↓
Find: src/stories/lvForm.stories.tsx
↓
Locate export: export const ChoiceGroup = ChoiceGroupTest;
↓
Run: npx vitest run --project=storybook -t "Choice Group"
```

### Example 2: From Stories File

```
Current file: src/stories/lvForm.stories.tsx
Exports: BasicForm, Checkbox, Toggle, ChoiceGroup
↓
If user specifies a story, run that one
If not, ask which one or run all
↓
Run: npx vitest run --project=storybook -t "Basic Form"
```

## Required Validation

Before running any command, validate the requested test name against the corresponding `.stories.tsx` file.

1. Build the allowed list from story exports in that file (for example `BasicForm`, `ChoiceGroup`).
2. Convert export names to runnable test names (`Basic Form`, `Choice Group`).
3. If the requested test name is not in the allowed list, do not run tests.
4. Return a helpful message with valid options and ask the user to choose one.

This prevents running unrelated or mistyped test names.

## Implementation Steps

1. **Get current file path**
   - Identify if it's a stories file or test file
2. **For test files**:
   - Extract the test component name (e.g., `ChoiceGroupTest`)
   - Search for `.stories.tsx` files that import this test
   - Find the export constant name (e.g., `export const ChoiceGroup`)
   - Convert to test name (PascalCase to space-separated: "Choice Group")

3. **For stories files**:
   - Parse all exports
   - Extract constant names
   - Convert to test names (PascalCase to space-separated)
   - If user provided a name, verify it exists in this file's export-derived names before running
   - If multiple and no name provided, ask user which one or run all

4. **Validate user input**:
   - Match user-provided story name only against names derived from the mapped `.stories.tsx`
   - If no exact match, show available names and stop

5. **Execute test**:
   - Run `npx vitest run --project=storybook -t "Story Name"`
   - Display results
   - Ensure process exits after completion (`run` mode)

## Story Name Conversion

Story exports use PascalCase, test names use space-separated format:

| Export Name   | Test Name      |
| ------------- | -------------- |
| `BasicForm`   | "Basic Form"   |
| `ChoiceGroup` | "Choice Group" |
| `UITable`     | "UI Table"     |
| `Default`     | "Default"      |

## Error Handling

- If current file is not a test or stories file, search workspace for relevant files
- If multiple matches found, ask user which test to run
- If test name not found in the mapped `.stories.tsx`, list available tests from that file and stop
- If command fails, show error and suggest checking if Storybook is configured correctly
