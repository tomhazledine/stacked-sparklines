import * as esbuild from "esbuild";
import { parseArgs, getPackageVersion, watchFiles } from "./build.utils.js";
import config from "./config.js";

const version = getPackageVersion();

const args = parseArgs(process.argv);

const globalConfig = {
    bundle: true,
    outdir: `build`,
    minify: args.mode !== "development",
    treeShaking: args.mode !== "development",
    sourcemap: args.mode === "development"
};

const buildConfig = {
    ...globalConfig,
    format: "esm",
    entryPoints: [{ out: config.slug, in: "src/index.js" }],
    loader: { ".css": "text" }
};

const build = async buildConfig => {
    try {
        await esbuild.build(buildConfig);
    } catch (e) {
        if (e.errors && e.errors[0].location) {
            console.log({ location: e.errors[0].location });
        }
        console.warn("esbuild error", e);
    }
};

if (args.mode === "development") {
    // Development mode
    watchFiles(["src"], async file => {
        console.log(`Changes detected in ${file}.\nRebuilding...`);
        await build(buildConfig);
        console.log("Build complete.");
    });
} else {
    // Production mode
    await build(buildConfig);
    console.log("Build complete.");
}
