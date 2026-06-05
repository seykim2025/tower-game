/**
 * Toss Ads Abstraction Layer (Placeholder)
 * This file isolates all advertisement logic from the core gameplay.
 * Real Toss ad IDs will replace these placeholders in the future.
 */

window.TossAds = {
  /**
   * Show an interstitial ad before an action (like retrying).
   * @param {string} context - The context calling this ad (e.g. 'game_over_retry_interstitial')
   * @returns {Promise<boolean>} Resolves to true if ad completes successfully or gracefully fails.
   */
  showInterstitialAd: async (context) => {
    console.log(`[TossAds] Requesting Interstitial Ad for context: ${context}`);
    // TODO: Replace with real Toss Interstitial Ad API and ID
    
    return new Promise((resolve) => {
      // Simulate ad delay for development testing
      setTimeout(() => {
        console.log(`[TossAds] Interstitial Ad finished for context: ${context}`);
        resolve(true);
      }, 500);
    });
  },

  /**
   * Show a rewarded ad to grant the user a reward (e.g. 3 hearts).
   * @param {string} context - The context calling this ad (e.g. 'game_over_rewarded_hearts')
   * @returns {Promise<boolean>} Resolves to true if user successfully watched the ad.
   */
  showRewardedAd: async (context) => {
    console.log(`[TossAds] Requesting Rewarded Ad for context: ${context}`);
    // TODO: Replace with real Toss Rewarded Ad API and ID
    
    return new Promise((resolve) => {
      // Simulate ad delay for development testing
      setTimeout(() => {
        console.log(`[TossAds] Rewarded Ad successfully watched for context: ${context}`);
        resolve(true); // Return true if reward granted
      }, 1000);
    });
  },

  /**
   * Render or reserve space for a banner ad.
   * @param {string} containerId - The DOM element ID to place the banner inside.
   * @param {string} placement - The context/placement name (e.g. 'home_bottom_banner', 'ingame_bottom_banner', 'gameover_bottom_image_ad')
   */
  renderOrReserveBannerAd: (containerId, placement) => {
    console.log(`[TossAds] Reserving banner space in #${containerId} for placement: ${placement}`);
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`[TossAds] Banner container #${containerId} not found.`);
      return;
    }
    
    // Add placeholder styling
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.backgroundColor = '#e0e0e0';
    container.style.color = '#757575';
    container.style.fontSize = '12px';
    container.style.fontFamily = 'sans-serif';
    container.style.borderTop = '1px solid #ccc';
    
    // TODO: Render real banner ad here
    container.innerHTML = `<span>[Ad Placement: ${placement}]</span>`;
  }
};
