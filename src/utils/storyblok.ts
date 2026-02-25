import { storyblokInit, apiPlugin } from '@storyblok/astro';

export function initStoryblok() {
  storyblokInit({
    accessToken: import.meta.env.STORYBLOK_TOKEN || 'your_token_here',
    use: [apiPlugin],
    components: {
      page: 'components/Page',
      hero: 'components/storyblok/common/Hero',
      textReveal: 'components/storyblok/common/TextReveal',
      catchPhrase: 'components/storyblok/common/CatchPhrase',
      testimonialOverlay: 'components/storyblok/common/TestimonialOverlay',
    },
    bridge: true,
  });
}
