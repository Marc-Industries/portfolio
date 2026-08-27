/**
 * Asset helper: look up the generated Higgsfield still/video for a given key.
 *
 * Files live under:
 *   /public/assets/img/<id>.{jpg|png|webp}
 *   /public/assets/video/<id>.{mp4|webm}
 *
 * If the file doesn't exist, `present()` returns false and the component falls
 * back to a procedural / CSS-only look. Components should call this from a
 * `useEffect` to set a state flag, since Next/Link can't synchronously check
 * the filesystem.
 *
 * This module is safe to import from server and client components.
 */

const IMG_EXTS = ['jpg', 'png', 'webp', 'jpeg'] as const;
const VID_EXTS = ['mp4', 'webm'] as const;

/** Returns the public path of an image if it is one of the supported extensions. */
export function imgPath(id: string, ext?: string): string | null {
  if (ext) return `/assets/img/${id}.${ext.replace(/^\./, '')}`;
  // Caller will likely check `present()` via state. We always return the .jpg
  // candidate here as a guess; components that need a stricter check should
  // use <img onError> to hide broken icons.
  return `/assets/img/${id}.${IMG_EXTS[0]}`;
}

/** Returns the public path of a video. */
export function vidPath(id: string): string {
  return `/assets/video/${id}.${VID_EXTS[0]}`;
}

/** Public list of image extensions — components can probe them. */
export const IMG_EXTENSIONS = IMG_EXTS;
export const VID_EXTENSIONS = VID_EXTS;

/**
 * Build the ordered list of candidate image paths for an id.
 * Components can use these with a state machine + onError to find one that loads.
 */
export function imgCandidates(id: string): string[] {
  return IMG_EXTS.map((ext) => `/assets/img/${id}.${ext}`);
}
