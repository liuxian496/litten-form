# Storybook 10 路径别名配置指南 / Storybook 10 Path Alias Configuration Guide

---

## 目录 / Table of Contents

- [背景说明 / Background](#背景说明--background)
- [配置步骤 / Configuration Steps](#配置步骤--configuration-steps)
  - [1. Vite alias 配置](#1-vite-alias-配置--vite-alias-configuration)
  - [2. Storybook viteFinal 配置](#2-storybook-vitefinal-配置--storybook-vitefinal-configuration)
  - [TypeScript paths 配置](#3-typescript-paths-配置--typescript-paths-configuration)
- [常见错误排查 / Troubleshooting](#常见错误排查--troubleshooting)

---

## 背景说明 / Background

在使用 Vite + React + Storybook 10 的项目中，通常会配置路径别名（如 `@/` 指向 `src/`），以简化模块导入路径。

要使别名在所有场景下均生效，需要在以下三处保持同步配置：

1. `vite.config.mts` — 构建时别名
2. `.storybook/main.ts` — Storybook 开发服务器别名
3. `tsconfig.app.json` — TypeScript 语言服务别名

In a project using Vite + React + Storybook 10, it's common to configure path aliases (e.g., `@/` pointing to `src/`) to simplify module import paths.

To make aliases work in all scenarios, the following three places must be configured consistently:

1. `vite.config.mts` — build-time alias
2. `.storybook/main.ts` — Storybook dev server alias
3. `tsconfig.app.json` — TypeScript language service alias

---

## 配置步骤 / Configuration Steps

### 1. Vite alias 配置 / Vite alias Configuration

**文件 / File:** `vite.config.mts`

```ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  // ...其他配置
});
```

这是 Vite 构建时的别名映射，使 `@/` 在打包和开发服务器中均可正确解析。

This is the build-time alias for Vite. It enables `@/` to be resolved correctly during bundling and in the Vite dev server.

---

### 2. Storybook viteFinal 配置 / Storybook viteFinal Configuration

**文件 / File:** `.storybook/main.ts`

Storybook 10 使用自己的 Vite 实例启动开发服务器，**不会自动继承** `vite.config.mts` 中的 `resolve.alias`。需通过 `viteFinal` 钩子将别名合并进去。

Storybook 10 starts its dev server with its own Vite instance and does **not automatically inherit** `resolve.alias` from `vite.config.mts`. You must merge the alias via the `viteFinal` hook.

```ts
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  // ...其他配置
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        },
      },
    });
  },
};

export default config;
```

> **注意 / Note:** 路径使用 `'../src'` 而非 `'./src'`，因为 `.storybook/main.ts` 位于项目根目录的子目录中。
>
> The path uses `'../src'` instead of `'./src'` because `.storybook/main.ts` is located in a subdirectory of the project root.

---

### 3. TypeScript paths 配置 / TypeScript paths Configuration

**文件 / File:** `tsconfig.app.json`

仅配置 Vite alias 不能让 TypeScript 语言服务（IDE 类型检查、智能提示）识别 `@/` 别名。必须在 `tsconfig` 中同步配置 `baseUrl` 和 `paths`。

Configuring Vite alias alone is not enough for the TypeScript language service (IDE type checking, IntelliSense) to recognize the `@/` alias. You must also configure `baseUrl` and `paths` in `tsconfig`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...其他配置
  },
  "include": ["src"]
}
```

> **注意 / Note:**
>
> - `baseUrl` 必须设置，`paths` 中的相对路径基于 `baseUrl` 解析。
> - 若 `exclude` 中包含了 `"src/stories"`，则 story 文件不在该 tsconfig 覆盖范围内，即使配置了 `paths`，story 文件中的 `@/` 别名依然会报错。应将 `"src/stories"` 从 `exclude` 中移除。
> - `baseUrl` must be set; relative paths in `paths` are resolved relative to `baseUrl`.
> - If `"src/stories"` is listed in `exclude`, story files are outside this tsconfig's coverage, and `@/` aliases in story files will still error even with `paths` configured. Remove `"src/stories"` from `exclude` to fix this.

---

## 常见错误排查 / Troubleshooting

### 错误 1 / Error 1: `找不到模块"@/xxx"或其相应的类型声明`

**原因 / Cause:**  
`tsconfig.app.json` 缺少 `paths` 配置，或目标文件在 `exclude` 范围内。  
`tsconfig.app.json` is missing the `paths` configuration, or the target file is in the `exclude` list.

**解决 / Fix:**  
按上方第 3 步添加 `baseUrl` 和 `paths`，并从 `exclude` 中移除对应目录。  
Add `baseUrl` and `paths` as shown in Step 3, and remove the relevant directory from `exclude`.

---

### 错误 2 / Error 2: Storybook 运行时报 `Cannot find module '@/xxx'`

**原因 / Cause:**  
`.storybook/main.ts` 中未配置 `viteFinal`，Storybook 的 Vite 实例不认识 `@/` 别名。  
`viteFinal` is not configured in `.storybook/main.ts`, so Storybook's Vite instance does not recognize the `@/` alias.

**解决 / Fix:**  
按上方第 2 步添加 `viteFinal` 配置。  
Add the `viteFinal` configuration as shown in Step 2.

---

### 错误 3 / Error 3: 生产构建正常，但 IDE 仍报类型错误

**原因 / Cause:**  
`vite.config.mts` alias 控制构建，`tsconfig` paths 控制语言服务，两者相互独立。  
`vite.config.mts` alias controls the build; `tsconfig` paths controls the language service. They are independent.

**解决 / Fix:**  
确保 `tsconfig.app.json` 的 `paths` 与 `vite.config.mts` 的 `alias` 保持一致。  
Ensure `paths` in `tsconfig.app.json` matches `alias` in `vite.config.mts`.

---

## 完整配置总览 / Complete Configuration Overview

```
项目根目录 / Project Root
├── vite.config.mts          ← resolve.alias: { '@': './src' }
├── tsconfig.app.json        ← paths: { '@/*': ['./src/*'] }, baseUrl: '.'
│                               exclude 不含 src/stories
└── .storybook/
    └── main.ts              ← viteFinal: mergeConfig with alias '@' → '../src'
```
