// Cloudflare Worker for Hiligaynon Vocabulary App
// Handles routing and serves static assets

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Security headers
    const securityHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    
    try {
      // Get the asset from Cloudflare's asset serving
      const assetResponse = await env.ASSETS.fetch(request);
      
      // If asset exists, serve it with security headers
      if (assetResponse.status !== 404) {
        const response = new Response(assetResponse.body, {
          status: assetResponse.status,
          statusText: assetResponse.statusText,
          headers: assetResponse.headers
        });
        
        // Add security headers
        Object.entries(securityHeaders).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
        
        // Add caching for static assets
        if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        }
        
        return response;
      }
      
      // If no asset found, serve index.html for SPA routing
      const indexRequest = new Request(new URL('/index.html', request.url));
      const indexResponse = await env.ASSETS.fetch(indexRequest);
      
      return new Response(indexResponse.body, {
        status: 200,
        headers: {
          ...Object.fromEntries(indexResponse.headers),
          ...securityHeaders,
          'Content-Type': 'text/html; charset=utf-8'
        }
      });
      
    } catch (error) {
      return new Response('Error loading page', { 
        status: 500,
        headers: securityHeaders 
      });
    }
  },
};