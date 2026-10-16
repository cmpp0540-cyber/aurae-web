/**
 * Legal pages: Privacy Policy and Terms of Service.
 *
 * Plain data, rendered by components/legal/LegalPage.tsx. Edit the text here.
 * A paragraph is a string; a bullet list is `{ list: [...] }`.
 *
 * Drafted for Aurae's current setup (US-only store on Shopify, email with
 * Klaviyo, hosting on Vercel, fulfilment through Supliful). If any of that
 * changes, or a new tool is added (analytics, ad pixels, reviews, SMS),
 * update the matching section. This is not legal advice.
 */

export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; heading: string; body: LegalBlock[] };
export type LegalDoc = {
  title: string;
  italic: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

const EMAIL = 'hello@auraevital.com';
const COMPANY = 'Aurae Wellness, Inc.';
const UPDATED = 'October 15, 2026';

export const PRIVACY: LegalDoc = {
  title: 'Privacy',
  italic: 'Policy.',
  updated: UPDATED,
  intro: [
    `${COMPANY} (“Aurae”, “we”, “us”) runs auraevital.com. This policy explains what personal information we collect, how we use it and the choices you have. It applies to people who visit our website, sign up for our emails or buy from us in the United States.`,
  ],
  sections: [
    {
      id: 'collect',
      heading: 'Information we collect',
      body: [
        'Information you give us:',
        {
          list: [
            'Your email address, when you join the Aurae Letter or ask for a discount code.',
            'Your name, shipping and billing address, email address and phone number (if you add one), when you place an order.',
            'Anything you send us when you contact support, such as questions or order details.',
          ],
        },
        'Payment details are entered on Shopify’s secure checkout and handled by Shopify and its payment processors. We do not receive or store your full card number.',
        'Information collected automatically when you use the site:',
        {
          list: [
            'Device and browser type, approximate location from your IP address, pages viewed, links clicked and the page that referred you.',
            'The items in your cart, so it is still there when you come back.',
          ],
        },
      ],
    },
    {
      id: 'use',
      heading: 'How we use it',
      body: [
        {
          list: [
            'To process, ship and support your orders, including order and shipping updates.',
            'To send marketing emails if you signed up. You can unsubscribe at any time with the link in every email.',
            'To run, secure and improve the website, and to prevent fraud and abuse.',
            'To measure and improve our advertising, where we use advertising or analytics tools (see Cookies below).',
            'To meet legal, tax and accounting obligations.',
          ],
        },
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and similar technologies',
      body: [
        'Cookies are small files stored on your device. We use them to keep your cart, remember your preferences and understand how the site is used. Where we use advertising or analytics tools, such as a Meta (Facebook and Instagram) pixel, they may also use cookies to measure results and show our ads to people who have visited the site.',
        'You can block or delete cookies in your browser settings. If you block them, some parts of the site, such as the cart, may not work properly.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Who we share it with',
      body: [
        'We share personal information only as needed to run the store, with:',
        {
          list: [
            'Shopify, which powers our store, checkout and order management.',
            'Klaviyo, which sends our emails.',
            'Vercel, which hosts the website.',
            'Our fulfilment and manufacturing partner, which receives your name and shipping address to pack and send your order, and the carriers that deliver it.',
            'Payment processors, which complete your payment.',
            'Advertising and analytics providers, if and when we use them (for example Meta).',
            'Authorities or advisers, when the law requires it or to protect our rights.',
            'A buyer or successor, if Aurae is involved in a sale, merger or similar transaction.',
          ],
        },
        'We do not sell your personal information for money. Some state laws treat sharing data with advertising providers as “sharing” or “targeted advertising”. If that applies, you can opt out as described in the next section.',
      ],
    },
    {
      id: 'rights',
      heading: 'Your choices and rights',
      body: [
        'You can unsubscribe from marketing emails at any time using the link at the bottom of any email.',
        `Depending on where you live (for example California, Colorado, Connecticut, Virginia and other states with privacy laws), you may have the right to know what personal information we hold about you, to get a copy of it, to correct it, to delete it, and to opt out of targeted advertising or the sharing of your data for advertising. To make a request, email ${EMAIL}. We may need to confirm your identity first, and we will respond within the time the law allows. We will not treat you differently for using these rights.`,
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      body: [
        'We keep personal information for as long as we need it to provide our services, resolve disputes and meet legal, tax and accounting requirements. Order records are typically kept for several years. If you ask us to delete your information, we will do so unless the law requires us to keep it.',
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      body: [
        'We use reasonable measures to protect your information, including secure, encrypted checkout through Shopify. No website or system is completely secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      body: [
        'Our products and website are intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has given us information, contact us and we will delete it.',
      ],
    },
    {
      id: 'links',
      heading: 'Other websites',
      body: [
        'Our site may link to other websites, including social media. We are not responsible for their privacy practices, so please read their policies.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The “last updated” date at the top shows when it last changed. If we make important changes, we will let you know on the site or by email.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: [`Questions or requests about your privacy? Email ${EMAIL}.`],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: 'Terms of',
  italic: 'Service.',
  updated: UPDATED,
  intro: [
    `These Terms of Service (“Terms”) govern your use of auraevital.com and your purchases from ${COMPANY} (“Aurae”, “we”, “us”). By using the site or placing an order, you agree to these Terms. If you do not agree, please do not use the site.`,
  ],
  sections: [
    {
      id: 'eligibility',
      heading: 'Who can buy',
      body: [
        'You must be at least 18 years old and located in the United States to place an order. We currently ship within the United States only.',
      ],
    },
    {
      id: 'supplements',
      heading: 'About our products',
      body: [
        'Aurae products are dietary supplements. These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure or prevent any disease.',
        'Information on this site is for general education and is not medical advice. Talk to your healthcare provider before starting any supplement, especially if you are pregnant, breastfeeding, under 18, have a medical condition or take prescription medication. Stop using a product and seek medical advice if you have a reaction. Individual experiences vary. Read the label and follow the suggested use.',
      ],
    },
    {
      id: 'orders',
      heading: 'Orders and pricing',
      body: [
        'Prices are in US dollars. Taxes, where they apply, are calculated at checkout. We may change prices, products or offers at any time, but the price you see when you place your order is the price you pay.',
        'Placing an order is an offer to buy. We may decline or cancel an order, for example because of a pricing error, a suspected fraudulent payment or a product being unavailable, and we will refund you in full if that happens.',
        'Promotional and discount codes, including the welcome offer, are subject to their stated conditions and may be changed or ended at any time.',
      ],
    },
    {
      id: 'shipping',
      heading: 'Shipping',
      body: [
        'Standard shipping (typically 5–7 business days) is free on orders of $50 or more and a flat $4.99 on orders under $50. We ship to addresses in the continental United States. Delivery times are estimates and are not guaranteed, and they can be affected by carriers and weather. Please check that your address is correct, because we cannot always change it after you order.',
      ],
    },
    {
      id: 'returns',
      heading: 'Returns and refunds',
      body: [
        `We offer a 30-day money-back guarantee. If you are not happy within 30 days of your order, email ${EMAIL} and send the product back, even if it is empty, for a full refund of the product price. We aim to process refunds within 48 hours of receiving your request, and your bank may take additional time to show the credit.`,
        `If your order arrives damaged, defective or incorrect, email ${EMAIL} with your order number and a photo, and we will make it right.`,
      ],
    },
    {
      id: 'subscriptions',
      heading: 'Subscribe & Save',
      body: [
        'If you choose Subscribe & Save, you get a discount on each order and free shipping, and your order is delivered automatically every month. By subscribing, you authorize us to charge your payment method on file for each shipment until you cancel.',
        `You can pause, skip or cancel at any time, with no commitment. We send you an email a few days before each shipment so you can make changes. To cancel or change a subscription, email ${EMAIL} before your next shipment date.`,
      ],
    },
    {
      id: 'content',
      heading: 'Our content',
      body: [
        'The Aurae name, logo, product designs, photos, text and everything else on this site belong to Aurae or its licensors and are protected by intellectual property laws. You may view the site for personal use. You may not copy, reproduce, modify or use our content commercially without our written permission.',
      ],
    },
    {
      id: 'use',
      heading: 'Acceptable use',
      body: [
        'Do not use the site to break the law, interfere with its operation or security, attempt to access it without permission, submit false information or place fraudulent orders.',
      ],
    },
    {
      id: 'warranty',
      heading: 'Disclaimers',
      body: [
        'To the fullest extent the law allows, the site and products are provided “as is” and “as available”, without warranties of any kind other than those the law requires. We do not guarantee that the site will be uninterrupted or error-free.',
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      body: [
        'To the fullest extent the law allows, Aurae and its team will not be liable for indirect, incidental or consequential damages arising from your use of the site or products. Our total liability for any claim is limited to the amount you paid for the product that gave rise to the claim. Some states do not allow these limits, so they may not apply to you, and nothing in these Terms limits rights that cannot be limited by law.',
      ],
    },
    {
      id: 'law',
      heading: 'Governing law',
      body: [
        `These Terms are governed by the laws of the United States and of the state in which ${COMPANY} is organized, without regard to conflict-of-law rules.`,
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these Terms',
      body: [
        'We may update these Terms from time to time. The “last updated” date shows the latest version. By continuing to use the site after a change, you accept the updated Terms.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      body: [`Questions about these Terms? Email ${EMAIL}.`],
    },
  ],
};
