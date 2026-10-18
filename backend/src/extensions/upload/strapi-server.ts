import fs from "fs";
import path from "path";
import sharp from "sharp";

const DEFAULT_BREAKPOINTS = { large: 1000, medium: 750, small: 500 };

/**
 * Responsive formats are limited by width only. The default fits images into a
 * square, which turns full-page screenshots into narrow strips useless for srcset.
 */
export default (plugin) => {
  const imageManipulation = plugin.services["image-manipulation"];
  const uploadSettings = () => strapi.plugin("upload").service("upload").getSettings();

  const resizeToWidth = async (file, width: number, key: string) => {
    const hash = `${key}_${file.hash}`;
    const filepath = file.tmpWorkingDirectory ? path.join(file.tmpWorkingDirectory, hash) : hash;
    const source = file.filepath ?? (await streamToBuffer(file.getStream()));
    const info = await sharp(source).resize({ width }).toFile(filepath);

    return {
      name: `${key}_${file.name}`,
      hash,
      ext: file.ext,
      mime: file.mime,
      filepath,
      path: file.path || null,
      getStream: () => fs.createReadStream(filepath),
      width: info.width,
      height: info.height,
      size: Math.round((info.size / 1000) * 100) / 100,
      sizeInBytes: info.size,
    };
  };

  imageManipulation.generateResponsiveFormats = async (file) => {
    const { responsiveDimensions = false } = (await uploadSettings()) ?? {};
    if (!responsiveDimensions) return [];

    const { width } = await imageManipulation.getDimensions(file);
    const breakpoints = strapi.config.get("plugin::upload.breakpoints", DEFAULT_BREAKPOINTS);

    return Promise.all(
      Object.entries(breakpoints).map(async ([key, breakpoint]) =>
        breakpoint < (width ?? 0) ? { key, file: await resizeToWidth(file, breakpoint, key) } : undefined
      )
    );
  };

  return plugin;
};

const streamToBuffer = (stream: NodeJS.ReadableStream): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
