import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CampaignBanner } from './CampaignBanner';
import { gameConfig } from '../../config/game-config';
import { TestElement } from '../../enums/TestElement';

afterEach(cleanup);

describe('[GAME] CampaignBanner', () => {
  it('SHOULD Render CampaignBanner with all the CSS properties from config file', () => {
    //
    render(<CampaignBanner />);

    // Assert the existence of BannerStyled
    expect(screen.getByTestId(TestElement.CAMPAIGN_BANNER)).toBeInTheDocument();

    // Assert the CSS properties from the config file
    expect(screen.getByTestId(TestElement.CAMPAIGN_BANNER)).toHaveStyle({
      top: gameConfig.campaignBanner.offsetTop,
      width: gameConfig.campaignBanner.width,
      borderRadius: `${gameConfig.campaignBanner.borderRadius}px`,
      padding: `${gameConfig.campaignBanner.padding}px`,
      backgroundColor: gameConfig.campaignBanner.background,
      color: gameConfig.campaignBanner.textColor,
    });
  });

  it('SHOULD Render CampaignBanner and maintain responsiveness WHEN viewport width is 250 px', () => {
    //
    global.innerWidth = 250;

    render(<CampaignBanner />);
    // Assert data-testid attribute
    expect(screen.getByTestId(TestElement.CAMPAIGN_BANNER)).toHaveAttribute('data-testid', TestElement.CAMPAIGN_BANNER);

    const bannerStyle = screen.getByTestId(TestElement.CAMPAIGN_BANNER)
    // Assuming proportional adjustment
    const expectedBannerStyles = {
      top: `${gameConfig.campaignBanner.offsetTop}`, 
      width: `${gameConfig.campaignBanner.width}`, 
      borderRadius:`${gameConfig.campaignBanner.borderRadius}px`,
      padding: `${gameConfig.campaignBanner.padding}px`,
      backgroundColor: `${gameConfig.campaignBanner.background}`,
      color: `${gameConfig.campaignBanner.textColor}`,
    };

    // Assert styles
    expect(bannerStyle).toHaveStyle('top: ' + `${expectedBannerStyles.top}`);
    expect(bannerStyle).toHaveStyle('width: ' + `${expectedBannerStyles.width}`);
    expect(bannerStyle).toHaveStyle('border-radius: ' + `${expectedBannerStyles.borderRadius}`);
    expect(bannerStyle).toHaveStyle('padding: ' + `${expectedBannerStyles.padding}`);
    expect(bannerStyle).toHaveStyle('background-color: ' + `${expectedBannerStyles.backgroundColor}`);
    expect(bannerStyle).toHaveStyle('color: ' + `${expectedBannerStyles.color}`);

  });

  it('SHOULD Render CampaignBanner and maintain responsiveness WHEN when viewport height is 600 px', () => {
    //
    window.innerHeight = 600;
    window.dispatchEvent(new Event('resize'));

    render(<CampaignBanner />);

    const campaignBanner = screen.getByTestId(TestElement.CAMPAIGN_BANNER);

    const expectedTop = `${Math.ceil((600 / 640) * parseFloat(gameConfig.campaignBanner.offsetTop))}%`;

    // Assert responsiveness
    expect(campaignBanner).toHaveStyle({
      top: expectedTop,
    });

  });
});
