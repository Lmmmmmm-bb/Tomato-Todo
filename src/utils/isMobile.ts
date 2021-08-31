/**
 * Whether user device is mobile
 * if mobile device(include tablet device) return true
 * else return false
 * @param {String} userAgent Navigator UserAgent
 * @returns Whether that device is mobile device
 */
const isMobile = (userAgent: string): boolean =>
  /android|iphone|phone/i.test(userAgent);

export default isMobile;
