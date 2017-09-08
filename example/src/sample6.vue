<template>
    <hsc-menu-style-white>
        <hsc-menubar style="border-radius: 0 0 4pt 0;">
            <hsc-menubaritem label="Inputs">
                <hsc-menuitem>
                    <div slot="body" @mousedown.stop>
                        Range:
                        <input type="range" @mousedown.stop />
                    </div>
                </hsc-menuitem>
                <hsc-menuitem>
                    <div slot="body" @mousedown.stop>
                        Input:
                        <input type="text" />
                    </div>
                </hsc-menuitem>
                <hsc-menuitem>
                    <div slot="body" @mousedown.stop>
                        Select:
                        <select>
                            <option>opt 1</option>
                            <option>opt 2</option>
                        </select>
                    </div>
                </hsc-menuitem>
            </hsc-menubaritem>
        </hsc-menubar>
    </hsc-menu-style-white>
</template>
