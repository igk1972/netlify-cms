import registry from './registry';

const SLUGFORMATTERKEY = 'slugformatter';

function defaultSlugFormatter (value) {
  return value;
}

function slug (str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñçščřžýůďťňľ·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuuncscrzyudtnl------";
  for (var i=0, l=from.length ; i<l ; i++) {
     str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  const registerred = registry.getWidgetValueSerializer(SLUGFORMATTERKEY);
  str = registerred ? registerred(str) : defaultSlugFormatter(str);

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
     .replace(/\s+/g, '-') // collapse whitespace and replace by -
     .replace(/-+/g, '-'); // collapse dashes
  return str;
}

export function toSlug (str) {
  return slug(str);
}

export function removeUnicodesInFilename (str) {
  const parts = str.split('.')
  return parts.map(i => slug(i)).join('.');
}
