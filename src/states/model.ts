// modelStore.ts or your-file-path.ts
import { createSignal } from "solid-js";

export enum Models {
    base = "https://saeed-latifi.github.io/assets-3d/base.glb",
    menar = "https://saeed-latifi.github.io/assets-3d/menar.glb",
    cedar = "https://saeed-latifi.github.io/assets-3d/cedar.glb",
    oak = "https://saeed-latifi.github.io/assets-3d/oak.glb",

}

export const [selectedModel, setSelectedModel] = createSignal(Models.base);