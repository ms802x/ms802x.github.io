import { readFileSync } from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

/**
 * Improve Markdown images at build time:
 *
 * 1. Add intrinsic width/height for local images in public/.
 * 2. Wrap a standalone image in a <figure> when it has a title.
 *
 *   ![Alt text](/images/example.svg "A useful caption")
 *
 * The image title becomes the caption and is removed from the <img> element.
 */
export default function rehypeImageCaptions() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'element') return;

      if (node.tagName === 'img') {
        addDimensions(node);
        return;
      }

      if (node.tagName !== 'p' || !node.children) return;

      const meaningful = node.children.filter(
        (child) => !(child.type === 'text' && child.value.trim() === ''),
      );

      if (meaningful.length !== 1) return;

      const image = meaningful[0];
      if (image.type !== 'element' || image.tagName !== 'img') return;

      const caption = image.properties?.title;
      if (typeof caption !== 'string' || caption.trim() === '') return;

      delete image.properties.title;
      node.tagName = 'figure';
      node.properties = { className: ['post-figure'] };
      node.children = [
        image,
        {
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{ type: 'text', value: caption }],
        },
      ];
    });
  };
}

function addDimensions(image) {
  if (image.properties?.width && image.properties?.height) return;

  const src = image.properties?.src;
  if (typeof src !== 'string' || !src.startsWith('/')) return;

  try {
    const cleanPath = decodeURIComponent(src.split('?')[0].split('#')[0]);
    const filePath = path.join(process.cwd(), 'public', cleanPath);
    const dimensions = imageSize(readFileSync(filePath));
    if (dimensions.width && dimensions.height) {
      image.properties.width = dimensions.width;
      image.properties.height = dimensions.height;
    }
  } catch {
    // Remote images, missing files, and unsupported formats are left untouched.
  }
}

function walk(node, visit) {
  visit(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, visit);
  }
}
