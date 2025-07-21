// crypto-polyfill.js
export default {
  hash: function(algorithm, content) {
    // Simple hash function as fallback
    if (!content) return '';
    
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
  }
};
