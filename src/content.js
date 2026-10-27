export const API_BASE =
  import.meta.env.VITE_PORTFOLIO_API_URL ||
  'http://localhost/constructify-api/api/portfolio.php';
export const defaults = {
  hero: {
    eyebrow: 'Trusted Construction Partner Since 1998',
    title: "Building Tomorrow's Infrastructure Today",
    description:
      "We build with precision, passion, and purpose. From concept to completion, we're committed to creating spaces that stand the test of time.",
    button1: 'Explore Our Projects',
    button2: 'Request a Quote',
    counter1: '25+',
    label1: 'Years Experience',
    counter2: '850+',
    label2: 'Projects Completed',
    counter3: '120+',
    label3: 'Team Experts',
    counter4: '35+',
    label4: 'Industry Awards',
    image_url: '',
  },
  about: {
    eyebrow: 'ABOUT CONSTRUCTIFY',
    title: 'We Build With Precision, Passion & Purpose',
    description:
      "Since 1998, we've been turning ambitious ideas into enduring structures. Our team combines technical expertise, thoughtful planning, and a commitment to quality in every project.",
    image_url: '',
    image_url_2: '',
  },
  services: {
    eyebrow: 'WHAT WE DO',
    title: 'Our Services',
    description:
      'From the first sketch to the final detail, we deliver reliable solutions built around your goals.',
    image_url: '',
  },
  projects: {
    eyebrow: 'OUR PORTFOLIO',
    title: 'Our Projects',
    description:
      'Explore our recent work and discover how we turn great ideas into lasting results.',
  },
};
export async function api(action, options = {}) {
  const url = `${API_BASE}?action=${action}${options.section ? `&section=${encodeURIComponent(options.section)}` : ''}`;
  const response = await fetch(url, {
    method: options.method || 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.csrf ? { 'X-CSRF-Token': options.csrf } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok)
    throw Error(json.message || `Request failed (${response.status})`);
  return json;
}

export async function uploadImage(file, csrf) {
  const form = new FormData();
  form.append('image', file);
  const response = await fetch(`${API_BASE}?action=upload`, {
    method: 'POST',
    credentials: 'include',
    headers: csrf ? { 'X-CSRF-Token': csrf } : {},
    body: form,
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok)
    throw Error(json.message || `Upload failed (${response.status})`);
  return json;
}
