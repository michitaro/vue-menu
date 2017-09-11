<template>
    <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="Inputs">
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        Range:
                        <input type="range" @mousedown.stop />
                    </div>
                </hsc-menu-item>
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        Input:
                        <input type="text" />
                    </div>
                </hsc-menu-item>
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        Select:
                        <select>
                            <option>opt 1</option>
                            <option>opt 2</option>
                        </select>
                    </div>
                </hsc-menu-item>
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-white>
</template>
