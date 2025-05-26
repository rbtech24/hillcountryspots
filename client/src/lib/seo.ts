export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

export function updatePageSEO(seoData: SEOData) {
  // Update title
  document.title = seoData.title;

  // Update or create meta description
  updateMetaTag('description', seoData.description);

  // Update or create meta keywords
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords);
  }

  // Update Open Graph tags
  updateMetaProperty('og:title', seoData.title);
  updateMetaProperty('og:description', seoData.description);
  updateMetaProperty('og:url', window.location.href);
  
  if (seoData.ogImage) {
    updateMetaProperty('og:image', seoData.ogImage);
  }

  // Update Twitter tags
  updateMetaProperty('twitter:title', seoData.title);
  updateMetaProperty('twitter:description', seoData.description);
  
  if (seoData.ogImage) {
    updateMetaProperty('twitter:image', seoData.ogImage);
  }

  // Update canonical URL
  if (seoData.canonicalUrl) {
    updateCanonicalUrl(seoData.canonicalUrl);
  }

  // Add structured data
  if (seoData.structuredData) {
    addStructuredData(seoData.structuredData);
  }
}

function updateMetaTag(name: string, content: string) {
  let metaTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = name;
    document.head.appendChild(metaTag);
  }
  
  metaTag.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', property);
    document.head.appendChild(metaTag);
  }
  
  metaTag.content = content;
}

function updateCanonicalUrl(url: string) {
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  
  canonicalLink.href = url;
}

function addStructuredData(data: Record<string, any>) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"][data-page-specific]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page-specific', 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}