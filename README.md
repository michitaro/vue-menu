# vue-menu

😣 This library is not compatible with Vue3! 😣

## Introduction

Recent web technologies focus on mobile environments. UIs premised on mouse operation such as window, context-menu, nested-menu and so on are no longer mainstream. However hierarchical structure -- context-menu and nested-menu -- is still effective. This package is an implementation of {nested,context}-menu for PC environments as a Vue Component.

### [Working Demo](https://michitaro.github.io/vue-menu)

### Features

- Menu component for vue2
- Deeply nested menu supported
- Props "checked" & "disabled"
- Keybinds
- Y-scrollable if necessary
- Contextmenu
- Builtin 3 themes (white, metal & black)
- Customizable color
- Menuitem can contain any HTML not only text
- Tested on Safari10, Chrome60, Firefox55, IE11, Edge38 for PCs
- ~~Does not work on mobile devices 😞~

![Screenshot](./docs/screenshot.png)

# Usage

## Install

```sh
npm install --save @hscmap/vue-menu
```

## Setup

### ES6 / TypeScript

```typescript
import Vue from "vue";
import * as VueMenu from "@hscmap/vue-menu";

Vue.use(VueMenu);
```

### CommonJS

```javascript
var Vue = require("vue");
Vue.use(require("@hscmap/vue-menu"));
```

# Example

```html
<template>
  <hsc-menu-style-white>
    <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
      <hsc-menu-bar-item label="File">
        <hsc-menu-item label="New" @click="window.alert('New')" />
        <hsc-menu-item label="Open" @click="window.alert('Open')" />
        <hsc-menu-separator />
        <hsc-menu-item
          label="Save"
          @click="window.alert('Save')"
          :disabled="true"
        />
        <hsc-menu-item label="Export to">
          <hsc-menu-item label="PDF" />
          <hsc-menu-item label="HTML" />
        </hsc-menu-item>
      </hsc-menu-bar-item>
      <hsc-menu-bar-item label="Edit">
        <hsc-menu-item
          label="Undo"
          keybind="meta+z"
          @click="window.alert('Undo')"
        />
        <hsc-menu-separator />
        <hsc-menu-item
          label="Cut"
          keybind="meta+x"
          @click="window.alert('Cut')"
        />
        <hsc-menu-item
          label="Copy"
          keybind="meta+c"
          @click="window.alert('Copy')"
        />
        <hsc-menu-item
          label="Paste"
          keybind="meta+v"
          @click="window.alert('Paste')"
          :disabled="true"
        />
      </hsc-menu-bar-item>
    </hsc-menu-bar>
  </hsc-menu-style-white>
</template>
```

Other examples are available [here](http://michitaro.github.io/vue-menu/).

See also [vue-window](https://github.com/michitaro/vue-window). This is a window UI component for vue2 with the same color themes.

# Caveats

- ~~This component doesn't work on [electron-vue](https://github.com/SimulatedGREG/electron-vue).~~
  - See [here](https://github.com/michitaro/vue-menu/issues/5#issuecomment-450770617) to use with [electron-vue](https://github.com/SimulatedGREG/electron-vue).

# Contributing

Any comments, suggestions or PRs are welcome 😀

# React Port

React port is available [here](https://github.com/michitaro/react-menu).
