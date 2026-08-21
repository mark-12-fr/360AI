/**
 * What machine is this?
 *
 * The brain runs identically everywhere — there is nothing to size to the
 * hardware — so all this is used for now is naming the device in a greeting
 * and explaining the install gesture, which differs on every platform.
 */

const ua = navigator.userAgent

let cached = null

export function detectDevice() {
  if (cached) return cached

  // iPadOS reports itself as "Macintosh"; touch points are the giveaway.
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
  const ios = /iPhone|iPad|iPod/.test(ua) || iPadOS
  const android = /Android/.test(ua)
  const phone = /iPhone|iPod/.test(ua) || (android && /Mobile/.test(ua))
  const tablet = iPadOS || /iPad/.test(ua) || (android && !/Mobile/.test(ua))

  // Chrome hands us a real answer; everything else gets inferred from the UA.
  const mobile = navigator.userAgentData?.mobile ?? (phone || tablet)

  const safari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua)
  const firefox = /Firefox/.test(ua)

  cached = {
    ios,
    android,
    phone,
    tablet,
    mobile,
    safari,
    firefox,
    // Chrome caps this at 8 even on a 64 GB workstation, and Safari and
    // Firefox do not implement it at all — hence the `?? null` callers check.
    memoryGB: navigator.deviceMemory ?? null,
    cores: navigator.hardwareConcurrency ?? null,
    touch: navigator.maxTouchPoints > 0,
    standalone:
      matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
    name: ios
      ? tablet
        ? 'iPad'
        : 'iPhone'
      : android
        ? tablet
          ? 'Android tablet'
          : 'Android phone'
        : /Mac/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows PC'
            : /Linux/.test(ua)
              ? 'Linux PC'
              : 'this device',
  }
  return cached
}

/** How to install the PWA, which is a different gesture on every platform. */
export function installHelp(device) {
  if (device.ios) {
    return 'Tap the **Share** button, then **Add to Home Screen**. 360AI then launches like a normal app.'
  }
  if (device.android) {
    return 'Tap the **⋮** menu, then **Add to Home screen** (or **Install app**).'
  }
  return 'Click the install icon in the address bar, or use the **Install app** button in the sidebar.'
}
